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

  function photo(product, angle, small) {
    return "images/watches/" + product.id + "/" + angle + (small ? "-sm" : "") + ".jpg";
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
      ' data-price="' + product.price + '"' +
      ' data-image="' + escapeHtml(photo(product, product.angles[0], true)) + '"' +
      ' aria-label="Pre-order ' + escapeHtml(product.name) + '">Pre-order</button>'
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
            ' alt="' + name + ' watch" width="560" height="700" loading="lazy">' +
          "</div>" +
        "</a>" +
        '<div class="product-info">' +
          '<span class="product-tag">' + escapeHtml(product.type) + "</span>" +
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
    var collectionLabel = product.collection === "women" ? "Women" : "Men";
    document.title = product.name + " | Vaurel";

    var slides = product.angles.map(function (angle, i) {
      return (
        '<div class="gallery-slide">' +
          '<img src="' + photo(product, angle, false) + '" alt="' + name + ", " + escapeHtml(angle) + ' view"' +
          ' width="1122" height="1402"' + (i === 0 ? ' fetchpriority="high"' : ' loading="lazy"') + ">" +
        "</div>"
      );
    }).join("");

    var thumbs = product.angles.length < 2 ? "" :
      '<div class="gallery-thumbs" role="group" aria-label="Choose a view">' +
        product.angles.map(function (angle, i) {
          return (
            '<button type="button" class="gallery-thumb' + (i === 0 ? " is-active" : "") + '" data-slide="' + i + '"' +
            ' aria-label="Show ' + escapeHtml(angle) + ' view"' + (i === 0 ? ' aria-current="true"' : "") + ">" +
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
        '<a href="collection.html#' + product.collection + '">' + collectionLabel + '</a><span aria-hidden="true">/</span>' +
        '<span aria-current="page">' + name + "</span>" +
      "</nav>" +
      '<div class="product-detail">' +
        '<div class="gallery">' +
          '<div class="gallery-track" tabindex="0" aria-label="' + name + ' photos">' + slides + "</div>" +
          thumbs +
        "</div>" +
        '<div class="product-summary">' +
          '<span class="eyebrow">' + collectionLabel + " &middot; " + escapeHtml(product.type) + "</span>" +
          "<h1>" + name + "</h1>" +
          '<p class="product-detail-price">' + money.format(product.price) + "</p>" +
          '<p class="product-description">' + escapeHtml(product.description || "") + "</p>" +
          preorderButton(product, "product-detail-btn") +
          '<p class="bag-note">Pre-order: no payment is taken today. We will confirm availability, shipping and payment with you by email.</p>' +
          (details ? '<dl class="spec-list">' + details + "</dl>" : "") +
        "</div>" +
      "</div>";

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
