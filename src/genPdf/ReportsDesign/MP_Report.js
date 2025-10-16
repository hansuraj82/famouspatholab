export function MP_card_Design(doc, mpCardResult, y) {
    y += 12;
    doc.setFont("Wingdings", "normal").setFontSize(14).setTextColor(255,0,0);
    doc.text("",10,y);

    doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0,0,0);
    doc.text("MALARIA PARASITE (CARD)", 17, y);

    if (mpCardResult) {
  const text = mpCardResult.trim();
  let x = 85; // your x position

  // ✅ Case 1: both PF & PV positive
  if (text.includes("P F") && text.includes("P V")) {
    // Draw "P F" in red
    doc.setFont("Cambria", "bold").setFontSize(12).setTextColor(255, 0, 0);
    doc.text("P F", x, y);
    x += doc.getTextWidth("P F ");

    // Draw "&" in black
    doc.setTextColor(0, 0, 0);
    doc.text("&", x, y);
    x += doc.getTextWidth("& ");

    // Draw "P V" in red
    doc.setTextColor(255, 0, 0);
    doc.text("P V", x, y);
    x += doc.getTextWidth("P V ");

    // Draw remaining text ("POSITIVE") in black
    doc.setTextColor(0, 0, 0);
    doc.text("POSITIVE", x, y);
  }

  // ✅ Case 2: single PF or PV positive
  else if (text.startsWith("P F") || text.startsWith("P V")) {
    const [marker1, marker2, ...rest] = text.split(" ");
    const firstPart = `${marker1} ${marker2}`;

    doc.setFont("Cambria", "bold").setFontSize(12).setTextColor(255, 0, 0);
    doc.text(firstPart, x, y);
    x += doc.getTextWidth(firstPart + " ");

    doc.setTextColor(0, 0, 0);
    doc.text(rest.join(" "), x, y);
  }

  // ✅ Case 3: default (like "NEGATIVE")
  else {
    doc.setFont("Cambria", "normal").setFontSize(12).setTextColor(0, 0, 0);
    doc.text(text, x, y);
  }
}
doc.setTextColor(0, 0, 0); // reset


    return y-2;
}
