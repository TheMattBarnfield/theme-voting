import functions from 'firebase-functions';
import admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;
import DocumentReference = admin.firestore.DocumentReference;
import Firestore = admin.firestore.Firestore;
import {FirebaseAuth} from './firebase-auth';
import {ThemeId} from './theme';

export default class Vote {
    constructor(private readonly db: Firestore) {}

    public async voteTheme({id}: ThemeId, {uid}: FirebaseAuth, keyToIncrement?: 'likes' | 'dislikes'): Promise<FirebaseFirestore.WriteResult> {
        const themeRef = this.db.collection('theme').doc(id);

        if (await Vote.alreadyVoted(uid, themeRef)) {
            throw new functions.https.HttpsError('failed-precondition', 'You have already voted on this theme');
        }

        const updateData = keyToIncrement ? {
            [keyToIncrement]: Vote.increment(),
            uids: Vote.appendUid(uid)
        } : {
            uids: Vote.appendUid(uid)
        };

        return themeRef.update(updateData);
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
