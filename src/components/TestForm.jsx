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
      <h2 className="text-xl font-semibold mb-3 mt-3 text-center">
        ADDITIONAL REPORTS
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          p-3 bg-gray-100 rounded 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-3 items-start
        "
      >
        <input
          placeholder="Test Name"
          className="border p-2 rounded w-full"
          value={test}
          onChange={(e) => setTest(e.target.value)}
        />

        <input
          placeholder="Value"
          className="border p-2 rounded w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          placeholder="Ref Range"
          className="border p-2 rounded w-full"
          value={refRange}
          onChange={(e) => setRefRange(e.target.value)}
        />

        <input
          placeholder="Unit"
          className="border p-2 rounded w-full"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />

        {/* Submit button spans full width on small screens */}
        <button
          className="
            bg-blue-600 text-white px-4 py-2 rounded 
            sm:col-span-2 lg:col-span-4 
            w-full
          "
        >
          Add
        </button>
      </form>
    </>
  );
}
