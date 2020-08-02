import * as functions from 'firebase-functions';
import * as express from 'express';

const app = express();
const router = express.Router();

router.get('/hello-world', (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
})

app.use('/api', router);

export const api = functions
    // hosting only supports rewrite rules to us-central1 https://firebase.google.com/docs/hosting/full-config#rewrite-functions
    .region('us-central1')
    .https
    .onRequest(app as any);
