import { getArrowValue, getValOrDash } from "../../utils/utilitiesFunc";

export function CustomTestReport(doc, y, tests) {
    y += 12;

    tests.forEach((field) => {
        let arrowVal = false; // default
        let x = 90;

        // 🔹 ICON
        doc.setFont("Wingdings", "normal")
           .setFontSize(14)
           .setTextColor(255, 0, 0);
        doc.text("", 10, y);

        // 🔹 TEST NAME
        doc.setFont("Cambria", "normal")
           .setFontSize(11)
           .setTextColor(0, 0, 0);
        doc.text(field.test.toUpperCase(), 17, y);

        // 🔹 POSITIVE / NEGATIVE special case
        if (typeof field.value === "string" &&
            (field.value.toUpperCase() === "POSITIVE" || field.value.toUpperCase() === "NEGATIVE")) {

            arrowVal = field.value.toUpperCase() === "POSITIVE";  
            // POSITIVE → true   , NEGATIVE → false
            getValOrDash(field, field.value, doc, x-5, y, arrowVal);

        } else {
            // 🔹 Numeric case → use arrow logic
            arrowVal = getArrowValue(field.value, field.refRange, doc, x-10, y - 3.5);
            getValOrDash(field, field.value, doc, x-5, y, arrowVal);
        }
        
        // 🔹 REF RANGE + UNIT
        doc.text(field.refRange, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });

        y += 10;
    });

    return y - 12;
}
