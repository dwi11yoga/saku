import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button, Input, Select, TextArea } from "../components/Form";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import axios from "../utils/axios";
import z from "zod";
import FlashMessage from "../components/FlashMessage";
import InputValidation from "../components/InputValidation";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export default function AddTransaction() {
  const title = "Tambah transaksi baru";
  //   data form
  const emptyForm = {
    user_id: 1,
    category: "",
    wallet: "",
    direction: "out",
    amount: "",
    transaction_date: "",
    transaction_time: "",
    location: "",
    note: "",
  };
  const [form, setForm] = useState(emptyForm);

  // dapatkan data kategori dan wallet
  const [categories, setCategories] = useState({});
  const [wallets, setWallets] = useState({});
  useEffect(() => {
    // categori
    axios
      .get("/categories", {
        params: {
          user_id: 1,
        },
      })
      .then((res) => {
        const cleanData = res.data.map((data) => {
          return { value: data.id, text: data.icon + " " + data.name };
        });
        setCategories(cleanData);
      });
    // wallet
    axios
      .get("/wallets", {
        params: {
          user_id: 1,
        },
      })
      .then((res) => {
        const cleanData = res.data.map((data) => {
          return { value: data.id, text: data.icon + " " + data.name };
        });
        setWallets(cleanData);
      });
  }, []);

  // validasi
  const fieldSchemas = z.object({
    user_id: z.number(),
    category: z
      .number("Kategori harus dipilih")
      .min(1, "Kategori harus dipilih"),
    wallet: z.number("Kategori harus dipilih").min(1, "Kantong harus dipilih"),
    direction: z.enum(["in", "out"], "Jenis transaksi yang dipilih salah"),
    amount: z
      .number("Besar transaksi harus berupa angka")
      .min(0, "Besar transaksi tidak boleh negatif")
      .max(999999999999, "Nominal terlalu besar"),
    transaction_date: z.string().nonempty("Tanggal transaksi harus diisi"),
    transaction_time: z.string().nonempty("Waktu transaksi harus diisi"),
    location: z
      .string()
      .max(50, "Lokasi tidak boleh lebih dari 50 karakter")
      .optional(),
    note: z
      .string()
      .max(100, "Catatan tidak boleh lebih dari 100 karakter")
      .optional(),
  });
  // Helper untuk mengambil schema per field (untuk onChange)
  const fieldSchema = fieldSchemas.shape;

  // handle onchange input
  function handleInputChange(name, value) {
    // update form
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // validasi form yang diisi
    const validationResult = fieldSchema[name].safeParse(value);
    // simpan hasil validasi ke error
    var newErrors = {};
    if (!validationResult.success) {
      newErrors = {
        ...errors,
        [name]: validationResult.error.issues[0].message,
      };
    } else {
      newErrors = { ...errors };
      delete newErrors[name];
    }
    setErrors(newErrors);
  }

  // fungsi simpan
  async function save() {
    // validasi
    const validationResult = fieldSchemas.safeParse(form);
    if (!validationResult.success) {
      // jika validasi gagal
      const newErrors = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      // hentikan program
      return;
    }

    // jika validasi berhasil
    try {
      setSaving(true);
      // konversi waktu menjadi utc agar singkron dengan laravel/database
      const localDateTime = `${form.transaction_date}T${form.transaction_time}`;
      const utcDateTime = fromZonedTime(localDateTime, "Asia/Jakarta");

      // simpan
      const res = await axios.post("/transactions", {
        ...form,
        datetime: utcDateTime,
      });
      res.status === 200 &&
        setFlash({
          type: "success",
          message: "Transaksi baru berhasil dibuat.",
          url: {
            link: `/transactions/${res.data.id}`,
            text: "Lihat",
          },
        });
      setForm(emptyForm);
      console.log(res.data);
    } catch (err) {
      // const status = err.response.status;
      const message = err.response.data.message;
      setFlash({
        type: "failed",
        message: `Gagal menyimpan transaksi: ${message}`,
      });
    } finally {
      setSaving(false);
      setTimeout(() => setFlash(null), 3000); // 3 detik
    }
  }

  //   validasi error
  const [errors, setErrors] = useState({});
  // state sedang save/tidak
  const [saving, setSaving] = useState(false);
  // flashdata
  const [flash, setFlash] = useState(null);

  return (
    <DashboardLayout title={title}>
      <div className="flex justify-center items-center min-h-[80vh]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          className="flex flex-col gap-2 w-1/3"
        >
          {/* besar transaksi */}
          <Input
            label={"Besar transaksi"}
            id={"amount"}
            type={"number"}
            value={form.amount}
            onChange={(e) =>
              handleInputChange(e.target.name, Number(e.target.value))
            }
            error={errors.amount}
          />
          {/* direction transaksi */}
          <div className="">
            <div className="text-neutral-500">Jenis transaksi</div>
            <div className="flex gap-1">
              {Array.from([
                { id: "out", text: "Keluar", icon: ArrowUpRight },
                { id: "in", text: "Masuk", icon: ArrowDownLeft },
              ]).map((direction) => {
                const Icon = direction.icon;
                return (
                  <div key={direction.id} className="">
                    <input
                      type="radio"
                      name="direction"
                      id={direction.id}
                      value={direction.id}
                      checked={form.direction === direction.id}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      className="sr-only"
                    />
                    <label
                      htmlFor={direction.id}
                      className={`flex items-center p-3 cursor-pointer rounded-sm ${form.direction === direction.id && "outline outline-2"} ${direction.id === "in" ? "bg-custom-green/10 hover:bg-custom-green/20" : "bg-custom-red/20 hover:bg-custom-red/40"}`}
                    >
                      <Icon /> {direction.text}
                    </label>
                  </div>
                );
              })}
            </div>
            <InputValidation message={errors.direction} />
          </div>
          {/* Kategori */}
          <Select
            label={"Kategori"}
            id={"category"}
            value={form.category}
            onChange={(e) =>
              handleInputChange(e.target.name, Number(e.target.value))
            }
            error={errors.category}
            options={categories}
          />
          {/* Kantong */}
          <Select
            label={"Kantong"}
            id={"wallet"}
            value={form.wallet}
            onChange={(e) =>
              handleInputChange(e.target.name, Number(e.target.value))
            }
            error={errors.wallet}
            options={wallets}
          />
          {/* tanggal */}
          <Input
            label={"Tanggal transaksi"}
            id={"transaction_date"}
            type={"date"}
            value={form.transaction_date}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.transaction_date}
          />
          {/* waktu */}
          <Input
            label={"Waktu transaksi"}
            id={"transaction_time"}
            type={"time"}
            value={form.transaction_time}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.transaction_time}
          />
          {/* lokasi */}
          <Input
            label={"Lokasi"}
            id={"location"}
            type={"text"}
            value={form.location}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.location}
          />
          {/* catatan */}
          <TextArea
            label={"Catatan"}
            id={"note"}
            type={"textarea"}
            value={form.note}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={errors.note}
          />

          {/* button submit */}
          <Button text={"Simpan transaksi"} isSaving={saving} />
        </form>
      </div>

      {/* flash massage */}
      {flash && <FlashMessage flash={flash} />}
    </DashboardLayout>
  );
}
