import { getArrowValue, getCBCRange, getValOrDash } from "../../utils/utilitiesFunc";
import { CBC_MAIN, DIFFERENTIAL_WBC } from "../../utils/rangeForTests";




export function CBC_Design(doc, cbcData, y, age, gender) {
    const Selected_CBC_Range = getCBCRange(age, gender);

    y += 12;
    doc.setFont("Cambria", "bold").setFontSize(12).setTextColor(0, 0, 0);
    doc.text("HAEMATOLOGY", 13, y);
    let HAEMATOLOGY_TEXT = 'HAEMATOLOGY';
    let HAEMATOLOGY_TEXT_WIDTH = doc.getTextWidth(HAEMATOLOGY_TEXT);
    doc.line(13, y + 1, 13 + HAEMATOLOGY_TEXT_WIDTH, y + 1);

    y += 7;
    doc.text("C B C (COMPLETE BLOOD COUNT)", 13, y);
    y += 7;


    doc.setFont("Cambria", "normal").setFontSize(10);
    let arrowVal = false;
    Selected_CBC_Range.forEach((field) => {
        doc.text(field.key, 13, y);
        if (field.key === "HEMOGLOBIN") {
            let hemoValue = '';
            if (cbcData[field.key]?.raw) {
                hemoValue = `${cbcData[field.key]?.raw} / ${cbcData[field.key]?.percent}%`
            }


            arrowVal = getArrowValue(cbcData[field.key]?.raw, field.range, doc, 85, y - 3.5);
            getValOrDash(field.key, hemoValue, doc, 90, y, arrowVal);
        }
        else {
            arrowVal = getArrowValue(cbcData[field.key], field.range, doc, 85, y - 3.5);
            getValOrDash(field.key, cbcData[field.key], doc, 90, y, arrowVal)
        }

        doc.text(field.range, 132, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;
    });

    y += 4;
    doc.setFont("Cambria", "bold").setFontSize(12);
    doc.text("DIFFERENTIAL COUNT WBC", 13, y);

    y += 10;
    doc.setFont("Cambria", "normal").setFontSize(10);
    DIFFERENTIAL_WBC.forEach((field) => {
        doc.text(field.key, 13, y);
        arrowVal = getArrowValue(cbcData[field.key], field.range, doc, 85, y - 3.5);

        getValOrDash(field.key, cbcData[field.key], doc, 90, y, arrowVal)
        doc.text(field.range, 132, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 8;

    });
    return y - 8;
}