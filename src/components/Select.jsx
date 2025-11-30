// export default function Select({ label, value, options, onChange }) {
//   return (
//     <div>
//       <label className="block font-medium mb-1">{label}</label>
//       <select
//         className="border p-2 rounded w-full"
//         value={value}
//         onChange={(e)=>onChange(e.target.value)}
//       >
//         <option value="">--Select--</option>
//         {options.map((op,i)=>(
//           <option key={i} value={op}>{op}</option>
//         ))}
//       </select>
//     </div>
//   );
// }


export default function Select({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="text-sm font-semibold text-gray-700 tracking-wide">
        {label}
      </label>

      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900
          shadow-sm
          hover:border-gray-400
          focus:ring-2 focus:ring-blue-200 focus:border-blue-500
          transition-all duration-200
          cursor-pointer
        "
      >
        <option value="" disabled>
          -- Select {label} --
        </option>

        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
