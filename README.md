# Vaurel — Website

A static website for Vaurel watches, built with plain HTML, CSS and a little JavaScript for the shopping bag (no build step), ready for GitHub Pages.

## Pages

| File              | Page                                          |
| ----------------- | --------------------------------------------- |
| `index.html`      | Home: hero, brand story, featured watches     |
| `collection.html` | Collection: grid of watches (photo, name, price) |
| `about.html`      | About: story, craft, values                   |
| `contact.html`    | Contact: form, email, phone, address          |
| `checkout.html`   | Checkout: customer details and order summary  |
| `js/cart.js`      | Shopping bag (bag icon, slide-out panel, checkout) |
| `css/style.css`   | All styling (colours and fonts at the top)    |
| `images/`         | Placeholder images                            |

## Replacing placeholders

**Images.** Put your photos in `images/` and update the `src="images/..."` in the HTML. Portrait photos (about 4:5, e.g. 1600×2000) suit the watch cards best.
The home hero background is set in `css/style.css` (search for `hero.svg`).

**Watches.** In `collection.html`, each watch is one `<article class="product">` block. Copy a block to add a watch, or delete one to remove it. The home page shows three featured watches in the same format.

**Pre-order buttons and the bag.** Each Pre-order button carries the watch's details in `data-` attributes, for example:

```html
<a href="mailto:..." data-add-to-cart data-id="noir-classique" data-name="Noir Classique" data-price="2450" data-image="images/watch-1.svg" class="btn btn--solid product-btn">Pre-order</a>
```

When you add or change a watch, update these: `data-id` must be unique (lowercase, dashes), `data-price` is the price as a plain number with no `$` or commas, and `data-image` is the photo shown in the bag. The `mailto:` link is only used if a visitor's browser has JavaScript turned off.

**Text.** Search the HTML for "placeholder" to find the copy written as placeholder text. Also update the email address `hello@vaurelwatches.com`, the phone number and the address.

**Colours & fonts.** Edit the variables at the top of `css/style.css` (`--gold`, `--black`, etc.).

## Shopping bag and checkout

Pressing **Pre-order** adds the watch to the visitor's bag (saved in their browser) and opens the bag panel. The bag icon in the header shows the number of items. **Checkout** collects the customer's details, and **Place Pre-order** opens their email app with the full order addressed to you. No payment is taken on the site.

To change where orders are sent, edit `ORDER_EMAIL` at the top of `js/cart.js`. To take payments on the site later, the bag can be connected to a service such as Stripe Payment Links or Shopify.

## Contact form

GitHub Pages can't process forms itself, so by default the form opens the visitor's email app, addressed to you. For messages that send straight from the page, create a free form at a service such as [Formspree](https://formspree.io) and replace the form's `action="mailto:..."` in `contact.html` with the URL they give you (you can also remove `enctype="text/plain"`).

## Publishing on GitHub Pages

1. Push to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your branch (e.g. `main`) and folder `/ (root)`, then **Save**.
4. After a minute, the site will be live at the URL shown on that page.

To preview locally, open `index.html` in a browser.
