import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import axios from "../utils/axios";
import { CirclePlus, LoaderCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import Frimousse from "../utils/Frimousse";
import InputValidation from "../components/InputValidation";
import FlashMessage from "../components/FlashMessage";
import walletColor from "../utils/walletColor";
import { Button, Emoji, Input, TextArea } from "../components/Form";

export default function AddWallet() {
  // simpan data form
  const [form, setForm] = useState({
    user_id: 1,
    emoji: "",
    name: "",
    initial_balance: null,
    color: "green",
    note: "",
  });

  // menyimpan validasi error
  const [errors, setErrors] = useState({});
  // menyimpan flash message
  const [flash, setFlash] = useState(null);
  // simpan apakah proses simpan sedang berlangsung/tidak
  const [saving, setSaving] = useState(false);

  // validasi
  const fieldSchemas = z.object({
    user_id: z.number(),
    name: z
      .string()
      .nonempty("Nama harus diisi")
      .min(3, "Nama minimal memiliki 3 karakter")
      .max(50, "Nama tidak boleh lebih dari 50 karakter"),
    emoji: z.string().nonempty("Icon harus dipilih"),
    color: z.string().nonempty("Warna harus dipilih"),
    initial_balance: z.number("Saldo awal harus berupa angka"),
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
      const res = await axios.post("/wallet", {
        user_id: form.user_id,
        icon: form.emoji,
        color: form.color,
        name: form.name,
        initial_balance: form.initial_balance,
        note: form.note,
      });
      res.status === 200 &&
        setFlash({
          type: "success",
          message: "Kantong baru telah berhasil dibuat.",
        });
      console.log(res.data);
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
            message: `Gagal menyimpan data: ${message}.`,
          });
          break;
      }
    } finally {
      setSaving(false);
      setTimeout(() => setFlash(null), 3000); // buat flashmasage berdurasi 3 detik (3000 ms)
    }
  }

  // daftar warna yang dapat dilih oleh pengguna
  const colors = [
    { id: "green", label: "Hijau" },
    { id: "red", label: "Merah" },
    { id: "yellow", label: "Kuning" },
    { id: "blue", label: "Biru" },
    { id: "purple", label: "Ungu" },
    { id: "brown", label: "Coklat" },
  ];

  return (
    <DashboardLayout title={"Tambah kantong"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="flex flex-col justify-center items-center min-h-[80vh]"
      >
        <div className="w-1/3 space-y-2">
          {/* icon */}
          <Emoji
            label={"Icon"}
            id={"emoji"}
            value={form.emoji}
            error={errors.emoji}
            onChange={(emoji) => handleInputChange("emoji", emoji)}
          />
          {/* warna */}
          <div className="">
            <div className="text-neutral-500">Warna</div>
            {/* pilihan warna */}
            <div className="grid grid-cols-4 gap-1">
              {colors.map((color, i) => (
                <div className="w-full" key={i}>
                  <input
                    className="sr-only"
                    type="radio"
                    name="color"
                    id={color.id}
                    value={color.id}
                    checked={color.id === form.color}
                    onChange={(e) => {
                      setForm({ ...form, color: e.target.value });
                    }}
                  />
                  <label
                    htmlFor={color.id}
                    className={`${walletColor(color.id).background} p-3 block rounded-sm cursor-pointer ${form.color === color.id ? "outline-2" : ""}`}
                  >
                    {color.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.color && <InputValidation message={errors.color} />}
          </div>
          {/* nama kategori */}
          <Input
            label={"Nama kantong"}
            id={"name"}
            type={"text"}
            value={form.name}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.name}
            placeholder={"Ketik nama..."}
          />

          {/* saldo awal */}
          <Input
            label={"Saldo awal"}
            id={"initial_balance"}
            type={"number"}
            value={form.initial_balance}
            onChange={(e) =>
              handleInputChange(e.target.name, Number(e.target.value))
            }
            error={errors.initial_balance}
            placeholder={"Ketik jumlah saldo..."}
          />

          {/* Catatan */}
          <TextArea
            label={"Catatan"}
            id={"note"}
            value={form.note}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.note}
          />
          <div className=""></div>

          {/* tombol submit */}
          <Button text={"Tambah kantong"} isSaving={saving} />
        </div>
      </form>

      {/* flash massage */}
      {flash && (
        <FlashMessage
          flash={flash}
          url={
            flash.type === "success" ? { link: "/kantong", text: "Lihat" } : ""
          }
        />
      )}
    </DashboardLayout>
  );
}
