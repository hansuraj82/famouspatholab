import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestForm from "./TestForm";
import { generatePdf } from "../genPdf/GeneratePdf";
import {
  //LFT RANGE
  ALB_GLOBULIN_RATIO_RANGE,
  ALBUMIN_RANGE,
  CBC_MAIN, DIFFERENTIAL_WBC,
  GLOBULIN_RANGE,
  HB_RANGE,
  S_ALKALINE_PHOSPHATE_RANGE,
  S_BILLIRUBIN_RANGE,
  SGOT_RANGE,
  SGPT_RANGE,
  TOTAL_PROTEIN_RANGE,
  //KFT RANGE
  S_CREATININE_RANGE,
  S_UREA_RANGE,
  S_URIC_ACID_RANGE,
  S_CHLORIDE_RANGE,
  S_POTASSIUM_RANGE,
  S_SODIUM_RANGE,
  S_CALCIUM_RANGE,
  S_BILLIRUBIN_TOTAL_RANGE,
  S_BILLIRUBIN_DIRECT_RANGE,
  S_BILLIRUBIN_INDIRECT_RANGE
} from "../utils/rangeForTests";





export default function ReportGenerator() {
  document.title = 'FAMOUS-PATHO-LAB | REPORTS'

  //if a user is logged in then this page is accessible otherwise you will be redirected to login page
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (!stored) {
      navigate("/login");
      return;
    }

    const { loggedIn, expiry } = JSON.parse(stored);
    const now = new Date().getTime();

    if (!loggedIn || now > expiry) {
      localStorage.removeItem("auth");
      navigate("/login");
    }
  }, [navigate]);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState({ year: "", month: "", day: "" });
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [refBy, setRefBy] = useState("");
  const [cbcData, setCbcData] = useState({});
  const [LFT_Data, setLFT_Data] = useState({});
  const [KFT_Data, setKFT_Data] = useState({});
  const [S_BILLIRUBIN_Data, setS_BILLIRUBIN_Data] = useState({})
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [mpCardResult, setMpCardResult] = useState("");

  const [widalData, setWidalData] = useState({});

  const [cultureType, setCultureType] = useState("");
  const [sensitivityData, setSensitivityData] = useState({});


  const [HB_Float_Value, set_HB_Float_Value] = useState("");
  const [HB_Percent_Value, set_HB_Percent_Value] = useState("");
  const [HB_value, setHB_value] = useState("");

  const [selectedReports, setSelectedReports] = useState([]);

  const [testDate, setTestDate] = useState("");
  const [reportDate, setReportDate] = useState("");

  const [S_BILLIRUBIN_TOTAL_VAL, SET_S_BILLIRUBIN_TOTAL_VAL] = useState("");
  const [S_BILLIRUBIN_DIRECT_VAL, SET_S_BILLIRUBIN_DIRECT_VAL] = useState("");
  const [S_BILLIRUBIN_INDIRECT_VAL, SET_S_BILLIRUBIN_INDIRECT_VAL] = useState("");
  const [sgptVal, setSgptVal] = useState("");
  const [sgotVal, setSgotVal] = useState("");
  const [S_ALKALINE_PHOSHATE_VAL, set_S_ALKALINE_PHOSHATE_VAL] = useState("");
  const [totalProteinVal, setTotalProteinVal] = useState("");
  const [albuminVal, setAlbuminVal] = useState("");
  const [globulinVal, setGlobulinVal] = useState("");
  const [alb_globulin_ratioVal, set_alb_globulin_ratioVal] = useState("");
  const [screatnineVal, setScreatnineVal] = useState("");
  const [sUreaVal, setSureaVal] = useState("");
  const [sUricAcidVal, setSuricAcidVal] = useState("");
  const [sChlorideVal, setSChlorideVal] = useState("");
  const [sPotassiumVal, setSPotassiumVal] = useState("");
  const [sSodiumVal, setSSodiumVal] = useState("");
  const [sCalciumVal, setSCalciumVal] = useState("");


  const [customTests, setCustomTests] = useState([]);

  const handleAddTest = (newTest) => {
    setCustomTests((prev) => [...prev, newTest]);
  };

  const handleRemoveTest = (index) => {
    setCustomTests(prev => prev.filter((_, i) => i !== index));
  };



  const [doctorList, setDoctorList] = useState([
    "DR R  KUMAR",
    "DR ABHIMANYU KUMAR",
    "DR C H C PRATAPPUR",
    "DR B K SAINIK",
    "DR NANDANI HERBAL HEALTH CARE",
    "DR SELF"
  ]);
  const [newDoctor, setNewDoctor] = useState("");


  //URINE-CULTURE OPTIONS
  const antibioticsForCulture = [
    "CIPROFLOXACIN",
    "AMIKACIN",
    "AMPICILIN",
    "NORFLOXACIN",
    "CEFADROXIL",
    "CEFOTAXIME",
    "ERYTHROMYCIN",
    "CEFEXIME",
    "CHLORAMPHENICOL",
    "CEFTRIAXONE",
    "PRULIFLOXACIN",
    "CEPHALEXIN",
    "CEFAZOLINE",
    "PENICILIN",
    "CLOXACILLIN",
    "GENTAMYCIN",
    "GARAMYCIN",
    "AMOXICILLIN",
    "NITROFURANTION",
    "MOXIFLOXACIN",
    "AZITHROMYCIN",
    "SPAR-FLOXACIN",
    "P-FLOXACIN",
    "OFLOXACIN",
    "GATIFLOXACIN",
    "LIVOFLOXACIN",
    "LOMFLOXACIN",
  ];

  //handle urine-culture report
  const handleValueChangeForCulture = (name, value) => {
    setSensitivityData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleCBCChange = (field, value) => {
    const updated = { ...cbcData, [field]: value };

    // 🩸 Handle Hemoglobin calculation
    if (field === "HEMOGLOBIN") {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        const calculated = Math.floor((numericValue * 100) / 14.6);
        updated[field] = { raw: numericValue, percent: calculated };
      } else {
        updated[field] = { raw: value, percent: "" };
      }
    }

    // 🧮 Handle automatic MONOCYTES + BASOPHILS calculation
    if (["NEUTROPHILLS", "LYMPHOCYTES", "ESONOPHILS"].includes(field)) {
      const n = Number(updated["NEUTROPHILLS"] || 0);
      const l = Number(updated["LYMPHOCYTES"] || 0);
      const e = Number(updated["ESONOPHILS"] || 0);

      if (!isNaN(n) && !isNaN(l) && !isNaN(e)) {
        const calcValue = 100 - (n + l + e);

        // prevent negative values
        const safeValue = calcValue >= 0 ? calcValue : 0;

        // ensure two digits (e.g., 5 → "05", 12 → "12")
        const formattedValue = safeValue.toString().padStart(2, "0");

        updated["MONOCYTES"] = formattedValue;
        updated["BASOPHILS"] = "00";
      }

    }

    // ✅ Finally update state
    setCbcData(updated);
  };

  const handleHbChange = (val) => {
    const num = Number(val);
    const percent = isNaN(num) ? "0" : Math.floor((num * 100) / 14.6);

    set_HB_Float_Value(val);
    set_HB_Percent_Value(`${percent}%`);
    setHB_value(`${val} / ${percent}%`);
  };




  const handleLFTChange = (field, value) => {
    // Clone existing data
    const updated = { ...LFT_Data, [field]: value };

    // Parse numeric values
    const totalProtein = Number(updated["TOTAL PROTEIN"] || 0);
    const albumin = Number(updated["ALBUMIN"] || 0);
    const sbillTotal = Number(updated["S BILLIRUBIN (TOTAL)"] || 0);
    const sbillDirect = Number(updated["S BILLIRUBIN (direct)"] || 0);

    // --- 1️⃣ Auto-calculate GLOBULIN ---
    if (!isNaN(totalProtein) && !isNaN(albumin)) {
      const globulin = Math.max(totalProtein - albumin, 0); // prevent negative
      let formattedGlobVal = "";

      if (Number.isInteger(globulin)) {
        // Integer values
        formattedGlobVal = globulin < 10 ? "0" + globulin : String(globulin);
      } else {
        // Decimal values
        formattedGlobVal = globulin.toFixed(2);
      }
      updated["GLOBULIN"] = formattedGlobVal;
    }

    // --- 2️⃣ Auto-calculate ALB/GLOBULIN RATIO ---
    const globulinVal = Number(updated["GLOBULIN"]);
    if (!isNaN(albumin) && globulinVal > 0) {
      const ratio = albumin / globulinVal;
      let formattedRatio = "";

      if (Number.isInteger(ratio)) {
        // Integer values
        formattedRatio = ratio < 10 ? "0" + ratio : String(ratio);
      } else {
        // Decimal values
        formattedRatio = ratio.toFixed(2);
      }

      updated["ALB/GLOBULIN RATIO"] = formattedRatio;

    } else {
      updated["ALB/GLOBULIN RATIO"] = "0";
    }

    if (!isNaN(sbillTotal) && !isNaN(sbillDirect)) {
      let sbillIndirectVal = Math.max(sbillTotal - sbillDirect, 0)
      let formattedIndirectVal = "";

      if (Number.isInteger(sbillIndirectVal)) {
        // Integer values
        formattedIndirectVal = sbillIndirectVal < 10 ? "0" + sbillIndirectVal : String(sbillIndirectVal);
      } else {
        // Decimal values
        formattedIndirectVal = sbillIndirectVal.toFixed(2);
      }

      updated["S BILLIRUBIN (indirect)"] = formattedIndirectVal;
    }

    // Update state once (React best practice)
    setLFT_Data(updated);
  };


  const handleKFTChange = (field, value) => {
    setKFT_Data({ ...KFT_Data, [field]: value });
  };


  const handleS_BILLIRUBIN_Change = (field, value) => {
    const updated = { ...S_BILLIRUBIN_Data, [field]: value };

    const sbillTotal = Number(updated["S BILLIRUBIN (TOTAL)"] || 0);
    const sbillDirect = Number(updated["S BILLIRUBIN (direct)"] || 0);

    if (!isNaN(sbillTotal) && !isNaN(sbillDirect)) {
      let sbillIndirectVal = Math.max(sbillTotal - sbillDirect, 0)
      let formattedIndirectVal = "";

      if (Number.isInteger(sbillIndirectVal)) {
        // Integer values
        formattedIndirectVal = sbillIndirectVal < 10 ? "0" + sbillIndirectVal : String(sbillIndirectVal);
      } else {
        // Decimal values
        formattedIndirectVal = sbillIndirectVal.toFixed(2);
      }

      updated["S BILLIRUBIN (indirect)"] = formattedIndirectVal;
    }
    setS_BILLIRUBIN_Data(updated)
  }





  const handleReportSelection = (report) => {
    setSelectedReports((prev) =>
      prev.includes(report)
        ? prev.filter((r) => r !== report)
        : [...prev, report]
    );
  };



  const handleAddDoctor = () => {
    if (newDoctor.trim()) {
      setDoctorList([...doctorList, newDoctor]);
      setRefBy(newDoctor);
      setNewDoctor("");
    }
  };



  //if cbc is selected then HB , kft , lft and widal should not be selected
  const isDisabled = (report, selectedReports) => {
    const isCBCSelected = selectedReports.includes("CBC");
    return report !== "CBC" && report !== "MP card" && isCBCSelected;
  };


  const handleGeneratePdf = async () => {
    const formattedDate = new Date().toLocaleDateString("en-GB");

    const finalTestDate = testDate ? new Date(testDate).toLocaleDateString("en-GB") : formattedDate;
    const finalReportDate = reportDate ? new Date(reportDate).toLocaleDateString("en-GB") : formattedDate;


    // ✅ Build the data object that you want to save
    const reportData = {
      patientName,
      age,
      gender,
      address,
      refBy,
      selectedReports,
      testDate: finalTestDate,
      reportDate: finalReportDate,
      createdAt: new Date().toISOString(), // optional timestamp
    };


    // ✅ Save JSON locally if Electron API is available
    if (window.electronAPI?.saveReport) {
      try {
        const res = await window.electronAPI.saveReport(reportData);
        console.log("✅ Report saved successfully:", res.filePath);
      } catch (err) {
        console.error("❌ Failed to save report:", err);
      }
    }

    generatePdf({
      patientName,
      age,
      gender,
      address,
      refBy,
      cbcData,
      selectedReports,
      setPdfUrl,
      setShowPreview,
      mpCardResult,
      HB_value,
      LFT_Data,
      KFT_Data,
      widalData,
      S_BILLIRUBIN_Data,
      S_BILLIRUBIN_TOTAL_VAL,
      S_BILLIRUBIN_DIRECT_VAL,
      S_BILLIRUBIN_INDIRECT_VAL,
      cultureType,
      sensitivityData,
      testDate: finalTestDate,
      reportDate: finalReportDate,
      sgptVal,
      sgotVal,
      S_ALKALINE_PHOSHATE_VAL,
      totalProteinVal,
      albuminVal,
      globulinVal,
      alb_globulin_ratioVal,
      screatnineVal,
      sUreaVal,
      sUricAcidVal,
      sChlorideVal,
      sPotassiumVal,
      sSodiumVal,
      sCalciumVal,
      customTests
    })
  }





  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl headColor font-bold text-center mb-6 text-blue-700">
            LAB REPORT
          </h1>

          {/* Patient Info */}
          {/* 🩺 Patient Information Section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center border-b pb-2">
              Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Patient Name</label>
                <input
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Gender</label>
                <select
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="UNKNOWN">Unknown</option>
                </select>
              </div>

              {/* Age */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Age</label>
                <div className="flex gap-2">
                  <input
                    className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
                    type="number"
                    min="0"
                    placeholder="Years"
                    value={age.year}
                    onChange={(e) =>
                      setAge({ ...age, year: e.target.value ? Number(e.target.value) : "" })
                    }
                  />
                  <input
                    className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="Months"
                    value={age.month}
                    onChange={(e) =>
                      setAge({ ...age, month: e.target.value ? Number(e.target.value) : "" })
                    }
                  />
                  <input
                    className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
                    type="number"
                    min="0"
                    max="30"
                    placeholder="Days"
                    value={age.day}
                    onChange={(e) =>
                      setAge({ ...age, day: e.target.value ? Number(e.target.value) : "" })
                    }
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Address</label>
                <input
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Test Date */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Test Date</label>
                <input
                  type="date"
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                />
              </div>

              {/* Report Date */}
              <div className="flex flex-col text-left">
                <label className="text-gray-700 font-medium mb-1">Report Date</label>
                <input
                  type="date"
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </div>

              {/* Doctor Selection */}
              <div className="flex flex-col text-left md:col-span-2">
                <label className="text-gray-700 font-medium mb-1">Referred By</label>
                <select
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  value={refBy}
                  onChange={(e) => setRefBy(e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctorList.map((doc, idx) => (
                    <option key={idx} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add New Doctor */}
              <div className="flex gap-2 md:col-span-2">
                <input
                  className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Add new doctor"
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                />
                <button
                  onClick={handleAddDoctor}
                  className="cursPointer greenBtn bg-green-500 text-white px-5 rounded hover:bg-green-600 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>


          {/* 🧾 Report Selection Section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center border-b pb-2">
              Select Reports
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "CBC",
                "HB",
                "Widal",
                "MP card",
                "KFT",
                "LFT",
                "S BILLIRUBIN",
                "S BILLIRUBIN (TOTAL)",
                "S BILLIRUBIN (direct)",
                "S BILLIRUBIN (indirect)",
                "SGPT",
                "SGOT",
                "S ALKALINE PHOSHATE",
                "TOTAL PROTEIN",
                "ALBUMIN",
                "GLOBULIN",
                "ALB/GLOBULIN RATIO",
                "S. CREATININE",
                "S. UREA",
                "S.URIC ACID",
                "S. CHLORIDE",
                "S . POTASSIUM",
                "S . SODIUM",
                "S. CALCIUM",
                "URINE-CULTURE & SENSITIVITY",
              ].map((r) => {
                const isSelected = selectedReports.includes(r);
                const disabled = isDisabled(r, selectedReports);

                return (
                  <label
                    key={r}
                    className={`flex items-center justify-between p-3 border rounded-lg shadow-sm cursor-pointer transition-all
            ${disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isSelected
                          ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold shadow-md"
                          : "hover:bg-blue-50 hover:shadow-md"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleReportSelection(r)}
                        disabled={disabled}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm md:text-base">{r}</span>
                    </div>

                    {isSelected && (
                      <span className="text-blue-600 text-sm font-medium">✓</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>


          {/* CBC Inputs only if selected */}
          {selectedReports.includes("CBC") && (
            <>
              <h2 className="font-semibold mb-2 text-gray-700">CBC Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  border p-3 rounded">
                {[...CBC_MAIN, ...DIFFERENTIAL_WBC].map((field) => (
                  <div key={field.key} className="flex flex-col">
                    <label htmlFor={field.key} className="text-sm font-medium text-gray-700 mb-1">{field.key} </label>
                    <input
                      type={field.key === "HEMOGLOBIN" ? "number" : "text"}
                      className="border p-2 rounded"
                      placeholder={`(${field.unit})`}
                      disabled={field.key === "MONOCYTES" || field.key === "BASOPHILS"}
                      id={field.key}
                      value={
                        field.key === "HEMOGLOBIN"
                          ? cbcData[field.key]?.raw || ""
                          : cbcData[field.key] || ""
                      }
                      onChange={(e) => handleCBCChange(field.key, e.target.value)}
                    />
                    {/* Display calculated percentage below */}
                    {field.key === "HEMOGLOBIN" && cbcData[field.key]?.percent && (
                      <span className="text-sm text-green-800 mt-1">
                        HEMOGLOBIN VALUE IS {cbcData[field.key].raw} / {cbcData[field.key].percent}%
                      </span>
                    )}
                  </div>
                ))}

              </div>
            </>
          )}

          {selectedReports.includes("MP card") && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-gray-700">M P Card Result</h2>
              <select
                className="border p-2 rounded w-full"
                value={mpCardResult}
                onChange={(e) => setMpCardResult(e.target.value)}
              >
                <option value="">Select Result</option>
                <option value="P F (POSITIVE) WEAK">P F (POSITIVE) WEAK</option>
                <option value="P F POSITIVE">P F POSITIVE</option>
                <option value="P V POSITIVE">P V POSITIVE</option>
                <option value="NEGATIVE">NEGATIVE</option>
                <option value="P F & P V POSITIVE">P F & P V POSITIVE</option>
              </select>
            </div>
          )}

          {/* Widal Test */}
          {selectedReports.includes("Widal") && (
            <div className="mb-4">
              <h2 className="font-semibold mb-2 text-gray-700">WIDAL TEST</h2>

              {/* Table Header */}
              <div className="grid grid-cols-3 gap-30 border p-3 rounded text-sm font-semibold bg-gray-100">
                <span>Test</span>
                <span>Result</span>
                <span>Titre</span>
              </div>

              {/* Table Rows */}
              {["S- TYPHI “O”", "S- TYPHI “H”", "S- TYPHI “AH”", "S- TYPHI “BH”"].map((test) => (
                <div
                  key={test}
                  className="grid grid-cols-3 gap-4 border-b p-2 items-center"
                >
                  {/* Column 1: Key */}
                  <span className="font-semibold">{test}</span>

                  {/* Column 2: Select */}
                  <select
                    className="border p-2 rounded"
                    value={widalData[test]?.result || ""}
                    onChange={(e) =>
                      setWidalData({
                        ...widalData,
                        [test]: { ...widalData[test], result: e.target.value },
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="+VE">+VE</option>
                    <option value="NEG">NEG</option>
                  </select>

                  {/* Column 3: Input (Titre) */}
                  <input
                    className="border p-2 rounded"
                    placeholder="40"
                    value={widalData[test]?.titre || ""}
                    onChange={(e) =>
                      setWidalData({
                        ...widalData,
                        [test]: { ...widalData[test], titre: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          )}



          {/* Hemoglobin line */}
          {selectedReports.includes("HB") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">HEMOGLOBIN VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded">
                {HB_RANGE.map(field => (
                  <input
                    key={field.key}
                    className="border p-2 rounded"
                    placeholder={`HEMOGLOBIN VALUE (${field.unit})`}
                    value={HB_Float_Value || ""}
                    onChange={(e) => handleHbChange(e.target.value)}
                  />
                ))}
                <input
                  className="border p-2 rounded"
                  placeholder="PERCENT VALUE"
                  value={HB_Percent_Value || ""}
                  disabled
                />
              </div>
            </div>
          )}



          {/* LFT TEST */}
          {selectedReports.includes("LFT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">LFT VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_RANGE, ...SGPT_RANGE, ...SGOT_RANGE, ...S_ALKALINE_PHOSPHATE_RANGE, ...TOTAL_PROTEIN_RANGE, ...ALBUMIN_RANGE, ...GLOBULIN_RANGE, ...ALB_GLOBULIN_RATIO_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={field.key} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit})`} value={LFT_Data[field.key] || ""}
                        onChange={(e) => handleLFTChange(field.key, e.target.value)} disabled={field.key === "GLOBULIN" || field.key === "ALB/GLOBULIN RATIO"} />
                    </div>))
                }
              </div>

            </div>
          )}

          {/* KFT TEST */}
          {selectedReports.includes("KFT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">KFT VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded">
                {
                  [
                    ...S_CREATININE_RANGE,
                    ...S_UREA_RANGE,
                    ...S_URIC_ACID_RANGE,
                    ...S_POTASSIUM_RANGE,
                    ...S_SODIUM_RANGE,
                    ...S_CALCIUM_RANGE
                  ].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input
                        key={field.key}
                        id={field.key}
                        className="border p-2 rounded"
                        placeholder={`(${field.unit})`}
                        value={KFT_Data?.[field.key] || ""}
                        onChange={(e) => handleKFTChange(field.key, e.target.value)}
                      />
                    </div>))
                }
              </div>
            </div>
          )}

          {/* S BILLIRUBIN TEST */}
          {selectedReports.includes("S BILLIRUBIN") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S BILLIRUBIN VALUES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key} `.split('(')[1]} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={S_BILLIRUBIN_Data[field.key] || ""}
                        onChange={(e) => handleS_BILLIRUBIN_Change(field.key, e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S BILLIRUBIN (TOTAL) TEST */}
          {selectedReports.includes("S BILLIRUBIN (TOTAL)") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S BILLIRUBIN (TOTAL) VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_TOTAL_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key} `.split('(')[1]} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={S_BILLIRUBIN_TOTAL_VAL || ""}
                        onChange={(e) => SET_S_BILLIRUBIN_TOTAL_VAL(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S BILLIRUBIN (DIRECT) TEST */}
          {selectedReports.includes("S BILLIRUBIN (direct)") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S BILLIRUBIN (direct) VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_DIRECT_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key} `.split('(')[1]} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={S_BILLIRUBIN_DIRECT_VAL || ""}
                        onChange={(e) => SET_S_BILLIRUBIN_DIRECT_VAL(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S BILLIRUBIN (INDIRECT) TEST */}
          {selectedReports.includes("S BILLIRUBIN (direct)") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S BILLIRUBIN (indirect) VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border p-3 rounded">
                {
                  [...S_BILLIRUBIN_INDIRECT_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key} `.split('(')[1]} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={S_BILLIRUBIN_INDIRECT_VAL || ""}
                        onChange={(e) => SET_S_BILLIRUBIN_INDIRECT_VAL(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}

          {/* sgpt test */}
          {selectedReports.includes("SGPT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">SGPT VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...SGPT_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sgptVal || ""}
                        onChange={(e) => setSgptVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}

          {/* sgot test */}
          {selectedReports.includes("SGOT") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">SGOT VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...SGOT_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sgotVal || ""}
                        onChange={(e) => setSgotVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S_ALKALINE_PHOSHATE test */}
          {selectedReports.includes("S ALKALINE PHOSHATE") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S ALKALINE PHOSHATE VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_ALKALINE_PHOSPHATE_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={S_ALKALINE_PHOSHATE_VAL || ""}
                        onChange={(e) => set_S_ALKALINE_PHOSHATE_VAL(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* totalProtein test */}
          {selectedReports.includes("TOTAL PROTEIN") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">TOTAL PROTEIN VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...TOTAL_PROTEIN_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={totalProteinVal || ""}
                        onChange={(e) => setTotalProteinVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* albumin test */}
          {selectedReports.includes("ALBUMIN") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">ALBUMIN VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...ALBUMIN_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={albuminVal || ""}
                        onChange={(e) => setAlbuminVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}

          {/* GLOBULIN test */}
          {selectedReports.includes("GLOBULIN") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">GLOBULIN VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...GLOBULIN_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={globulinVal || ""}
                        onChange={(e) => setGlobulinVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* ALB/GLOBULIN RATIO test */}
          {selectedReports.includes("ALB/GLOBULIN RATIO") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">ALB/GLOBULIN RATIO VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...ALB_GLOBULIN_RATIO_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={alb_globulin_ratioVal || ""}
                        onChange={(e) => set_alb_globulin_ratioVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S. CREATININE RATIO test */}
          {selectedReports.includes("S. CREATININE") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S. CREATININE VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_CREATININE_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={screatnineVal || ""}
                        onChange={(e) => setScreatnineVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S. UREA  test */}
          {selectedReports.includes("S. UREA") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S. UREA VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_UREA_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sUreaVal || ""}
                        onChange={(e) => setSureaVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S.URIC ACID test */}
          {selectedReports.includes("S.URIC ACID") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S.URIC ACID VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_URIC_ACID_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sUricAcidVal || ""}
                        onChange={(e) => setSuricAcidVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}



          {/* S. CHLORIDE test */}
          {selectedReports.includes("S. CHLORIDE") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S. CHLORIDE VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_CHLORIDE_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sChlorideVal || ""}
                        onChange={(e) => setSChlorideVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* S . POTASSIUM test */}
          {selectedReports.includes("S . POTASSIUM") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S . POTASSIUM VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_POTASSIUM_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sPotassiumVal || ""}
                        onChange={(e) => setSPotassiumVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/*S . SODIUM test */}
          {selectedReports.includes("S . SODIUM") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S . SODIUM VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_SODIUM_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sSodiumVal || ""}
                        onChange={(e) => setSSodiumVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/*S. CALCIUM test */}
          {selectedReports.includes("S. CALCIUM") && (
            <div>
              <h2 className="font-semibold mb-2 text-gray-700">S. CALCIUM VALUE</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-3 rounded">
                {
                  [...S_CALCIUM_RANGE].map(field => (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1" htmlFor={field.key}>{field.key}</label>
                      <input key={`${field.key}`} id={field.key} className="border p-2 rounded" placeholder={`(${field.unit}) `} value={sCalciumVal || ""}
                        onChange={(e) => setSCalciumVal(e.target.value)} />
                    </div>))
                }
              </div>

            </div>
          )}


          {/* URINE CULTURE TEST */}
          {selectedReports.includes("URINE-CULTURE & SENSITIVITY") && (
            <div className="p-4 max-w-2xl mx-auto border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-center">
                URINE CULTURE & SENSITIVITY
              </h2>

              {/* Culture Type Select */}
              <label className="block mb-2 font-medium">Routine Culture:</label>
              <select
                className="border p-2 rounded w-full mb-4"
                value={cultureType}
                onChange={(e) => setCultureType(e.target.value)}
              >
                <option value="">-- Select Culture Type --</option>
                <option value="NO GROWTH">NO GROWTH</option>
                <option value="E-COLI">E-COLI</option>
              </select>

              {/* Show input fields only if E-COLI is selected */}
              {cultureType === "E-COLI" && (
                <div className="grid grid-cols-2 gap-3">
                  {antibioticsForCulture.map((name) => (
                    <div key={name}>
                      <label className="block text-sm font-medium mb-1">{name}</label>
                      <input
                        type="number"
                        min={0}
                        className="border p-2 rounded w-full"
                        value={sensitivityData[name] || ""}
                        onChange={(e) => handleValueChangeForCulture(name, e.target.value)}
                        placeholder="++"
                      />
                    </div>
                  ))}
                </div>

              )}
            </div>
          )}

          <TestForm onAdd={handleAddTest} />

          {/* SHOW ADDED TESTS */}
          <div className="mt-6">
            {customTests.length > 0 && (
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                Custom Tests Added
              </h3>
            )}

            <div className="space-y-4">
              {customTests.map((test, index) => (
                <div
                  key={index}
                  className="
          p-4 rounded-xl border bg-white shadow-sm 
          hover:shadow-md transition-shadow
          flex flex-col sm:flex-row sm:items-center sm:justify-between
        "
                >
                  {/* LEFT SIDE */}
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-gray-800">{test.test}</p>

                    <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                      <span>
                        <span className="font-semibold">Value:</span> {test.value}
                      </span>
                      <span>
                        <span className="font-semibold">Range:</span> {test.refRange}
                      </span>
                      <span>
                        <span className="font-semibold">Unit:</span> {test.unit}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE (REMOVE BUTTON) */}
                  <button
                    onClick={() => handleRemoveTest(index)}
                    className=" cursPointer redBtn mt-3 sm:mt-0
                                flex items-center gap-1
                                px-4 py-2 rounded-lg
                                bg-red-500 text-white 
                                hover:bg-red-600 active:scale-95 
                                transition-all
          "
                  >
                    <span>Remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>



          {/* Button */}
          <button onClick={handleGeneratePdf} className="blueBtn cursPointer w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Generate Report (Preview)
          </button>
        </div>




        {/* Fullscreen Preview */}
        {showPreview && pdfUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-50">
            <div className="flex justify-between items-center bg-white p-4 shadow-md">
              <h2 className="text-lg font-bold text-gray-800">Report Preview</h2>

              <div className="flex gap-3">
                {/* ✅ Download Button */}
                {/* <a
                  href={pdfUrl}
                  download={`${patientName}-${address}-${selectedReports}Report`}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Download
                </a> */}

                {/* ❌ Close Button */}
                <button
                  onClick={() => setShowPreview(false)}
                  className="redBtn cursPointer px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>

            <iframe
              src={pdfUrl}
              className="flex-1 w-full bg-white border-t border-gray-300"
              title="Report Preview"
            ></iframe>
          </div>
        )}


      </div>
    </>
  );
}
