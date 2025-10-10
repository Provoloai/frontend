import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { isSameDay, parseFirestoreTimestamp } from "./helper.util";

// Retry function for Firestore operations with exponential backoff
export const retryFirestoreOperation = async (
  operation,
  maxRetries = 3,
  delay = 1000
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await operation();
      return true; // Success
    } catch (error) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error(`Firestore attempt ${attempt} failed:`, error);
      }

      if (attempt === maxRetries) {
        if (import.meta.env.DEV) {
          console.error("All Firestore retry attempts failed");
        }
        return false;
      }

      // Wait before retrying with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
};

/**
 * Checks and updates the user's prompt usage in Firestore.
 * Returns { allowed: boolean, count: number, limit: number }
 */
export const checkAndUpdateUserPromptLimit = async (db, userId, limit = 3) => {
  const now = new Date();
  let result = { allowed: false, count: 0, limit };

  await retryFirestoreOperation(async () => {
    const promptLimitsRef = collection(db, "user_prompt_limits");
    const q = query(promptLimitsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Create new document for user with count 1 (first prompt)
      await addDoc(promptLimitsRef, {
        userId,
        promptCount: 1,
        lastPromptAt: now,
      });
      result = { allowed: true, count: 1, limit };
      return;
    }

    const existingDoc = snapshot.docs[0];
    const data = existingDoc.data();
    const docRef = doc(db, "user_prompt_limits", existingDoc.id);
    const lastPromptAt = parseFirestoreTimestamp(data.lastPromptAt);
    const currentCount = data.promptCount || 0;

    if (isSameDay(lastPromptAt, now)) {
      if (currentCount >= limit) {
        result = { allowed: false, count: currentCount, limit };
        return;
      }
      await updateDoc(docRef, {
        promptCount: currentCount + 1,
        lastPromptAt: now,
      });
      result = { allowed: true, count: currentCount + 1, limit };
      return;
    }

    // Reset for new day
    await updateDoc(docRef, {
      promptCount: 1,
      lastPromptAt: now,
    });
    result = { allowed: true, count: 1, limit };
    return;
  });

  return result;
};

/**
 * Helper function to save newsletter subscription with retry
 * Checks if email exists and updates instead of duplicating
 */
export const saveNewsletterSubscription = async (
  db,
  email,
  userId,
  subscribed = true
) => {
  const firestoreOperation = async () => {
    // Check if email already exists in newsletter collection
    const newsletterRef = collection(db, "users");
    const q = query(newsletterRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Email exists, update the existing document
      const existingDoc = querySnapshot.docs[0];
      const docRef = doc(db, "users", existingDoc.id);

      await updateDoc(docRef, {
        subscribed: subscribed,
        userId: userId,
        updatedAt: new Date(),
      });
    } else {
      // Email doesn't exist, create new document
      await addDoc(collection(db, "users"), {
        email: email,
        subscribed: subscribed,
        userId: userId,
        displayName: null,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    }
  };

  return await retryFirestoreOperation(firestoreOperation);
};

// Checks if user exists in Firestore and creates profile if not
export const ensureUserExists = async (db, user) => {
  try {
    // Check if user already exists in Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // User exists, return existing data
      const existingDoc = querySnapshot.docs[0];
      return { id: existingDoc.id, ...existingDoc.data() };
    } else {
      // User doesn't exist, create new user document
      const newUserData = {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        subscribed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "users"), newUserData);
      // New user created in Firestore

      return { id: docRef.id, ...newUserData };
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Error ensuring user exists:", error);
    }
    throw error;
  }
};
