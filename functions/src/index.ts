import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import Vote from './vote'
import {Theme} from './theme';
import {getAuthFromContext} from './firebase-auth';

admin.initializeApp();

const app = express();
const router = express.Router();
const db = admin.firestore();
const vote = new Vote(db);

router.post('/theme', async (request, response) => {
    const theme: string = request.body.theme;
    functions.logger.info(`Adding theme suggestion: ${theme}`, {structuredData: true});

    const themeToAdd: Theme = {
        theme,
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
    const auth = getAuthFromContext(context);
    await vote.voteTheme(data, auth, 'likes');
    return {nextTheme: 'nextTheme'}
})

export const dislikeTheme = functions.https.onCall(async (data, context) => {
    const auth = getAuthFromContext(context)
    await vote.voteTheme(data, auth, 'dislikes');
    return {nextTheme: 'nextTheme'}
})

