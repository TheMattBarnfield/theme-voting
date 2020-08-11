import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';
import Vote from './vote'
import {Theme, ThemeResponse} from './theme';
import {getAuthFromContext} from './firebase-auth';
import minBy from 'lodash/minBy';
import DocumentData = admin.firestore.DocumentData;
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;

admin.initializeApp();

const app = express();
const router = express.Router();
const db = admin.firestore();
const vote = new Vote(db);

router.post('/theme', async (request, response) => {
    const theme: string = request.body.theme;

    if (!theme) {
        throw new functions.https.HttpsError('invalid-argument', 'Theme name cannot be empty')
    }

    if (theme.length > 50) {
        throw new functions.https.HttpsError('invalid-argument', 'Theme cannot be longer than 50 characters')
    }

    // This regex is coupled with the Suggest.tsx in the frontend
    const sanitisedTheme = theme.replace(/[^a-zA-Z0-9 ]/g, "")

    const themeToAdd: Theme = {
        theme: sanitisedTheme,
        likes: 0,
        dislikes: 0,
        uids: []
    }

    await db.collection('theme').add(themeToAdd);

    response.sendStatus(200);
})

router.get('/themes', async (request, response) => {
    functions.logger.info('Getting all themes');

    const snapshot = await admin.firestore().collection('theme').get()
    response.json(snapshot.docs.map(doc => doc.data()));
})

router.get('/hello-world', async (request, response) => {
    response.send("hello world");
})

app.use('/api', router);

export const api = functions
    // hosting only supports rewrite rules to us-central1 https://firebase.google.com/docs/hosting/full-config#rewrite-functions
    .region('us-central1')
    .https
    .onRequest(app as any);

export const likeTheme = functions.https.onCall(async (data, context) => {
    functions.logger.info("Liking: ", data)
    const auth = getAuthFromContext(context);
    functions.logger.info("Auth: ", auth);
    await vote.voteTheme(data.themeId, auth, 'likes');
    return getUnvotedTheme(auth.uid)
})

export const dislikeTheme = functions.https.onCall(async (data, context) => {
    const auth = getAuthFromContext(context)
    await vote.voteTheme(data, auth, 'dislikes');
    return getUnvotedTheme(auth.uid)
})

export const skipTheme = functions.https.onCall(async (data, context) => {
    const auth = getAuthFromContext(context)
    await vote.voteTheme(data, auth);
    return getUnvotedTheme(auth.uid)
})

export const getTheme = functions.https.onCall(async (data, context) => {
    const auth = getAuthFromContext(context)
    return getUnvotedTheme(auth.uid)
})

const getUnvotedTheme = async (uid: string): Promise<ThemeResponse> => {
    const {docs} = await db.collection('theme').get()
    const unvotedThemes = docs.filter(doc => {
        const uids: string[] | undefined = doc.data()['uids']
        return !uids?.includes(uid);
    });
    const themeDoc: QueryDocumentSnapshot<DocumentData> | undefined = minBy(unvotedThemes, doc => doc.data()['uids'].length)

    if (!themeDoc) {
        return {
            id: 'no-new-themes',
            theme: 'You have voted on every theme!'
        }
    }

    return {
        id: themeDoc.id,
        theme: themeDoc.data()['theme']
    }
}
