import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, RecaptchaParameters } from 'firebase/auth';

/**
 * Firebase configuration for the project.
 * These values are provided by Firebase console.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: 'sweepstakes-443211.firebaseapp.com',
  projectId: 'sweepstakes-443211',
  storageBucket: 'sweepstakes-443211.firebasestorage.app',
  messagingSenderId: '975661398544',
  appId: '1:975661398544:web:6fc600b7eb8c13ac31a895',
  measurementId: 'G-9CZ9WS8SN9'
};

/**
 * Enum of Firebase authentication error codes.
 * Normalized from Firebase Auth errors for type safety.
 */
export enum FirebaseAuthErrorCode {
  InvalidPhoneNumber = "auth/invalid-phone-number",
  MissingPhoneNumber = "auth/missing-phone-number",
  TooManyRequests = "auth/too-many-requests",
  CodeExpired = "auth/code-expired",
  InvalidVerificationCode = "auth/invalid-verification-code",
  MissingVerificationCode = "auth/missing-verification-code",
  InvalidVerificationId = "auth/invalid-verification-id",
  MissingVerificationId = "auth/missing-verification-id",
  CaptchaCheckFailed = "auth/captcha-check-failed",
  InvalidRecaptchaToken = "auth/invalid-recaptcha-token",
  QuotaExceeded = "auth/quota-exceeded",
  InvalidAppCredential = "auth/invalid-app-credential",
  Unknown = "auth/unknown"
}

/**
 * Map Firebase error codes to user-friendly messages.
 */
const errorMessages: Record<FirebaseAuthErrorCode, string> = {
  [FirebaseAuthErrorCode.InvalidPhoneNumber]: "Invalid phone number format",
  [FirebaseAuthErrorCode.MissingPhoneNumber]: "Phone number is required",
  [FirebaseAuthErrorCode.TooManyRequests]: "Too many attempts. Please try again later",
  [FirebaseAuthErrorCode.CodeExpired]: "The code has expired.",
  [FirebaseAuthErrorCode.InvalidVerificationCode]: "Invalid verification code",
  [FirebaseAuthErrorCode.MissingVerificationCode]: "Verification code is required",
  [FirebaseAuthErrorCode.InvalidVerificationId]: "Verification session has expired. Try again",
  [FirebaseAuthErrorCode.MissingVerificationId]: "Verification session is missing. Try again",
  [FirebaseAuthErrorCode.CaptchaCheckFailed]: "Captcha verification failed. Please retry",
  [FirebaseAuthErrorCode.InvalidRecaptchaToken]: "Captcha verification failed. Please retry",
  [FirebaseAuthErrorCode.QuotaExceeded]: "SMS quota exceeded. Please try again later",
  [FirebaseAuthErrorCode.InvalidAppCredential]: "Something went wrong. Please try again later",
  [FirebaseAuthErrorCode.Unknown]: "Something went wrong. Please try again"
};

/**
 * Parses Firebase authentication errors and maps them to enum + user-friendly message.
 *
 * @param err - Error object thrown by Firebase
 * @returns Parsed error with enum code and message
 */
export function parseAuthError(err: unknown): {
  message: string;
  code: FirebaseAuthErrorCode;
} {
  const raw =
    (err as any)?.code ??
    (err as any)?.message ??
    (typeof err === "string" ? err : "");

  // Extract Firebase code
  const match = /auth\/[a-z0-9\-]+/i.exec(raw);
  const code = (match?.[0] as FirebaseAuthErrorCode) ?? FirebaseAuthErrorCode.Unknown;

  // Map to message
  const message = errorMessages[code] ?? errorMessages[FirebaseAuthErrorCode.Unknown];

  return {
    message,
    code
  };
}


/**
 * Service wrapper for Firebase Authentication
 */
export default class FirebaseService {

  private readonly firebaseApp;
  private readonly auth;

  constructor() {
    // Initialize Firebase only once per app instance.
    this.firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    this.auth = getAuth(this.firebaseApp);
  }

  /**
   * Builds and returns a reCAPTCHA verifier instance.
   * By default it creates an "invisible" captcha, but custom RecaptchaParameters can be provided.
   *
   * @param containerId - DOM element ID where reCAPTCHA will be attached
   * @param parameters - Optional custom reCAPTCHA configuration
   * @returns RecaptchaVerifier instance
   */
  buildRecaptcha(containerId: string, parameters?: RecaptchaParameters): RecaptchaVerifier {
    const reCaptchaParameters: RecaptchaParameters = parameters || {
      size: 'invisible',
    };
    // Attach reCAPTCHA to Firebase auth with the given container
    return new RecaptchaVerifier(this.auth, containerId, reCaptchaParameters)
  }

  /**
   * Sends an OTP SMS to the given phone number using Firebase Auth.
   * Requires a valid reCAPTCHA verifier instance.
   *
   * @param phoneNumber - User phone number in E.164 format (e.g., +123456789)
   * @param recaptchaVerifier - RecaptchaVerifier instance
   * @returns Firebase ConfirmationResult, used later for code confirmation
   */
  async sendOtp(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
    return await signInWithPhoneNumber(this.auth, phoneNumber, recaptchaVerifier);
  }

  /**
   * Confirms an OTP code against a previously received ConfirmationResult.
   * This step verifies that the user entered the correct SMS code.
   *
   * @param confirmationResult - Result returned from sendOtp()
   * @param code - User-entered OTP code
   * @returns Firebase UserCredential if successful
   */
  async confirmOtp(confirmationResult: ConfirmationResult, code: string) {
    return await confirmationResult.confirm(code);
  }

  /**
   * Retrieves a fresh Firebase ID token for the currently signed-in user.
   * Can be sent to backend for session validation.
   *
   * @returns JWT token string or undefined if no user is logged in
   */
  async getUserToken() {
    return await this.auth.currentUser?.getIdToken();
  }
}



