(function () {
  function updatePromo() {
    var el = document.getElementById("promo-date");
    if (!el) return;
    try {
      var opts = { weekday: "long", day: "numeric", month: "long" };
      el.textContent =
        "Oferta válida até " + new Date().toLocaleDateString("pt-BR", opts);
    } catch (err) {
      el.textContent = "Oferta por tempo limitado — não perca";
    }
  }

  function stickyBar() {
    if (!document.body.classList.contains("page-product")) return;
    if (window.matchMedia("(min-width: 720px)").matches) {
      document.body.classList.remove("has-sticky");
      return;
    }
    var oferta = document.getElementById("oferta");
    if (!oferta) return;

    function tick() {
      var rect = oferta.getBoundingClientRect();
      var belowFold =
        rect.top > window.innerHeight * 0.35 &&
        rect.bottom > window.innerHeight * 0.5;
      document.body.classList.toggle("has-sticky", belowFold);
    }

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      updatePromo();
      stickyBar();
    });
  } else {
    updatePromo();
    stickyBar();
  }
})();
