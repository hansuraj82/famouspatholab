import { getValOrDash } from "../../utils/utilitiesFunc";

export function P_N_Design(doc, report, y, reportResult) {
    y += 12;

    doc.setFont("Wingdings", "normal")
        .setFontSize(14)
        .setTextColor(255, 0, 0);
    doc.text("", 10, y);

    doc.setFont("Cambria", "normal")
        .setFontSize(12)
        .setTextColor(0, 0, 0);
    doc.text(report, 17, y);

    if (reportResult) {
        const highlight = reportResult.toUpperCase() === "POSITIVE";
        getValOrDash(report, reportResult, doc, 85, y, highlight);
    }
    return y - 2;
}
