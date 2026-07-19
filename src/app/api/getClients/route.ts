import { NextResponse } from "next/server";
import { getSheetsClient } from "../../lib/googleSheets";

export async function GET() {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "Sheet1!A:AQ", // Assuming headers are in A:AQ
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    const clients = rows.slice(1).map((row, index) => {
      // Map columns by exact index to English keys based on api/sheet/route.ts
      return {
        "Name": row[0] || "",
        "Contact Person": row[1] || "",
        "Phone Number": row[2] || "",
        "Email": row[3] || "",
        "Website": row[4] || "",
        "Postal Code": row[5] || "",
        "Country": row[6] || "",
        "Trade License": row[7] || "",
        "Year Established": row[8] || "",
        "Company Owners": row[9] || "",
        "Business Type": row[10] || "",
        "Presence": row[11] || "",
        "Turn Over": row[12] || "",
        "Team Size": row[13] || "",
        "Partner Brands": row[14] || "",
        "References": row[15] || "",
        "Competitors": row[16] || "",
        "Requested Products": row[17] || "",
        "Target Profile": row[18] || "",
        "Product Category": row[19] || "",
        "Launching Date": row[20] || "",
        "Custom Formulation": row[21] || "",
        "Formulation Details": row[22] || "",
        "Sample Qty": row[23] || "",
        "Sample Deadline": row[24] || "",
        "Testing Requirements": row[25] || "",
        "Packaging Requirements": row[26] || "",
        "Packaging Details": row[27] || "",
        "Artwork": row[28] || "",
        "Barcode": row[29] || "",
        "Local Language": row[30] || "",
        "Logistics Needs": row[31] || "",
        "Incoterms": row[32] || "",
        "Serialization": row[33] || "",
        "Delivery Lead Time": row[34] || "",
        "Authorized Distributors": row[35] || "",
        "Storage Conditions": row[36] || "",
        "Other Notes": row[37] || "",
        "Signature": row[38] || "",
        "Date": row[39] || "",
        "Agree Terms": row[40] || "",
        "Status": row[41] || "", // Column AP for Reviewed Status
        "rowIndex": index
      };
    });

    return NextResponse.json(clients);
  } catch (err) {
    console.error("Unexpected error fetching from Google Sheets API:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
