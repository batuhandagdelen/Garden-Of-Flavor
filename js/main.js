import getMenu from "./api.js";
import {
  renderDetailPage,
  renderLoader,
  renderMenuCard,
  renderNotFoundPage,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const menuData = await getMenu();

  if (window.location.pathname.includes("/index.html")) {
    renderLoader();

    setTimeout(() => {
      renderMenuCard(menuData);
    }, 2000);

    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.id;

        const filteredMenu = menuData.filter(
          (item) => item.category == selectedCategory
        );
        if (selectedCategory == "all") {
          renderMenuCard(menuData);
        } else {
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    const params = new URLSearchParams(window.location.search);

    const itemId = +params.get("id");

    const product = menuData.find((item) => item.id == itemId);

    if (!product) {
      renderNotFoundPage();
    } else {
      renderDetailPage(product);
    }
  }
});
