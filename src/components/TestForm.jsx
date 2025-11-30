import React, { useState } from "react";

export default function TestForm({ onAdd }) {
  const [test, setTest] = useState("");
  const [value, setValue] = useState("");
  const [refRange, setRefRange] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!test.trim()) return alert("Enter test name");

    const newTest = { test, value, refRange, unit };
    onAdd(newTest);

    setTest("");
    setValue("");
    setRefRange("");
    setUnit("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 mt-6 text-center tracking-wide text-gray-800">
  Additional Reports
</h2>

<div className="max-w-5xl mx-auto">
  <form
    onSubmit={handleSubmit}
    className="
      bg-white rounded-2xl shadow-lg border border-gray-200 p-6
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-5
      transition-all duration-300
    "
  >
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Test Name</label>
      <input
        placeholder="Enter test name"
        className="
          border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          p-2 rounded-md w-full transition-all duration-200
        "
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Value</label>
      <input
        placeholder="Enter value"
        className="
          border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          p-2 rounded-md w-full transition-all duration-200
        "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Ref Range</label>
      <input
        placeholder="Enter reference range"
        className="
          border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          p-2 rounded-md w-full transition-all duration-200
        "
        value={refRange}
        onChange={(e) => setRefRange(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Unit</label>
      <input
        placeholder="Enter unit"
        className="
          border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          p-2 rounded-md w-full transition-all duration-200
        "
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
    </div>

    <button
      className="
        mt-3 lg:mt-4
        bg-blue-600 hover:bg-blue-700 active:scale-95
        text-white font-semibold py-3 rounded-lg
        shadow-md hover:shadow-lg 
        sm:col-span-2 lg:col-span-4
        w-full transition-all duration-200 blueBtn cursPointer 
      "
    >
      Add Report
    </button>
  </form>
</div>

    </>
  );
}
