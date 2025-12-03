import { ALB_GLOBULIN_RATIO_RANGE } from "../../utils/rangeForTests";
import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";

export function Alb_globulin_ratio_Design(doc, y, alb_globulin_ratioVal) {


    y += 12;
    let arrowVal = false;
    [...ALB_GLOBULIN_RATIO_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(alb_globulin_ratioVal, field.range, doc, 80, y - 3.5);
        getValOrDash(field, alb_globulin_ratioVal, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}