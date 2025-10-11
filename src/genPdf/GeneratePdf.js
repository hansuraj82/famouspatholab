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
import { S_BILLIRUBIN_Design } from "./ReportsDesign/S_BILLIRUBIN_Report.js";


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
    S_BILLIRUBIN_Data
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


    doc.text(`TEST DATE : ${new Date().toLocaleDateString("en-GB")}`, 140, 48);

    let testDateText = `TEST DATE `;
    const testDateTextWidth = doc.getTextWidth(testDateText) + 140;

    

    doc.text(`ADDRESS`, 140, 56);
    doc.text(`: ${address.toUpperCase()}`, testDateTextWidth, 56)


    doc.text(`REF. BY`, 15, 64);
    doc.text(`: ${refBy.toUpperCase()}`, patientNameTextWidth, 64)

    doc.text(`S.NO `, 140, 64);
    doc.text(`: `, testDateTextWidth, 64)

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

    // Extra Sections
    // const addSection = (title, data, storedTotalDataAsRange) => {
    //     y += 12;
    //     storedTotalDataAsRange.forEach((field) => {
    //         doc.setFont("times", "bold").setFontSize(12);
    //         doc.text(title, 22, y);
    //         doc.setFont("times", "bold").setFontSize(12).setTextColor(255, 0, 0);
    //         doc.text(`${data[title]} `, 95, y);
    //     })

    // };
    if (selectedReports.includes("MP card")) {
        y = MP_card_Design(doc, mpCardResult, y)
    }

    if (selectedReports.includes("HB")) {
        y = HB_Report_Design(doc, HB_value, y);
    }


    if (selectedReports.includes("LFT")) {
        y = LFT_Design(doc, y, LFT_Data);
    }

    if (selectedReports.includes("KFT")) {
        y = KFT_Design(doc, y, KFT_Data);
    }

    if (selectedReports.includes("Widal")) {
        y = Widal_Design(doc, y, widalData);
    }

    if(selectedReports.includes("S BILLIRUBIN")) {
        y = S_BILLIRUBIN_Design(doc,y,S_BILLIRUBIN_Data);
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

    doc.addImage(`data:image/png;base64,${signture}`, "PNG", 150, y - 20, 55, 18);

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