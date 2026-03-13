// ubah format tanggal
export function dateFormat(date, output) {
  // jika hari ini===date yang dikirim
  const inputDate = new Date(date).toDateString();
  const now = new Date().toDateString();

  if (output == "time") {
    // jika output yang diminta adalah waktu
    return new Date(date).toLocaleTimeString("id-ID", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
  } else {
    //   jika date==hari ini
    if (inputDate == now) return "Hari ini";

    //   jika date==kemarin
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (inputDate == yesterday.toDateString()) return "Kemarin";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

// ubah format uang
export function moneyFormat(amount, withCurrencySign) {
  // pastikan uang adalah int
  const money = Number(amount);

  // set parameter
  const param = withCurrencySign
    ? {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      }
    : {
        currency: "IDR",
        minimumFractionDigits: 2,
      };
  return money.toLocaleString("id-ID", param);
}

// ubah direction (debit/credit) jadi -/+
export function transactionDirection(direction) {
  return direction === "in" ? "+" : "-";
}
