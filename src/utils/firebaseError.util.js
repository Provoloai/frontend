/**
 * Firebase error code to user-friendly message mapping
 */
const firebaseErrorMessages = {
  // Authentication errors
  "auth/email-already-in-use": "This email is already registered. Please try signing in instead.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled. Please contact support.",
  "auth/user-not-found": "No account found with this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your connection and try again.",
  "auth/invalid-credential": "Invalid email or password. Please check your credentials.",
  "auth/requires-recent-login": "Please sign in again to complete this action.",
  "auth/operation-not-allowed": "This sign-in method is not enabled. Please contact support.",
  "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
  "auth/popup-blocked": "Sign-in popup was blocked by your browser. Please allow popups and try again.",
  "auth/credential-already-in-use": "This credential is already associated with a different account.",
  "auth/account-exists-with-different-credential": "An account already exists with the same email but different sign-in credentials.",
  "auth/auth-domain-config-required": "Authentication configuration error. Please contact support.",
  "auth/cancelled-popup-request": "Sign-in request was cancelled. Please try again.",
  "auth/operation-not-supported-in-this-environment": "This operation is not supported in your current environment.",
  "auth/redirect-cancelled-by-user": "Sign-in redirect was cancelled. Please try again.",
  "auth/redirect-operation-pending": "A redirect sign-in operation is already pending.",
  "auth/timeout": "The operation timed out. Please try again.",
  "auth/user-token-expired": "Your session has expired. Please sign in again.",
  "auth/web-storage-unsupported": "Your browser does not support web storage. Please update your browser.",
  "auth/invalid-action-code": "The action code is invalid. This can happen if the code is malformed or has expired.",
  "auth/expired-action-code": "The action code has expired. Please request a new one.",
  "auth/invalid-continue-uri": "The continue URL provided is invalid.",
  "auth/missing-continue-uri": "A continue URL must be provided in the request.",
  "auth/missing-email": "An email address must be provided.",
  "auth/missing-password": "A password must be provided.",
  "auth/invalid-password": "The password is invalid. It must be at least 6 characters.",
  "auth/user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
  "auth/provider-already-linked": "User can only be linked to one identity for the given provider.",
  "auth/no-such-provider": "User was not linked to an account with the given provider.",
  "auth/invalid-user-token": "The user's credential is no longer valid. Please sign in again.",
  "auth/token-expired": "The user's credential has expired. Please sign in again.",
  "auth/user-token-mismatch": "The supplied token does not match the user.",
  "auth/invalid-tenant-id": "The tenant ID provided is invalid.",
  "auth/tenant-id-mismatch": "The provided tenant ID does not match the Auth instance.",
  "auth/unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
  "auth/invalid-phone-number": "The phone number provided is invalid.",
  "auth/missing-phone-number": "A phone number must be provided.",
  "auth/quota-exceeded": "The SMS quota has been exceeded. Please try again later.",
  "auth/captcha-check-failed": "The reCAPTCHA response token provided is invalid.",
  "auth/invalid-app-credential": "The phone verification request contains an invalid application verifier.",
  "auth/app-not-authorized": "This app is not authorized to use Firebase Authentication.",
  "auth/keychain-error": "An error occurred while accessing the keychain.",
  "auth/internal-error": "An internal authentication error occurred. Please try again.",
  "auth/invalid-api-key": "Your API key is invalid. Please check your Firebase configuration.",
  "auth/app-deleted": "This instance of Firebase App has been deleted.",
  "auth/invalid-user-import": "The user record to import is invalid.",
  "auth/maximum-user-count-exceeded": "The maximum allowed number of users has been exceeded.",
  "auth/missing-uid": "A uid identifier is required for the current operation.",
  "auth/reserved-claims": "One or more custom user claims provided are reserved.",
  "auth/session-cookie-expired": "The Firebase session cookie has expired.",
  "auth/session-cookie-revoked": "The Firebase session cookie has been revoked.",
  "auth/uid-already-exists": "The provided uid is already in use by an existing user.",
  "auth/unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.",
  "auth/invalid-dynamic-link-domain": "The provided dynamic link domain is not configured properly.",

  // Firestore errors
  "firestore/permission-denied": "You don't have permission to perform this action.",
  "firestore/unavailable": "Service temporarily unavailable. Please try again.",
  "firestore/cancelled": "Operation was cancelled. Please try again.",
  "firestore/deadline-exceeded": "Request timed out. Please try again.",
  "firestore/not-found": "Requested data not found.",
  "firestore/already-exists": "This data already exists.",
  "firestore/resource-exhausted": "Resource limits exceeded. Please try again later.",
  "firestore/failed-precondition": "Operation failed due to a precondition failure.",
  "firestore/aborted": "Operation was aborted due to a conflict. Please try again.",
  "firestore/out-of-range": "Operation was attempted past the valid range.",
  "firestore/unimplemented": "Operation is not implemented or supported.",
  "firestore/internal": "Internal server error occurred. Please try again.",
  "firestore/data-loss": "Unrecoverable data loss or corruption occurred.",
  "firestore/unauthenticated": "Request does not have valid authentication credentials.",
  "firestore/invalid-argument": "Client specified an invalid argument.",
  "firestore/unknown": "Unknown error occurred. Please try again.",

  // Cloud Storage errors
  "storage/unknown": "An unknown error occurred. Please try again.",
  "storage/object-not-found": "File not found. It may have been deleted.",
  "storage/bucket-not-found": "Storage bucket not found. Please check your configuration.",
  "storage/project-not-found": "Project not found. Please check your Firebase configuration.",
  "storage/quota-exceeded": "Storage quota exceeded. Please upgrade your plan or delete some files.",
  "storage/unauthenticated": "You need to be signed in to perform this action.",
  "storage/unauthorized": "You don't have permission to perform this action.",
  "storage/retry-limit-exceeded": "Maximum retry limit exceeded. Please try again later.",
  "storage/invalid-checksum": "File checksum does not match. Please try uploading again.",
  "storage/invalid-event-name": "Invalid event name provided.",
  "storage/invalid-url": "Invalid URL provided for this storage reference.",
  "storage/invalid-argument": "Invalid argument provided to storage function.",
  "storage/no-default-bucket": "No default storage bucket found. Please configure Firebase Storage.",
  "storage/cannot-slice-blob": "Cannot slice file. Please try a different file.",
  "storage/server-file-wrong-size": "Server received file of wrong size. Please try again.",
  "storage/cancelled": "File operation was cancelled.",

  // Cloud Functions errors
  "functions/cancelled": "Function execution was cancelled.",
  "functions/unknown": "Unknown error occurred in function execution.",
  "functions/invalid-argument": "Invalid argument passed to function.",
  "functions/deadline-exceeded": "Function execution timed out.",
  "functions/not-found": "Function not found.",
  "functions/already-exists": "Function already exists.",
  "functions/permission-denied": "Permission denied to execute function.",
  "functions/resource-exhausted": "Function resource limits exceeded.",
  "functions/failed-precondition": "Function execution failed precondition.",
  "functions/aborted": "Function execution was aborted.",
  "functions/out-of-range": "Function parameter out of valid range.",
  "functions/unimplemented": "Function not implemented.",
  "functions/internal": "Internal function error.",
  "functions/unavailable": "Function service unavailable.",
  "functions/data-loss": "Function data loss occurred.",
  "functions/unauthenticated": "Function requires authentication.",

  // Realtime Database errors
  "database/permission-denied": "You don't have permission to access this data.",
  "database/unavailable": "Database service unavailable. Please try again.",
  "database/network-error": "Network error occurred. Please check your connection.",
  "database/write-cancelled": "Write operation was cancelled.",
  "database/disconnected": "Database connection was lost.",
  "database/expired-token": "Authentication token has expired.",
  "database/invalid-token": "Authentication token is invalid.",
  "database/max-retries": "Maximum retry attempts exceeded.",
  "database/overridden-by-set": "Transaction was overridden by a set operation.",
  "database/transaction-aborted": "Transaction was aborted.",
  "database/unknown-error": "An unknown database error occurred.",

  // App Check errors
  "app-check/use-before-activation": "App Check must be activated before use.",
  "app-check/debug-token-required": "App Check debug token is required in debug environment.",
  "app-check/general-error": "App Check error occurred.",
  "app-check/http-error": "App Check HTTP error occurred.",
  "app-check/throttled": "App Check requests are being throttled.",
  "app-check/token-error": "App Check token error occurred.",

  // Analytics errors
  "analytics/already-initialized": "Analytics has already been initialized.",
  "analytics/not-supported": "Analytics is not supported in this environment.",
  "analytics/invalid-analytics-context": "Invalid analytics context provided.",

  // Performance Monitoring errors
  "performance/invalid-custom-metric": "Invalid custom performance metric.",
  "performance/invalid-attribute-name": "Invalid performance attribute name.",
  "performance/invalid-attribute-value": "Invalid performance attribute value.",
  "performance/invalid-trace-name": "Invalid performance trace name.",

  // Remote Config errors
  "remote-config/internal-error": "Remote Config internal error occurred.",
  "remote-config/throttled": "Remote Config requests are being throttled.",
  "remote-config/unknown": "Unknown Remote Config error occurred.",

  // Messaging errors
  "messaging/failed-service-worker-registration": "Failed to register service worker for messaging.",
  "messaging/invalid-sw-registration": "Invalid service worker registration for messaging.",
  "messaging/permission-blocked": "Notification permission was blocked.",
  "messaging/permission-default": "Notification permission is in default state.",
  "messaging/unsupported-browser": "Messaging is not supported in this browser.",
  "messaging/token-subscribe-failed": "Failed to subscribe to messaging token.",
  "messaging/token-subscribe-no-token": "No messaging token available for subscription.",
  "messaging/token-unsubscribe-failed": "Failed to unsubscribe from messaging token.",
  "messaging/token-update-failed": "Failed to update messaging token.",
  "messaging/token-update-no-token": "No messaging token available for update.",

  // App Installation errors
  "installations/app-offline": "App is offline. Installation operations require internet connection.",
  "installations/delete-pending-registration": "Cannot delete installation while registration is pending.",
  "installations/invalid-argument": "Invalid argument provided to installations.",
  "installations/invalid-configuration": "Invalid installations configuration.",
  "installations/invalid-server-response": "Invalid server response received.",
  "installations/missing-app-config-values": "Missing required app configuration values.",
  "installations/not-registered": "Installation is not registered.",
  "installations/quota-exceeded": "Installations quota exceeded.",
  "installations/registration-aborted": "Installation registration was aborted.",
  "installations/request-failed": "Installation request failed.",
  "installations/server-error": "Installation server error occurred.",
};

