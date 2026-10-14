# Vaurel — Website

A static website for Vaurel watches, built with plain HTML, CSS and a little JavaScript for the shopping bag (no build step), ready for GitHub Pages.

## Pages

| File              | Page                                          |
| ----------------- | --------------------------------------------- |
| `index.html`      | Home: hero, brand story, featured watches     |
| `men.html`        | Shop Men: the men's collection                |
| `women.html`      | Shop Women: the women's collection            |
| `collection.html` | Full collection: men's and women's together   |
| `about.html`      | About: story, craft, values                   |
| `contact.html`    | Contact: form, email, phone, address          |
| `checkout.html`   | Checkout: customer details and order summary  |
| `product.html`    | Watch page: photo gallery, details, Pre-order (e.g. `product.html?id=mens-silver-ivory`) |
| `js/products.js`  | **The list of watches**: names, prices, photos, details |
| `js/shop.js`      | Builds the watch cards and watch pages from the list |
| `js/cart.js`      | Shopping bag (bag icon, slide-out panel, checkout) |
| `css/style.css`   | All styling (colours and fonts at the top)    |
| `images/watches/` | Web copies of the watch photos, one folder per watch |
| `photos/originals/` | Original photos, untouched                  |

## Replacing placeholders

**Watches and photos.** All watches are listed in `js/products.js`, and the Home page, Collection, watch pages and bag all update from it. To add or change a watch, edit its entry there (name, price, men/women, details, and which 3 are featured on the Home page). Each watch's photos live in `images/watches/<id>/`, as a large `<angle>.jpg` and a small `<angle>-sm.jpg`. To add more angles, add the photo files and list the angle names in that watch's `angles`, e.g. `["front", "side", "back"]`. Keep untouched originals in `photos/originals/`.

The Home page hero photo is `images/hero.jpg`, with a smaller `images/hero-sm.jpg` for phones.

**Text and contact details.** The brand story is on the Home and About pages. Contact details (email `vaurelwatches@gmail.com`, phone) are on the Contact page and in every footer. Pre-orders are emailed to the address set as `ORDER_EMAIL` in `js/cart.js`.

**Colours & fonts.** Edit the variables at the top of `css/style.css` (`--gold`, `--black`, etc.).

## Shopping bag and checkout

Pressing **Pre-order** adds the watch to the visitor's bag (saved in their browser) and opens the bag panel. The bag icon in the header shows the number of items. **Checkout** collects the customer's details, and **Place Pre-order** opens their email app with the full order addressed to you. No payment is taken on the site.

To change where orders are sent, edit `ORDER_EMAIL` at the top of `js/cart.js`. To take payments on the site later, the bag can be connected to a service such as Stripe Payment Links or Shopify.

## Making sure visitors see your latest changes

Each page loads `css/style.css?v=11` and `js/...js?v=11`. After changing the CSS or JavaScript files, raise that number in every `.html` file (e.g. to `?v=12`). Browsers then fetch the new files instead of mixing in old saved copies.

## Contact form

GitHub Pages can't process forms itself, so by default the form opens the visitor's email app, addressed to you. For messages that send straight from the page, create a free form at a service such as [Formspree](https://formspree.io) and replace the form's `action="mailto:..."` in `contact.html` with the URL they give you (you can also remove `enctype="text/plain"`).

## Publishing on GitHub Pages

1. Push to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your branch (e.g. `main`) and folder `/ (root)`, then **Save**.
4. After a minute, the site will be live at the URL shown on that page.

To preview locally, open `index.html` in a browser.
