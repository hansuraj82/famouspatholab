// export default function PNSelect({ label, value, onChange }) {
//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         className="border p-2 rounded w-full"
//         value={value}
//         onChange={(e)=>onChange(e.target.value)}
//       >
//         <option value="">--Select--</option>
//         <option value="POSITIVE">POSITIVE</option>
//         <option value="NEGATIVE">NEGATIVE</option>
//       </select>
//     </div>
//   );
// }



// export default function PNSelect({ label, value, onChange }) {
//   const isPositive = value === "POSITIVE";

//   return (
//     <div className="flex flex-col gap-1">
//       <label className="text-sm font-semibold text-gray-700 tracking-wide">
//         {label}
//       </label>

//       <button
//         type="button"
//         onClick={() =>
//           onChange(isPositive ? "NEGATIVE" : "POSITIVE")
//         }
//         className={`
//           relative inline-flex items-center w-28 h-10 rounded-full 
//           transition-colors duration-300
//           ${isPositive ? "bg-green-500" : "bg-red-500"}
//         `}
//       >
//         <span
//           className={`
//             absolute left-1 top-1 h-8 w-12 bg-white rounded-full shadow 
//             transform transition-transform duration-300 flex items-center justify-center text-sm font-semibold
//             ${isPositive ? "translate-x-16" : "translate-x-0"}
//           `}
//         >
//           {isPositive ? "POS" : "NEG"}
//         </span>
//       </button>
//     </div>
//   );
// }







export default function PNSelect({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700 tracking-wide">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full p-2.5 rounded-lg border border-gray-300 
          bg-white text-gray-800
          shadow-sm
          transition-all duration-200
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          hover:border-gray-400
        "
      >
        <option value="" disabled>-- Select --</option>
        <option value="POSITIVE">Positive</option>
        <option value="NEGATIVE">Negative</option>
      </select>
    </div>
  );
}