/**
 * Extracts and cleans Firebase error messages
 * @param {Error} error - Firebase error object
 * @returns {string} - User-friendly error message
 */
export const getCleanErrorMessage = (error) => {
  if (!error) return "An unknown error occurred.";

  // Extract error code from Firebase error
  let errorCode = null;

  // Check if it's a Firebase error with a code property
  if (error.code) {
    errorCode = error.code;
  }
  // Check if error message contains the pattern "Firebase: Error (code)."
  else if (error.message && typeof error.message === "string") {
    const match = error.message.match(/Firebase: Error \(([^)]+)\)\./);
    if (match) {
      errorCode = match[1];
    }
  }

  // Return user-friendly message if we have a mapping
  if (errorCode && firebaseErrorMessages[errorCode]) {
    return firebaseErrorMessages[errorCode];
  }

  // Fallback: clean up the raw error message
  if (error.message) {
    // Remove "Firebase: Error (code)." prefix
    let cleanMessage = error.message.replace(/^Firebase: Error \([^)]+\)\.\s*/, "");

    // Remove "FirebaseError: " prefix if present
    cleanMessage = cleanMessage.replace(/^FirebaseError:\s*/, "");

    // Capitalize first letter
    cleanMessage = cleanMessage.charAt(0).toUpperCase() + cleanMessage.slice(1);

    return cleanMessage;
  }

  // Ultimate fallback
  return "An unexpected error occurred. Please try again.";
};

