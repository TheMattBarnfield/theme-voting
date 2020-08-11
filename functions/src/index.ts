import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const app = express();
const router = express.Router();

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

    await admin.firestore()
        .collection('theme')
        .add({
            sanitisedTheme,
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
