import { getSheetsClient } from "../../lib/googleSheets";
import { NextResponse } from "next/server";
import { generateClientPDF } from "../../lib/pdf";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const sheets = getSheetsClient();
    const body = await req.json();

    // Map body to clientData format expected by generateClientPDF
    const pdfData = {
      "Contact Person": body.contactPerson,
      "Name": body.companyName,
      "Email": body.email,
      "Phone Number": body.telephone,
      "Postal Code": body.postalAddress,
      "Country": body.country,
      "Trade License": body.tradeLicense,
      "Year Established": body.yearEstablished,
      "Company Owners": body.owners,
      "Business Type": body.businessType,
      "Presence": body.presence,
      "Turn Over": body.turnover,
      "Team Size": body.teamSize,
      "Partner Brands": body.partnerBrands,
      "References": body.references,
      "Requested Products": body.requestedProducts,
      "Target Profile": body.targetProfile,
      "Product Category": body.productCategory,
      "Launching Date": body.launchDate,
      "Custom Formulation": body.customFormulation,
      "Formulation Details": body.formulationDetails,
      "Sample Qty": body.sampleQty,
      "Sample Deadline": body.sampleDeadline,
      "Testing Requirements": body.testingRequirements,
      "Packaging Requirements": body.packagingRequirements,
      "Packaging Details": body.packagingDetails,
      "Artwork": body.artwork,
      "Barcode": body.barcode,
      "Local Language": body.localLanguage,
      "Logistics Needs": body.logisticsNeeds,
      "Incoterms": body.incoterms,
      "Serialization": body.serialization,
      "Delivery Lead Time": body.deliveryLeadTime,
      "Authorized Distributors": body.authorizedDistributors,
      "Storage Conditions": body.storageConditions,
      "Other Notes": body.otherNotes,
      "Signature": body.signature,
      "Date": body.date,
      "Agree Terms": body.agreeTerms ? "Yes" : "No"
    };

    // Generate and upload PDF
    let pdfUrl = "";
    try {
      console.log("Generating PDF on server...");
      const pdfBytes = await generateClientPDF(pdfData);
      const pdfBuffer = Buffer.from(pdfBytes);
      const fileName = `submission-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
      
      console.log(`Uploading PDF to Supabase bucket 'pdf-client' as '${fileName}'...`);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("pdf-client")
        .upload(fileName, pdfBuffer, {
          contentType: "application/pdf",
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        console.error("Supabase PDF upload error details:", uploadError);
      } else {
        const { data: { publicUrl } } = supabase.storage.from("pdf-client").getPublicUrl(fileName);
        pdfUrl = publicUrl;
        console.log("PDF uploaded successfully. Public URL:", pdfUrl);
      }
    } catch (pdfErr) {
      console.error("Error during PDF generation or upload:", pdfErr);
    }

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
        pdfUrl, // Column AP
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "'Bonn Profiles'!A:AP",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true, message: "تم حفظ البيانات وتوليد ملف الـ PDF بنجاح" });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ success: false, message: "فشل الحفظ في Google Sheets" }, { status: 500 });
  }
}

