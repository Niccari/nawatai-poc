const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let authClientInstance: any = null;

const initializeAuthClient = async () => {
  if (authClientInstance) return authClientInstance;

  const { initializeApp, getApps } = await import("firebase/app");
  const { getAuth, connectAuthEmulator } = await import("firebase/auth");

  if (getApps().length === 0) {
    initializeApp(firebaseConfig);

    const firebaseEmulatorHost = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
    const firebaseAuthEmulatorPort =
      process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_AUTH_PORT;
    if (firebaseEmulatorHost && firebaseAuthEmulatorPort) {
      connectAuthEmulator(
        getAuth(),
        `http://${firebaseEmulatorHost}:${parseInt(firebaseAuthEmulatorPort, 10)}`,
      );
    }
  }

  authClientInstance = getAuth();
  return authClientInstance;
};

const authClient = new Proxy({} as any, {
  get: (target, prop) => {
    if (!authClientInstance) {
      throw new Error(
        "Auth client not initialized. Call initializeAuthClient() first.",
      );
    }
    return authClientInstance[prop];
  },
});

export { authClient, initializeAuthClient };
