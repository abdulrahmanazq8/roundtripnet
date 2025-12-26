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
    alert("✅ تم تجهيز طلبك بنجاح!\n\nسيتم الآن فتح تطبيق واتساب. تأكد من ظهور جميع بياناتك في الرسالة ثم انقر على زر الإرسال.\n\nشكراً لاختيارك راوند تريب!");
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  // ربط أزرار الواتساب
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    el.addEventListener("click", () => openWhatsApp(el.getAttribute("data-whatsapp")));
  });

  // banner fallback (للصفحة الرئيسية فقط)
  const banner = document.querySelector(".banner");
  if (banner) {
    const img = new Image();
    img.src = "assets/images/banner.jpg";
    img.onerror = function () {
      banner.style.backgroundImage =
        "linear-gradient(rgba(85, 104, 89, 0.85), rgba(175, 181, 152, 0.8)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80')";
    };
  }

  // min date = today
  const today = new Date().toISOString().split("T")[0];
  ["pickupDate","returnDate","hotelCheckIn","hotelCheckOut","honeymoonStartDate","toursStartDate","visaTravelDate"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.min = today;
    });

  // تعبئة selectات (لو موجودة بالصفحة)
  const driverAgeSelect = document.getElementById("driverAge");
  if (driverAgeSelect && driverAgeSelect.options.length <= 1) {
    for (let i = 19; i <= 65; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i + " سنة";
      driverAgeSelect.appendChild(option);
    }
  }

  const totalAdultsSelect = document.getElementById("totalAdults");
  if (totalAdultsSelect && totalAdultsSelect.options.length <= 1) {
    for (let i = 1; i <= 9; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i + " شخص";
      totalAdultsSelect.appendChild(option);
    }
  }

  const childrenCountSelect = document.getElementById("childrenCount");
  if (childrenCountSelect && childrenCountSelect.options.length <= 1) {
    for (let i = 1; i <= 7; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i + " طفل";
      childrenCountSelect.appendChild(option);
    }
  }

  const hotelRoomsSelect = document.getElementById("hotelRooms");
  if (hotelRoomsSelect && hotelRoomsSelect.options.length <= 1) {
    for (let i = 1; i <= 8; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i + " غرفة";
      hotelRoomsSelect.appendChild(option);
    }
  }

  const hotelChildrenSelect = document.getElementById("hotelChildren");
  if (hotelChildrenSelect && hotelChildrenSelect.options.length <= 1) {
    for (let i = 1; i <= 8; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i + " طفل";
      hotelChildrenSelect.appendChild(option);
    }
  }

  // ربط فورمات الإرسال (إذا موجودة)
  bindForms();
});

function formatNowENGB() {
  const now = new Date();
  return now.toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  }).replace(",", "");
}

