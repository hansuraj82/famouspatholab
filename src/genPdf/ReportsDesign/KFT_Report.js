import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";
import {
    S_CREATININE_RANGE,
    S_UREA_RANGE,
    S_URIC_ACID_RANGE,
    S_CHLORIDE_RANGE,
    S_POTASSIUM_RANGE,
    S_SODIUM_RANGE,
    S_CALCIUM_RANGE
} from "../../utils/rangeForTests";

export function KFT_Design(doc, y, KFT_Data) {
    y += 12;
    doc.setFont("Cambria", "normal").setFontSize(18).setTextColor(0, 0, 0);
    doc.text("KIDNEY FUNCTION TEST (K F T):-", 13, y);
    y += 10;

    let arrowVal = false;

    [
        ...S_CREATININE_RANGE,
        ...S_UREA_RANGE,
        ...S_URIC_ACID_RANGE,
        ...S_POTASSIUM_RANGE,
        ...S_SODIUM_RANGE,
        ...S_CALCIUM_RANGE
    ].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 13, y);
        doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0, 0, 0);
        doc.text(field.key, 20, y);
        arrowVal = getArrowValue(KFT_Data[field.key], field.range, doc, 85, y - 3.5);
        getValOrDash(field.key, KFT_Data[field.key], doc, 90, y, arrowVal)
        doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0, 0, 0);
        doc.text(field.range, 132, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });
    return y - 7;

}