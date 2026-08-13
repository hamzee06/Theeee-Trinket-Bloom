// Product catalog, extracted from App.js so it can also be required()'d by
// the plain-Node sitemap generator script (scripts/generate-sitemap.js).

const allProducts = [
  {
    id: 1,
    slug: "rose-heart-bloom",
    name: "Rose Heart Bloom",
    price: "Rs. 1199",
    description: "A beautifully crafted heart-shaped pendant, symbolizing love and passion, with a delicate rose dried flower embedded within.",
    imageUrl: "/HeartShaped.jpg",
    category: "pendants",
  },
  {
    id: 2,
    slug: "diamond-dewdrop-jhumka",
    name: "Diamond Dewdrop Jhumka",
    price: "Rs. 1499",
    description: "Dazzling diamond-shaped resin jhumkas – a modern take on a classic, designed to shine.",
    imageUrl: "/DiamondJhumka.jpg",
    category: "jhumkas",
  },
  {
    id: 3,
    slug: "petal-whisper-ring",
    name: "Petal Whisper Ring",
    price: "Rs. 799",
    description: "A delicate ring featuring a vibrant pink flower encased in crystal-clear resin, a miniature garden for your finger.",
    imageUrl: "/CircleRing.jpg",
    category: "rings",
  },
  {
    id: 4,
    slug: "free-spirit-charm",
    name: "Free Spirit Charm",
    price: "Rs. 699",
    description: "A delightful bird-shaped charm pendant, perfect for adding a touch of whimsical nature to any outfit.",
    imageUrl: "/BirdShaped.jpg",
    category: "pendants",
  },
  {
    id: 5,
    slug: "loves-embrace-ring",
    name: "Love's Embrace Ring",
    price: "Rs. 799",
    description: "A charming ring featuring a vibrant red heart, perfect for expressing love and affection.",
    imageUrl: "/HeartRing.jpg",
    category: "rings",
  },
  {
    id: 6,
    slug: "royal-petal-rectangle",
    name: "Royal Petal Rectangle",
    price: "Rs. 1199",
    description: "A stylish rectangular pendant showcasing a preserved purple flower and shimmering gold flakes – a perfect blend of nature and elegance.",
    imageUrl: "/RectanglePendant.jpg",
    category: "pendants",
  },
  {
    id: 7,
    slug: "rainbow-bloom-bar",
    name: "Rainbow Bloom Bar",
    price: "Rs. 1499",
    description: "A vibrant rectangular pendant showcasing a beautiful arrangement of colorful dried flowers, a miniature garden to wear.",
    imageUrl: "/RectanglePendant2.jpg",
    category: "pendants",
  },
  {
    id: 8,
    slug: "crimson-daisy-delight",
    name: "Crimson Daisy Delight",
    price: "Rs. 1199",
    description: "A striking round pendant featuring a delicate white daisy set against a vibrant red glitter background, a bold statement piece.",
    imageUrl: "/RoundPendant.jpg",
    category: "pendants",
  },
  {
    id: 9,
    slug: "ruby-petal-jhumkas",
    name: "Ruby Petal Jhumkas",
    price: "Rs. 1499",
    description: "Stunning circular jhumkas featuring vibrant red/pink dried petals and shimmering gold flakes, framed by intricate antique gold detailing.",
    imageUrl: "/CircleJhumka.jpg",
    category: "jhumkas",
  },
  {
    id: 10,
    slug: "silver-blossom-jhumkas",
    name: "Silver Blossom Jhumkas",
    price: "Rs. 1499",
    description: "Vibrant circular jhumkas featuring striking blue dried flowers set against a crisp white background, framed by intricate silver detailing and ghungroo bells.",
    imageUrl: "/CircleJhumka2.jpg",
    category: "jhumkas",
  },
  {
    id: 11,
    slug: "pink-serenity-pendant",
    name: "Pink Serenity Pendant",
    price: "Rs. 1199",
    description: "An elegant oval pendant featuring a delicate pink flower beautifully preserved in clear resin, framed by a classic gold-toned bezel.",
    imageUrl: "/OvalPendant.jpg",
    category: "pendants",
  },
  {
    id: 12,
    slug: "crystal-heart-glow",
    name: "Crystal Heart Glow",
    price: "Rs. 799",
    description: "A captivating heart-shaped pendant featuring a luminous white/iridescent center, beautifully framed by a sparkling crystal border. A delicate piece for timeless elegance.",
    imageUrl: "/HeartCharm.jpg",
    category: "pendants",
  },
  {
    id: 13,
    slug: "blush-petal-charm",
    name: "Blush Petal Charm",
    price: "Rs. 799",
    description: "A delicate flower-shaped pendant featuring soft pink petals and a subtle blue/purple center, perfect for adding a touch of gentle charm to your look.",
    imageUrl: "/FlowerCharm.jpg",
    category: "pendants",
  },
  {
    id: 14,
    slug: "enchanted-butterfly-pendant",
    name: "Enchanted Butterfly Pendant",
    price: "Rs. 999",
    description: "A mesmerizing butterfly-shaped pendant, featuring iridescent blue and green glitter that shimmers with every movement, capturing the magic of flight.",
    imageUrl: "Butterfly.jpg",
    category: "pendants",
  },
  {
    id: 15,
    slug: "midnight-bloom-heart",
    name: "Midnight Bloom Heart",
    price: "Rs. 1299",
    description: "A captivating heart-shaped pendant featuring a vibrant yellow dried flower set against a deep, contrasting black background. A bold and beautiful statement piece.",
    imageUrl: "BlackHeart.jpg",
    category: "pendants",
  },
];

// schema.org Offer.price must be a bare number; the store displays "Rs. 1199".
function parsePrice(priceString) {
  return priceString.replace(/[^0-9.]/g, "");
}

function getProductBySlug(slug) {
  return allProducts.find((p) => p.slug === slug) || null;
}

module.exports = { allProducts, parsePrice, getProductBySlug };
