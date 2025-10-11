import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  S_CALCIUM_RANGE
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
  const [S_BILLIRUBIN_Data,setS_BILLIRUBIN_Data] = useState({})
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [mpCardResult, setMpCardResult] = useState("");

  const [widalData, setWidalData] = useState({});


  const [HB_Float_Value, set_HB_Float_Value] = useState("");
  const [HB_Percent_Value, set_HB_Percent_Value] = useState("");
  const [HB_value, setHB_value] = useState("");

  const [selectedReports, setSelectedReports] = useState([]);


  const [doctorList, setDoctorList] = useState([
    "DR R  KUMAR",
    "DR ABHIMANYU KUMAR",
    "DR C H C PRATAPPUR",
    "DR BK SAINIK",
    "DR NANDANI HERBAL HEALTH CARE",
    "DR SELF"
  ]);
  const [newDoctor, setNewDoctor] = useState("");



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
        updated["MONOCYTES"] = calcValue >= 0 ? calcValue : 0; // prevent negative
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

    // --- 1️⃣ Auto-calculate GLOBULIN ---
    if (!isNaN(totalProtein) && !isNaN(albumin)) {
      const globulin = Math.max(totalProtein - albumin, 0); // prevent negative
      updated["GLOBULIN"] = globulin.toFixed(2);
    }

    // --- 2️⃣ Auto-calculate ALB/GLOBULIN RATIO ---
    const globulinVal = Number(updated["GLOBULIN"]);
    if (!isNaN(albumin) && globulinVal > 0) {
      const ratio = albumin / globulinVal;
      updated["ALB/GLOBULIN RATIO"] = ratio.toFixed(2);
    } else {
      updated["ALB/GLOBULIN RATIO"] = "";
    }

    // Update state once (React best practice)
    setLFT_Data(updated);
  };


  const handleKFTChange = (field, value) => {
    setKFT_Data({ ...KFT_Data, [field]: value });
  };


  const handleS_BILLIRUBIN_Change = (field,value) => {
    setS_BILLIRUBIN_Data({...S_BILLIRUBIN_Data,[field] : value})

  }

  console.log(S_BILLIRUBIN_Data);
  

  console.log(age);


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


  const handleGeneratePdf = () => {
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
      S_BILLIRUBIN_Data
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="border p-2 rounded" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <div className="flex gap-2">
              <input
                className="border p-2 rounded w-1/3"
                type="number"
                min="0"
                placeholder="Years"
                value={age.year}
                onChange={(e) =>
                  setAge({ ...age, year: e.target.value ? Number(e.target.value) : "" })
                }
              />
              <input
                className="border p-2 rounded w-1/3"
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
                className="border p-2 rounded w-1/3"
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


            {/* Gender Select */}
            <select className="border p-2 rounded" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="M">MALE</option>
              <option value="F">FEMALE</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>

            <input className="border p-2 rounded" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            {/* Doctor Select */}
            <select className="border p-2 rounded col-span-2" value={refBy} onChange={(e) => setRefBy(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctorList.map((doc, idx) => (
                <option key={idx} value={doc}>{doc}</option>
              ))}
            </select>

            {/* Add new doctor */}
            <div className="flex col-span-2 gap-2">
              <input className="border p-2 rounded flex-1" placeholder="Add new doctor" value={newDoctor} onChange={(e) => setNewDoctor(e.target.value)} />
              <button onClick={handleAddDoctor} className="addDoctorBtn cursPointer bg-green-500 text-white px-4 rounded">Add</button>
            </div>
          </div>

          {/* Report Options */}
          <h2 className="font-semibold mb-2 text-gray-700">SELECT REPORT</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">

            {["CBC", "HB", "Widal", "MP card", "KFT", "LFT", "S BILLIRUBIN", "SGPT", "SGOT", "S ALKALINE PHOSHATE", "TOTAL PROTEIN", "ALBUMIN", "GLOBULIN", "ALB/GLOBULIN RATIO", "S. CREATININE", "S. UREA", "S.URIC ACID", "S. CHLORIDE", "S . POTASSIUM", "S . SODIUM", "S. CALCIUM"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(r)}
                  onChange={() => handleReportSelection(r)}
                  disabled={isDisabled(r, selectedReports)}
                />
                <span className={isDisabled(r, selectedReports) ? "text-gray-400" : ""}>
                  {r}
                </span>
              </label>
            ))}



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
                    ...S_CHLORIDE_RANGE,
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
                        onChange={(e) => handleS_BILLIRUBIN_Change(field.key, e.target.value)}  />
                    </div>))
                }
              </div>

            </div>
          )}



          {/* Button */}
          <button onClick={handleGeneratePdf} className="genpdfbtn cursPointer w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Generate Report (Preview)
          </button>
        </div>

        {/* Fullscreen Preview */}
        {/* {showPreview && pdfUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-50">
            <div className="flex justify-between items-center bg-white p-4">
              <h2 className="text-lg font-bold">Report Preview</h2>
              <button onClick={() => setShowPreview(false)} className="px-4 py-1 closeBtn cursPointer bg-red-500 text-white rounded hover:bg-red-600">Close</button>
            </div>
            <iframe src={pdfUrl} className="flex-1 w-full bg-white"></iframe>
          </div>
        )} */}



{/* Fullscreen Preview */}
{showPreview && pdfUrl && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col z-50">
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold text-gray-800">Report Preview</h2>

      <div className="flex gap-3">
        {/* ✅ Download Button */}
        <a
          href={pdfUrl}
          download="Famous_Patholab_Report.pdf"
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Download
        </a>

        {/* ❌ Close Button */}
        <button
          onClick={() => setShowPreview(false)}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
