// Filter buttons and search box for the Publications page.
// Without JavaScript the full list still shows; this only hides entries.
(function () {
  var tools = document.querySelector(".pub-tools");
  if (!tools) return;
  tools.hidden = false;

  var buttons = tools.querySelectorAll("[data-filter]");
  var search = tools.querySelector("input");
  var pubs = document.querySelectorAll(".pub-year .pub");
  var years = document.querySelectorAll(".pub-year");
  var empty = document.querySelector(".pub-empty");
  var types = "all";

  function update() {
    var words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    pubs.forEach(function (pub) {
      var typeOk = types === "all" || types.split(" ").indexOf(pub.dataset.type) !== -1;
      var text = pub.textContent.toLowerCase();
      var wordsOk = words.every(function (w) { return text.indexOf(w) !== -1; });
      pub.hidden = !(typeOk && wordsOk);
    });
    var anyShown = false;
    years.forEach(function (year) {
      var shown = year.querySelector(".pub:not([hidden])");
      year.hidden = !shown;
      if (shown) anyShown = true;
    });
    empty.hidden = anyShown;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      types = button.dataset.filter;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === button ? "true" : "false"); });
      update();
    });
  });
  search.addEventListener("input", update);
})();
