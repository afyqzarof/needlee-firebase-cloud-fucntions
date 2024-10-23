import { auth } from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const createUserProfile = auth.user().onCreate(async (user) => {
  const userDoc = {
    email: user.email,
    uid: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await db.collection("users").doc(user.uid).set(userDoc);
    console.log(`User profile created for: ${user.email}`);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
});
