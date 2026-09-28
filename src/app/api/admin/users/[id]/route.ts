import { NextResponse } from "next/server";
import { admin } from "../../../../lib/firebase-admin";

async function verifyCeo(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const uid = decodedToken.uid;
  const db = admin.firestore();
  
  const callerDoc = await db.collection("Users").doc(uid).get();
  if (!callerDoc.exists || callerDoc.data()?.role !== "ceo") {
    throw new Error("Forbidden");
  }
  return { db, callerUid: uid };
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db, callerUid } = await verifyCeo(req);
    const { id } = await params;
    const targetUid = id;

    if (callerUid === targetUid) {
      return NextResponse.json({ error: "لا يمكنك حذف حسابك الخاص" }, { status: 400 });
    }

    // Check if target user is ceo
    const targetDoc = await db.collection("Users").doc(targetUid).get();
    if (targetDoc.exists && targetDoc.data()?.role === "ceo") {
      return NextResponse.json({ error: "لا يمكن حذف حساب لمدير تنفيذي (CEO)" }, { status: 403 });
    }

    await admin.auth().deleteUser(targetUid);
    await db.collection("Users").doc(targetUid).delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { db, callerUid } = await verifyCeo(req);
    const { id } = await params;
    const targetUid = id;
    const { role, password } = await req.json();

    if (callerUid === targetUid && role && role !== "ceo") {
      return NextResponse.json({ error: "لا يمكنك تغيير صلاحيتك كمدير تنفيذي" }, { status: 400 });
    }

    // Check if target user is ceo
    const targetDoc = await db.collection("Users").doc(targetUid).get();
    if (targetDoc.exists && targetDoc.data()?.role === "ceo" && targetUid !== callerUid) {
      return NextResponse.json({ error: "لا يمكن تعديل حساب مدير تنفيذي (CEO) آخر" }, { status: 403 });
    }

    if (role && role !== "admin" && role !== "super_user" && role !== "ceo") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (password && password.length < 6) {
      return NextResponse.json({ error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }, { status: 400 });
    }

    if (role) {
      await db.collection("Users").doc(targetUid).update({ role });
    }

    if (password) {
      await admin.auth().updateUser(targetUid, { password });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
    }
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
