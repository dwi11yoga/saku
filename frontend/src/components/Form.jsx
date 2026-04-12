import { CirclePlus, LoaderCircle } from "lucide-react";
import InputValidation from "./InputValidation";
import { useEffect, useRef, useState } from "react";
import Frimousse from "../utils/Frimousse";

// input biasa
export function Input({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="">
      <label htmlFor={id} className="text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type ?? "text"}
        value={value ?? ""}
        onChange={onChange}
        className={`${error ? "border-red-600" : ""} outline-none focus:border-b-2 w-full transition-all duration-75 ease-in-out text-xl font-semibold ${value === "" && "text-neutral-500"}`}
        placeholder={placeholder ?? `Ketik ${label.toLowerCase()}...`}
      />
      {error && <InputValidation message={error} />}
    </div>
  );
}

// input textarea
export function TextArea({ label, id, value, placeholder, onChange, error }) {
  return (
    <div className="">
      <label htmlFor={id} className="text-neutral-500">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        className={`${error ? "border-red-600" : ""} outline-none h-8 max-h-64 focus:border-b-2 w-full transition-all duration-75 ease-in-out text-xl font-semibold`}
        placeholder={placeholder ?? `Ketik ${label.toLowerCase()}...`}
      />
      {/* error */}
      {error && <InputValidation message={error} />}
    </div>
  );
}

// input select
export function Select({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}) {
  return (
    <div className="">
      <label htmlFor={id} className="text-neutral-500">
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={`${error ? "border-red-600" : ""} cursor-pointer outline-none focus:border-b-2 w-full text-xl ${value === "" && "text-neutral-500"} font-semibold transition-all duration-75 ease-in-out`}
      >
        <option value="">
          {placeholder ?? `Pilih ${label.toLowerCase()}`}
        </option>
        {/* foreach option */}
        {Array.isArray(options) &&
          options.map((option, i) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
      </select>
      {error && <InputValidation message={error} />}
    </div>
  );
}

// input emoji
export function Emoji({ label, id, value, onChange, error }) {
  // set tampil/tidaknya icon picker
  const [showIconPicker, setShowIconPicker] = useState(false);
  // deteksi klik diluar input emoji
  const pickerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowIconPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="" ref={pickerRef}>
      <label htmlFor="emoji" className="text-neutral-500">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          // name={id}
          type="text"
          value={value}
          readOnly
          onClick={() => setShowIconPicker(true)}
          className={`outline-none focus:border-b-2 w-full transition-all duration-75 ease-in-out font-semibold ${value === "" ? "text-xl" : "text-4xl"}`}
          placeholder="Pilih emoji..."
        />
        {showIconPicker && (
          <div className={`absolute ${value === "" ? "top-10" : "top-12"}`}>
            <Frimousse
              name={id}
              onChange={(emoji) => {
                // setForm({ ...form, [id]: emoji });
                onChange(emoji);
                setShowIconPicker(false);
              }}
            />
          </div>
        )}
      </div>
      {error && <InputValidation message={error} />}
    </div>
  );
}

// buton submit
export function Button({ text, isSaving, icon }) {
  const Icon = icon ?? CirclePlus;
  return (
    <button
      disabled={isSaving}
      className={`w-fit bg-custom-green/20 hover:bg-custom-green/30 rounded-xl hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out p-5 flex items-center gap-2 ${isSaving ? "cursor-progress" : "cursor-pointer"}`}
    >
      {!isSaving ? (
        <div className="flex items-center gap-2">
          {text}
          <Icon />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          Menyimpan...
          <div className="animate-spin">
            <LoaderCircle />
          </div>
        </div>
      )}
    </button>
  );
}
