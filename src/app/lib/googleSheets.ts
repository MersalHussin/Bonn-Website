import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(
    Buffer.from(process.env.GOOGLE_REGISTRATION_KEY_BASE64!, "base64").toString("utf8")
  ),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({ version: "v4", auth });

