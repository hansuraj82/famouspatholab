// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function ReportSelection() {
// //     const navigate = useNavigate();
// //     document.title = 'FAMOUS-PATHO-LAB | SELECT - REPORTS'
// //     useEffect(() => {
// //         const stored = localStorage.getItem("auth");
// //         if (!stored) {
// //             navigate("/login");
// //             return;
// //         }

// //         const { loggedIn, expiry } = JSON.parse(stored);
// //         const now = new Date().getTime();

// //         if (!loggedIn || now > expiry) {
// //             localStorage.removeItem("auth");
// //             navigate("/login");
// //         }
// //     }, [navigate]);


// //     // 🔹 LOAD SAVED DATA (RESTORE)
// //     // -------------------------
// //     useEffect(() => {
// //         const saved = localStorage.getItem("report-selection");
// //         if (saved) {
// //             const d = JSON.parse(saved);
// //             setSelectedReports(d.selectedReports || []);
// //             setPatientName(d.patientName || "");
// //             setAge(d.age || { year: "", month: "", day: "" });
// //             setGender(d.gender || "M");
// //             setAddress(d.address || "");
// //             setRefBy(d.refBy || "");
// //             setTestDate(d.testDate || "");
// //             setReportDate(d.reportDate || "");
// //         }
// //     }, []);



// //     const [patientName, setPatientName] = useState("");
// //     const [age, setAge] = useState({ year: "", month: "", day: "" });
// //     const [gender, setGender] = useState("M");
// //     const [address, setAddress] = useState("");
// //     const [refBy, setRefBy] = useState("");
// //     const [testDate, setTestDate] = useState("");
// //     const [reportDate, setReportDate] = useState("");
// //     const [doctorList, setDoctorList] = useState([
// //         "DR R  KUMAR",
// //         "DR ABHIMANYU KUMAR",
// //         "DR C H C PRATAPPUR",
// //         "DR B K SAINIK",
// //         "DR NANDANI HERBAL HEALTH CARE",
// //         "DR SELF"
// //     ]);
// //     const [newDoctor, setNewDoctor] = useState("");
// //     const handleAddDoctor = () => {
// //         if (newDoctor.trim()) {
// //             setDoctorList([...doctorList, newDoctor]);
// //             setRefBy(newDoctor);
// //             setNewDoctor("");
// //         }
// //     };


// //     const reports = [
// //         "CBC",
// //         "HB",
// //         "Widal",
// //         "MP card",
// //         "KFT",
// //         "LFT",
// //         "S BILLIRUBIN",
// //         "S BILLIRUBIN (TOTAL)",
// //         "S BILLIRUBIN (direct)",
// //         "S BILLIRUBIN (indirect)",
// //         "SGPT",
// //         "SGOT",
// //         "S ALKALINE PHOSHATE",
// //         "TOTAL PROTEIN",
// //         "ALBUMIN",
// //         "GLOBULIN",
// //         "ALB/GLOBULIN RATIO",
// //         "S. CREATININE",
// //         "S. UREA",
// //         "S.URIC ACID",
// //         "S. CHLORIDE",
// //         "S . POTASSIUM",
// //         "S . SODIUM",
// //         "S. CALCIUM",
// //         "URINE-CULTURE & SENSITIVITY",
// //         "ESR",
// //         "ESR 1st h",
// //         "ESR 2nd h",
// //         "ESR(average)",
// //         "BLOOD SUGAR(F)",
// //         "BLOOD SUGAR(R)",
// //         "BLOOD SUGAR(PP)",
// //         "S. CHOLESTEROL",
// //         "S. CHLORI",
// //         "CRP IMMUNOTURIDOMETRY",
// //         "BT TIME",
// //         "CT TIME",
// //         "W.B.C COUNT",
// //         "DENGUE",
// //         "MALARIA PARASITE (Slide Test)",
// //         "PREGNANCY",
// //         "HCV",
// //         "HIV1 & HIV2",
// //         "HBsAg",
// //         "ABO RH",
// //         "V D R L",
// //         "H-PYLORI(Ab<combo)",
// //         "SPUTAM",
// //         "MANTOUX",
// //         "R A FACTOR",
// //         "ASO Titre",
// //         "C R P",
// //         "URINE SUGAR",
// //         "URINE PROTEIN"
// //     ];

