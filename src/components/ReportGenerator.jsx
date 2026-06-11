import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";
import PNSelect from "./PNSelect";
import Select from "./Select";





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


  const [selectedReports, setSelectedReports] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState({ year: "", month: "", day: "" });
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [refBy, setRefBy] = useState("");
  const [testDate, setTestDate] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [doctorList, setDoctorList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // To close dropdown when clicking outside

  // Keep the search input in sync with the selected value when editing starts
  useEffect(() => {
    setSearchTerm(refBy);
  }, [refBy, isEditing]);

  // Optional: Close dropdown if user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDoctors = doctorList.filter((doc) => {
    const docName = typeof doc === "object" ? doc.name : doc;
    return docName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("report-selection") || "{}");

    setPatientName(saved.patientName || "");
    setAge(saved.age || { year: "", month: "", day: "" });
    setGender(saved.gender || "M");
    setAddress(saved.address || "");
    setRefBy(saved.refBy || "");
    setTestDate(saved.testDate || "");
    setReportDate(saved.reportDate || "");
    setSelectedReports(saved.selectedReports || []);

    // 2. Fetch doctors list for the dropdown
    const savedDoctors = JSON.parse(localStorage.getItem("doctor-list") || "[]");
    // Handles cases where doctor-list might be an array of strings or an array of objects
    setDoctorList(savedDoctors);
  }, []);

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

  const [testValues, setTestValues] = useState({
    ESR: "",
    ESR_1H: "",
    ESR_2H: "",
    ESR_AVG: "",
    BS_F: "",
    BS_R: "",
    BS_PP: "",
    CHOLESTEROL: "",
    CHLORI: "",
    CRP_IMMUNOTURIDOMETRY: "",
    BT_MIN: "",
    BT_SEC: "",
    CT_MIN: "",
    CT_SEC: "",
    WBC: "",
    DENGUE: "",
    MALARIA: "",
    PREGNANCY: "",
    HCV: "",
    HIV: "",
    HBSAG: "",
    ABO: "",
    VDRL: "",
    HPYLORI: "",
    SPUTAM: "",
    MANTOUX: "",
    RA_FACTOR: "",
    ASO_TITRE: "",
    CRP_SIMPLE: "",
    URINE_SUGAR: "",
    URINE_PROTEIN: ""
  });


  const update = (key, value) => {
    setTestValues(prev => ({ ...prev, [key]: value }));
  };

  const [showCustomTests, setShowCustomTests] = useState(false);
  const [customTests, setCustomTests] = useState([]);

  const handleAddTest = (newTest) => {
    setCustomTests((prev) => [...prev, newTest]);
  };

  const handleRemoveTest = (index) => {
    setCustomTests(prev => prev.filter((_, i) => i !== index));
  };


  const getTitreOptions = (result) => {
    if (result === "+VE") {
      return [20, 40, 80, 160, 320];
    }
    return [20];
  };


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

  const [antibiotics, setAntibiotics] = useState(antibioticsForCulture);


  //add ne antibiotics for urine culture test
  const [newAntibiotic, setNewAntibiotic] = useState("");

  const addAntibiotic = () => {
    if (!newAntibiotic.trim()) return;
    setAntibiotics([...antibiotics, newAntibiotic.toUpperCase()]);
    setNewAntibiotic("");
  };

  const removeAntibiotic = (item) => {
    setAntibiotics(antibiotics.filter(a => a !== item));
  };


  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");

  const filteredLeft = antibiotics.filter((item) =>
    item.toLowerCase().includes(searchLeft.toLowerCase())
  );

  const filteredRight = antibiotics.filter((item) =>
    item.toLowerCase().includes(searchRight.toLowerCase())
  );




  //handle urine-culture report
  const handleValueChangeForCulture = (name,value) => {
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
      antibioticsForUrineCulture: antibiotics,
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
      testValues,
      customTests
    })
  }





  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="blueText text-2xl headColor font-bold text-center mb-6 text-blue-700">
            LAB REPORT
          </h1>

          {/* ⭐ Patient Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-4 mb-6">

            {/* Header with Edit/Save Button */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Patient Summary
              </h2>
              <button
                onClick={() => {
                  if (isEditing) {
                    // Optional: Save to localStorage here if you want updates to persist immediately
                    const currentData = { patientName, age, gender, address, refBy, testDate, reportDate, selectedReports };
                    localStorage.setItem("report-selection", JSON.stringify(currentData));
                  }
                  setIsEditing(!isEditing);
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                  }`}
              >
                {isEditing ? "Save Changes" : "Edit Details"}
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">

              {/* Name */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName((e.target.value).toUpperCase())}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                    placeholder="Enter patient name"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">{patientName || "Not Provided"}</p>
                )}
              </div>

              {/* Gender */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Gender</p>
                {isEditing ? (
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                  </select>
                ) : (
                  <p className="text-sm font-medium text-gray-800">{gender || "Not Provided"}</p>
                )}
              </div>

              {/* Age */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Age</p>
                {isEditing ? (
                  <div className="flex gap-1">
                    <input
                      type="number"
                      placeholder="Y"
                      value={age.year}
                      onChange={(e) => setAge({ ...age, year: e.target.value })}
                      className="w-1/3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-1 py-0.5 text-center focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="M"
                      value={age.month}
                      onChange={(e) => setAge({ ...age, month: e.target.value })}
                      className="w-1/3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-1 py-0.5 text-center focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="D"
                      value={age.day}
                      onChange={(e) => setAge({ ...age, day: e.target.value })}
                      className="w-1/3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-1 py-0.5 text-center focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {`${age.year || 0}y ${age.month || 0}m ${age.day || 0}d`}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Address</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress((e.target.value).toUpperCase())}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">{address || "Not Provided"}</p>
                )}
              </div>

              {/* Ref. By */}
{/* Ref. By (Searchable Dropdown) */}
<div className="p-2 rounded-md bg-gray-50 border border-gray-200 relative" ref={dropdownRef}>
  <p className="text-xs uppercase text-gray-500 tracking-wide">Referred By</p>

  {isEditing ? (
    <div className="relative mt-1">
      {/* Search Input Box */}
      <input
        type="text"
        placeholder="Search Doctor... (or leave blank)"
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setRefBy(e.target.value); // Directly updates value if typing custom name
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
        className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
      />

      {/* Clear/Reset Option Button inside input */}
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            setRefBy("");
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          type="button"
        >
          ✕
        </button>
      )}

      {/* Floating Dropdown Results Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto custom-scrollbar flex flex-col">
          
          {/* Optional Default Selection (Now a Tabbable Button) */}
          <button
            type="button"
            tabIndex={0}
            onClick={() => {
              setRefBy("");
              setSearchTerm("");
              setIsOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setRefBy("");
                setSearchTerm("");
                setIsOpen(false);
              }
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 transition-colors"
          >
            Self / Direct (None)
          </button>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc, index) => {
              const docName = typeof doc === "object" ? doc.name : doc;
              const isSelected = refBy === docName;

              return (
                <button
                  key={index}
                  type="button"
                  tabIndex={0}
                  onClick={() => {
                    setRefBy(docName);
                    setSearchTerm(docName);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setRefBy(docName);
                      setSearchTerm(docName);
                      setIsOpen(false);
                    }
                    if (e.key === "Escape") {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors focus:outline-none ${
                    isSelected 
                      ? "bg-blue-50 text-blue-600 font-medium focus:bg-blue-100" 
                      : "text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                  }`}
                >
                  {docName}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-2 text-xs text-gray-400 italic">
              No matching doctors found
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <p className="text-sm font-medium text-gray-800">
      {refBy || "Self / Direct"}
    </p>
  )}
