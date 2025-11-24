import { HigherArrow, LowerArrow } from "./Base64File/Logo";
import { CBC_MAIN_FOR_MAN, CBC_MAIN_FOR_WOMAN, CBC_MAIN_FOR_CHILD, CBC_MAIN_FOR_BABY, S_URIC_ACID_RANGE, S_URIC_ACID_RANGE_FOR_MALE } from "./rangeForTests";

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

export const getFontBoldValue = (val, range, doc, x, y) => {
    console.log('val is ', val);
    if (!val || !range.includes("-")) {
        let capitalVal = val.toUpperCase();
        if (capitalVal == 'POSITIVE') return true;

        return false;
    }



    const [low, high] = range.split("-").map(n => parseFloat(n.trim()));
    const num = parseFloat(val);

    if (isNaN(num)) return false;
    if (num < low) return true;
    if (num > high) return true;
    return false;
};

export function getValOrDash(field, val, doc, x, y, arrowVal) {
    console.log(val);

    if (!val || val == ' / %') {
        doc.text("-", x, y)
    }
    else {
        console.log(arrowVal);

        if (arrowVal) {
            doc.setFont("Cambria", "bold");
            doc.text(`${val}`, x, y);
            doc.setFont("Cambria", "normal");
        }
        else doc.text(`${val}`, x, y);

    }

}
//FUNCTION FOR CBC RANGE CHANGE AS PER THE AGE AND GENDER

export function getCBCRange(age, gender) {

    // AGE in DAYS only
    if (!age.year && !age.month && age.day) return CBC_MAIN_FOR_BABY;


    // AGE in MONTHS only
    if (!age.year && age.month) return CBC_MAIN_FOR_CHILD;


    // AGE in YEARS
    if (age.year) {

        if (gender === "M") return CBC_MAIN_FOR_MAN;

        if (gender === "F") return CBC_MAIN_FOR_WOMAN;

    }

    // Default fallback (if anything is missing)
    return CBC_MAIN_FOR_MAN;
}


export function getSuricAcidRange(gender) {
    if (gender == 'F') return S_URIC_ACID_RANGE;
    if (gender == 'M') return S_URIC_ACID_RANGE_FOR_MALE;
    //default range
    return S_URIC_ACID_RANGE_FOR_MALE; 
}
