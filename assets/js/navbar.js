const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("load", () => {
  navbar.classList.add("show");
});

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    document.querySelector(".active")?.classList.remove("active");
    navItem.classList.add("active");
    window.location.href = `/${e.target.id}.html`;
  });
});
