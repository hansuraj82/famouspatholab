import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";
import { ALB_GLOBULIN_RATIO_RANGE, ALBUMIN_RANGE, GLOBULIN_RANGE, S_ALKALINE_PHOSPHATE_RANGE, S_BILLIRUBIN_RANGE, SGOT_RANGE, SGPT_RANGE, TOTAL_PROTEIN_RANGE } from "../../utils/rangeForTests";

export function LFT_Design(doc, y, LFT_Data) {
    y += 12;
    doc.setFont("Cambria", "normal").setFontSize(16).setTextColor(0, 0, 0);
    doc.text("LIVER FUNCTION TEST (L F T):-", 13, y);
    y += 10;
    doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
    doc.text("", 13, y);

    doc.setFont("Cambria", "normal").setFontSize(16).setTextColor(0, 0, 0);
    doc.text("S BILLIRUBIN", 20, y);
    y += 10;

    let arrowVal = false;
    doc.setFont("Cambria", "bold").setFontSize(11);
    [...S_BILLIRUBIN_RANGE, ...SGPT_RANGE, ...SGOT_RANGE, ...S_ALKALINE_PHOSPHATE_RANGE, ...TOTAL_PROTEIN_RANGE, ...ALBUMIN_RANGE, ...GLOBULIN_RANGE, ...ALB_GLOBULIN_RATIO_RANGE].forEach((field, index) => {
        if (index == 0 || index == 1 || index == 2) {
            doc.text("•", 13, y)
            doc.setFont("Cambria", "normal")
        }
        else {
            doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
            doc.text("", 13, y);
            doc.setFont("Cambria", "normal").setFontSize(11).setTextColor(0, 0, 0);
        }

        doc.text(field.key, 20, y);
        arrowVal = getArrowValue(LFT_Data[field.key], field.range, doc, 85, y - 3.5);
        getValOrDash(field, LFT_Data[field.key], doc, 90, y, arrowVal)
        doc.text(field.range, 132, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 7;

}