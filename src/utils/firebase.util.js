import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { isSameDay, parseFirestoreTimestamp } from "./helper.util";

// Retry function for Firestore operations with exponential backoff
export const retryFirestoreOperation = async (operation, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await operation();
      return true; // Success
    } catch (error) {
      console.error(`Firestore attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        console.error("All Firestore retry attempts failed");
        return false; // All retries failed
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
export const saveNewsletterSubscription = async (db, email, userId, subscribed = true) => {
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

      console.log("Newsletter subscription updated for existing email");
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

      console.log("New newsletter subscription created");
    }
  };

  return await retryFirestoreOperation(firestoreOperation);
};
// Updates the user's display name in Firebase Auth
export const updateUserDisplayName = async (user, displayName, db) => {
  try {
    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: displayName
    });
    
    // Update display name in newsletter collection if user exists there
    const newsletterRef = collection(db, "users");
    const q = query(newsletterRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing newsletter document with new display name
      const existingDoc = querySnapshot.docs[0];
      const docRef = doc(db, "users", existingDoc.id);
      
      await updateDoc(docRef, {
        displayName: displayName,
        updatedAt: new Date(),
      });
      
      console.log("Newsletter collection display name updated successfully");
    }
    
    console.log("Display name updated successfully:", displayName);
    return true;
  } catch (error) {
    console.error("Error updating display name:", error);
    // Throw the error instead of returning false so it can be caught by the calling function
    throw error;
  }
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
      console.log("New user created in Firestore with ID:", docRef.id);
      
      return { id: docRef.id, ...newUserData };
    }
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    throw error;
  }
};
