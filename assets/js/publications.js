// Filters on the Publications page: type buttons, search box, and ?tag= links.
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
  var status = document.querySelector(".pub-tag-status");
  var types = "all";
  var tag = new URLSearchParams(location.search).get("tag") || "";

  if (tag) {
    var link = document.querySelector('.topics a[data-tag="' + tag + '"]') ||
      document.querySelector('.pub-tags a[href$="?tag=' + tag + '"]');
    status.querySelector("strong").textContent = link ? link.firstChild.textContent.trim() : tag.replace(/-/g, " ");
    status.hidden = false;
    document.querySelectorAll('.topics a[data-tag="' + tag + '"]').forEach(function (a) {
      a.setAttribute("aria-current", "true");
      var more = a.closest(".topics-more");
      if (more) more.open = true;  // the chosen topic is in the collapsed part of the list
    });
  }

  function update() {
    var words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    pubs.forEach(function (pub) {
      var typeOk = types === "all" || types.split(" ").indexOf(pub.dataset.type) !== -1;
      var tagOk = !tag || pub.dataset.tags.split(" ").indexOf(tag) !== -1;
      var text = pub.textContent.toLowerCase();
      var wordsOk = words.every(function (w) { return text.indexOf(w) !== -1; });
      pub.hidden = !(typeOk && tagOk && wordsOk);
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
  update();
})();
