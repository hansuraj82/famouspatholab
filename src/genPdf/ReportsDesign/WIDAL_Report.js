import { WIDAL_RANGE } from "../../utils/rangeForTests";

export function Widal_Design(doc, y, widalData) {

    y += 12;
    doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
    doc.text("", 10, y);
    doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0, 0, 0);
    doc.text("WIDAL:-", 17, y);
    doc.text(WIDAL_RANGE[0].range, 130, y);
    y += 12;

    ["S- TYPHI “O”", "S- TYPHI “H”", "S- TYPHI “AH”", "S- TYPHI “BH”"].forEach((field) => {

        doc.text(field, 25, y);
        if (!widalData[field]?.result || !widalData[field]?.titre) {
            doc.text(`-- IN -:- DILUTION`, 80, y, { align: "left" });
        }
        else {
            doc.text(`${widalData[field].result} IN 1:${widalData[field].titre} DILUTION`, 80, y, { align: "left" });
        }

        y += 12;
    })
    return y - 12;
}