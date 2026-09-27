import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID || process.env.GOOGLE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL,
  privateKey: (process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY)?.replace(/"/g, "")?.replace(/\\n/g, "\n"),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
