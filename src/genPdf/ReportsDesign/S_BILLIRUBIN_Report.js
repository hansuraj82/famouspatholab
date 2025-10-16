import { S_BILLIRUBIN_RANGE } from "../../utils/rangeForTests";
import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";

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
        arrowVal = getArrowValue(S_BILLIRUBIN_Data[field.key], field.range, doc, 81, y - 3.5);
        getValOrDash(field, S_BILLIRUBIN_Data[field.key], doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 12;
}