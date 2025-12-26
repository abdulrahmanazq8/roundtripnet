function openWhatsApp(phoneNumber) {
  const message = "مرحباً، أريد الاستفسار عن خدمات راوند تريب";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = whatsappUrl;
  } else {
    window.open(whatsappUrl, "_blank");
  }
}

function sendWhatsAppMessage(message) {
  const encodedMessage = encodeURIComponent(message);
  const companyWhatsappNumber = "96565750302";
  const whatsappUrl = `https://wa.me/${companyWhatsappNumber}?text=${encodedMessage}`;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = whatsappUrl;
  } else {
    window.open(whatsappUrl, "_blank");
  }

  setTimeout(() => {
    alert("✅ تم تجهيز طلبك بنجاح!\n\nسيتم الآن فتح تطبيق واتساب. تأكد من ظهور جميع بياناتك ثم اضغط إرسال.\n\nشكراً لاختيارك راوند تريب!");
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  // حقول التاريخ/الوقت showPicker
  const dateTimeInputs = document.querySelectorAll(".date-time-input");
  dateTimeInputs.forEach((container) => {
    const input = container.querySelector("input");
    if (!input) return;

    container.addEventListener("click", function (e) {
      if (e.target !== input) {
        input.focus();
        if (input.type === "date" || input.type === "time") {
          if (input.showPicker) input.showPicker();
          else input.click();
        }
      }
    });
  });

  // حد أدنى للتواريخ = اليوم
  const today = new Date().toISOString().split("T")[0];
  [
    "pickupDate",
    "returnDate",
    "hotelCheckIn",
    "hotelCheckOut",
    "honeymoonStartDate",
    "toursStartDate",
    "visaTravelDate",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.min = today;
  });
});
