export default function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      >
        <option value="">--Select--</option>
        {options.map((op,i)=>(
          <option key={i} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
