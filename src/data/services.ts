/**
 * ARBEC services — centralized dataset.
 *
 * Source of truth: https://arbec-eg.com/services/
 * Copy lightly corrected for grammar and consistency only — no factual claims added.
 *
 * `slug` preserves legacy WordPress URLs where they existed, so redirects and
 * SEO equity are retained.
 */

export type ServiceGroup = "contracting" | "supplies";

export type ServiceIcon =
  | "supplies"
  | "technical"
  | "civil"
  | "caravan"
  | "infrastructure"
  | "finishing"
  | "mechanical"
  | "electrical"
  | "solar";

/** Unique SVG visual behaviour per service. */
export type ServiceVisual =
  | "supply-chain"
  | "blueprint"
  | "structure"
  | "modular"
  | "underground"
  | "finishing-transform"
  | "mep-systems"
  | "power-dist"
  | "energy-flow";

export type Service = {
  /** Number shown in UI (01–09). */
  number: number;
  /** URL-friendly identifier — keeps legacy WP slugs. */
  slug: string;
  group: ServiceGroup;
  icon: ServiceIcon;
  visual: ServiceVisual;
  title: string;
  titleAr: string;
  /** Short node label used in the hub ring / index. */
  nodeLabel: string;
  nodeLabelAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  /** Longer description — improved grammar from source. */
  description: string;
  descriptionAr: string;
  /** Highlights rendered as a short bullet list where available. */
  points?: string[];
  pointsAr?: string[];
  /** Legacy dedicated page carried little or no copy — needs real content. */
  needsExpandedContent?: boolean;
};

export type LocalizedService = Pick<
  Service,
  "number" | "slug" | "group" | "icon" | "visual" | "points"
> & {
  title: string;
  nodeLabel: string;
  shortDescription: string;
  description: string;
};

