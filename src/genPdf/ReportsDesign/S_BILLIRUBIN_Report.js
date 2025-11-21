import { S_BILLIRUBIN_DIRECT_RANGE, S_BILLIRUBIN_INDIRECT_RANGE, S_BILLIRUBIN_RANGE, S_BILLIRUBIN_TOTAL_RANGE } from "../../utils/rangeForTests";
import { getFontBoldValue, getValOrDash } from "../../utils/utilitiesFunc";

export function S_BILLIRUBIN_Design(doc, y, S_BILLIRUBIN_Data) {
    y += 12;
    doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
    doc.text("", 10, y);

    doc.setFont("Cambria", "normal").setFontSize(16).setTextColor(0, 0, 0);
    doc.text("S BILLIRUBIN", 17, y);
    y += 10;
    let arrowVal = false;
    doc.setFont("Cambria", "bold").setFontSize(11);
    [...S_BILLIRUBIN_RANGE].forEach((field) => {
        doc.text("•", 11, y)
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);
        arrowVal = getFontBoldValue(S_BILLIRUBIN_Data[field.key], field.range, doc, 81, y - 3.5);
        getValOrDash(field, S_BILLIRUBIN_Data[field.key], doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 12;
}



export function S_BILLIRUBIN_TOTAL_Design(doc, y, S_BILLIRUBIN_TOTAL_VAL) {


    y += 12;
    let arrowVal = false;
    [...S_BILLIRUBIN_TOTAL_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getFontBoldValue(S_BILLIRUBIN_TOTAL_VAL, field.range, doc, 81, y - 3.5);
        getValOrDash(field, S_BILLIRUBIN_TOTAL_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function S_BILLIRUBIN_DIRECT_Design(doc, y, S_BILLIRUBIN_DIRECT_VAL) {


    y += 12;
    let arrowVal = false;
    [...S_BILLIRUBIN_DIRECT_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getFontBoldValue(S_BILLIRUBIN_DIRECT_VAL, field.range, doc, 81, y - 3.5);
        getValOrDash(field, S_BILLIRUBIN_DIRECT_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function S_BILLIRUBIN_INDIRECT_Design(doc, y, S_BILLIRUBIN_INDIRECT_VAL,) {


    y += 12;
    let arrowVal = false;
    [...S_BILLIRUBIN_INDIRECT_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getFontBoldValue(S_BILLIRUBIN_INDIRECT_VAL, field.range, doc, 81, y - 3.5);
        getValOrDash(field, S_BILLIRUBIN_INDIRECT_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}