import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";
import { HB_RANGE } from "../../utils/rangeForTests";

export function HB_Report_Design(doc, HB_value, y) {
    y += 12;
    let arrowVal = false;
    [...HB_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        let hbSpitVal = HB_value.split("/")
        HB_value = `${hbSpitVal[0]}gm/${hbSpitVal[1]}`;

        doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0,0,0);
        doc.text(field.key, 17, y);
        doc.setFont("Cambria", "normal");
        let HB_valueOfPercent = '';
        if (HB_value) {
            HB_valueOfPercent = HB_value.split("/")[1];
            
        }   
        let x = 85;
        arrowVal = getArrowValue(HB_valueOfPercent, field.range, doc, 80, y - 4);
        
        
        getValOrDash(field.key, HB_value, doc, x, y, arrowVal);
        doc.setFont("Cambria", "normal")
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
    })
    return y-2;
}