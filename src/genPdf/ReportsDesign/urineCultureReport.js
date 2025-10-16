// // URINE-CULTURE OPTIONS
const antibioticsForCulture = [
  "CIPROFLOXACIN", "AMIKACIN", "AMPICILIN", "NORFLOXACIN", "CEFADROXIL",
  "CEFOTAXIME", "ERYTHROMYCIN", "CEFEXIME", "CHLORAMPHENICOL", "CEFTRIAXONE",
  "PRULIFLOXACIN", "CEPHALEXIN", "CEFAZOLINE", "PENICILIN", "CLOXACILLIN",
  // right column
  "GENTAMYCIN", "GARAMYCIN", "AMOXICILLIN", "NITROFURANTION", "MOXIFLOXACIN",
  "AZITHROMYCIN", "SPAR-FLOXACIN", "P-FLOXACIN", "OFLOXACIN",
  "GATIFLOXACIN", "LIVOFLOXACIN", "LOMFLOXACIN"
];

export function urineCultureReport(doc, y, cultureType, sensitivityData) {
  y += 12;

  // Header boxes
  doc.rect(10, 83.5, 198, 10);
  doc.rect(10, 93.5, 198, 10);

  // Headings
  doc.setFont("Cambria", "bold").setFontSize(14);
  doc.text("ROUTINE CULTURE :-", 15, 90);
  const cultureX = doc.getTextWidth("ROUTINE CULTURE :-") + 18;
  doc.text(cultureType, cultureX, 90);
  doc.text("SENSITIVE TO :-", 15, 100);

  // Antibiotic list
  doc.setFont("Cambria", "bold").setFontSize(11);
  y += 22;

  const baseY = y; // Remember starting Y for right column

  antibioticsForCulture.forEach((field, index) => {
    const isRightColumn = index > 14;
    const colX = isRightColumn ? 100 : 14;
    const colY = isRightColumn ? baseY + (index - 15) * 11 : y;

    // Antibiotic name
    doc.setTextColor(0, 0, 0);
    doc.text(field, colX, colY);

// Handle sensitivity value → "(+)" format
    const val = sensitivityData[field];
    if (val && !isNaN(val) && Number(val) > 0 && cultureType == 'E-COLI') {
      const plusCount = Number(val);
      const plusSigns = "+".repeat(plusCount);

      const textX = colX + doc.getTextWidth(field) + 2;

      // Draw opening bracket
      doc.setTextColor(0, 0, 0);
      doc.text("(", textX, colY);

      // Draw red plus signs inside
      const plusX = textX + doc.getTextWidth("(");
      doc.setTextColor(255, 0, 0);
      doc.text(plusSigns, plusX, colY);

      // Draw closing bracket
      const closeX = plusX + doc.getTextWidth(plusSigns);
      doc.setTextColor(0, 0, 0);
      doc.text(")", closeX, colY);
    }

    // Only increment y for left column entries
    if (!isRightColumn) y += 11;
  });

  return y - 16; // return adjusted Y for next section
}
