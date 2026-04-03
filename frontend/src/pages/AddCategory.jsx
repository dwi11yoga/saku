import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import axios from "../utils/axios";
import { CirclePlus, LoaderCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import Frimousse from "../utils/Frimousse";
import InputValidation from "../components/InputValidation";
import FlashMessage from "../components/FlashMessage";

export default function AddCategory() {
  // simpan data form
  const [form, setForm] = useState({
    user_id: 1,
    name: "",
    emoji: "",
    note: "",
  });
  // simpan tampil/tidaknya icon picker
  const [showIconPicker, setShowIconPicker] = useState(false);
  // menyimpan validasi error
  const [errors, setErrors] = useState({});
  // menyimpan flash message
  const [flash, setFlash] = useState(null);
  // simpan apakah proses simpan sedang berlangsung/tidak
  const [saving, setSaving] = useState(false);

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

  // validasi
  const fieldSchemas = z.object({
    user_id: z.number(),
    name: z
      .string()
      .nonempty("Nama harus diisi")
      .min(3, "Nama minimal memiliki 3 karakter")
      .max(50, "Nama tidak boleh lebih dari 50 karakter"),
    emoji: z.string().nonempty("Icon harus dipilih"),
    note: z.string().max(100, "Catatan tidak boleh lebih dari 100 karakter"),
  });
  // Helper untuk mengambil schema per field (untuk onChange)
  const fieldSchema = fieldSchemas.shape;

  // fungsi untuk handle input saat diupdate
  const handleInputChange = (name, value) => {
    // update form
    const updatedForm = {
      ...form,
      [name]: value, // nama variabel akan dinamis jika pakai []
    };
    setForm(updatedForm);

    // validasi input yang berubah
    if (fieldSchema[name]) {
      const result = fieldSchema[name].safeParse(value);

      // simpan hasil validasi ke $errors
      var newError;
      if (!result.success) {
        newError = { ...errors, [name]: result.error.issues[0].message };
      } else {
        newError = { ...errors };
        delete newError[name];
      }
      setErrors(newError);
    }
  };

  // simpan kategori baru
  async function save() {
    // validasi
    const validationResult = fieldSchemas.safeParse(form);
    if (!validationResult.success) {
      // jika gagal
      const newError = {};

      validationResult.error.issues.forEach((issue) => {
        newError[issue.path[0]] = issue.message;
      });
      setErrors(newError);
      return;
    }

    // jika sukses, kirim ke backend untuk disimpan
    try {
      // set saving menjadi true
      setSaving(true);

      // simpan
      const res = await axios.post("/categories", {
        name: form.name,
        user_id: form.user_id,
        icon: form.emoji,
        note: form.note,
      });
      res.status === 200 &&
        setFlash({
          type: "success",
          message: "Kategori baru telah berhasil dibuat.",
        });
    } catch (error) {
      const status = error.response.status;
      const message = error.response.data.message;
      switch (status) {
        case 422:
          setFlash({
            type: "failed",
            message: `Gagal menyimpan data: ${message}`,
          });
          break;
        default:
          setFlash({
            type: "failed",
            message: `Gagal menyimpan data.`,
          });
          break;
      }
    } finally {
      setSaving(false);
      setTimeout(() => setFlash(null), 3000); // buat flashmasage berdurasi 3 detik (3000 ms)
    }
  }

  return (
    <DashboardLayout title={"Tambah kategori"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="flex flex-col justify-center items-center min-h-[80vh]"
      >
        <div className="w-1/3 space-y-2">
          {/* icon */}
          <div className="" ref={pickerRef}>
            <label htmlFor="emoji" className="text-neutral-500">
              Icon
            </label>
            <div className="relative">
              <input
                id="emoji"
                type="text"
                value={form.emoji}
                readOnly
                onClick={() => setShowIconPicker(true)}
                className={`outline-none focus:border-b-2 w-full transition-all duration-75 ease-in-out font-semibold ${form.emoji === "" ? "text-xl" : "text-4xl"}`}
                placeholder="Pilih emoji..."
              />
              {showIconPicker && (
                <div
                  className={`absolute ${form.emoji === "" ? "top-10" : "top-12"}`}
                >
                  <Frimousse
                    name="emoji"
                    onChange={(emoji) => {
                      setForm({ ...form, emoji: emoji });
                      handleInputChange("emoji", emoji);
                      setShowIconPicker(false);
                    }}
                  />
                </div>
              )}
            </div>
            {errors.emoji && <InputValidation message={errors.emoji} />}
          </div>
          {/* nama kategori */}
          <div className="">
            <label htmlFor="category" className="text-neutral-500">
              Nama kategori
            </label>
            <input
              id="category"
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              className={`${errors.name ? "border-red-600" : ""} outline-none focus:border-b-2 w-full transition-all duration-75 ease-in-out text-xl font-semibold`}
              placeholder="Ketik nama..."
            />
            {errors.name && <InputValidation message={errors.name} />}
          </div>
          {/* Catatan */}
          <div className="">
            <label htmlFor="note" className="text-neutral-500">
              Catatan
            </label>
            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              className={`${errors.note ? "border-red-600" : ""} outline-none h-8 max-h-64 focus:border-b-2 w-full transition-all duration-75 ease-in-out text-xl font-semibold`}
              placeholder="Ketik catatan..."
            />
            {/* error */}
            {errors.note && <InputValidation message={errors.note} />}
          </div>

          {/* tombol submit */}
          <button
            disabled={saving}
            className={`bg-custom-green/20 hover:bg-custom-green/30 rounded-xl hover:rounded-[3rem] focus:rounded-[3rem] transition-all ease-in-out p-5 flex items-center gap-2 ${saving ? "cursor-progress" : "cursor-pointer"}`}
          >
            {!saving ? (
              <div className="flex items-center gap-2">
                Tambah kategori
                <CirclePlus />
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
        </div>
      </form>

      {/* flash massage */}
      {flash && (
        <FlashMessage
          flash={flash}
          url={
            flash.type === "success"
              ? { link: "/kategori", text: "Lihat" }
              : ""
          }
        />
      )}
    </DashboardLayout>
  );
}