export const services: Service[] = [
  {
    number: 1,
    slug: "general-supplies",
    group: "supplies",
    icon: "supplies",
    visual: "supply-chain",
    title: "Supplies Works",
    nodeLabel: "SUPPLIES",
    nodeLabelAr: "التوريدات",
    titleAr: "أعمال التوريدات",
    shortDescription:
      "Full-range material supply for the contracting field with on-site delivery.",
    shortDescriptionAr:
      "توريد شامل للمواد في مجال المقاولات مع توصيل إلى الموقع.",
    description:
      "ARBEC supplies all materials servicing the contracting field — UPVC, PPR and HDPE pipes and fittings, valves, cast iron and ductile iron fittings and covers, electrical supplies, and architectural and civil supplies. On-site delivery at competitive prices with full follow-up.",
    descriptionAr:
      "تورّد أربك جميع المواد اللازمة لمجال المقاولات — أنابيب ووصلات UPVC وPPR وHDPE، وصمامات، ووصلات وغطيات الحديد الزهر والدكتايل، ومواد كهربائية، ومواد معمارية ومدنية. توصيل إلى الموقع بأسعار تنافسية مع متابعة متكاملة.",
    points: [
      "UPVC pipes & fittings",
      "PPR pipes & fittings",
      "HDPE pipes & fittings",
      "Valves",
      "Cast iron & ductile iron fittings and covers",
      "Electrical supplies",
      "Architectural & civil supplies",
    ],
    pointsAr: [
      "أنابيب ووصلات UPVC",
      "أنابيب ووصلات PPR",
      "أنابيب ووصلات HDPE",
      "صمامات",
      "وصلات وغطيات الحديد الزهر والدكتايل",
      "مواد كهربائية",
      "مواد معمارية ومدنية",
    ],
  },
  {
    number: 2,
    slug: "technical-office-works",
    group: "contracting",
    icon: "technical",
    visual: "blueprint",
    title: "Technical Office Works",
    nodeLabel: "TECH OFFICE",
    nodeLabelAr: "المكتب الفني",
    titleAr: "أعمال المكتب الفني",
    shortDescription:
      "Structural design, modeling, drawings, tender documents and project supervision.",
    shortDescriptionAr:
      "التصميم الإنشائي والنمذجة والمخططات ومستندات المناقصات والإشراف على المشاريع.",
    description:
      "Standalone or integrated technical office support — structural design, computer modeling and analysis, construction drawings, substructure design, tender documents, cost analysis, construction management and supervision — for projects of any size.",
    descriptionAr:
      "دعم مكتب فني مستقل أو متكامل — التصميم الإنشائي والنمذجة والتحليل بالحاسب ومخططات التنفيذ وتصميم الأساسات ومستندات المناقصات وتحليل التكاليف والإدارة والإشراف على التنفيذ — للمشاريع بمختلف أحجامها.",
    points: [
      "Structural design",
      "Computer modeling and analysis",
      "Construction drawings",
      "Substructure design",
      "Tender documents & cost analysis",
      "Construction management and supervision",
    ],
    pointsAr: [
      "التصميم الإنشائي",
      "النمذجة والتحليل بالحاسب",
      "مخططات التنفيذ",
      "تصميم الأساسات",
      "مستندات المناقصات وتحليل التكاليف",
      "الإدارة والإشراف على التنفيذ",
    ],
  },
  {
    number: 3,
    slug: "arch-and-civil-works",
    group: "contracting",
    icon: "civil",
    visual: "structure",
    title: "Architectural & Civil Works",
    nodeLabel: "CIVIL",
    nodeLabelAr: "المدني",
    titleAr: "الأعمال المعمارية والمدنية",
    shortDescription:
      "Civil contracting from design through construction to finishing.",
    shortDescriptionAr:
      "مقاولات مدنية من التصميم إلى التنفيذ والتشطيبات.",
    description:
      "Civil contracting including design and construction works — concrete, brickwork, plaster, ceramic, painting and decoration — supported by a multidisciplinary team experienced in structural design, computer modeling, tender documents and construction supervision.",
    descriptionAr:
      "مقاولات مدنية تشمل التصميم وأعمال التنفيذ — الخرسانة وأعمال الطوب والمحارة والسيراميك والدهانات والديكور — بفريق متعدد التخصصات له خبرة في التصميم الإنشائي والنمذجة بالحاسب ومستندات المناقصات والإشراف على التنفيذ.",
    points: [
      "Design",
      "Concrete works",
      "Brickwork",
      "Plaster",
      "Ceramic",
      "Painting",
      "Decoration",
    ],
    pointsAr: [
      "التصميم",
      "أعمال الخرسانة",
      "أعمال الطوب",
      "المحارة",
      "السيراميك",
      "الدهانات",
      "الديكور",
    ],
  },
  {
    number: 4,
    slug: "prefabricated-buildings-and-caravans",
    group: "contracting",
    icon: "caravan",
    visual: "modular",
    title: "Prefabricated Buildings & Offices",
    nodeLabel: "PREFAB",
    nodeLabelAr: "الجاهزة",
    titleAr: "المباني والمكاتب سابقة التجهيز",
    shortDescription:
      "Design and construction of pre-fabricated caravans — from base to finishing.",
    shortDescriptionAr:
      "تصميم وتنفيذ المباني سابقة التجهيز — من الأساس إلى التشطيبات.",
    description:
      "Design and construction of pre-fabricated caravans, from plain concrete base and steel structure to sandwich panels, MEP and architectural finishing — including flooring (ceramic, porcelain, marble or HDF), ceilings (gypsum boards and tiles), and HPL for toilets and bespoke finishing.",
    descriptionAr:
      "تصميم وتنفيذ المباني سابقة التجهيز (الكرفانات)، من خرسانة الأساس والهيكل الفولاذي إلى ألواح الساندويتش والأنظمة الميكانيكية والكهرباء والتشطيبات المعمارية — تشمل الأرضيات (سيراميك أو بورسلين أو رخام أو HDF) والأسقف (ألواح جبس وبلاط) وHPL للحمامات والتشطيبات حسب الطلب.",
    points: [
      "Concrete base",
      "Steel structure",
      "Sandwich panels",
      "MEP integration",
      "Flooring: ceramic, porcelain, marble or HDF",
      "Ceilings: gypsum boards and tiles",
      "HPL and bespoke finishing",
    ],
    pointsAr: [
      "أساس خرساني",
      "هيكل فولاذي",
      "ألواح ساندويتش",
      "تكامل الأنظمة الميكانيكية والكهرباء",
      "أرضيات: سيراميك أو بورسلين أو رخام أو HDF",
      "أسقف: ألواح جبس وبلاط",
      "HPL وتشطيبات حسب الطلب",
    ],
  },
  {
    number: 5,
    slug: "infrastructure-networks",
    group: "contracting",
    icon: "infrastructure",
    visual: "underground",
    title: "Infrastructure Systems Networks",
    nodeLabel: "INFRASTRUCTURE",
    nodeLabelAr: "البنية التحتية",
    titleAr: "شبكات وأنظمة البنية التحتية",
    shortDescription:
      "Integrated mechanical and electrical infrastructure networks for complete site systems.",
    shortDescriptionAr:
      "شبكات بنية تحتية ميكانيكية وكهربائية متكاملة لأنظمة الموقع.",
    description:
      "Integrated infrastructure networks across mechanical and electrical scopes — water supply and firefighting networks, sewage networks (manholes, inspection chambers and sewer lines), irrigation networks, low- and medium-voltage networks with transformers, RMUs and electrical panels, and light-current networks.",
    descriptionAr:
      "شبكات بنية تحتية متكاملة في النطاقات الميكانيكية والكهربائية — شبكات تغذية المياه ومكافحة الحريق، وشبكات الصرف (بئر التفتيش والغرف التفتيشية وخطوط الصرف)، وشبكات الري، وشبكات الجهد المنخفض والمتوسط مع المحولات وRMU واللوحات الكهربائية، وشبكات التيار الخفيف.",
    points: [
      "Water supply & firefighting networks",
      "Sewage networks",
      "Irrigation networks",
      "LV/MV networks",
      "Transformers, RMUs & electrical panels",
      "Light-current networks",
    ],
    pointsAr: [
      "شبكات تغذية المياه ومكافحة الحريق",
      "شبكات الصرف",
      "شبكات الري",
      "شبكات الجهد المنخفض والمتوسط",
      "المحولات وRMU واللوحات الكهربائية",
      "شبكات التيار الخفيف",
    ],
  },
  {
    number: 6,
    slug: "finishing-works",
    group: "contracting",
    icon: "finishing",
    visual: "finishing-transform",
    title: "Finishing Works",
    nodeLabel: "FINISHING",
    nodeLabelAr: "التشطيبات",
    titleAr: "أعمال التشطيبات",
    shortDescription:
      "Specialized finishing shaped around the client's vision and requirements.",
    shortDescriptionAr: "تشطيبات متخصصة تتوافق مع رؤية العميل ومتطلباته.",
    description:
      "A dedicated finishing department shaped around the client's vision and requirements — with sufficient experience and expertise across most finishing works as an integral part of all current and previous projects.",
    descriptionAr:
      "قسم تشطيبات متخصص تشكّله رؤية العميل ومتطلباته — نمتلك خبرة وكفاءة كافية في معظم أعمال التشطيبات بوصفها جزءًا لا يتجزأ من جميع مشاريعنا الحالية والسابقة.",
    points: [
      "Ceramic, porcelain, marble and HDF flooring",
      "Gypsum-board and tile ceilings",
      "Painting and decoration",
      "HPL toilet finishes",
      "Finishing coordination around the client's requirements",
    ],
    pointsAr: [
      "أرضيات السيراميك والبورسلين والرخام وHDF",
      "أسقف ألواح الجبس والبلاط",
      "الدهانات والديكور",
      "تشطيبات HPL للحمامات",
      "تنسيق التشطيبات وفق متطلبات العميل",
    ],
    needsExpandedContent: true,
  },
  {
    number: 7,
    slug: "building-mechanical-systems",
    group: "contracting",
    icon: "mechanical",
    visual: "mep-systems",
    title: "Building Mechanical Systems",
    nodeLabel: "MECHANICAL",
    nodeLabelAr: "الميكانيكا",
    titleAr: "الأنظمة الميكانيكية للمباني",
    shortDescription:
      "HVAC, firefighting and plumbing systems for projects of all sizes.",
    shortDescriptionAr: "أنظمة التكييف ومكافحة الحريق والسباكة للمشاريع بأحجامها المختلفة.",
    description:
      "Mechanical (MEP) works covering HVAC, firefighting and plumbing systems — professionals in implementing all electromechanical systems, whether for small or large projects.",
    descriptionAr:
      "أعمال ميكانيكية (MEP) تشمل أنظمة التكييف والتهوية ومكافحة الحريق والسباكة — متخصصون في تنفيذ جميع الأنظمة الكهروميكانيكية، سواء للمشاريع الصغيرة أو الكبيرة.",
    points: [
      "HVAC systems",
      "Firefighting systems",
      "Plumbing systems",
      "Mechanical MEP coordination",
      "Implementation for small and large projects",
    ],
    pointsAr: [
      "أنظمة التكييف والتهوية",
      "أنظمة مكافحة الحريق",
      "أنظمة السباكة",
      "تنسيق الأعمال الميكانيكية ضمن MEP",
      "التنفيذ للمشروعات الصغيرة والكبيرة",
    ],
    needsExpandedContent: true,
  },
  {
    number: 8,
    slug: "building-electrical-systems",
    group: "contracting",
    icon: "electrical",
    visual: "power-dist",
    title: "Building Electrical Systems",
    nodeLabel: "ELECTRICAL",
    nodeLabelAr: "الكهرباء",
    titleAr: "الأنظمة الكهربائية للمباني",
    shortDescription:
      "Power, lighting and light-current systems within the electromechanical scope.",
    shortDescriptionAr: "أنظمة القوى والإضاءة والتيار الخفيف ضمن نطاق العمل الكهروميكانيكي.",
    description:
      "Electrical systems covering power, lighting and all types of light-current systems, delivered within ARBEC's electromechanical scope.",
    descriptionAr:
      "أنظمة كهربائية تشمل القوى والإضاءة وجميع أنواع أنظمة التيار الخفيف، ضمن نطاق العمل الكهروميكانيكي لأربك.",
    points: [
      "Power systems",
      "Lighting systems",
      "Light-current systems",
      "Electrical coordination within the electromechanical scope",
    ],
    pointsAr: [
      "أنظمة القوى",
      "أنظمة الإضاءة",
      "أنظمة التيار الخفيف",
      "تنسيق الأعمال الكهربائية ضمن النطاق الكهروميكانيكي",
    ],
    needsExpandedContent: true,
  },
  {
    number: 9,
    slug: "solar-panels-works",
    group: "contracting",
    icon: "solar",
    visual: "energy-flow",
    title: "Solar Panels Works",
    nodeLabel: "SOLAR",
    nodeLabelAr: "الطاقة الشمسية",
    titleAr: "أعمال الألواح الشمسية",
    shortDescription: "Supply or supply and installation of solar panel solutions.",
    shortDescriptionAr: "توريد أو توريد وتركيب حلول الألواح الشمسية.",
    description:
      "Supply, or supply and installation, of solar panel works delivered with high quality.",
    descriptionAr: "توريد أو توريد وتركيب أعمال الألواح الشمسية بأعلى جودة.",
    points: [
      "Solar panel supply",
      "Supply and installation option",
      "Solar panel work coordination",
    ],
    pointsAr: [
      "توريد الألواح الشمسية",
      "خيار التوريد والتركيب",
      "تنسيق أعمال الألواح الشمسية",
    ],
    needsExpandedContent: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Order-preserving filter. */
export function getServicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export function getLocalizedService(
  slug: string,
  locale: "en" | "ar",
): LocalizedService | undefined {
  const svc = getService(slug);
  if (!svc) return undefined;
  return locale === "ar"
? {
        number: svc.number,
        slug: svc.slug,
        group: svc.group,
        icon: svc.icon,
        visual: svc.visual,
        title: svc.titleAr,
        nodeLabel: svc.nodeLabelAr,
        shortDescription: svc.shortDescriptionAr,
        description: svc.descriptionAr,
        points: svc.pointsAr ?? svc.points,
      }
    : {
        number: svc.number,
        slug: svc.slug,
        group: svc.group,
        icon: svc.icon,
        visual: svc.visual,
        title: svc.title,
        nodeLabel: svc.nodeLabel,
        shortDescription: svc.shortDescription,
        description: svc.description,
        points: svc.points,
      };
}

export function getLocalizedServices(
  locale: "en" | "ar",
): LocalizedService[] {
return services.map((svc) => ({
    number: svc.number,
    slug: svc.slug,
    group: svc.group,
    icon: svc.icon,
    visual: svc.visual,
    title: locale === "ar" ? svc.titleAr : svc.title,
    nodeLabel: locale === "ar" ? svc.nodeLabelAr : svc.nodeLabel,
    shortDescription:
      locale === "ar" ? svc.shortDescriptionAr : svc.shortDescription,
    description: locale === "ar" ? svc.descriptionAr : svc.description,
    points: locale === "ar" ? (svc.pointsAr ?? svc.points) : svc.points,
  }));
}
