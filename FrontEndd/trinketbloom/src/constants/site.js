export const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://www.thetrinketbloom.shop").replace(/\/$/, "");
export const SITE_NAME = "The Trinket Bloom";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/image.png`;

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: DEFAULT_OG_IMAGE,
    email: "thetrinketbloom@gmail.com",
    telephone: "+923364606346",
    sameAs: ["https://www.instagram.com/the.trinketbloom/"],
  };
}

export function buildCategoryJsonLd(category, items) {
  const categoryLabels = {
    all: 'Jewelry Collection',
    pendants: 'Resin Pendants',
    rings: 'Resin Rings',
    jhumkas: 'Resin Jhumkas',
  };

  return {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    name: `${categoryLabels[category] || 'Jewelry Collection'} | ${SITE_NAME}`,
    description: `Shop ${categoryLabels[category] || 'handmade jewelry'} from ${SITE_NAME}.`,
    url: `${SITE_URL}/`,
    itemListElement: (items || []).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${item.slug}`,
      name: item.name,
    })),
  };
}
