const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  if (window.location.pathname === "/" || "/index.html")
    window.location.href = "/home.html";
});
