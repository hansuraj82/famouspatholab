export default function TimeInput({ label, min, sec, onMinChange, onSecChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          className="border p-2 rounded w-1/2"
          value={min}
          onChange={(e)=>onMinChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sec"
          className="border p-2 rounded w-1/2"
          value={sec}
          onChange={(e)=>onSecChange(e.target.value)}
        />
      </div>
    </div>
  );
}
