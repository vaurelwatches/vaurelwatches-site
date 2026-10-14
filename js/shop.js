/* ==========================================================================
   Vaurel — watch cards and watch pages
   Builds the watch grids and the individual watch page from js/products.js.
   ========================================================================== */
(function () {
  "use strict";

  var products = window.VAUREL_PRODUCTS || [];
  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // How each photo angle is described to visitors (and screen readers)
  var ANGLE_LABELS = { front: "front", dial: "dial close-up", side: "side and crown", back: "case back", wrist: "on the wrist" };

  function angleLabel(angle) {
    return ANGLE_LABELS[angle] || angle;
  }

  function photo(product, angle, small) {
    return "images/watches/" + product.id + "/" + angle + (small ? "-sm" : "") + ".jpg";
  }

  function collectionLabel(product) {
    return product.collection === "women" ? "Women\u2019s" : "Men\u2019s";
  }

  function pageUrl(product) {
    return "product.html?id=" + encodeURIComponent(product.id);
  }

  // The Pre-order button: js/cart.js picks it up through data-add-to-cart
  function preorderButton(product, extraClass) {
    return (
      '<button type="button" class="btn btn--solid ' + extraClass + '" data-add-to-cart' +
      ' data-id="' + escapeHtml(product.id) + '"' +
      ' data-name="' + escapeHtml(product.name) + '"' +
      ' data-variant="' + escapeHtml(collectionLabel(product)) + '"' +
      ' data-price="' + product.price + '"' +
      ' data-image="' + escapeHtml(photo(product, product.angles[0], true)) + '"' +
      ' aria-label="Pre-order ' + escapeHtml(collectionLabel(product) + " " + product.name) + '">Pre-order</button>'
    );
  }

  function cardHtml(product, headingTag) {
    var name = escapeHtml(product.name);
    var url = pageUrl(product);
    return (
      '<article class="product">' +
        '<a href="' + url + '" class="product-link">' +
          '<div class="product-image">' +
            '<img src="' + photo(product, product.angles[0], true) + '"' +
            ' srcset="' + photo(product, product.angles[0], true) + " 560w, " + photo(product, product.angles[0], false) + ' 1122w"' +
            ' sizes="(max-width: 600px) 92vw, (max-width: 960px) 46vw, 380px"' +
            ' alt="' + escapeHtml(collectionLabel(product)) + " " + name + ' watch" width="560" height="700" loading="lazy">' +
          "</div>" +
        "</a>" +
        '<div class="product-info">' +
          '<span class="product-tag">' + escapeHtml(collectionLabel(product)) + " &middot; " + escapeHtml(product.type) + "</span>" +
          "<" + headingTag + ' class="product-name"><a href="' + url + '">' + name + "</a></" + headingTag + ">" +
          '<p class="product-price">' + money.format(product.price) + "</p>" +
          preorderButton(product, "product-btn") +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- Grids: <div data-product-grid="men|women|featured|related"> ---------- */
  function fillGrids(current) {
    document.querySelectorAll("[data-product-grid]").forEach(function (grid) {
      var which = grid.getAttribute("data-product-grid");
      var list;
      if (which === "featured") list = products.filter(function (p) { return p.featured; }).slice(0, 3);
      else if (which === "related") list = products.filter(function (p) { return current && p.id !== current.id && p.collection === current.collection; }).slice(0, 3);
      else list = products.filter(function (p) { return p.collection === which; });

      grid.innerHTML = list.map(function (p) { return cardHtml(p, grid.getAttribute("data-heading") || "h3"); }).join("");
      if (which === "related" && !list.length) grid.closest("section").hidden = true;

      // Hide a section that has no watches yet, and show its "coming soon" note instead
      var section = grid.closest("[data-collection-section]");
      if (section) {
        var empty = section.querySelector("[data-collection-empty]");
        grid.hidden = list.length === 0;
        if (empty) empty.hidden = list.length > 0;
      }
    });
  }

  /* ---------- Watch page (product.html?id=...) ---------- */
  function renderProductPage() {
    var root = document.getElementById("product-page");
    if (!root) return null;

    var id = new URLSearchParams(window.location.search).get("id");
    var product = products.filter(function (p) { return p.id === id; })[0];
    if (!product) {
      document.getElementById("product-missing").hidden = false;
      return null;
    }

    var name = escapeHtml(product.name);
    var label = collectionLabel(product);
    document.title = product.name + ", " + label + " | Vaurel";

    var slides = product.angles.map(function (angle, i) {
      return (
        '<div class="gallery-slide">' +
          '<img src="' + photo(product, angle, false) + '" alt="' + escapeHtml(label) + " " + name + ", " + escapeHtml(angleLabel(angle)) + '"' +
          ' width="1122" height="1402"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ">" +
        "</div>"
      );
    }).join("");

    var thumbs = product.angles.length < 2 ? "" :
      '<div class="gallery-thumbs" role="group" aria-label="Choose a view">' +
        product.angles.map(function (angle, i) {
          return (
            '<button type="button" class="gallery-thumb' + (i === 0 ? " is-active" : "") + '" data-slide="' + i + '"' +
            ' aria-label="Show ' + escapeHtml(angleLabel(angle)) + '"' + (i === 0 ? ' aria-current="true"' : "") + ">" +
              '<img src="' + photo(product, angle, true) + '" alt="" width="112" height="140" loading="lazy">' +
            "</button>"
          );
        }).join("") +
      "</div>";

    var details = Object.keys(product.details || {}).map(function (key) {
      return "<div><dt>" + escapeHtml(key) + "</dt><dd>" + escapeHtml(product.details[key]) + "</dd></div>";
    }).join("");

    root.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="collection.html">Collection</a><span aria-hidden="true">/</span>' +
        '<a href="' + product.collection + '.html">' + label + '</a><span aria-hidden="true">/</span>' +
        '<span aria-current="page">' + name + "</span>" +
      "</nav>" +
      '<div class="product-detail">' +
        '<div class="gallery">' +
          '<div class="gallery-track" tabindex="0" aria-label="' + name + ' photos">' + slides + "</div>" +
          thumbs +
        "</div>" +
        '<div class="product-summary">' +
          '<span class="eyebrow">' + label + " &middot; " + escapeHtml(product.type) + "</span>" +
          "<h1>" + name + "</h1>" +
          '<p class="product-detail-price">' + money.format(product.price) + "</p>" +
          '<p class="product-description">' + escapeHtml(product.description || "") + "</p>" +
          preorderButton(product, "product-detail-btn") +
          '<ul class="product-perks">' +
            '<li><svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3v3h-7z"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/></svg><span>Free worldwide shipping</span></li>' +
            '<li><svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M12 3.2 5 6v5.5c0 4.3 2.9 7.9 7 9.3 4.1-1.4 7-5 7-9.3V6z"/><path d="m9 12 2.2 2.2L15.2 10"/></svg><span>2-year warranty</span></li>' +
          '</ul>' +
          '<p class="bag-note">Pre-order: no payment is taken today. We will confirm availability and payment with you by email.</p>' +
          (details ? '<dl class="spec-list">' + details + "</dl>" : "") +
        "</div>" +
      "</div>";

    // Highlight "Shop Men" or "Shop Women" in the menu
    var navLink = document.querySelector('.nav-list a[href="' + product.collection + '.html"]');
    if (navLink) navLink.setAttribute("aria-current", "page");

    setUpGallery(root);
    return product;
  }

  // Swipe on phones (scroll-snap); thumbnails jump to a view and follow along
  function setUpGallery(root) {
    var track = root.querySelector(".gallery-track");
    var thumbs = root.querySelectorAll(".gallery-thumb");
    if (!track || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var i = Number(thumb.dataset.slide);
        track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
      });
    });

    var ticking = false;
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var current = Math.round(track.scrollLeft / track.clientWidth);
        thumbs.forEach(function (thumb, i) {
          thumb.classList.toggle("is-active", i === current);
          if (i === current) thumb.setAttribute("aria-current", "true");
          else thumb.removeAttribute("aria-current");
        });
        ticking = false;
      });
    });
  }

  var current = renderProductPage();
  fillGrids(current);
})();
