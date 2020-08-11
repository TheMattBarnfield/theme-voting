import * as firebase from 'firebase-admin';
import {CallableContext} from 'firebase-functions/lib/providers/https';
import * as functions from 'firebase-functions';

export interface FirebaseAuth {
    uid: string;
    token: firebase.auth.DecodedIdToken;
}

export function getAuthFromContext(context: CallableContext): FirebaseAuth {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must log in to perform this action');
    }
    return context.auth
}