// //     const [selectedReports, setSelectedReports] = useState([]);

// //     const toggleReport = (r) => {
// //         setSelectedReports((prev) =>
// //             prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
// //         );
// //     };
// //     const handleNext = () => {
// //         localStorage.setItem(
// //             "report-selection",
// //             JSON.stringify({
// //                 selectedReports,
// //                 patientName,
// //                 age,
// //                 gender,
// //                 address,
// //                 refBy, 
// //                 testDate,
// //                 reportDate,
// //             })
// //         );
// //         navigate("/report/form", { state: { selectedReports, patientName, age, gender, address, refBy, testDate, reportDate } });
// //     };

// //     const [search, setSearch] = useState("");

// //     const filteredReports = reports.filter((item) =>
// //     item.toLowerCase().includes(search.toLowerCase())
// // );


// //     const handleRefreshDetails = () => {
// //         localStorage.removeItem("report-selection");
// //         setSelectedReports([]);
// //             setPatientName("");
// //             setAge({ year: "", month: "", day: "" });
// //             setGender("M");
// //             setAddress("");
// //             setRefBy("");
// //             setTestDate("");
// //             setReportDate("");
// //     }

// //     return (
// //         <div className="p-6 max-w-4xl mx-auto">
// //             <h1 className="text-3xl font-bold mb-4 text-blue-700">
// //                 Select Tests for Report
// //             </h1>

// //             {/* Patient Info */}
// //             {/* 🩺 Patient Information Section */}
// //             <div className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm bg-gradient-to-br from-gray-50 to-white">
// //                 <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center border-b pb-2">
// //                     Patient Information
// //                 </h2>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     {/* Patient Name */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Patient Name</label>
// //                         <input
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             placeholder="Enter patient name"
// //                             value={patientName}
// //                             onChange={(e) => setPatientName(e.target.value)}
// //                         />
// //                     </div>

// //                     {/* Gender */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Gender</label>
// //                         <select
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             value={gender}
// //                             onChange={(e) => setGender(e.target.value)}
// //                         >
// //                             <option value="M">Male</option>
// //                             <option value="F">Female</option>
// //                             <option value="UNKNOWN">Unknown</option>
// //                         </select>
// //                     </div>

// //                     {/* Age */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Age</label>
// //                         <div className="flex gap-2">
// //                             <input
// //                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
// //                                 type="number"
// //                                 min="0"
// //                                 placeholder="Years"
// //                                 value={age.year}
// //                                 onChange={(e) =>
// //                                     setAge({ ...age, year: e.target.value ? Number(e.target.value) : "" })
// //                                 }
// //                             />
// //                             <input
// //                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
// //                                 type="number"
// //                                 min="0"
// //                                 max="11"
// //                                 placeholder="Months"
// //                                 value={age.month}
// //                                 onChange={(e) =>
// //                                     setAge({ ...age, month: e.target.value ? Number(e.target.value) : "" })
// //                                 }
// //                             />
// //                             <input
// //                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
// //                                 type="number"
// //                                 min="0"
// //                                 max="30"
// //                                 placeholder="Days"
// //                                 value={age.day}
// //                                 onChange={(e) =>
// //                                     setAge({ ...age, day: e.target.value ? Number(e.target.value) : "" })
// //                                 }
// //                             />
// //                         </div>
// //                     </div>

// //                     {/* Address */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Address</label>
// //                         <input
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             placeholder="Enter address"
// //                             value={address}
// //                             onChange={(e) => setAddress(e.target.value)}
// //                         />
// //                     </div>

// //                     {/* Test Date */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Test Date</label>
// //                         <input
// //                             type="date"
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             value={testDate}
// //                             onChange={(e) => setTestDate(e.target.value)}
// //                         />
// //                     </div>

