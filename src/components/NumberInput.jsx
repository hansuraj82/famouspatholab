// export default function NumberInput({ label, value, onChange }) {
//   return (
//     <div>
//         <h2 className="font-semibold mb-2 text-gray-700">{`${label} VALUE `}</h2>
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type="number"
//         className="border p-2 rounded w-full"
//         value={value}
//         onChange={(e)=>onChange(e.target.value)}
//       />
//     </div>
//   );
// }





export default function NumberInput({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">

      {/* Input Label */}
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      {/* Number Input */}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full p-3 rounded-lg border border-gray-300 
          bg-white text-gray-800
          shadow-sm
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          hover:border-gray-400
          transition-all duration-200
        "
        placeholder={`Enter ${label.toLowerCase()} value`}
      />
    </div>
  );
}
