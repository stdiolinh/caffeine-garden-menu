(function () {
  "use strict";

  const MENU_ITEMS = [
    {
      id: "matcha-latte",
      category: "matcha",
      name: "matcha latte",
      description: "stone-ground matcha whisked with your milk — grassy, creamy, calm.",
      tags: ["signature"],
    },
    {
      id: "yuzu-cheesecake-vegan",
      category: "treats",
      name: "yuzu cheesecake (vegan)",
      description: "bright citrus curd on a creamy base — plant-based, still dreamy.",
      tags: ["vegan"],
    },
    {
      id: "yuzu-cheesecake-regular",
      category: "treats",
      name: "yuzu cheesecake (regular)",
      description: "classic tangy yuzu atop rich cheesecake — same slice, dairy forward.",
      tags: ["regular"],
    },
  ];

  let activeFilter = "matcha";

  const menuListEl = document.getElementById("menu-list");
  const menuEmptyEl = document.getElementById("menu-empty");
  const menuWipEl = document.getElementById("menu-wip");
  const menuHintEl = document.getElementById("menu-hint");
  const hintCategoryEl = document.getElementById("hint-category");
  const drinkNotesEl = document.getElementById("drink-notes");

  function renderHint() {
    hintCategoryEl.textContent = activeFilter;

    const treats = activeFilter === "treats";
    drinkNotesEl.classList.toggle("hidden", treats);
    drinkNotesEl.setAttribute("aria-hidden", treats ? "true" : "false");
  }

  function renderMenu() {
    menuListEl.innerHTML = "";

    if (activeFilter === "coffee") {
      menuHintEl.classList.add("hidden");
      menuEmptyEl.classList.add("hidden");
      menuWipEl.classList.remove("hidden");
      return;
    }

    menuWipEl.classList.add("hidden");
    menuHintEl.classList.remove("hidden");

    const items = MENU_ITEMS.filter(function (item) {
      return item.category === activeFilter;
    });

    if (items.length === 0) {
      menuEmptyEl.classList.remove("hidden");
      return;
    }

    menuEmptyEl.classList.add("hidden");

    items.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "menu-card";

      const row = document.createElement("div");
      row.className = "menu-card__row";
      row.innerHTML =
        '<h2 class="menu-card__name">' + escapeHtml(item.name) + "</h2>";

      const desc = document.createElement("p");
      desc.className = "menu-card__desc";
      desc.textContent = item.description;

      li.appendChild(row);
      li.appendChild(desc);

      const tagsWrap = document.createElement("div");
      tagsWrap.className = "menu-card__tags";

      item.tags.forEach(function (tag) {
        const t = document.createElement("span");
        t.className = "menu-card__tag menu-card__tag--sky";
        t.textContent = tag;
        tagsWrap.appendChild(t);
      });

      if (tagsWrap.childElementCount > 0) {
        li.appendChild(tagsWrap);
      }

      menuListEl.appendChild(li);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.getAttribute("data-filter");
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      renderHint();
      renderMenu();
    });
  });

  renderHint();
  renderMenu();
})();
