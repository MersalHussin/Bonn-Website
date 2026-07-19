import { getSheetsClient } from "../../lib/googleSheets";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const sheets = getSheetsClient();
    const body = await req.json();

    const values = [
      [
        body.companyName,
        body.contactPerson,
        body.telephone,
        body.email,
        body.website,
        body.postalAddress,
        body.country,
        body.tradeLicense,
        body.yearEstablished,
        body.owners,
        body.businessType,
        body.presence,
        body.turnover,
        body.teamSize,
        body.partnerBrands,
        body.references,
        body.competitors,
        body.requestedProducts,
        body.targetProfile,
        body.productCategory,
        body.launchDate,
        body.customFormulation,
        body.formulationDetails,
        body.sampleQty,
        body.sampleDeadline,
        body.testingRequirements,
        body.packagingRequirements,
        body.packagingDetails,
        body.artwork,
        body.barcode,
        body.localLanguage,
        body.logisticsNeeds,
        body.incoterms,
        body.serialization,
        body.deliveryLeadTime,
        body.authorizedDistributors,
        body.storageConditions,
        body.otherNotes,
        body.signature,
        body.date,
        body.agreeTerms ? "Yes" : "No",
        "", // Column AP was used for PDF url, keep empty
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "Sheet1!A:AP",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true, message: "تم حفظ البيانات بنجاح" });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ success: false, message: "فشل الحفظ في Google Sheets" }, { status: 500 });
  }
}

