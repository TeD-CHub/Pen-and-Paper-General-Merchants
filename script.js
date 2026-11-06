const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const toast = document.querySelector(".toast");
const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
let itemCount = 0;
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    cartButton.setAttribute("aria-label", `Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    showToast(`${button.dataset.name} added to your bag`);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    productCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll("[data-category-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;
    const matchingFilter = filterButtons.find((button) => button.dataset.filter === category);
    if (matchingFilter) matchingFilter.click();
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = new FormData(form).get("email");
  const message = form.querySelector(".form-message");
  message.textContent = `You're on the list! Watch your inbox at ${email}.`;
  form.reset();
});
