import { NextResponse } from "next/server";
import { getSheetsClient } from "../../lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rowIndex, status } = body;

    if (rowIndex === undefined) {
      return NextResponse.json({ error: "rowIndex is required" }, { status: 400 });
    }

    const sheets = getSheetsClient();
    // rowIndex is 0-indexed relative to the data rows.
    // Row 1 is header. Row 2 is index 0.
    // So the row number in Google Sheets is rowIndex + 2.
    // Column AP is the 42nd column.
    const rowNumber = rowIndex + 2;
    const range = `Sheet1!AP${rowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[status]]
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating client status:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
