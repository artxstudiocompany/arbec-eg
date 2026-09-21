import type { Locale } from "@/i18n/config";

export type ContactCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  directTitle: string;
  hoursTitle: string;
  hours: string;
  closed: string;
  composerTitle: string;
  composerLead: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  servicePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  copy: string;
  copied: string;
  emailOpened: string;
  localOnly: string;
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  tooShort: string;
  supplies: string;
  contracting: string;
  general: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    eyebrow: "ARBEC · CONTACT",
    title: "Bring the brief.",
    lead: "Tell us what you are planning and we will help route the conversation to the relevant ARBEC team.",
    directTitle: "Direct channels",
    hoursTitle: "Office hours",
    hours: "Saturday–Thursday · 08:00–17:00",
    closed: "Friday · Closed",
    composerTitle: "Prepare a request",
    composerLead: "This composer prepares an email in your device's mail app. Nothing is sent by this site and the details are not stored.",
    name: "Full name",
    email: "E-mail",
    phone: "Phone (optional)",
    service: "Area of interest",
    servicePlaceholder: "Select an area",
    message: "Project details",
    messagePlaceholder: "Briefly describe the work, location, and what you need discussed.",
    submit: "Open email app",
    copy: "Copy request text",
    copied: "Request text copied",
    emailOpened: "Your email app should now be open with the request prepared. Review it before sending.",
    localOnly: "Local-only composer: this website does not send or retain your request.",
    required: "Complete the required fields.",
    invalidEmail: "Enter a valid e-mail address.",
    invalidPhone: "Enter a valid phone number.",
    tooShort: "Add a little more detail.",
    supplies: "Supplies",
    contracting: "Contracting",
    general: "General enquiry",
  },
  ar: {
    eyebrow: "أربك · تواصل معنا",
    title: "أرسل تفاصيلك.",
    lead: "أخبرنا بما تخطط له لنوجّه محادثتك إلى فريق أربك المناسب.",
    directTitle: "قنوات مباشرة",
    hoursTitle: "مواعيد المكتب",
    hours: "السبت–الخميس · ٠٨:٠٠–١٧:٠٠",
    closed: "الجمعة · مغلق",
    composerTitle: "إعداد طلب",
    composerLead: "يُجهّز هذا النموذج رسالة في تطبيق البريد على جهازك. لا يرسل هذا الموقع أي رسالة ولا يحفظ البيانات.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف (اختياري)",
    service: "مجال الاهتمام",
    servicePlaceholder: "اختر مجالًا",
    message: "تفاصيل المشروع",
    messagePlaceholder: "اذكر باختصار الأعمال والموقع وما تريد مناقشته.",
    submit: "فتح تطبيق البريد",
    copy: "نسخ نص الطلب",
    copied: "تم نسخ نص الطلب",
    emailOpened: "يفترض أن يكون تطبيق البريد قد فُتح مع تجهيز الطلب. راجع الرسالة قبل إرسالها.",
    localOnly: "أداة محلية فقط: لا يرسل الموقع طلبك ولا يحتفظ به.",
    required: "أكمل الحقول المطلوبة.",
    invalidEmail: "أدخل بريدًا إلكترونيًا صحيحًا.",
    invalidPhone: "أدخل رقم هاتف صحيحًا.",
    tooShort: "أضف مزيدًا من التفاصيل.",
    supplies: "التوريدات",
    contracting: "المقاولات",
    general: "استفسار عام",
  },
};

export function getContactCopy(locale: Locale) {
  return contactCopy[locale];
}
