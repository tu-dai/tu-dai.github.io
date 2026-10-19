// "Copy" buttons on BibTeX boxes. Without JavaScript the BibTeX is still shown and selectable.
document.querySelectorAll(".bib-copy").forEach(function (button) {
  if (!navigator.clipboard) return;
  button.hidden = false;
  button.addEventListener("click", function () {
    var text = button.parentElement.querySelector("pre").textContent;
    navigator.clipboard.writeText(text).then(function () {
      button.textContent = "Copied";
      setTimeout(function () { button.textContent = "Copy"; }, 1500);
    });
  });
});
