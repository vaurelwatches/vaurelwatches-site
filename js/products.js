/* ==========================================================================
   Vaurel — product list
   This is the one place to edit watches. The Home page, Collection page,
   watch pages and the bag all read from here.

   For each watch:
     id          short unique name used in the page address (lowercase, dashes)
     name        the watch name shown on the site
     collection  "men" or "women" (the same name can be used in both)
     type        small label above the name (e.g. "Automatic")
     price       price in US dollars, as a plain number (no $ or commas)
     featured    true to show it on the Home page (the first 3 are shown)
     details     the specification list on the watch page
     description short paragraph on the watch page
     angles      the photos, in order. For each angle there must be two files:
                   images/watches/<id>/<angle>.jpg      (large, for the watch page)
                   images/watches/<id>/<angle>-sm.jpg   (small, for grids and the bag)
                 To add an angle, add both files and its name here, e.g. ["front", "side", "back"].
                 Named angles get a friendly label on the watch page: front, dial, side, back, wrist.

   Names and details follow the Vaurel men's and women's catalogues.
   NOTE: prices are placeholders until real prices are set.
   ========================================================================== */
window.VAUREL_PRODUCTS = [
  {
    id: "mens-emerald-green",
    name: "Emerald Green",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: true,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Green", Strap: "Genuine leather, green", Movement: "Automatic" },
    description: "A deep green dial framed in a warm rose gold-tone case, with Vaurel's signature V opening onto the automatic movement beneath. Finished on a green genuine leather strap."
  },
  {
    id: "mens-midnight-blue",
    name: "Midnight Blue",
    collection: "men",
    type: "Automatic",
    price: 2450,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Polished stainless steel", Dial: "Blue", Strap: "Genuine leather, blue", Movement: "Automatic" },
    description: "A midnight blue dial in polished stainless steel, finished with a matching blue genuine leather strap."
  },
  {
    id: "mens-obsidian-black",
    name: "Obsidian Black",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: true,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Black", Strap: "Genuine leather, black", Movement: "Automatic" },
    description: "A black dial in a rose gold-tone case on black genuine leather: the most classic pairing in the collection."
  },
  {
    id: "mens-silver-ivory",
    name: "Silver Ivory",
    collection: "men",
    type: "Automatic",
    price: 2450,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Polished stainless steel", Dial: "Silver", Strap: "Genuine leather, black", Movement: "Automatic" },
    description: "A bright silver dial in polished stainless steel on black genuine leather, crisp and understated."
  },
  {
    id: "mens-espresso-brown",
    name: "Espresso Brown",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Brown", Strap: "Genuine leather, brown", Movement: "Automatic" },
    description: "A rich brown dial in a rose gold-tone case, paired with a brown genuine leather strap."
  },
  {
    id: "womens-blush-ivory",
    name: "Blush Ivory",
    collection: "women",
    type: "Automatic",
    price: 2450,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Polished stainless steel", Dial: "Ivory", Strap: "Genuine leather, blush", Movement: "Automatic" },
    description: "A soft ivory dial in polished stainless steel, paired with a blush genuine leather strap."
  },
  {
    id: "womens-rose-pink",
    name: "Rose Pink",
    collection: "women",
    type: "Automatic",
    price: 2750,
    featured: true,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Rose pink", Strap: "Genuine leather, blush", Movement: "Automatic" },
    description: "A rose pink dial set in a warm rose gold-tone case, on a blush genuine leather strap."
  },
  {
    id: "womens-midnight-blue",
    name: "Midnight Blue",
    collection: "women",
    type: "Automatic",
    price: 2450,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Polished stainless steel", Dial: "Blue", Strap: "Genuine leather, blue", Movement: "Automatic" },
    description: "A midnight blue dial in polished stainless steel, finished with a matching blue genuine leather strap."
  },
  {
    id: "womens-emerald-green",
    name: "Emerald Green",
    collection: "women",
    type: "Automatic",
    price: 2750,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Green", Strap: "Genuine leather, green", Movement: "Automatic" },
    description: "A deep green dial framed in a warm rose gold-tone case, with a matching green genuine leather strap."
  },
  {
    id: "womens-espresso-brown",
    name: "Espresso Brown",
    collection: "women",
    type: "Automatic",
    price: 2750,
    featured: false,
    angles: ["front", "dial", "side", "back", "wrist"],
    details: { Case: "Rose gold-tone stainless steel", Dial: "Brown", Strap: "Genuine leather, brown", Movement: "Automatic" },
    description: "A rich brown dial in a rose gold-tone case, paired with a brown genuine leather strap."
  }
];
