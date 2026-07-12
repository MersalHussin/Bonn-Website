import { google } from "googleapis";

export const getSheetsClient = () => {
  if (!process.env.GOOGLE_REGISTRATION_KEY_BASE64) {
    throw new Error("Missing GOOGLE_REGISTRATION_KEY_BASE64 environment variable");
  }

  let base64Key = process.env.GOOGLE_REGISTRATION_KEY_BASE64.trim();
  if (base64Key.startsWith('"') && base64Key.endsWith('"')) base64Key = base64Key.slice(1, -1);
  if (base64Key.startsWith("'") && base64Key.endsWith("'")) base64Key = base64Key.slice(1, -1);

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      Buffer.from(base64Key, "base64").toString("utf8")
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

