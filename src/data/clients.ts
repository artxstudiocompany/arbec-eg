/**
 * ARBEC clients & supply partners.
 *
 * Source of truth: the "Our Clients" gallery on https://arbec-eg.com/services/.
 * The legacy site publishes logos as unlabeled images. Names/alt text were not
 * published, so they are left null and flagged for client identification.
 *
 * `sourceUrl` points at the legacy asset; files will be migrated into
 * `/public/images/clients` during the asset phase. Do not fabricate names.
 */

export type ClientLogo = {
  id: string;
  name: string | null;
  alt: string;
  sourceUrl: string;
  needsIdentification: boolean;
};

const legacyUploads = "https://arbec-eg.com/wp-content/uploads/2025/10";
const legacy2025 = "https://arbec-eg.com/wp-content/uploads/2025/10";

export const clientLogos: ClientLogo[] = [
  {
    id: "c1",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-11.00.27_8b115045.jpg`,
    needsIdentification: true,
  },
  {
    id: "c2",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.55.10_0db3eab5.jpg`,
    needsIdentification: true,
  },
  {
    id: "c3",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.54.32_c815297f.jpg`,
    needsIdentification: true,
  },
  {
    id: "c4",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.52.45_a501050d.jpg`,
    needsIdentification: true,
  },
  {
    id: "c5",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.47.01_3764459a.jpg`,
    needsIdentification: true,
  },
  {
    id: "c6",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.47.01_085a70fa.jpg`,
    needsIdentification: true,
  },
  {
    id: "c7",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.47.01_02f86191.jpg`,
    needsIdentification: true,
  },
  {
    id: "c8",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.47.00_f23d5c00.jpg`,
    needsIdentification: true,
  },
  {
    id: "c9",
    name: null,
    alt: "ARBEC client logo",
    sourceUrl: `${legacy2025}/WhatsApp-Image-2025-10-16-at-10.47.00_f0bc94ad.jpg`,
    needsIdentification: true,
  },
];

/** Supply-brand gallery published under the General Supplies section. */
export const supplyBrandImages: string[] = [
  `${legacyUploads}/13-YbNq3XzNDqtPEljK.avif`,
  `${legacyUploads}/16-d957ePB5ogsEyjDM.avif`,
  `${legacyUploads}/19-A85Eal153pf4b4oJ.avif`,
  `${legacyUploads}/33-AwvDQ5lb46FL2JNy-1.avif`,
  `${legacyUploads}/17-AwvDQ5BvXxFrp2Bb.avif`,
  `${legacyUploads}/15-m2WagP2W1WFNVj6M.avif`,
  `${legacyUploads}/tawakol-m7V5yZ1415uba9BP.avif`,
  `${legacyUploads}/1-d957eP9WzxFoVXW0.avif`,
  `${legacyUploads}/23-YX4a8L3V1PHpa1oM.avif`,
  `${legacyUploads}/elsewedy2-AE0aVyJ3aMfPj4v5.avif`,
];
