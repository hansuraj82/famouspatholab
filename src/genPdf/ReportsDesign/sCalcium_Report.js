import { S_CALCIUM_RANGE } from "../../utils/rangeForTests";
import { getFontBoldValue, getValOrDash } from "../../utils/utilitiesFunc";

export function sCalcium_Design(doc, y, sCalciumVal) {


    y += 12;
    let arrowVal = false;
    [...S_CALCIUM_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getFontBoldValue(sCalciumVal, field.range, doc, 81, y - 3.5);
        getValOrDash(field, sCalciumVal, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}