</div>

              {/* Test Date */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Test Date</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {testDate
                      ? new Date(testDate).toLocaleDateString("en-GB")
                      : new Date().toLocaleDateString("en-GB")}
                  </p>
                )}
              </div>

              {/* Report Date */}
              <div className="p-2 rounded-md bg-gray-50 border border-gray-200">
                <p className="text-xs uppercase text-gray-500 tracking-wide">Report Date</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="w-full text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800">
                    {reportDate
                      ? new Date(reportDate).toLocaleDateString("en-GB")
                      : new Date().toLocaleDateString("en-GB")}
                  </p>
                )}
              </div>

            </div>
          </div>


          {/* CBC Inputs only if selected */}
          {selectedReports.includes("CBC") && (
            <>
              <h2 className="font-semibold mb-2 text-gray-700">CBC Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  border p-3 rounded max-h-[360px] overflow-auto">
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
                <option value="P F (POSITIVE)">P F (POSITIVE)</option>
                <option value="P V (POSITIVE)">P V (POSITIVE)</option>
                <option value="P V (POSITIVE) WEAK">P V (POSITIVE) WEAK</option>
                <option value="P F & P V POSITIVE">P F & P V (POSITIVE)</option>
                <option value="NEGATIVE">NEGATIVE</option>
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
              {["S- TYPHI “O”", "S- TYPHI “H”", "S- TYPHI “AH”", "S- TYPHI “BH”"].map((test) => {
                const result = widalData[test]?.result || "";
                const titre = widalData[test]?.titre || "";
                const titreOptions = getTitreOptions(result);

                const handleResultChange = (e) => {
                  const selected = e.target.value;

                  setWidalData({
                    ...widalData,
                    [test]: {
                      result: selected,
                      titre: selected === "NEG" ? "20" : "", // 👈 Auto-set titre=20
                    },
                  });
                };

                const handleTitreChange = (e) => {
                  setWidalData({
                    ...widalData,
                    [test]: { ...widalData[test], titre: e.target.value },
                  });
                };

                return (
                  <div
                    key={test}
                    className="grid grid-cols-3 gap-4 border-b p-2 items-center"
                  >
                    {/* Test Name */}
                    <span className="font-semibold">{test}</span>

                    {/* Result Select */}
                    <select
                      className="border p-2 rounded"
                      value={result}
                      onChange={handleResultChange}
                    >
                      <option value="">Select</option>
                      <option value="+VE">+VE</option>
                      <option value="NEG">NEG</option>
                    </select>

                    {/* Titre Select */}
                    <select
                      className="border p-2 rounded"
                      value={titre}
                      onChange={handleTitreChange}
                      disabled={result === "NEG" || !result} // 👈 Disable when NEG and no result
                    >
                      <option value="">Select Titre</option>
                      {titreOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}


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
                    <div className="flex flex-col" key={field.key}>
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
                    <div className="flex flex-col" key={field.key}>
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
          {selectedReports.includes("S BILLIRUBIN (indirect)") && (
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
            <div className="p-6 my-2 max-w-3xl mx-auto border rounded-2xl shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
                URINE CULTURE & SENSITIVITY
              </h2>

              {/* Culture Type Select */}
              <label className="block mb-2 font-semibold text-gray-700">
                Routine Culture:
              </label>
              <select
                className="border p-2 rounded-lg w-full mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                value={cultureType}
                onChange={(e) => setCultureType(e.target.value)}
              >
                <option value="">-- Select Culture Type --</option>
                <option value="NO GROWTH">NO GROWTH</option>
                <option value="E-COLI">E-COLI</option>
              </select>

              {/* Only for E-COLI */}
              {cultureType === "E-COLI" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* LEFT PANEL — ANTIBIOTIC LIST */}
                  <div className="bg-gray-50 p-5 rounded-xl border shadow">
                    <h2 className="text-lg font-semibold text-blue-700 mb-4">
                      Antibiotics List
                    </h2>

                    {/* Add Antibiotic */}
                    <div className="flex gap-2 mb-4">
                      <input
                        value={newAntibiotic}
                        onChange={(e) => setNewAntibiotic(e.target.value)}
                        placeholder="Add new antibiotic"
                        className="border p-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        onClick={addAntibiotic}
                        disabled={antibiotics.length >= 30}
                        className={`px-5 py-2 rounded-lg transition text-white 
                            ${antibiotics.length >= 30
                            ? "grayBtn bg-gray-400 cursor-not-allowed"
                            : "greenBtn cursPointer bg-green-600 hover:bg-green-700"
                          }`}
                      >
                        {antibiotics.length >= 30 ? "Limit Reached" : "Add"}
                      </button>
                    </div>

                    {/* Antibiotic List with Remove */}
                    {/* LEFT PANEL — Antibiotics List */}
                    {/* 🔍 Search Bar */}
                    <input
                      type="text"
                      value={searchLeft}
                      onChange={(e) => setSearchLeft(e.target.value)}
                      placeholder="Search antibiotics..."
                      className="border p-2 rounded-lg w-full mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* FILTERED LIST */}
                    <div className="space-y-2 max-h-[380px] overflow-auto pr-2">

                      {filteredLeft.length === 0 && (
                        <p className="text-gray-500 text-sm">No matching antibiotics.</p>
                      )}

                      {filteredLeft.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 border rounded-lg bg-white shadow-sm hover:shadow transition"
                        >
                          <span className="font-medium text-gray-700">{item}</span>
                          <button
                            onClick={() => removeAntibiotic(item)}
                            className="redBtn cursPointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT PANEL — Sensitivity Inputs */}
                  <div className="bg-gray-50 p-5 rounded-xl border shadow">
                    <h2 className="text-lg font-semibold text-blue-700 mb-3">
                      Sensitivity Values
                    </h2>

                    {/* 🔍 Search Bar */}
                    <input
                      type="text"
                      value={searchRight}
                      onChange={(e) => setSearchRight(e.target.value)}
                      placeholder="Search antibiotics..."
                      className="border p-2 rounded-lg w-full mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* FILTERED SENSITIVITY INPUTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-auto pr-2">

                      {filteredRight.length === 0 && (
                        <p className="text-gray-500 text-sm col-span-2">No matching results.</p>
                      )}

                      {filteredRight.map((name) => (
                        <div
                          key={name}
                          className="p-3 border rounded-xl bg-white shadow-sm hover:shadow"
                        >
                          <label className="block text-sm font-semibold mb-1 text-gray-700">
                            {name}
                          </label>

                          <input
                            type="number"
                            min={0}
                            max={20}
                            className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                            value={sensitivityData[name] || ""}
                            onChange={(e) => handleValueChangeForCulture(name, e.target.value)}
                            placeholder="++"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}



          {/* other tests forms */}



          {/* NUMERIC TESTS */}
          {selectedReports.includes("ESR") && (
            <NumberInput label="ESR" value={testValues.ESR} onChange={(v) => update("ESR", v)} />
          )}

          {selectedReports.includes("ESR 1st h") && (
            <NumberInput label="ESR 1st h" value={testValues.ESR_1H} onChange={(v) => update("ESR_1H", v)} />
          )}

          {selectedReports.includes("ESR 2nd h") && (
            <NumberInput label="ESR 2nd h" value={testValues.ESR_2H} onChange={(v) => update("ESR_2H", v)} />
          )}

          {selectedReports.includes("ESR(average)") && (
            <NumberInput label="ESR (average)" value={testValues.ESR_AVG} onChange={(v) => update("ESR_AVG", v)} />
          )}

          {selectedReports.includes("BLOOD SUGAR(F)") && (
            <NumberInput label="BLOOD SUGAR(F)" value={testValues.BS_F} onChange={(v) => update("BS_F", v)} />
          )}

          {selectedReports.includes("BLOOD SUGAR(R)") && (
            <NumberInput label="BLOOD SUGAR(R)" value={testValues.BS_R} onChange={(v) => update("BS_R", v)} />
          )}

          {selectedReports.includes("BLOOD SUGAR(PP)") && (
            <NumberInput label="BLOOD SUGAR(PP)" value={testValues.BS_PP} onChange={(v) => update("BS_PP", v)} />
          )}

          {selectedReports.includes("S. CHOLESTEROL") && (
            <NumberInput label="S. CHOLESTEROL" value={testValues.CHOLESTEROL} onChange={(v) => update("CHOLESTEROL", v)} />
          )}

          {selectedReports.includes("S. CHLORI") && (
            <NumberInput label="S. CHLORI" value={testValues.CHLORI} onChange={(v) => update("CHLORI", v)} />
          )}


          {selectedReports.includes("CRP IMMUNOTURIDOMETRY") && (
            <NumberInput label="CRP IMMUNOTURIDOMETRY" value={testValues.CRP_IMMUNOTURIDOMETRY} onChange={(v) => update("CRP_IMMUNOTURIDOMETRY", v)} />
          )}

          {selectedReports.includes("W.B.C COUNT") && (
            <NumberInput label="W.B.C COUNT" value={testValues.WBC} onChange={(v) => update("WBC", v)} />
          )}



          {/* BT/CT TIME */}
          {selectedReports.includes("BT TIME") && (
            <TimeInput
              label="BT TIME"
              min={testValues.BT_MIN}
              sec={testValues.BT_SEC}
              onMinChange={(v) => update("BT_MIN", v)}
              onSecChange={(v) => update("BT_SEC", v)}
            />
          )}

          {selectedReports.includes("CT TIME") && (
            <TimeInput
              label="CT TIME"
              min={testValues.CT_MIN}
              sec={testValues.CT_SEC}
              onMinChange={(v) => update("CT_MIN", v)}
              onSecChange={(v) => update("CT_SEC", v)}
            />
          )}



          {/* POSITIVE/NEGATIVE TESTS */}

          {selectedReports.includes("DENGUE") && (
            <PNSelect label="DENGUE" value={testValues.DENGUE} onChange={(v) => update("DENGUE", v)} />
          )}

          {selectedReports.includes("MALARIA PARASITE (Slide Test)") && (
            <PNSelect label="MALARIA PARASITE (Slide Test)" value={testValues.MALARIA} onChange={(v) => update("MALARIA", v)} />
          )}

          {selectedReports.includes("PREGNANCY") && (
            <PNSelect label="PREGNANCY" value={testValues.PREGNANCY} onChange={(v) => update("PREGNANCY", v)} />
          )}

          {selectedReports.includes("HCV") && (
            <PNSelect label="HCV" value={testValues.HCV} onChange={(v) => update("HCV", v)} />
          )}

          {selectedReports.includes("HIV1 & HIV2") && (
            <PNSelect label="HIV1 & HIV2" value={testValues.HIV} onChange={(v) => update("HIV", v)} />
          )}

          {selectedReports.includes("HBsAg") && (
            <PNSelect label="HBsAg" value={testValues.HBSAG} onChange={(v) => update("HBSAG", v)} />
          )}

          {selectedReports.includes("V D R L") && (
            <PNSelect label="V D R L" value={testValues.VDRL} onChange={(v) => update("VDRL", v)} />
          )}

          {selectedReports.includes("H-PYLORI(Ab<combo)") && (
            <PNSelect label="H-PYLORI(Ab<combo)" value={testValues.HPYLORI} onChange={(v) => update("HPYLORI", v)} />
          )}

          {selectedReports.includes("SPUTAM") && (
            <PNSelect label="SPUTAM" value={testValues.SPUTAM} onChange={(v) => update("SPUTAM", v)} />
          )}

          {selectedReports.includes("MANTOUX") && (
            <PNSelect label="MANTOUX" value={testValues.MANTOUX} onChange={(v) => update("MANTOUX", v)} />
          )}


          {selectedReports.includes("R A FACTOR") && (
            <PNSelect label="R A FACTOR" value={testValues.RA_FACTOR} onChange={(v) => update("RA_FACTOR", v)} />
          )}


          {selectedReports.includes("ASO Titre") && (
            <PNSelect label="ASO Titre" value={testValues.ASO_TITRE} onChange={(v) => update("ASO_TITRE", v)} />
          )}


          {selectedReports.includes("C R P") && (
            <PNSelect label="C R P" value={testValues.CRP_SIMPLE} onChange={(v) => update("CRP_SIMPLE", v)} />
          )}


          {/* SPECIAL SELECTS */}
          {selectedReports.includes("ABO RH") && (
            <Select
              label="ABO RH"
              value={testValues.ABO}
              options={["(A) POSITIVE", "(A) NEGATIVE", "(B) POSITIVE", "(B) NEGATIVE", "(O) POSITIVE", "(O) NEGATIVE", "(AB) POSITIVE", "(AB) NEGATIVE"]}
              onChange={(v) => update("ABO", v)}
            />
          )}

          {selectedReports.includes("URINE SUGAR") && (
            <Select
              label="URINE SUGAR"
              value={testValues.URINE_SUGAR}
              options={["NEGATIVE", "NILL", "TRACE", "+", "++", "+++"]}
              onChange={(v) => update("URINE_SUGAR", v)}
            />
          )}
          {selectedReports.includes("URINE PROTEIN") && (
            <Select
              label="URINE PROTEIN"
              value={testValues.URINE_PROTEIN}
              options={["NEGATIVE", "NILL", "TRACE", "+", "++", "+++"]}
              onChange={(v) => update("URINE_PROTEIN", v)}
            />
          )}

          <button
            onClick={() => setShowCustomTests(prev => !prev)}
            className="cursPointer whiteBtn px-4 py-2 my-2 text-sm font-medium rounded-lg 
             bg-gray-100 hover:bg-gray-200 text-white 
             border border-gray-300 transition"
          >
            {showCustomTests ? "Hide Custom Tests" : "Add Custom Test"}
          </button>


          {showCustomTests && (
            <>
              <div>
                <TestForm onAdd={handleAddTest} />
              </div>

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
                                transition-all"
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>)}

          {/* Action Buttons */}
          <div className="sticky bottom-0  mt-8 p-2 flex flex-col md:flex-row gap-4">

            {/* Back Button */}
            <button
              onClick={() => navigate('/report')}
              className="grayBtn text-white w-full md:w-1/2 px-6 py-3 rounded-lg 
               bg-gray-300 text-gray-800 font-medium 
               hover:bg-gray-400 transition-all cursor-pointer"
            >
              ← Back
            </button>

            {/* Generate Button */}
            <button
              onClick={handleGeneratePdf}
              className="blueBtn w-full md:w-1/2 px-6 py-3 rounded-lg 
               bg-blue-600 text-white font-semibold 
               hover:bg-blue-700 shadow-md transition-all cursor-pointer"
            >
              Generate Report (Preview)
            </button>

          </div>

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