function bindForms() {
  // car rental
  const carForm = document.getElementById("carRentalForm");
  if (carForm) {
    carForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (typeof checkPassengerLimit === "function" && !checkPassengerLimit()) return;

      const formData = new FormData(e.target);
      const data = {};
      const paymentMethods = [];
      const childAges = [];

      const childrenCount = parseInt(formData.get("childrenCount") || 0);
      for (let i = 1; i <= childrenCount; i++) {
        const age = formData.get(`childAge${i}`);
        if (age) childAges.push(age + " سنوات");
      }

      formData.forEach((value, key) => {
        if (key.startsWith("childAge")) return;
        if (key === "paymentMethod") paymentMethods.push(value);
        else data[key] = value;
      });

      const paymentMethodsStr = paymentMethods.length ? paymentMethods.join("، ") : "غير محدد";
      const childrenInfo = childrenCount > 0 ? `${childrenCount} طفل، أعمارهم: ${childAges.join("، ")}` : "لا يوجد أطفال";
      const returnLocation = data.returnOption === "same" ? "نفس مكان الاستلام" : data.returnLocation;

      const message = `*طلب تأجير سيارة - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.carName || "غير محدد"}
• رقم التواصل: ${data.carPhone || "غير محدد"}
• البريد: ${data.carEmail || "غير محدد"}

*تفاصيل الرحلة:*
• مكان الاستلام: ${data.pickupLocation || "غير محدد"}
• تاريخ الاستلام: ${data.pickupDate || "غير محدد"}
• وقت الاستلام: ${data.pickupTime || "غير محدد"}
• مكان التسليم: ${returnLocation || "غير محدد"}
• تاريخ التسليم: ${data.returnDate || "غير محدد"}
• وقت التسليم: ${data.returnTime || "غير محدد"}

*تفاصيل السيارة:*
• نوع السيارة المفضل: ${data.carType || "غير محدد"}
• عمر السائق: ${data.driverAge || "غير محدد"} سنة
• عدد البالغين: ${data.totalAdults || "غير محدد"}
• الأطفال: ${childrenInfo}
• شنط كبيرة: ${data.largeBags || "0"}
• شنط صغيرة: ${data.smallBags || "0"}

*معلومات إضافية:*
• دول أخرى ستزورونها غير بلد الاستلام والتسليم: ${data.otherCountries || "لا يوجد"}
• طريقة الدفع المفضلة: ${paymentMethodsStr}

*ملاحظات إضافية:*
${data.carNotes || "لا توجد ملاحظات"}

*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.carPhone || "غير محدد"}

--- راوند تريب - خدمة تأجير السيارات ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }

  // driver
  const driverForm = document.getElementById("driverForm");
  if (driverForm) {
    driverForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {};
      const tripTypes = [];

      formData.forEach((value, key) => {
        if (key === "tripType") tripTypes.push(value);
        else data[key] = value;
      });

      const tripTypesStr = tripTypes.length ? tripTypes.join("، ") : "غير محدد";

      const message = `*طلب خدمة سائق خاص - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.driverName}
• رقم التواصل: ${data.driverPhone}
• البريد: ${data.driverEmail || "غير محدد"}
• المدينة/الدولة: ${data.driverCity}

*تفاصيل الرحلة:*
• مكان الانطلاق: ${data.fromLocation}
• مكان الوصول: ${data.toLocation}
• عدد الأشخاص: ${data.driverPassengers} (بما فيهم الأطفال)
• نوع الرحلات المطلوبة: ${tripTypesStr}
• نوع السيارة: ${data.driverCarType}
• عدد الأيام: ${data.driverServiceDays}

*ملاحظات إضافية:*
${data.driverNotes || "لا توجد ملاحظات"}

${data.driverPassengers === "more" ? "*ملاحظة:* سيتم تخصيص سيارة إضافية حيث أن الحد الأقصى للركاب هو 8 + السائق\n\n" : ""}*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.driverPhone}

--- راوند تريب - خدمة السائق الخاص ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }

  // honeymoon
  const honeymoonForm = document.getElementById("honeymoonForm");
  if (honeymoonForm) {
    honeymoonForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {};
      const services = [];

      formData.forEach((value, key) => {
        if (key === "honeymoonService") services.push(value);
        else data[key] = value;
      });

      const servicesStr = services.length ? services.join("، ") : "غير محدد";

      const message = `*طلب رحلة شهر العسل - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.honeymoonName}
• رقم التواصل: ${data.honeymoonPhone}
• البريد: ${data.honeymoonEmail || "غير محدد"}

*تفاصيل الرحلة:*
• الوجهة: ${data.honeymoonDestination || "غير محدد"}
• تاريخ السفر: ${data.honeymoonStartDate || "غير محدد"}
• مدة الرحلة: ${data.honeymoonDuration} يوم
• الميزانية: ${data.honeymoonBudget || "0"} ${data.honeymoonCurrency || "دينار كويتي"}

*الخدمات المطلوبة:*
${servicesStr}

*طلبات خاصة:*
${data.honeymoonSpecialRequests || "لا توجد طلبات خاصة"}

*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.honeymoonPhone}

--- راوند تريب - رحلات شهر العسل ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }

  // tours
  const toursForm = document.getElementById("toursForm");
  if (toursForm) {
    toursForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {};
      const activities = [];

      formData.forEach((value, key) => {
        if (key === "tourActivity") activities.push(value);
        else data[key] = value;
      });

      const activitiesStr = activities.length ? activities.join("، ") : "غير محدد";

      const message = `*طلب تنظيم رحلة/فعالية - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.toursName}
• رقم التواصل: ${data.toursPhone}
• البريد: ${data.toursEmail || "غير محدد"}

