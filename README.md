# Vaurel — Website

A static website for Vaurel watches, built with plain HTML and CSS (no build step, no JavaScript), ready for GitHub Pages.

## Pages

| File              | Page                                          |
| ----------------- | --------------------------------------------- |
| `index.html`      | Home: hero, brand story, featured watches     |
| `collection.html` | Collection: grid of watches (photo, name, price) |
| `about.html`      | About: story, craft, values                   |
| `contact.html`    | Contact: form, email, phone, address          |
| `css/style.css`   | All styling (colours and fonts at the top)    |
| `images/`         | Placeholder images                            |

## Replacing placeholders

**Images.** Put your photos in `images/` and update the `src="images/..."` in the HTML. Portrait photos (about 4:5, e.g. 1600×2000) suit the watch cards best.
The home hero background is set in `css/style.css` (search for `hero.svg`).

**Watches.** In `collection.html`, each watch is one `<article class="product">` block. Copy a block to add a watch, or delete one to remove it. The home page shows three featured watches in the same format.

**Text.** Search the HTML for "placeholder" to find the copy written as placeholder text. Also update the email address `hello@vaurelwatches.com`, the phone number and the address.

**Colours & fonts.** Edit the variables at the top of `css/style.css` (`--gold`, `--black`, etc.).

## Contact form

GitHub Pages can't process forms itself, so by default the form opens the visitor's email app, addressed to you. For messages that send straight from the page, create a free form at a service such as [Formspree](https://formspree.io) and replace the form's `action="mailto:..."` in `contact.html` with the URL they give you (you can also remove `enctype="text/plain"`).

## Publishing on GitHub Pages

1. Push to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your branch (e.g. `main`) and folder `/ (root)`, then **Save**.
4. After a minute, the site will be live at the URL shown on that page.

To preview locally, open `index.html` in a browser.
