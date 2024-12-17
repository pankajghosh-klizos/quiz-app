const heartIcons = document.querySelectorAll(".heart-icon");

heartIcons.forEach((heartIcon) => {
  heartIcon.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
  });
});
