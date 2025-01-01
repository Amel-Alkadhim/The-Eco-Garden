// Navigation Menu
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
 document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

navLinks.forEach(link => {
 link.addEventListener("click", () => menuOpenButton.click());
});

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
 loop: true,
 grabCursor: true,
 spaceBetween: 25,
 pagination: {
   el: '.swiper-pagination',
   clickable: true,
   dynamicBullets: true,
 },
 navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
 },
 breakpoints: {
   0: { slidesPerView: 1 },
   768: { slidesPerView: 2 },
   1024: { slidesPerView: 3 }
 }
});


// (Contact Form)

// هنا بنحدد الفورم وكل العناصر (الحقل الخاص بالاسم، البريد الإلكتروني، الموضوع، والرسالة) باستخدام DOM
const form = document.querySelector('form'); // استدعاء الفورم الأساسي
const fullName = document.getElementById("name"); // الحقل الخاص باسم المستخدم
const email = document.getElementById("email"); // الحقل الخاص بالبريد الإلكتروني
const subject = document.getElementById("subject"); // الحقل الخاص بموضوع الرسالة
const message = document.getElementById("message"); // الحقل الخاص بنص الرسالة

// تهيئة مكتبة EmailJS (الخدمة المستخدمة لإرسال البريد الإلكتروني)
(function() {
   // إدخال المفتاح العام لمكتبة EmailJS
   emailjs.init("BnLHKUnGNIuG2SD2v");
})();

// دالة إرسال البريد الإلكتروني
function sendEmail() {
   // إظهار رسالة تحميل أثناء إرسال الرسالة
   Swal.fire({
       title: 'Sending...', // عنوان الرسالة
       text: 'Please wait while we send your message', // النص التوضيحي
       allowOutsideClick: false, // منع النقر خارج الرسالة
       showConfirmButton: false, // إخفاء زر التأكيد
       didOpen: () => {
           Swal.showLoading(); // إظهار علامة التحميل
       }
   });

   // إعداد البيانات لإرسالها كمعاملات إلى EmailJS
   const templateParams = {
       from_name: fullName.value, // اسم المرسل
       email_id: email.value, // البريد الإلكتروني للمرسل
       subject: subject.value, // موضوع الرسالة
       message: message.value // نص الرسالة
   };

   // إرسال الرسالة باستخدام خدمة EmailJS
   emailjs.send('service_m6dytwr', 'template_0s316qm', templateParams)
   //service ID
   //template ID

       .then(function(response) {
           // إذا نجح الإرسال
           console.log('SUCCESS!', response.status, response.text); // طباعة النجاح في الكونسول
           Swal.fire({
               title: "Success!", // عنوان الرسالة
               text: "Message sent successfully!", // نص التأكيد
               icon: "success", // أيقونة النجاح
               confirmButtonColor: '#28a745', // لون زر التأكيد
               confirmButtonText: 'Great!' // نص الزر
           });
           form.reset(); // إعادة تعيين الفورم بعد الإرسال
       }, function(error) {
           // إذا فشل الإرسال
           console.log('FAILED...', error); // طباعة الخطأ في الكونسول
           Swal.fire({
               title: "Error!", // عنوان الخطأ
               text: "Failed to send message. Please try again.", // نص الخطأ
               icon: "error", // أيقونة الخطأ
               confirmButtonColor: '#dc3545', // لون زر التأكيد
               confirmButtonText: 'Try Again' // نص الزر
           });
       });
}

// دالة التحقق من الحقول
function checkInputs() {
   const items = document.querySelectorAll(".item"); // جميع الحقول المطلوبة
   let isValid = true; // متغير يحدد إذا كل الحقول صحيحة أم لا

   items.forEach((item, index) => {
       if (item.value.trim() === "") { // التحقق إذا كان الحقل فارغ
           isValid = false; // إذا الحقل فارغ، الإعداد على غير صالح
           item.classList.add("error"); // إضافة تنسيق الخطأ للحقل
           item.parentElement.classList.add("error"); // إضافة تنسيق الخطأ للأب
       } else {
           item.classList.remove("error"); // إزالة الخطأ إذا كان الحقل مليان
           item.parentElement.classList.remove("error");
       }

       // التحقق من صحة البريد الإلكتروني أثناء الكتابة
       if (index === 1) { // إذا كان الحقل هو البريد الإلكتروني
           item.addEventListener("keyup", checkEmail); // إضافة حدث التحقق أثناء الكتابة
       }
   });

   return isValid; // إرجاع النتيجة النهائية
}

// دالة التحقق من صحة البريد الإلكتروني
function checkEmail() {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // نموذج التحقق من البريد
   const errorTxtEmail = document.querySelector(".error-text.email"); // رسالة الخطأ الخاصة بالبريد

   if (!email.value.trim()) { // إذا كان البريد الإلكتروني فارغًا
       email.classList.add("error");
       email.parentElement.classList.add("error");
       errorTxtEmail.innerText = "Email Address can't be blank"; // نص الخطأ
       return false;
   } else if (!emailRegex.test(email.value)) { // إذا كان البريد غير مطابق للنموذج
       email.classList.add("error");
       email.parentElement.classList.add("error");
       errorTxtEmail.innerText = "Please enter a valid email address"; // نص الخطأ
       return false;
   } else {
       email.classList.remove("error"); // إزالة الخطأ إذا كان البريد صالح
       email.parentElement.classList.remove("error");
       errorTxtEmail.innerText = ""; // إزالة نص الخطأ
       return true;
   }
}

// حدث عند إرسال الفورم
form.addEventListener("submit", (e) => {
   e.preventDefault(); // منع الإرسال الافتراضي للفورم

   if (checkInputs() && checkEmail()) { // إذا كانت الحقول والبريد صالحين
       sendEmail(); // استدعاء دالة الإرسال
   } else {
       Swal.fire({
           title: "Form Incomplete", // عنوان التحذير
           text: "Please fill in all fields correctly before submitting.", // نص التحذير
           icon: "warning", // أيقونة التحذير
           confirmButtonColor: '#ffc107', // لون الزر
           confirmButtonText: 'OK' // نص الزر
       });
   }
});

// التحقق في الوقت الحقيقي عند الكتابة في الحقول
document.querySelectorAll('.item').forEach(item => {
   item.addEventListener('input', function() {
       if (this.value.trim() !== '') { // إذا الحقل أصبح مليان
           this.classList.remove('error'); // إزالة تنسيق الخطأ
           this.parentElement.classList.remove('error');
       }
   });
});
