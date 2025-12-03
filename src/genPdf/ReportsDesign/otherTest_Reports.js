import { BLOOD_SUGAR_F_RANGE, BLOOD_SUGAR_PP_RANGE, BLOOD_SUGAR_R_RANGE, BT_TIME_RANGE, CRPIMMUN_RANGE, CT_TIME_RANGE, ESR1_RANGE, ESR2_RANGE, ESR_Average_RANGE, ESR_RANGE, S_CHLORI_RANGE, S_CHOLESTEROL_RANGE, WBC_COUNT_RANGE } from "../../utils/rangeForTests";
import { getArrowValue, getFontBoldValue, getValOrDash } from "../../utils/utilitiesFunc";

export function ESR_Design(doc, y, ESR_VAL) {
    y += 12;
    let arrowVal = false;
    [...ESR_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(ESR_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, ESR_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function ESR1_Design(doc, y, ESR1_VAL) {
    y += 12;
    let arrowVal = false;
    [...ESR1_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(ESR1_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, ESR1_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function ESR2_Design(doc, y, ESR2_VAL) {
    y += 12;
    let arrowVal = false;
    [...ESR2_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(ESR2_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, ESR2_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function ESR_Average_Design(doc, y, ESR_Average_VAL) {
    y += 12;
    let arrowVal = false;
    [...ESR_Average_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(ESR_Average_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, ESR_Average_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function BLOOD_SUGAR_F_Design(doc, y, BLOOD_SUGAR_F_VAL) {
    y += 12;
    let arrowVal = false;
    [...BLOOD_SUGAR_F_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(BLOOD_SUGAR_F_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, BLOOD_SUGAR_F_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function BLOOD_SUGAR_R_Design(doc, y, BLOOD_SUGAR_R_VAL) {
    y += 12;
    let arrowVal = false;
    [...BLOOD_SUGAR_R_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(BLOOD_SUGAR_R_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, BLOOD_SUGAR_R_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function BLOOD_SUGAR_PP_Design(doc, y, BLOOD_SUGAR_PP_VAL) {
    y += 12;
    let arrowVal = false;
    [...BLOOD_SUGAR_PP_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(BLOOD_SUGAR_PP_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, BLOOD_SUGAR_PP_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function S_CHOLESTEROL_Design(doc, y, S_CHOLESTEROL_VAL) {
    y += 12;
    let arrowVal = false;
    [...S_CHOLESTEROL_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(S_CHOLESTEROL_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, S_CHOLESTEROL_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function S_CHLORI_Design(doc, y, S_CHLORI_VAL) {
    y += 12;
    let arrowVal = false;
    [...S_CHLORI_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(S_CHLORI_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, S_CHLORI_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function CRPIMMUN_Design(doc, y, CRPIMMUN_VAL) {
    y += 12;
    let arrowVal = false;
    [...CRPIMMUN_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(CRPIMMUN_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, CRPIMMUN_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function BT_TIME_Design(doc, y, BT_TIME_VAL) {
    y += 12;
    let arrowVal = false;
    [...BT_TIME_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(BT_TIME_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, BT_TIME_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

export function CT_TIME_Design(doc, y, CT_TIME_VAL) {
    y += 12;
    let arrowVal = false;
    [...CT_TIME_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(CT_TIME_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, CT_TIME_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}


export function WBC_COUNT_Design(doc, y, WBC_COUNT_VAL) {
    y += 12;
    let arrowVal = false;
    [...WBC_COUNT_RANGE].forEach((field) => {
        doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255, 0, 0);
        doc.text("", 10, y);
        doc.setFontSize(11).setTextColor(0, 0, 0);
        doc.setFont("Cambria", "normal")
        doc.text(field.key, 17, y);

        arrowVal = getArrowValue(WBC_COUNT_VAL, field.range, doc, 80, y - 3.5);
        getValOrDash(field, WBC_COUNT_VAL, doc, 85, y, arrowVal)
        doc.text(field.range, 130, y);
        doc.text(field.unit, 175, y, { align: "left" });
        y += 10;
    })
    return y - 12;
}

