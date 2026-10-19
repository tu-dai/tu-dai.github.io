// Filters on the Publications page: type buttons, topic chips (pick several), and a live search box.
// The chosen topics are kept in the address bar (?tag=a,b) so a filtered list can be shared.
// Without JavaScript the full list still shows; this only hides entries.
(function () {
  var tools = document.querySelector(".pub-tools");
  if (!tools) return;
  tools.hidden = false;

  var typeButtons = tools.querySelectorAll("[data-filter]");
  var search = tools.querySelector("input");
  var pubs = document.querySelectorAll(".pub-year .pub");
  var years = document.querySelectorAll(".pub-year");
  var results = document.querySelector(".pub-results");
  var count = results.querySelector(".pub-count");
  var empty = document.querySelector(".pub-empty");

  var type = "all";
  var params = new URLSearchParams(location.search);
  var topics = (params.get("tag") || "").split(",").filter(Boolean);

  // Topic chips are links (so they work from other pages); here they act as on/off buttons.
  var chips = document.querySelectorAll("a[data-tag]");
  chips.forEach(function (chip) { chip.setAttribute("role", "button"); });

  function syncChips() {
    chips.forEach(function (chip) {
      var on = topics.indexOf(chip.dataset.tag) !== -1;
      chip.classList.toggle("is-on", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      var more = chip.closest(".topics-more");
      if (on && more) more.open = true;
    });
  }

  function saveTopics() {
    var p = new URLSearchParams(location.search);
    if (topics.length) p.set("tag", topics.join(",")); else p.delete("tag");
    var q = p.toString().replace(/%2C/g, ",");
    history.replaceState(null, "", location.pathname + (q ? "?" + q : "") + location.hash);
  }

  function update() {
    var words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    pubs.forEach(function (pub) {
      var typeOk = type === "all" || type.split(" ").indexOf(pub.dataset.type) !== -1;
      var tags = pub.dataset.tags.split(" ");
      var topicOk = !topics.length || topics.some(function (t) { return tags.indexOf(t) !== -1; });
      var text = pub.textContent.toLowerCase();
      var wordsOk = words.every(function (w) { return text.indexOf(w) !== -1; });
      pub.hidden = !(typeOk && topicOk && wordsOk);
      if (!pub.hidden) shown++;
    });
    years.forEach(function (year) { year.hidden = !year.querySelector(".pub:not([hidden])"); });

    var filtered = type !== "all" || topics.length > 0 || words.length > 0;
    results.hidden = !filtered;
    count.innerHTML = "Showing <strong>" + shown + "</strong> of " + pubs.length + " papers";
    empty.hidden = shown > 0;
  }

  document.addEventListener("click", function (e) {
    var chip = e.target.closest("a[data-tag]");
    if (!chip) return;
    e.preventDefault();
    var i = topics.indexOf(chip.dataset.tag);
    if (i === -1) topics.push(chip.dataset.tag); else topics.splice(i, 1);
    saveTopics();
    syncChips();
    update();
  });

  typeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      type = button.dataset.filter;
      typeButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === button ? "true" : "false"); });
      update();
    });
  });

  search.addEventListener("input", update);

  results.querySelector(".pub-clear").addEventListener("click", function () {
    type = "all";
    typeButtons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === "all" ? "true" : "false"); });
    search.value = "";
    topics = [];
    saveTopics();
    syncChips();
    update();
  });

  syncChips();
  update();
})();
