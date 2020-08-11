import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;
import DocumentReference = admin.firestore.DocumentReference;

admin.initializeApp();

const app = express();
const router = express.Router();
const db = admin.firestore();

router.post('/theme', async (request, response) => {
    const theme: string = request.body.theme;
    functions.logger.info(`Adding theme suggestion: ${theme}`, {structuredData: true});

    await admin.firestore()
        .collection('theme')
        .add({
            theme,
            likes: 0,
            dislikes: 0
        });

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

exports.upVoteTheme = functions.https.onCall(async (data, context) => {
    await voteTheme(data, context, 'likes');
    return {nextTheme: 'nextTheme'}
})

exports.downVoteTheme = functions.https.onCall(async (data, context) => {
    await voteTheme(data, context, 'dislikes');
    return {nextTheme: 'nextTheme'}
})

const voteTheme = async (data: any, context: functions.https.CallableContext, keyToIncrement: 'likes' | 'dislikes'): Promise<void> => {
    // Check user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must log in to perform this action');
    }

    const uid = context.auth.uid;
    const themeId = data.themeId;
    const themeRef = db.collection('theme').doc(themeId);

    // Check user is allowed to vote on this theme
    const allowedToVote = await userIsAllowedToVote(uid, themeRef);
    if (!allowedToVote) {
        throw new functions.https.HttpsError('permission-denied', 'You are not allowed to vote on this theme');
    }

    // TODO - Fix this any
    const updateData: any = {}
    updateData[keyToIncrement] = generateIncrementor(1);
    updateData['uids'] = generateValueAppender(uid);

    themeRef.update(updateData)
        .catch((err) => {
            throw new functions.https.HttpsError('unknown', err)
        });
}

const generateIncrementor = (difference: number): FieldValue => {
    return FieldValue.increment(difference);
}

const generateValueAppender = (value: string): FieldValue => {
    return FieldValue.arrayUnion(value);
}

const userIsAllowedToVote = async (uid: string, themeRef: DocumentReference): Promise<boolean> => {
    const doc = await themeRef.get();
    const docData = doc.data();
    const uids: string[] | undefined = docData && docData.uids;
    return !(uids && uids.includes(uid));
}