// //                     {/* Report Date */}
// //                     <div className="flex flex-col text-left">
// //                         <label className="text-gray-700 font-medium mb-1">Report Date</label>
// //                         <input
// //                             type="date"
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             value={reportDate}
// //                             onChange={(e) => setReportDate(e.target.value)}
// //                         />
// //                     </div>

// //                     {/* Doctor Selection */}
// //                     <div className="flex flex-col text-left md:col-span-2">
// //                         <label className="text-gray-700 font-medium mb-1">Referred By</label>
// //                         <select
// //                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
// //                             value={refBy}
// //                             onChange={(e) => setRefBy(e.target.value)}
// //                         >
// //                             <option value="">Select Doctor</option>
// //                             {doctorList.map((doc, idx) => (
// //                                 <option key={idx} value={doc}>
// //                                     {doc}
// //                                 </option>
// //                             ))}
// //                         </select>
// //                     </div>

// //                     {/* Add New Doctor */}
// //                     <div className="flex gap-2 md:col-span-2">
// //                         <input
// //                             className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
// //                             placeholder="Add new doctor"
// //                             value={newDoctor}
// //                             onChange={(e) => setNewDoctor(e.target.value)}
// //                         />
// //                         <button
// //                             onClick={handleAddDoctor}
// //                             className="cursPointer greenBtn bg-green-500 text-white px-5 rounded hover:bg-green-600 transition-all"
// //                         >
// //                             Add
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //             {/* ================================
// //      🔍 SEARCH + TEST SELECTION
// // ================================ */}
// // <div className="mt-10">

// //     <h2 className="text-2xl font-semibold text-blue-700 mb-3 border-b pb-2">
// //         Select Tests
// //     </h2>

// //     {/* SEARCH BAR */}
// //     <div className="flex justify-between items-center mb-4">
// //         <input
// //             type="text"
// //             placeholder="Search test name..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full md:w-1/2 border p-3 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
// //         />
// //     </div>

// //     {/* FILTERED TEST LIST */}
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// //         {filteredReports.length === 0 && (
// //             <p className="text-gray-500 text-center col-span-2">
// //                 No matching tests found...
// //             </p>
// //         )}

// //         {filteredReports.map((r) => (
// //             <label
// //                 key={r}
// //                 className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border shadow transition-all
// //                     ${
// //                         selectedReports.includes(r)
// //                             ? "bg-blue-50 border-blue-500"
// //                             : "bg-white hover:bg-gray-50"
// //                     }
// //                 `}
// //             >
// //                 <input
// //                     type="checkbox"
// //                     checked={selectedReports.includes(r)}
// //                     onChange={() => toggleReport(r)}
// //                     className="w-5 h-5 cursor-pointer accent-blue-600"
// //                 />

// //                 <span className="font-medium text-gray-700 tracking-wide">
// //                     {r}
// //                 </span>
// //             </label>
// //         ))}
// //     </div>
// // </div>


// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {reports.map((r) => (
// //                     <label
// //                         key={r}
// //                         className="flex items-center gap-2 border p-3 rounded-lg shadow-sm"
// //                     >
// //                         <input
// //                             type="checkbox"
// //                             checked={selectedReports.includes(r)}
// //                             onChange={() => toggleReport(r)}
// //                         />
// //                         {r}
// //                     </label>
// //                 ))}
// //             </div>

