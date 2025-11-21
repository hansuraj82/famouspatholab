import { getFontBoldValue, getValOrDash } from "../../utils/utilitiesFunc";

export function CustomTestReport(doc, y, tests) {
    y += 12;
    let valueBold = false;
    
    
    tests.forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.test.toUpperCase(), 17, y);
        console.log(field.value);
        valueBold = getFontBoldValue(field.value, field.refRange, doc, 81, y - 3.5);
        console.log(valueBold);
        
        getValOrDash(field, field.value, doc, 85, y, valueBold)
        doc.text(field.refRange, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    });

    return y - 12;
}