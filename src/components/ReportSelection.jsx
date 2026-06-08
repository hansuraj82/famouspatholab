import React, { useEffect, useRef, useState } from "react";
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
    const dropdownRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* ---------------- HEADER ---------------- */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                    Select Tests for Report
                </h1>

                <button
                    onClick={handleRefresh}
                    className="grayBtn cursPointer px-5 py-2.5 rounded-lg bg-gray-700 text-white text-sm font-medium 
                   hover:bg-gray-800 transition"
                >
                    New Report
                </button>
            </div>

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
                                onChange={(e) => setNewDoctor((e.target.value).toUpperCase())}
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
                    ref={dropdownRef}
                    className="absolute mt-1 w-180 bg-white border rounded-lg shadow-lg z-40 max-h-72 overflow-y-auto"
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
                    New Report
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
                onChange={(e) => setValue((e.target.value).toUpperCase())}
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    // Sync search input text with the selected value when it updates
    useEffect(() => {
        setSearchTerm(value || "");
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter array based on what the user types
    const filteredOptions = options.filter((opt) => {
        const optionText = typeof opt === "object" ? opt.name || "" : opt;
        return optionText.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Handle when a selection is made
    const handleSelect = (itemValue, itemText) => {
        setValue(itemValue);
        setSearchTerm(itemText);
        setIsOpen(false);
    };

    return (
        <div className="relative flex flex-col" ref={dropdownRef}>
            <label className="font-medium  ">{label}</label>
            
            <div className="relative ">
                <input
                    type="text"
                    className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
                    placeholder="Search or select..."
                    value={searchTerm}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setValue(e.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setIsOpen(false);
                        }
                    }}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {value && (
                        <button
                            type="button"
                            onClick={() => {
                                setValue("");
                                setSearchTerm("");
                            }}
                            className="text-gray-400 hover:text-gray-600 text-xs px-1"
                        >
                            ✕
                        </button>
                    )}
                    <span className={`text-gray-400 text-xs pointer-events-none transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        ▼
                    </span>
                </div>
            </div>

            {/* Floating Dropdown List */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-[100%] z-50 mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto flex flex-col">
                    {/* Clear selection choice */}
                    <button
                        type="button"
                        tabIndex={0}
                        onClick={() => handleSelect("", "")}
                        className="w-full text-left p-2 text-sm italic text-gray-400 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-50"
                    >
                        -- Clear Selection --
                    </button>

                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, i) => {
                            const itemText = typeof opt === "object" ? opt.name : opt;
                            const itemValue = typeof opt === "object" ? opt.id || opt.name : opt;
                            const isSelected = value === itemValue;

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    tabIndex={0}
                                    onClick={() => handleSelect(itemValue, itemText)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleSelect(itemValue, itemText);
                                        }
                                        if (e.key === "Escape") {
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`w-full text-left p-2 text-sm cursor-pointer transition-colors focus:outline-none ${
                                        isSelected 
                                            ? "bg-blue-50 text-blue-600 font-medium focus:bg-blue-100" 
                                            : "text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                                    }`}
                                >
                                    {itemText}
                                </button>
                            );
                        })
                    ) : (
                        <div className="p-2 text-sm text-gray-400 italic">
                            No matches found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}