/* ==========================================================================
   Vaurel — shopping bag
   Keeps the bag in the visitor's browser (localStorage), shows it in a
   slide-out panel, and sends the finished pre-order to you by email.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "vaurel-bag";
  var ORDER_EMAIL = "hello@vaurelwatches.com"; // Where pre-orders are sent
  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  /* ---------- Storage ---------- */
  function load() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* private mode: bag lasts for this page only */ }
  }

  // Keep saved bags in line with js/products.js: drop watches that no longer
  // exist and pick up any new name, price or photo.
  function syncWithCatalogue(list) {
    var catalogue = window.VAUREL_PRODUCTS;
    if (!catalogue) return list;
    return list.reduce(function (kept, item) {
      var product = catalogue.filter(function (p) { return p.id === item.id; })[0];
      if (product) {
        kept.push({
          id: product.id,
          name: product.name,
          variant: product.collection === "women" ? "Women\u2019s" : "Men\u2019s",
          price: product.price,
          image: "images/watches/" + product.id + "/" + product.angles[0] + "-sm.jpg",
          qty: item.qty
        });
      }
      return kept;
    }, []);
  }

  var items = syncWithCatalogue(load());

  /* ---------- Bag actions ---------- */
  function find(id) {
    for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
    return null;
  }

  function add(product) {
    var existing = find(product.id);
    if (existing) existing.qty += 1;
    else items.push({ id: product.id, name: product.name, variant: product.variant, price: product.price, image: product.image, qty: 1 });
    commit();
  }

  function setQty(id, qty) {
    var item = find(id);
    if (!item) return;
    if (qty < 1) return remove(id);
    item.qty = Math.min(qty, 10);
    commit();
  }

  function remove(id) {
    items = items.filter(function (item) { return item.id !== id; });
    commit();
  }

  function clear() {
    items = [];
    commit();
  }

  function count() {
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function subtotal() {
    return items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function commit() {
    save();
    render();
  }

  /* ---------- Rendering ---------- */
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function itemHtml(item) {
    var name = escapeHtml(item.name);
    return (
      '<li class="bag-item" data-id="' + escapeHtml(item.id) + '">' +
        '<img src="' + escapeHtml(item.image) + '" alt="" width="80" height="100">' +
        '<div class="bag-item-info">' +
          '<p class="bag-item-name">' + name + "</p>" +
          (item.variant ? '<p class="bag-item-variant">' + escapeHtml(item.variant) + "</p>" : "") +
          '<p class="bag-item-price">' + money.format(item.price) + "</p>" +
          '<div class="qty">' +
            '<button type="button" data-qty="-1" aria-label="Decrease quantity of ' + name + '">&minus;</button>' +
            '<span aria-label="Quantity">' + item.qty + "</span>" +
            '<button type="button" data-qty="1" aria-label="Increase quantity of ' + name + '">+</button>' +
          "</div>" +
        "</div>" +
        '<button type="button" class="bag-item-remove" data-remove aria-label="Remove ' + name + ' from bag">Remove</button>' +
      "</li>"
    );
  }

  function render() {
    var n = count();
    var empty = n === 0;

    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n;
      el.hidden = empty;
    });
    document.querySelectorAll(".cart-toggle").forEach(function (el) {
      el.setAttribute("aria-label", "Shopping bag, " + n + (n === 1 ? " item" : " items"));
    });
    document.querySelectorAll("[data-bag-items]").forEach(function (el) {
      el.innerHTML = items.map(itemHtml).join("");
    });
    document.querySelectorAll("[data-bag-subtotal]").forEach(function (el) {
      el.textContent = money.format(subtotal());
    });
    document.querySelectorAll("[data-bag-empty]").forEach(function (el) { el.hidden = !empty; });
    document.querySelectorAll("[data-bag-filled]").forEach(function (el) { el.hidden = empty; });
  }

  /* ---------- Slide-out bag panel ---------- */
  var drawer, overlay, lastFocus;

  function buildDrawer() {
    overlay = document.createElement("div");
    overlay.className = "bag-overlay";
    overlay.setAttribute("data-bag-close", "");

    drawer = document.createElement("aside");
    drawer.className = "bag";
    drawer.id = "bag";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "bag-title");
    drawer.innerHTML =
      '<div class="bag-header">' +
        '<h2 id="bag-title">Your Bag</h2>' +
        '<button type="button" class="bag-close" data-bag-close aria-label="Close bag">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>' +
        "</button>" +
      "</div>" +
      '<div class="bag-body">' +
        '<div class="bag-empty" data-bag-empty>' +
          "<p>Your bag is empty.</p>" +
          '<a href="collection.html" class="btn">Explore the Collection</a>' +
        "</div>" +
        '<ul class="bag-items" data-bag-items></ul>' +
      "</div>" +
      '<div class="bag-footer" data-bag-filled>' +
        '<div class="bag-total"><span>Subtotal</span><span data-bag-subtotal></span></div>' +
        '<p class="bag-note">Pre-order: no payment is taken today. We will confirm availability, shipping and payment with you by email.</p>' +
        '<a href="checkout.html" class="btn btn--solid bag-checkout">Checkout</a>' +
        '<button type="button" class="bag-continue" data-bag-close>Continue shopping</button>' +
      "</div>";

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  function openBag() {
    lastFocus = document.activeElement;
    document.body.classList.add("bag-open");
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    drawer.querySelector(".bag-close").focus();
  }

  function closeBag() {
    document.body.classList.remove("bag-open");
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function isOpen() {
    return drawer.classList.contains("is-open");
  }

  // Keep keyboard focus inside the open panel
  function trapFocus(event) {
    var focusable = drawer.querySelectorAll("a[href], button:not([disabled])");
    var visible = Array.prototype.filter.call(focusable, function (el) { return el.offsetParent !== null; });
    if (!visible.length) return;
    var first = visible[0];
    var last = visible[visible.length - 1];
    if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
    else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
  }

  /* ---------- Checkout page ---------- */
  function setUpCheckout() {
    var form = document.getElementById("checkout-form");
    if (!form) return;
    var done = document.getElementById("checkout-done");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!items.length) return;

      var data = new FormData(form);
      var lines = items.map(function (item) {
        return "- " + item.name + (item.variant ? " (" + item.variant + ")" : "") + " x " + item.qty + "  (" + money.format(item.price * item.qty) + ")";
      });
      var body = [
        "New pre-order",
        "",
        lines.join("\n"),
        "",
        "Subtotal: " + money.format(subtotal()),
        "",
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Phone: " + data.get("phone"),
        "Shipping address: " + data.get("address") + ", " + data.get("city") + ", " + data.get("country"),
        "Notes: " + (data.get("notes") || "-")
      ].join("\n");

      var subject = "Pre-order from " + data.get("name");
      var href = "mailto:" + ORDER_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      done.querySelector("[data-resend]").href = href;
      window.location.href = href;

      form.hidden = true;
      done.hidden = false;
      done.focus();
    });

    done.querySelector("[data-clear]").addEventListener("click", function () {
      clear();
      window.location.href = "index.html";
    });
  }

  /* ---------- Wire everything up ---------- */
  function init() {
    save(); // store the catalogue-synced bag
    buildDrawer();
    render();
    setUpCheckout();

    document.addEventListener("click", function (event) {
      var addBtn = event.target.closest("[data-add-to-cart]");
      if (addBtn) {
        event.preventDefault(); // the button's email link is only a fallback without JavaScript
        add({
          id: addBtn.dataset.id,
          name: addBtn.dataset.name,
          variant: addBtn.dataset.variant,
          price: Number(addBtn.dataset.price),
          image: addBtn.dataset.image
        });
        openBag();
        return;
      }

      if (event.target.closest(".cart-toggle")) {
        event.preventDefault();
        openBag();
        return;
      }

      if (event.target.closest("[data-bag-close]")) {
        closeBag();
        return;
      }

      var line = event.target.closest(".bag-item");
      if (!line) return;
      var id = line.dataset.id;
      var list = line.parentElement;
      var qtyBtn = event.target.closest("[data-qty]");
      if (qtyBtn) {
        var step = qtyBtn.dataset.qty;
        setQty(id, find(id).qty + Number(step));
        // The list was redrawn: put focus back on the same button
        var again = list.querySelector('[data-id="' + id + '"] [data-qty="' + step + '"]');
        if (again) again.focus();
        else if (isOpen()) drawer.querySelector(".bag-close").focus();
      } else if (event.target.closest("[data-remove]")) {
        remove(id);
        if (isOpen()) drawer.querySelector(".bag-close").focus();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;
      if (event.key === "Escape") closeBag();
      else if (event.key === "Tab") trapFocus(event);
    });

    // Keep the bag in sync if it changes in another tab
    window.addEventListener("storage", function (event) {
      if (event.key === STORAGE_KEY) { items = syncWithCatalogue(load()); render(); }
    });
  }

  init();
})();
