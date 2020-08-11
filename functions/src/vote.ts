import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;
import DocumentReference = admin.firestore.DocumentReference;
import Firestore = admin.firestore.Firestore;
import {FirebaseAuth} from './firebase-auth';

export default class Vote {
    constructor(private readonly db: Firestore) {}

    public async voteTheme(themeId: string, auth: FirebaseAuth, keyToIncrement: 'likes' | 'dislikes'): Promise<void> {
        const uid = auth.uid;
        const themeRef = this.db.collection('theme').doc(themeId);

        if (await Vote.alreadyVoted(uid, themeRef)) {
            throw new functions.https.HttpsError('failed-precondition', 'You have already voted on this theme');
        }

        const updateData = {
            [keyToIncrement]: Vote.increment(),
            uids: Vote.appendUid(uid)
        };

        themeRef.update(updateData)
            .catch((err) => {
                throw new functions.https.HttpsError('unknown', err)
            });
    }

    private static increment(): FieldValue {
        return FieldValue.increment(1);
    }

    private static appendUid(uid: string): FieldValue {
        return FieldValue.arrayUnion(uid);
    }

    private static async alreadyVoted(uid: string, themeRef: DocumentReference): Promise<boolean> {
        const doc = await themeRef.get();
        return !!doc.data()?.uids?.includes(uid);
    }
}
