import { google } from "googleapis";

export const getSheetsClient = () => {
  if (!process.env.GOOGLE_REGISTRATION_KEY_BASE64) {
    throw new Error("Missing GOOGLE_REGISTRATION_KEY_BASE64 environment variable");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      Buffer.from(process.env.GOOGLE_REGISTRATION_KEY_BASE64, "base64").toString("utf8")
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

