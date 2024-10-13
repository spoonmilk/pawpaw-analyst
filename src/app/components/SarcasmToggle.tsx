import ScoreTOS from "./ScoreTOS";

export default function SarcasmToggle({ toggle, setToggle }: { toggle: boolean, setToggle: any }) {
  return (
    <label
      htmlFor="AcceptConditions"
      className={`relative inline-block h-8 w-16 cursor-pointer rounded-full transition-all duration-300 ease-in-out [-webkit-tap-highlight-color:_transparent] ${toggle ? 'bg-purple-500' : 'bg-blue-300'}`}>
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only"
        onClick={() => setToggle(!toggle)}
      />

      <span
        className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ease-in-out transform peer-checked:translate-x-8 flex items-center justify-center">
        <h1 className="m-0 p-0 text-l" style={{ userSelect: 'none' }}>
          {toggle ? '😈' : '😇'}
        </h1>
      </span>
    </label>
  );
}