import { sheets } from "../../lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID!,
      range: "Sheet1!A:AN",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true, message: "تم حفظ البيانات في Google Sheets" });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json({ success: false, message: "فشل الحفظ في Google Sheets" }, { status: 500 });
  }
}

