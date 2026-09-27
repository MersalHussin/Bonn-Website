import { NextResponse } from "next/server";
import { admin } from "../../../lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const db = admin.firestore();
    
    // Check if requester is ceo
    const callerDoc = await db.collection("Users").doc(uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== "ceo") {
      return NextResponse.json({ error: "Forbidden: Only CEO can create accounts" }, { status: 403 });
    }

    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (role !== "admin" && role !== "super_user") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Add user to Users collection in Firestore
    await db.collection("Users").doc(userRecord.uid).set({
      email,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const db = admin.firestore();
    
    // Only ceo can list users
    const callerDoc = await db.collection("Users").doc(uid).get();
    if (!callerDoc.exists || callerDoc.data()?.role !== "ceo") {
      return NextResponse.json({ error: "Forbidden: Only CEO can list accounts" }, { status: 403 });
    }

    const snapshot = await db.collection("Users").get();
    const users: any[] = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
