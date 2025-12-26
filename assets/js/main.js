// رقم الواتساب الرئيسي للشركة
const COMPANY_WA = "96565750302";

// فتح واتساب برسالة
function sendToWhatsApp(message){
  const url = `https://wa.me/${COMPANY_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// توحيد "اليوم" كحد أدنى للتواريخ
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    el.min = today;
  });

  // لو banner.jpg غير موجود داخل assets
  const banner = document.querySelector(".banner");
  if (banner) {
    const img = new Image();
    img.src = "assets/banner.jpg";
    img.onerror = () => {
      banner.style.backgroundImage =
        `linear-gradient(rgba(85,104,89,.82), rgba(175,181,152,.78)),
         url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80")`;
    };
  }
});
