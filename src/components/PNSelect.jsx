export default function PNSelect({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="POSITIVE">POSITIVE</option>
        <option value="NEGATIVE">NEGATIVE</option>
      </select>
    </div>
  );
}
