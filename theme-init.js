/* Apply the saved palette before first paint. */
(function () {
  try {
    var palette = localStorage.getItem("lindsay_lock_palette");
    if (palette) document.documentElement.setAttribute("data-theme", palette);
  } catch (error) {}
})();



