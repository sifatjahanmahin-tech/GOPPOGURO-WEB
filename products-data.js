// ================================================================
//  GOPPO GURO — Product Catalogue Data
// ================================================================
//  HOW TO UPDATE CONTENT
//  - Change a product name, tagline, or description: edit below
//  - Change an image: put the new file in the "products/" folder
//    with the filename listed in "image:" or "galleryImages:"
//  - Add a product: copy one { ... } block, add a comma after it
//  - Remove a product: delete the entire { ... } block
// ================================================================

window.PRODUCTS = [
  {
    // ---- Little Joys ----
    id: 'little-joys',
    name: 'Little Joys',
    tagline: 'Tiny Folded Happiness — Handcrafted origami paper treasures',
    type: 'Little Joys Collection',
    badge: 'Best Seller',           // Text on card badge (leave '' for none)
    image: 'products/little-joys-main.jpg',
    cardLink: '#featured',          // '#featured' scrolls to the detail section
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'View Detail',
    wide: true                      // Spans 2 columns in the grid
  },
  {
    // ---- Boner Majhe Bonvojon ----
    id: 'boner-majhe',
    name: 'Boner Majhe Bonvojon',
    tagline: 'Cut. Fold. Imagine — Story playbook',
    type: 'Playbook',
    badge: '',
    image: 'products/boner-majhe.jpg',
    cardLink: 'https://www.facebook.com/goppoguro',
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'Enquire'
  },
  {
    // ---- RolGol ----
    id: 'rolgol',
    name: 'RolGol',
    tagline: 'Unroll Adventure — comic storytelling scroll',
    type: 'Storytelling',
    badge: '',
    image: 'products/rolgol.jpg',
    cardLink: 'https://www.facebook.com/goppoguro',
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'Enquire'
  },
  {
    // ---- Golpoka Club Kit ----
    id: 'golpoka-kit',
    name: 'Golpoka Club Kit',
    tagline: 'A new creative adventure every month',
    type: 'Monthly Kit',
    badge: '',
    image: 'products/golpoka-kit.jpg',
    cardLink: 'golpoka-club.html',
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'Learn More'
  },
  {
    // ---- Upo Mini Khelapur Ovijan ----
    id: 'upo-mini',
    name: 'Upo Mini Khelapur Ovijan',
    tagline: 'Learn through play, imagine through stories',
    type: 'Activity Book',
    badge: '',
    image: 'products/upo-mini.jpg',
    cardLink: 'https://www.facebook.com/goppoguro',
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'Enquire'
  },
  {
    // ---- Birpurush ----
    id: 'birpurush',
    name: 'বীরপুরুষ (Birpurush)',
    tagline: 'A Graphic Tale by Rabindranath Tagore',
    type: 'Graphic Novel',
    badge: 'New',
    image: 'products/birpurush.jpg',
    cardLink: 'https://www.facebook.com/goppoguro',
    orderLink: 'https://www.facebook.com/goppoguro',
    orderLabel: 'Enquire'
  }
];

// ================================================================
//  Little Joys Featured Gallery
//  These are the 5 photos shown in the big detail section at the top.
//  Put your images in the "products/" folder with these names.
//  You can add more images (up to 8) or change the alt text.
// ================================================================
window.LITTLE_JOYS_GALLERY = [
  { src: 'products/little-joys-1.jpg', alt: 'Little Joys — tiny handcrafted paper treasures' },
  { src: 'products/little-joys-2.jpg', alt: 'Little Joys — paper hearts and stars' },
  { src: 'products/little-joys-3.jpg', alt: 'Little Joys — origami folded with care' },
  { src: 'products/little-joys-4.jpg', alt: 'Little Joys — giftable folded surprises' },
  { src: 'products/little-joys-5.jpg', alt: 'Little Joys — made by women artisans' }
];
