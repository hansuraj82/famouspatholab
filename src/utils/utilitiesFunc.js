import { HigherArrow, LowerArrow } from "./Base64File/Logo";

function lowerVal(doc, x, y) {
    doc.addImage(`data:image/png;base64,${LowerArrow}`, "PNG", x, y, 2, 5);
    return true;
}

function higherVal(doc, x, y) {
    doc.addImage(`data:image/png;base64,${HigherArrow}`, "PNG", x, y, 2, 5);
    return true;
}

export const getArrowValue = (val, range, doc, x, y) => {

    if (!val || !range.includes("-")) return val || "-";

    const [low, high] = range.split("-").map(n => parseFloat(n.trim()));
    const num = parseFloat(val);

    if (isNaN(num)) return val; // not a number, just return original

    if (num < low) return lowerVal(doc, x, y);
    if (num > high) return higherVal(doc, x, y);
    return false;
};

export function getValOrDash(field, val, doc, x, y,arrowVal) {
    if (!val || val == ' / %') {
        doc.text("-", x, y)
    }
    else {
        if(arrowVal) {
            doc.setFont("Cambria", "bold");
            doc.text(`${val}`, x, y);
            doc.setFont("Cambria", "normal");
        }
        else doc.text(`${val}`, x, y);
        
    }

}
