import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);

  const firebaseEmulatorHost = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
  const firebaseAuthEmulatorPort =
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_AUTH_PORT;
  if (firebaseEmulatorHost && firebaseAuthEmulatorPort) {
    connectAuthEmulator(
      getAuth(),
      `http://${firebaseEmulatorHost}:${parseInt(firebaseAuthEmulatorPort, 10)}`
    );
  }
}
const authClient = getAuth();
export { authClient };
