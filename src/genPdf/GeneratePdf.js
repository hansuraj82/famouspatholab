import { jsPDF } from "jspdf";
import "../utils/fonts/Cambria-Italic.js";
import "../utils/fonts/Cambria.js";
import "../utils/fonts/CambriaMath.js";
import "../utils/fonts/Cambria-Bold.js";
import "../utils/fonts/Wingdings-Regular.js";

import { CBC_Design } from "./ReportsDesign/CBC_Report.js";
import { MP_card_Design } from "./ReportsDesign/MP_Report";
import { HB_Report_Design } from "./ReportsDesign/HB_Report";
import { LFT_Design } from "./ReportsDesign/LFT_Report";
import { HeadingLogo, signture } from "../utils/Base64File/Logo.js";
import { KFT_Design } from "./ReportsDesign/KFT_Report";
import { Widal_Design } from "./ReportsDesign/WIDAL_Report.js";
import { S_BILLIRUBIN_Design, S_BILLIRUBIN_DIRECT_Design, S_BILLIRUBIN_INDIRECT_Design, S_BILLIRUBIN_TOTAL_Design } from "./ReportsDesign/S_BILLIRUBIN_Report.js";
import { urineCultureReport } from "./ReportsDesign/urineCultureReport.js";
import { Sgpt_Design } from "./ReportsDesign/sgpt_Report.js";
import { Sgot_Design } from "./ReportsDesign/sgot_Report.js";
import { S_ALKALINE_PHOSHATE_Design } from "./ReportsDesign/S_ALKALINE_PHOSHATE_Report.js";
import { TotalProtein_Design } from "./ReportsDesign/totalProtein_Report.js";
import { Albumin_Design } from "./ReportsDesign/albumin_Report.js";
import { Globulin_Design } from "./ReportsDesign/globulin_Report.js";
import { Alb_globulin_ratio_Design } from "./ReportsDesign/alb_globulin_ratio_Report.js";
import { ScreatnineVal_Design } from "./ReportsDesign/sCreattinine_Report.js";
import { sUrea_Design } from "./ReportsDesign/sUrea_Report.js";
import { sUricAcid_Design } from "./ReportsDesign/sUricAcid_Report.js";
import { sChloride_Design } from "./ReportsDesign/sChloride_Report.js";
import { sPotassium_Design } from "./ReportsDesign/sPotassium.js";
import { sSodium_Design } from "./ReportsDesign/sSodium_Report.js";
import { sCalcium_Design } from "./ReportsDesign/sCalcium_Report.js";
import { CustomTestReport } from "./ReportsDesign/customReport.js";


