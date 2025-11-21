import React, { useEffect, useState } from "react";
import fs from "fs";
import path from "path";

export default function ReportHistory() {
  const [reports, setReports] = useState([]);

  // useEffect(() => {
  //   window.electronAPI.readReports().then((data) => setReports(data.reports));
  // }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Report History</h1>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-3">S.No</th>
            <th className="p-3">Patient Name</th>
            <th className="p-3">Date</th>
            <th className="p-3">Tests</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={r.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{r.patientName}</td>
              <td className="p-3">{r.date}</td>
              <td className="p-3">{r.tests.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