*تفاصيل الرحلة:*
• نوع الخدمة: ${data.toursType}
• الوجهة: ${data.toursDestination}
• عدد الأشخاص: ${data.toursPeople}
• تاريخ السفر: ${data.toursStartDate || "غير محدد"}
• مدة الرحلة: ${data.toursDuration || "غير محدد"} يوم
• الميزانية للشخص: ${data.toursBudget || "0"} ${data.toursCurrency || "دينار كويتي"}

*الأنشطة المطلوبة:*
${activitiesStr}

*تفاصيل إضافية:*
${data.toursSpecialRequests || "لا توجد تفاصيل إضافية"}

*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.toursPhone}

--- راوند تريب - تنظيم الرحلات والفعاليات ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }

  // visa
  const visaForm = document.getElementById("visaForm");
  if (visaForm) {
    visaForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      const message = `*طلب تأشيرة سفر - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.visaName}
• رقم التواصل: ${data.visaPhone}
• البريد: ${data.visaEmail || "غير محدد"}
• الجنسية: ${data.visaNationality}

*تفاصيل التأشيرة:*
• الدولة المراد السفر إليها: ${data.visaDestination}
• تاريخ السفر المتوقع: ${data.visaTravelDate || "غير محدد"}
• عدد الأشخاص: ${data.visaPeople}
• نوع التأشيرة: ${data.visaType || "غير محدد"}

*ملاحظات إضافية:*
${data.visaNotes || "لا توجد ملاحظات"}

*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.visaPhone}

--- راوند تريب - خدمة التأشيرات ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }

  // hotel
  const hotelForm = document.getElementById("hotelForm");
  if (hotelForm) {
    hotelForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = {};
      const childAges = [];

      const childrenCount = parseInt(formData.get("hotelChildren") || 0);
      for (let i = 1; i <= childrenCount; i++) {
        const age = formData.get(`hotelChildAge${i}`);
        if (age) childAges.push(age + " سنة");
      }

      const roomCount = parseInt(formData.get("hotelRooms") || 1);
      const roomDetails = [];
      for (let i = 1; i <= roomCount; i++) {
        const adults = formData.get(`room${i}Adults`) || "غير محدد";
        const children = parseInt(formData.get(`room${i}Children`) || 0);
        const roomChildrenAges = [];

        for (let j = 1; j <= children; j++) {
          const age = formData.get(`room${i}ChildAge${j}`);
          if (age) roomChildrenAges.push(age + " سنة");
        }

        if (roomCount > 1) {
          roomDetails.push(`الغرفة ${i}: ${adults} بالغ${children > 0 ? `، ${children} طفل${roomChildrenAges.length ? ` (أعمارهم: ${roomChildrenAges.join("، ")})` : ""}` : ""}`);
        }
      }

      formData.forEach((value, key) => {
        if (key.startsWith("room") || key.startsWith("hotelChildAge")) return;
        data[key] = value;
      });

      const childrenInfo = childrenCount > 0 ? `${childrenCount} طفل، أعمارهم: ${childAges.join("، ")}` : "لا يوجد أطفال";

      const message = `*طلب حجز فندق - راوند تريب*

*المعلومات الشخصية:*
• الاسم: ${data.hotelName || "غير محدد"}
• رقم التواصل: ${data.hotelPhone || "غير محدد"}
• البريد: ${data.hotelEmail || "غير محدد"}

*تفاصيل الحجز:*
• الوجهة: ${data.hotelDestination || "غير محدد"}
• تاريخ الوصول: ${data.hotelCheckIn || "غير محدد"}
• تاريخ المغادرة: ${data.hotelCheckOut || "غير محدد"}
• عدد الغرف: ${data.hotelRooms || "غير محدد"}
• الأطفال: ${childrenInfo}
• نوع الفندق: ${data.hotelType || "غير محدد"}

${roomCount > 1 ? `*تفاصيل الغرف:*\n${roomDetails.join("\n")}\n\n` : ""}*طلبات خاصة:*
${data.hotelSpecialRequests || "لا توجد طلبات خاصة"}

*تم إرسال الطلب في:* ${formatNowENGB()}
*رقم التواصل:* ${data.hotelPhone || "غير محدد"}

--- راوند تريب - خدمة حجز الفنادق ---`;

      sendWhatsAppMessage(message);
      setTimeout(() => e.target.reset(), 1200);
    });
  }
}
