/* ==========================================================================
   Vaurel — product list
   This is the one place to edit watches. The Home page, Collection page,
   watch pages and the bag all read from here.

   For each watch:
     id          short unique name used in the page address (lowercase, dashes)
     name        the watch name shown on the site
     collection  "men" or "women"
     type        small label above the name (e.g. "Automatic")
     price       price in US dollars, as a plain number (no $ or commas)
     featured    true to show it on the Home page (the first 3 are shown)
     details     the specification list on the watch page
     description short paragraph on the watch page
     angles      the photos, in order. For each angle there must be two files:
                   images/watches/<id>/<angle>.jpg      (large, for the watch page)
                   images/watches/<id>/<angle>-sm.jpg   (small, for grids and the bag)
                 To add an angle, add both files and its name here, e.g. ["front", "side", "back"]

   NOTE: names and prices below are temporary until they are matched to the catalogue.
   ========================================================================== */
window.VAUREL_PRODUCTS = [
  {
    id: "steel-ivory",
    name: "Ivory Steel",
    collection: "men",
    type: "Automatic",
    price: 2450,
    featured: true,
    angles: ["front"],
    details: { Case: "Polished steel, rectangular", Dial: "Ivory, with open V movement window", Strap: "Black leather", Movement: "Automatic" },
    description: "A clean ivory dial framed in polished steel, with Vaurel's signature V opening onto the automatic movement beneath."
  },
  {
    id: "rose-gold-green",
    name: "Emerald Rose Gold",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: true,
    angles: ["front"],
    details: { Case: "Rose gold tone, rectangular", Dial: "Deep green, with open V movement window", Strap: "Green leather", Movement: "Automatic" },
    description: "A deep green dial set in warm rose gold, paired with a matching green leather strap."
  },
  {
    id: "rose-gold-black",
    name: "Noir Rose Gold",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: true,
    angles: ["front"],
    details: { Case: "Rose gold tone, rectangular", Dial: "Black, with open V movement window", Strap: "Black leather", Movement: "Automatic" },
    description: "A black dial and rose gold case: the most classic pairing in the collection."
  },
  {
    id: "rose-gold-brown",
    name: "Cognac Rose Gold",
    collection: "men",
    type: "Automatic",
    price: 2750,
    featured: false,
    angles: ["front"],
    details: { Case: "Rose gold tone, rectangular", Dial: "Brown, with open V movement window", Strap: "Brown leather", Movement: "Automatic" },
    description: "A rich brown dial with rose gold accents and a brown leather strap."
  },
  {
    id: "steel-blue",
    name: "Midnight Steel",
    collection: "men",
    type: "Automatic",
    price: 2450,
    featured: false,
    angles: ["front"],
    details: { Case: "Polished steel, rectangular", Dial: "Midnight blue, with open V movement window", Strap: "Blue leather", Movement: "Automatic" },
    description: "A midnight blue dial in polished steel, finished with a blue leather strap."
  }
];

