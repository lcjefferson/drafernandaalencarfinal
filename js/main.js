(function () {
  function trimUrl(url) {
    return typeof url === "string" ? url.trim() : "";
  }

  function resolveUrl(key) {
    var cfg = window.EBOOK_CHECKOUT || {};
    return trimUrl(cfg[key]) || "#checkout-pendente";
  }

  document.querySelectorAll("[data-checkout]").forEach(function (el) {
    var key = el.getAttribute("data-checkout");
    if (!key) return;
    var url = resolveUrl(key);
    el.setAttribute("href", url);
    if (url === "#checkout-pendente") {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var msg =
          "Configure o link em js/config.js (EBOOK_CHECKOUT." + key + ").";
        if (window.alert) window.alert(msg);
      });
    }
  });
})();