const generatePdf = ({
    patientName,
    age,
    gender,
    address,
    refBy,
    cbcData,
    selectedReports,
    setPdfUrl,
    setShowPreview,
    mpCardResult,
    HB_value,
    LFT_Data,
    KFT_Data,
    widalData,
    S_BILLIRUBIN_Data,
    S_BILLIRUBIN_TOTAL_VAL,
    S_BILLIRUBIN_DIRECT_VAL,
    S_BILLIRUBIN_INDIRECT_VAL,
    cultureType,
    sensitivityData,
    testDate,
    reportDate,
    sgptVal,
    sgotVal,
    S_ALKALINE_PHOSHATE_VAL,
    totalProteinVal,
    albuminVal,
    globulinVal,
    alb_globulin_ratioVal,
    screatnineVal,
    sUreaVal,
    sUricAcidVal,
    sChlorideVal,
    sPotassiumVal,
    sSodiumVal,
    sCalciumVal,
    customTests
}) => {
    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0);
    doc.setFont("Cambria", "bold")



    let x = 10;
    // Header Text
    doc.addImage(`data:image/png;base64,${HeadingLogo}`, "PNG", x, 10, 192.4, 16.3);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10).setFont("Cambria", "normal");
    doc.text("ESTD:- 2004", 3, 5);
    doc.setFontSize(18).setFont("Cambria", "bold");
    doc.text("MAHAVIR CHOWK, PRATAPPUR (CHATRA)", 105, 33, { align: "center" });
    doc.setFontSize(14).setFont("Cambria", "bold");
    doc.text("CONTACT NO:- 9770788771 ,9341423645", 105, 39, { align: "center" });
    doc.rect(0, 41, 225, 0);
    // Patient Info
    doc.setFontSize(12).setFont("Cambria", "normal");
    doc.text(`PATIENT NAME : ${patientName.toUpperCase()}`, 15, 48);

    let patientNameText = `PATIENT NAME `;
    const patientNameTextWidth = (doc.getTextWidth(patientNameText) + 15);

    doc.text(`GENDER`, 15, 56);
    const ageParts = [];
    if (age.year) age.year > 1 ? ageParts.push(`${age.year} YEARS`) : ageParts.push(`${age.year} YEAR`);
    if (age.month) age.month > 1 ? ageParts.push(`${age.month} MONTHS`) : ageParts.push(`${age.month} MONTH`);
    if (age.day) age.day > 1 ? ageParts.push(`${age.day} DAYS`) : ageParts.push(`${age.day} DAY`);
    const ageString = ageParts.join(" ") || "YEARS";

    doc.text(`: ${ageString} / ${gender}`, patientNameTextWidth, 56);


    //doc.text(`: ${age.year} YEARS / ${gender}`, patientNameTextWidth, 56);
    let ReportDateText = `REPORT DATE `;
    const reportDateTextWidth = doc.getTextWidth(ReportDateText) + 140;

    doc.text(`TEST DATE `, 140, 48);
    doc.text(`: ${testDate}`, reportDateTextWidth, 48)


    doc.text(`REPORT DATE `, 140, 56);
    doc.text(`: ${reportDate}`, reportDateTextWidth, 56)


    doc.text(`ADDRESS`, 140, 64);
    doc.text(`: ${address.toUpperCase()}`, reportDateTextWidth, 64)


    doc.text(`REF. BY`, 15, 64);
    doc.text(`: ${refBy.toUpperCase()}`, patientNameTextWidth, 64)



    //Thanks for referal line

    let y = 75;
    doc.setFont("Cambria", "italic").setFontSize(12);
    doc.text("THANKS FOR REFERAL", 105, 73, { align: "center" });


    // Full Boundary
    // doc.rect(15, 73, 205, 205);

    //investigation , value, range  and unit boundary
    doc.rect(10, 73.5, 198, 10);
    doc.line(10, 83.5, 10, 278);


    // //investigation and value
    // doc.setTextColor(0, 0, 0).setFontSize(11).setFont("times", "bold");
    // doc.text("INVESTIGATIONS", 22, 75);
    // doc.text("VALUE", 95, 75);
    // doc.text("REF. RANGE", 135, 75);
    // doc.text("UNIT", 185, 75, { align: "right" });

    // Investigation and Value header
    doc.setTextColor(0, 0, 0).setFontSize(12).setFont("Cambria", "normal");

    if (selectedReports.length === 1 && selectedReports[0] === "MP card") {
        // Only MP card selected
        doc.text("INVESTIGATIONS", 17, 80);
        doc.text("RESULT", 85, 80);
        y = 79
    }
    else if (selectedReports.includes("CBC")) {
        // CBC 
        doc.text("INVESTIGATIONS", 13, 80);
        doc.text("VALUE", 85, 80);
        doc.text("REF. RANGE", 130, 80);
        doc.text("UNIT", 185, 80, { align: "right" });
        y = 79
    }
    else if (selectedReports.includes("URINE-CULTURE & SENSITIVITY")) {
        doc.setFont("cambria", "bold").setFontSize(16);
        doc.text("-: URINE CULTURE & SENSITIVITY REPORT :-", 45, 80);
        doc.setTextColor(0, 0, 0).setFontSize(12).setFont("Cambria", "normal");
    }
    else {
        // CBC or multiple reports
        doc.text("TEST DESCRIPTION", 17, 80);
        doc.text("RESULT", 85, 80);
        doc.text("REF. RANGE", 130, 80);
        doc.text("UNIT", 185, 80, { align: "right" });
        y = 79
    }



    // CBC Section
    if (selectedReports.includes("CBC")) {
        y = CBC_Design(doc, cbcData, y)
    }


    if (selectedReports.includes("HB")) {
        y = HB_Report_Design(doc, HB_value, y);
    }

    if (selectedReports.includes("S BILLIRUBIN")) {
        y = S_BILLIRUBIN_Design(doc, y, S_BILLIRUBIN_Data);
    }

    if (selectedReports.includes("S BILLIRUBIN (TOTAL)")) {
        y = S_BILLIRUBIN_TOTAL_Design(doc, y, S_BILLIRUBIN_TOTAL_VAL);
    }

    if (selectedReports.includes("S BILLIRUBIN (direct)")) {
        y = S_BILLIRUBIN_DIRECT_Design(doc, y, S_BILLIRUBIN_DIRECT_VAL);
    }

    if (selectedReports.includes("S BILLIRUBIN (indirect)")) {
        y = S_BILLIRUBIN_INDIRECT_Design(doc, y, S_BILLIRUBIN_INDIRECT_VAL);
    }


    if (selectedReports.includes("SGPT")) {
        y = Sgpt_Design(doc, y, sgptVal);
    }

    if (selectedReports.includes("SGOT")) {
        y = Sgot_Design(doc, y, sgotVal);
    }

    if (selectedReports.includes("S ALKALINE PHOSHATE")) {
        console.log('hety');

        y = S_ALKALINE_PHOSHATE_Design(doc, y, S_ALKALINE_PHOSHATE_VAL);
    }

    if (selectedReports.includes("TOTAL PROTEIN")) {
        console.log('hey there');

        y = TotalProtein_Design(doc, y, totalProteinVal)
    }

    if (selectedReports.includes("ALBUMIN")) {
        y = Albumin_Design(doc, y, albuminVal);
    }

    if (selectedReports.includes("GLOBULIN")) {
        y = Globulin_Design(doc, y, globulinVal);
    }

    if (selectedReports.includes("ALB/GLOBULIN RATIO")) {
        y = Alb_globulin_ratio_Design(doc, y, alb_globulin_ratioVal);
    }

    if (selectedReports.includes("S. CREATININE")) {
        y = ScreatnineVal_Design(doc, y, screatnineVal);
    }

    if (selectedReports.includes("S. UREA")) {
        y = sUrea_Design(doc, y, sUreaVal);
    }

    if (selectedReports.includes("S.URIC ACID")) {
        y = sUricAcid_Design(doc, y, sUricAcidVal);
    }

    if (selectedReports.includes("S. CHLORIDE")) {
        y = sChloride_Design(doc, y, sChlorideVal);
    }

    if (selectedReports.includes("S . POTASSIUM")) {
        y = sPotassium_Design(doc, y, sPotassiumVal);
    }

    if (selectedReports.includes("S . SODIUM")) {
        y = sSodium_Design(doc, y, sSodiumVal);
    }

    if (selectedReports.includes("S. CALCIUM")) {
        y = sCalcium_Design(doc, y, sCalciumVal);
    }


    if (selectedReports.includes("MP card")) {
        y = MP_card_Design(doc, mpCardResult, y)
    }


    if (selectedReports.includes("Widal")) {
        y = Widal_Design(doc, y, widalData);
    }
    
    if (customTests && customTests.length > 0) {
        y = CustomTestReport(doc, y, customTests);
    }


    if (selectedReports.includes("LFT")) {
        y = LFT_Design(doc, y, LFT_Data);
    }

    if (selectedReports.includes("KFT")) {
        y = KFT_Design(doc, y, KFT_Data);
    }

    if (selectedReports.includes("URINE-CULTURE & SENSITIVITY")) {
        y = urineCultureReport(doc, y, cultureType, sensitivityData);
    }





    //End of result line after all data
    y += 12;
    doc.setFont("Cambria", "italic").setTextColor(0, 0, 0).setFontSize(11);
    doc.text("…................ .END OF REPORT……………", 105, y, { align: "center" });

    // Footer
    // Footer
    y = 276;
    doc.setTextColor(0, 0, 0).setFont("Cambria", "italic").setFontSize(12);
    doc.text("FULLY AUTOMATED LAB", 105, y, { align: "center" });

    doc.line(10, y + 2, 225, y + 2)

    //doc.addImage(`data:image/png;base64,${signture}`, "PNG", 150, y - 20, 55, 18);

    doc.setTextColor(0, 0, 0).setFont("Cambria", "italic").setFontSize(10);
    doc.text("Service Incharge", 160, y);


    y += 6;
    doc.setFont("Cambria", "italic").setTextColor(0, 0, 0).setFontSize(10);;
    doc.text("- : NOT VALID FOR MEDICO-LEGAL PURPOSE :-", 105, y, { align: "center" });

    y += 6;
    doc.setTextColor(0, 0, 0).setFont("Cambria", "normal");
    doc.text('"THE ENDLESS CARE BEGINS HEREWITH IMPROVED QUALITY"', 105, y, { align: "center" });

    // Preview
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setShowPreview(true);
};


export { generatePdf };