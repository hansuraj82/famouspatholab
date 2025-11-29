export default function NumberInput({ label, value, onChange }) {
  return (
    <div>
        <h2 className="font-semibold mb-2 text-gray-700">{`${label} VALUE `}</h2>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="number"
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}