// //             <div className="mt-6 ">
// //                 <button onClick={handleRefreshDetails} className={` px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 }`}>Refresh</button>
// //                 <button
// //                     onClick={handleNext}
// //                     className={` px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700
// //                         }`}
// //                 >
// //                     Next →
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ReportSelection() {
//     const navigate = useNavigate();
//     document.title = "FAMOUS-PATHO-LAB | SELECT - REPORTS";

//     /* ========================
//        🔐 LOGIN PROTECTION
//     ========================= */
//     useEffect(() => {
//         const stored = localStorage.getItem("auth");
//         if (!stored) {
//             navigate("/login");
//             return;
//         }

//         const { loggedIn, expiry } = JSON.parse(stored);
//         const now = new Date().getTime();

//         if (!loggedIn || now > expiry) {
//             localStorage.removeItem("auth");
//             navigate("/login");
//         }
//     }, [navigate]);

//     /* ========================
//        📌 RESTORE SAVED STATE
//     ========================= */
//     useEffect(() => {
//         const saved = localStorage.getItem("report-selection");
//         if (saved) {
//             const d = JSON.parse(saved);
//             setSelectedReports(d.selectedReports || []);
//             setPatientName(d.patientName || "");
//             setAge(d.age || { year: "", month: "", day: "" });
//             setGender(d.gender || "M");
//             setAddress(d.address || "");
//             setRefBy(d.refBy || "");
//             setTestDate(d.testDate || "");
//             setReportDate(d.reportDate || "");
//         }
//     }, []);

//     /* ========================
//        🧾 STATE
//     ========================= */
//     const [patientName, setPatientName] = useState("");
//     const [age, setAge] = useState({ year: "", month: "", day: "" });
//     const [gender, setGender] = useState("M");
//     const [address, setAddress] = useState("");
//     const [refBy, setRefBy] = useState("");
//     const [testDate, setTestDate] = useState("");
//     const [reportDate, setReportDate] = useState("");
//     const [newDoctor, setNewDoctor] = useState("");


//     const [doctorList, setDoctorList] = useState(() => {
//         const saved = localStorage.getItem("doctor-list");
//         return saved
//             ? JSON.parse(saved)
//             : [
//                 "DR R  KUMAR",
//                 "DR ABHIMANYU KUMAR",
//                 "DR C H C PRATAPPUR",
//                 "DR B K SAINIK",
//                 "DR NANDANI HERBAL HEALTH CARE",
//                 "DR SELF"
//             ];
//     });

//     useEffect(() => {
//         localStorage.setItem("doctor-list", JSON.stringify(doctorList));
//     }, [doctorList]);

//     const handleAddDoctor = () => {
//         const clean = newDoctor.trim();

//         if (!clean) return;

//         if (!doctorList.includes(clean)) {
//             setDoctorList([...doctorList, clean]);
//             setRefBy(clean);
//         }

//         setNewDoctor("");
//     };


//     /* ========================
//        🧪 TEST LIST
//     ========================= */
//     const reports = [
//         "CBC", "HB", "Widal", "MP card", "KFT", "LFT", "S BILLIRUBIN",
//         "S BILLIRUBIN (TOTAL)", "S BILLIRUBIN (direct)", "S BILLIRUBIN (indirect)",
//         "SGPT", "SGOT", "S ALKALINE PHOSHATE", "TOTAL PROTEIN", "ALBUMIN",
//         "GLOBULIN", "ALB/GLOBULIN RATIO", "S. CREATININE", "S. UREA", "S.URIC ACID",
//         "S. CHLORIDE", "S . POTASSIUM", "S . SODIUM", "S. CALCIUM",
//         "URINE-CULTURE & SENSITIVITY", "ESR", "ESR 1st h", "ESR 2nd h", "ESR(average)",
//         "BLOOD SUGAR(F)", "BLOOD SUGAR(R)", "BLOOD SUGAR(PP)", "S. CHOLESTEROL",
//         "S. CHLORI", "CRP IMMUNOTURIDOMETRY", "BT TIME", "CT TIME", "W.B.C COUNT",
//         "DENGUE", "MALARIA PARASITE (Slide Test)", "PREGNANCY", "HCV", "HIV1 & HIV2",
//         "HBsAg", "ABO RH", "V D R L", "H-PYLORI(Ab<combo)", "SPUTAM", "MANTOUX",
//         "R A FACTOR", "ASO Titre", "C R P", "URINE SUGAR", "URINE PROTEIN"
//     ];

//     const [selectedReports, setSelectedReports] = useState([]);

//     const toggleReport = (r) => {
//         setSelectedReports((prev) =>
//             prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
//         );
//     };

//     /* ========================
//        🔎 SEARCH BAR
//     ========================= */
//     const [search, setSearch] = useState("");

//     const filteredReports = reports.filter((item) =>
//         item.toLowerCase().includes(search.toLowerCase())
//     );

//     /* ========================
//        ⏭ NEXT BUTTON
//     ========================= */
//     const handleNext = () => {
//         localStorage.setItem(
//             "report-selection",
//             JSON.stringify({
//                 selectedReports,
//                 patientName,
//                 age,
//                 gender,
//                 address,
//                 refBy,
//                 testDate,
//                 reportDate,
//             })
//         );

//         navigate("/report/form", {
//             state: {
//                 selectedReports,
//                 patientName,
//                 age,
//                 gender,
//                 address,
//                 refBy,
//                 testDate,
//                 reportDate,
//             },
//         });
//     };

//     /* ========================
//        🔄 REFRESH FORM
//     ========================= */
//     const handleRefreshDetails = () => {
//         localStorage.removeItem("report-selection");
//         setSelectedReports([]);
//         setPatientName("");
//         setAge({ year: "", month: "", day: "" });
//         setGender("M");
//         setAddress("");
//         setRefBy("");
//         setTestDate("");
//         setReportDate("");
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">

//             {/* ===============================
//                 PATIENT INFORMATION SECTION
//             =============================== */}
//             <div className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm bg-gradient-to-br from-gray-50 to-white">
//                 <h2 className="blueText text-xl font-semibold text-blue-700 mb-4 text-center border-b pb-2">
//                     Patient Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                     {/* Patient Name */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Patient Name</label>
//                         <input
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             placeholder="Enter patient name"
//                             value={patientName}
//                             onChange={(e) => setPatientName(e.target.value)}
//                         />
//                     </div>

//                     {/* Gender */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Gender</label>
//                         <select
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             value={gender}
//                             onChange={(e) => setGender(e.target.value)}
//                         >
//                             <option value="M">Male</option>
//                             <option value="F">Female</option>
//                             <option value="UNKNOWN">Unknown</option>
//                         </select>
//                     </div>

//                     {/* Age */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Age</label>
//                         <div className="flex gap-2">
//                             <input
//                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
//                                 type="number"
//                                 min="0"
//                                 placeholder="Years"
//                                 value={age.year}
//                                 onChange={(e) =>
//                                     setAge({ ...age, year: e.target.value ? Number(e.target.value) : "" })
//                                 }
//                             />
//                             <input
//                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
//                                 type="number"
//                                 min="0"
//                                 max="11"
//                                 placeholder="Months"
//                                 value={age.month}
//                                 onChange={(e) =>
//                                     setAge({ ...age, month: e.target.value ? Number(e.target.value) : "" })
//                                 }
//                             />
//                             <input
//                                 className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
//                                 type="number"
//                                 min="0"
//                                 max="30"
//                                 placeholder="Days"
//                                 value={age.day}
//                                 onChange={(e) =>
//                                     setAge({ ...age, day: e.target.value ? Number(e.target.value) : "" })
//                                 }
//                             />
//                         </div>
//                     </div>

//                     {/* Address */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Address</label>
//                         <input
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             placeholder="Enter address"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                         />
//                     </div>

//                     {/* Test Date */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Test Date</label>
//                         <input
//                             type="date"
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             value={testDate}
//                             onChange={(e) => setTestDate(e.target.value)}
//                         />
//                     </div>

//                     {/* Report Date */}
//                     <div className="flex flex-col text-left">
//                         <label className="text-gray-700 font-medium mb-1">Report Date</label>
//                         <input
//                             type="date"
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             value={reportDate}
//                             onChange={(e) => setReportDate(e.target.value)}
//                         />
//                     </div>

//                     {/* Doctor Selection */}
//                     <div className="flex flex-col text-left md:col-span-2">
//                         <label className="text-gray-700 font-medium mb-1">Referred By</label>
//                         <select
//                             className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                             value={refBy}
//                             onChange={(e) => setRefBy(e.target.value)}
//                         >
//                             <option value="">Select Doctor</option>
//                             {doctorList.map((doc, idx) => (
//                                 <option key={idx} value={doc}>
//                                     {doc}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Add New Doctor */}
//                     <div className="flex gap-2 md:col-span-2">
//                         <input
//                             className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
//                             placeholder="Add new doctor"
//                             value={newDoctor}
//                             onChange={(e) => setNewDoctor(e.target.value)}
//                         />
//                         <button
//                             onClick={handleAddDoctor}
//                             className="greenBtn cursPointer bg-green-600 text-white px-5 rounded hover:bg-green-700 transition-all"
//                         >
//                             Add
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* ===============================
//                 🔍 SEARCH + TEST SELECTION
//             =============================== */}
//             <h2 className="blueText text-2xl font-semibold text-blue-700 mb-3 border-b pb-2">
//                 Select Tests
//             </h2>

//             {/* SEARCH BAR */}
//             <div className="flex justify-between items-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search test name..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full md:w-1/2 border p-3 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//             </div>

//             {/* TEST LIST GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 {filteredReports.length === 0 && (
//                     <p className="text-gray-500 text-center col-span-2">
//                         No matching tests found...
//                     </p>
//                 )}

//                 {filteredReports.map((r) => (
//                     <label
//                         key={r}
//                         className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border shadow transition-all
//                         ${selectedReports.includes(r)
//                                 ? "bg-blue-50 border-blue-500"
//                                 : "bg-white hover:bg-gray-50"
//                             }`}
//                     >
//                         <input
//                             type="checkbox"
//                             checked={selectedReports.includes(r)}
//                             onChange={() => toggleReport(r)}
//                             className="w-5 h-5 cursor-pointer accent-blue-600"
//                         />
//                         <span className="font-medium text-gray-700 tracking-wide">
//                             {r}
//                         </span>
//                     </label>
//                 ))}
//             </div>

//             {/* BUTTONS */}
//             <div className="mt-8 flex flex-col sm:flex-row gap-4">

//                 {/* Refresh Button */}
//                 <button
//                     onClick={handleRefreshDetails}
//                     className=" grayBtn cursPointer
//                                                     w-full sm:w-auto px-6 py-3 rounded-lg font-medium
//                                                     bg-gray-200 text-gray-800 
//                                                     hover:bg-gray-300 hover:shadow transition-all
//         "
//                 >
//                     🔄 Refresh
//                 </button>

//                 {/* Next Button */}
//                 <button
//                     onClick={handleNext}
//                     className={`
//                                 blueBtn cursPointer w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all shadow bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg
//         `}
//                 >
//                     Next →
//                 </button>

//             </div>

//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportSelection() {
    const navigate = useNavigate();
    document.title = "FAMOUS-PATHO-LAB | SELECT REPORTS";

    /* ---------------- AUTH CHECK ---------------- */
    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (!stored) return navigate("/login");

        const { loggedIn, expiry } = JSON.parse(stored);
        if (!loggedIn || Date.now() > expiry) {
            localStorage.removeItem("auth");
            navigate("/login");
        }
    }, []);

    /* ---------------- STATES ---------------- */
    const [search, setSearch] = useState("");
    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState({ year: "", month: "", day: "" });
    const [gender, setGender] = useState("M");
    const [address, setAddress] = useState("");
    const [refBy, setRefBy] = useState("");
    const [testDate, setTestDate] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);


    const [doctorList, setDoctorList] = useState(() => {
        const saved = localStorage.getItem("doctor-list");
        return saved
            ? JSON.parse(saved)
            : [
                "DR R  KUMAR",
                "DR ABHIMANYU KUMAR",
                "DR C H C PRATAPPUR",
                "DR B K SAINIK",
                "DR NANDANI HERBAL HEALTH CARE",
                "DR SELF"
            ];
    });

    useEffect(() => {
        localStorage.setItem("doctor-list", JSON.stringify(doctorList));
    }, [doctorList]);

    const [newDoctor, setNewDoctor] = useState("");

    const [selectedReports, setSelectedReports] = useState([]);

    /* ---------------- LOAD SAVED DATA ---------------- */
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

        if (saved.doctorList) setDoctorList(saved.doctorList);
    }, []);

    /* ---------------- TEST LIST ---------------- */
    const reports = [
        "CBC", "HB", "Widal", "MP card", "KFT", "LFT", "S BILLIRUBIN", "S BILLIRUBIN (TOTAL)",
        "S BILLIRUBIN (direct)", "S BILLIRUBIN (indirect)", "SGPT", "SGOT",
        "S ALKALINE PHOSHATE", "TOTAL PROTEIN", "ALBUMIN", "GLOBULIN",
        "ALB/GLOBULIN RATIO", "S. CREATININE", "S. UREA", "S.URIC ACID",
        "S. CHLORIDE", "S . POTASSIUM", "S . SODIUM", "S. CALCIUM",
        "URINE-CULTURE & SENSITIVITY", "ESR", "ESR 1st h", "ESR 2nd h", "ESR(average)",
        "BLOOD SUGAR(F)", "BLOOD SUGAR(R)", "BLOOD SUGAR(PP)", "S. CHOLESTEROL",
        "S. CHLORI", "CRP IMMUNOTURIDOMETRY", "BT TIME", "CT TIME", "W.B.C COUNT",
        "DENGUE", "MALARIA PARASITE (Slide Test)", "PREGNANCY", "HCV",
        "HIV1 & HIV2", "HBsAg", "ABO RH", "V D R L", "H-PYLORI(Ab<combo)",
        "SPUTAM", "MANTOUX", "R A FACTOR", "ASO Titre", "C R P", "URINE SUGAR", "URINE PROTEIN",
    ];

    /* ---------------- FILTER LIST ---------------- */
    const filteredReports =
        search.trim() === ""
            ? []
            : reports.filter((r) => r.toLowerCase().includes(search.toLowerCase()));

    /* ---------------- TOGGLE REPORT ---------------- */
    const toggleReport = (r) => {
        setSelectedReports((prev) =>
            prev.includes(r)
                ? prev.filter((x) => x !== r)
                : [...prev, r]
        );
    };

    /* ---------------- SAVE + NEXT ---------------- */
    const handleNext = () => {
        localStorage.setItem(
            "report-selection",
            JSON.stringify({
                selectedReports,
                patientName,
                age,
                gender,
                address,
                refBy,
                testDate,
                reportDate,
            })
        );

        navigate("/report/form", {
            state: {
                selectedReports,
                patientName,
                age,
                gender,
                address,
                refBy,
                testDate,
                reportDate,
            },
        });
    };

    /* ---------------- ADD NEW DOCTOR ---------------- */
    const handleAddDoctor = () => {
        const name = newDoctor.trim();
        if (!name) return;

        // Prevent duplicates (case-insensitive)
        const exists = doctorList.some(
            (d) => d.toLowerCase() === name.toLowerCase()
        );
        if (exists) {
            setRefBy(name);
            return
        };

        const updated = [...doctorList, name];

        setDoctorList(updated);
        setRefBy(name);
        setNewDoctor("");
    };


    /* ---------------- REFRESH ---------------- */
    const handleRefresh = () => {
        localStorage.removeItem("report-selection");
        setSelectedReports([]);
        setPatientName("");
        setAge({ year: "", month: "", day: "" });
        setGender("M");
        setAddress("");
        setRefBy("");
        setTestDate("");
        setReportDate("");
    };




    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* ---------------- HEADER ---------------- */}
            <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Select Tests for Report
            </h1>

            {/* ---------------- PATIENT CARD ---------------- */}
            <div className="bg-white shadow-lg rounded-xl p-5 mb-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 pb-2 border-b">
                    Patient Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* NAME */}
                    <Input label="Patient Name" value={patientName} setValue={setPatientName} />

                    {/* GENDER */}
                    <SelectBox
                        label="Gender"
                        value={gender}
                        setValue={setGender}
                        options={["M", "F", "UNKNOWN"]}
                    />

                    {/* AGE */}
                    <div>
                        <label className="font-medium">Age</label>
                        <div className="flex gap-2 mt-1">
                            <MiniInput placeholder="Years" value={age.year}
                                setValue={(v) => setAge({ ...age, year: v ? Number(v) : "" })} />

                            <MiniInput placeholder="Months" value={age.month}
                                setValue={(v) => setAge({ ...age, month: v ? Number(v) : "" })} />

                            <MiniInput placeholder="Days" value={age.day}
                                setValue={(v) => setAge({ ...age, day: v ? Number(v) : "" })} />
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <Input label="Address" value={address} setValue={setAddress} />

                    {/* TEST DATE */}
                    <Input type="date" label="Test Date" value={testDate} setValue={setTestDate} />

                    {/* REPORT DATE */}
                    <Input type="date" label="Report Date" value={reportDate} setValue={setReportDate} />

                    {/* DOCTOR */}
                    <SelectBox
                        label="Referred By"
                        value={refBy}
                        setValue={setRefBy}
                        options={doctorList}
                    />

                    {/* ADD DOCTOR */}
                    <div>
                        <label className="font-medium">Add Doctor</label>
                        <div className="flex gap-2">
                            <input
                                className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                                placeholder="Add new doctor"
                                value={newDoctor}
                                onChange={(e) => setNewDoctor(e.target.value)}
                            />
                            <button
                                onClick={handleAddDoctor}
                                className="greenBtn cursPointer bg-green-600 text-white px-5 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- SEARCH BAR ---------------- */}
            <div className="relative mb-4">
                <input
                    placeholder="Search test..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true)
                    }}
                    className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            {/* ---------------- FILTERED RESULTS ---------------- */}
            {/* 🔍 SEARCH RESULTS POPUP */}
            {showDropdown && search.trim() !== "" && (
                <div
                    className="absolute mt-1 w-180 bg-white border rounded-lg shadow-lg z-40 max-h-72 overflow-y-auto"
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    {filteredReports.length === 0 ? (
                        <p className="p-3 text-gray-500">No tests found</p>
                    ) : (
                        filteredReports.map((r) => (
                            <label
                                key={r}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedReports.includes(r)}
                                    onChange={() => toggleReport(r)}
                                />
                                <span>{r}</span>
                            </label>
                        ))
                    )}
                </div>
            )}



            {/* ---------------- SELECTED REPORTS ---------------- */}
            {selectedReports.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 shadow-sm">
                    <h3 className="blueText font-semibold mb-2 text-blue-700">Selected Tests</h3>

                    <div className="flex flex-wrap gap-2">
                        {selectedReports.map((r) => (
                            <span
                                key={r}
                                className="blueBtn bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {r}
                                <button
                                    onClick={() => toggleReport(r)}
                                    className="text-white font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* ---------------- BOTTOM BUTTONS ---------------- */}
            <div className="sticky bottom-0 bg-white py-4 flex justify-between border-t">
                <button
                    onClick={handleRefresh}
                    className="grayBtn cursPointer px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Reset
                </button>

                <button
                    onClick={handleNext}

                    className={`blueBtn cursPointer px-6 py-2 rounded text-white ${"bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Input({ label, value, setValue, type = "text" }) {
    return (
        <div>
            <label className="font-medium">{label}</label>
            <input
                type={type}
                className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

function MiniInput({ placeholder, value, setValue }) {
    return (
        <input
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

function SelectBox({ label, value, setValue, options }) {
    return (
        <div>
            <label className="font-medium">{label}</label>
            <select
                className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">--Select--</option>
                {options.map((o, i) => (
                    <option key={i} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}
