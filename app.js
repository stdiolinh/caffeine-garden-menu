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
  let milk = "whole";
  let temp = "hot";

  const menuListEl = document.getElementById("menu-list");
  const menuEmptyEl = document.getElementById("menu-empty");
  const menuWipEl = document.getElementById("menu-wip");
  const menuHintEl = document.getElementById("menu-hint");
  const hintCategoryEl = document.getElementById("hint-category");
  const hintMilkEl = document.getElementById("hint-milk");
  const hintTempEl = document.getElementById("hint-temp");

  function renderHint() {
    hintCategoryEl.textContent = activeFilter;
    hintMilkEl.textContent = milk;
    hintTempEl.textContent = temp;
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

      const tempNote =
        item.category === "treats"
          ? ""
          : temp === "iced"
            ? "best iced"
            : "best hot";

      const milkNote = item.category === "treats" ? "" : milk + " milk";

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

      if (milkNote) {
        const t1 = document.createElement("span");
        t1.className = "menu-card__tag";
        t1.textContent = milkNote;
        tagsWrap.appendChild(t1);
      }

      if (tempNote) {
        const t2 = document.createElement("span");
        t2.className = "menu-card__tag menu-card__tag--sky";
        t2.textContent = tempNote;
        tagsWrap.appendChild(t2);
      }

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

  document.querySelectorAll(".seg--milk .seg__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      milk = btn.getAttribute("data-milk");
      document.querySelectorAll(".seg--milk .seg__btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      renderHint();
      renderMenu();
    });
  });

  document.querySelectorAll(".seg--temp .seg__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      temp = btn.getAttribute("data-temp");
      document.querySelectorAll(".seg--temp .seg__btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      renderHint();
      renderMenu();
    });
  });

  renderHint();
  renderMenu();
})();