/**
 * Specific function for authentication errors
 * @param {Error} error - Firebase auth error
 * @returns {string} - User-friendly auth error message
 */
export const getAuthErrorMessage = (error) => {
  return getCleanErrorMessage(error);
};

/**
 * Specific function for Firestore errors
 * @param {Error} error - Firestore error
 * @returns {string} - User-friendly Firestore error message
 */
export const getFirestoreErrorMessage = (error) => {
  return getCleanErrorMessage(error);
};

/**
 * Specific function for Storage errors
 * @param {Error} error - Storage error
 * @returns {string} - User-friendly Storage error message
 */
export const getStorageErrorMessage = (error) => {
  return getCleanErrorMessage(error);
};

/**
 * Specific function for Functions errors
 * @param {Error} error - Functions error
 * @returns {string} - User-friendly Functions error message
 */
export const getFunctionsErrorMessage = (error) => {
  return getCleanErrorMessage(error);
};

/**
 * Check if error is a specific Firebase error type
 * @param {Error} error - Error object
 * @param {string} errorCode - Error code to check for
 * @returns {boolean} - True if error matches the code
 */
export const isFirebaseError = (error, errorCode) => {
  return error && error.code === errorCode;
};

/**
 * Check if error is an authentication error
 * @param {Error} error - Error object
 * @returns {boolean} - True if error is auth related
 */
export const isAuthError = (error) => {
  return error && error.code && error.code.startsWith("auth/");
};

/**
 * Check if error is a Firestore error
 * @param {Error} error - Error object
 * @returns {boolean} - True if error is Firestore related
 */
export const isFirestoreError = (error) => {
  return error && error.code && error.code.startsWith("firestore/");
};

/**
 * Check if error is a Storage error
 * @param {Error} error - Error object
 * @returns {boolean} - True if error is Storage related
 */
export const isStorageError = (error) => {
  return error && error.code && error.code.startsWith("storage/");
};
