// HERO SLIDER
const slides = document.querySelectorAll(".slide");
let i = 0;

setInterval(() => {
  slides[i].classList.remove("active");
  i = (i + 1) % slides.length;
  slides[i].classList.add("active");
}, 10000);


// NAVBAR ICONS (desktop) -> brown fill on click
const navActions = document.querySelectorAll(".nav-action");
navActions.forEach(btn => {
  btn.addEventListener("click", () => {
    navActions.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


// MOBILE MENU (OFF-CANVAS from right)
const ham = document.getElementById("hamburger");
const menu = document.getElementById("mobileMenu");

function closeMenu(){
  menu.classList.remove("open");
}

ham.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("open");
});

// close when clicking outside
document.addEventListener("click", () => closeMenu());

// prevent closing when clicking inside menu
menu.addEventListener("click", (e) => e.stopPropagation());

// close when clicking a link
document.querySelectorAll(".m-link").forEach(a => {
  a.addEventListener("click", () => closeMenu());
});


// close when click outside
document.addEventListener("click", () => {
  menu.classList.remove("open");
  setTimeout(() => { if (!menu.classList.contains("open")) menu.style.display = "none"; }, 220);
});

// close when clicking a link
document.querySelectorAll(".m-link").forEach(a => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    setTimeout(() => { if (!menu.classList.contains("open")) menu.style.display = "none"; }, 220);
  });
});


document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     Top Collection reveal animation
     =============================== */

  const scroller = document.querySelector(".tc-scroll");
  if (scroller) {
    const cards = scroller.querySelectorAll(".tc-card");

    // stagger animation delay (safe for many cards)
    cards.forEach((card, i) => {
      const delay = Math.min(i * 90, 900);
      card.style.setProperty("--delay", `${delay}ms`);
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              scroller.classList.add("is-ready");
              obs.disconnect(); // play once
            }
          });
        },
        {
          threshold: 0.25,
          rootMargin: "0px 0px -10% 0px"
        }
      );

      observer.observe(scroller);
    } else {
      scroller.classList.add("is-ready");
    }
  }

  /* ===============================
     Add to Cart ⇄ Added toggle
     =============================== */

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-cart-btn");
    if (!btn) return;

    // toggle state
    const isAdded = btn.classList.toggle("is-added");

    btn.textContent = isAdded ? "Added" : "Add to Cart";
  });

});

document.addEventListener("click", (e) => {
  const heartBtn = e.target.closest(".js-heart");
  if (!heartBtn) return;

  const liked = heartBtn.classList.toggle("is-liked");
  const icon = heartBtn.querySelector("i");
  if (!icon) return;

  icon.classList.toggle("fa-regular", !liked);
  icon.classList.toggle("fa-solid", liked);
});
// ADVANCE FILTERING (shop.html)
// ===== Advance Search Modal =====
(() => {
  const advanceBtn = document.getElementById("advanceBtn");
  const overlay = document.getElementById("asOverlay");
  const closeBtn = document.getElementById("asCloseBtn");

  const priceMin = document.getElementById("priceMin");
  const priceMax = document.getElementById("priceMax");
  const priceValue = document.getElementById("priceValue");
  const fill = document.getElementById("asFill");

  const resetBtn = document.getElementById("asReset");
  const applyBtn = document.getElementById("asApply");

  if (!advanceBtn || !overlay) return;

  const MIN_GAP = 500; // keep min and max apart

  const formatLKR = (n) => `LKR ${Number(n).toLocaleString("en-US")}`;

  const syncRange = () => {
    let min = parseInt(priceMin.value, 10);
    let max = parseInt(priceMax.value, 10);

    // keep gap
    if (max - min < MIN_GAP) {
      if (document.activeElement === priceMin) {
        min = max - MIN_GAP;
        priceMin.value = String(min);
      } else {
        max = min + MIN_GAP;
        priceMax.value = String(max);
      }
    }

    const range = parseInt(priceMin.max, 10) - parseInt(priceMin.min, 10);
    const left = ((min - priceMin.min) / range) * 100;
    const right = 100 - ((max - priceMin.min) / range) * 100;

    fill.style.left = `${left}%`;
    fill.style.right = `${right}%`;

    priceValue.textContent = `${formatLKR(min)} – ${formatLKR(max)}`;
  };

  const openModal = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    syncRange();
  };

  const closeModal = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  advanceBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  // outside click closes (click overlay area)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeModal();
    }
  });

  // range changes
  priceMin.addEventListener("input", syncRange);
  priceMax.addEventListener("input", syncRange);

  // Reset / Apply (you can wire filters later)
  resetBtn?.addEventListener("click", () => {
    priceMin.value = "0";
    priceMax.value = "20000";
    document.getElementById("sizeSelect").value = "any";
    document.getElementById("inStock").checked = false;
    document.getElementById("outStock").checked = false;
    syncRange();
  });

  applyBtn?.addEventListener("click", () => {
    // TODO: connect to your filtering logic
    closeModal();
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const passInput = document.getElementById("passInput");
  const passToggle = document.getElementById("passToggle");

  if (!passInput || !passToggle) return;

  passToggle.addEventListener("click", () => {
    const isHidden = passInput.type === "password";
    passInput.type = isHidden ? "text" : "password";

    const icon = passToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-eye", !isHidden);
      icon.classList.toggle("fa-eye-slash", isHidden);
    }
  });
});

// register
document.addEventListener("DOMContentLoaded", () => {

  /* Password show / hide */
  document.querySelectorAll(".pass-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      const icon = btn.querySelector("i");

      if (!input) return;

      const show = input.type === "password";
      input.type = show ? "text" : "password";

      icon.classList.toggle("fa-eye", !show);
      icon.classList.toggle("fa-eye-slash", show);
    });
  });

  /* Confirm password validation */
  const form = document.getElementById("registerForm");
  const pass = document.getElementById("regPass");
  const confirm = document.getElementById("regConfirm");
  const error = document.getElementById("errorText");

  form.addEventListener("submit", (e) => {
    if (pass.value !== confirm.value) {
      e.preventDefault();
      error.textContent = "Passwords do not match";
      confirm.focus();
    } else {
      error.textContent = "";
      // submit to backend
    }
  });
});
// cart
const formatLKR = (n) => `LKR ${Number(n).toLocaleString("en-US")}`;

function recalc() {
  const items = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  items.forEach(item => {
    const price = parseInt(item.dataset.price, 10);
    const qtyInput = item.querySelector(".qval");
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));

    qtyInput.value = qty;

    const line = price * qty;
    subtotal += line;

    const lineEl = item.querySelector(".line-subtotal");
    lineEl.textContent = formatLKR(line);
  });

  // simple shipping rule
  const shipping = subtotal > 0 ? 450 : 0;
  const total = subtotal + shipping;

  document.getElementById("sumSubtotal").textContent = formatLKR(subtotal);
  document.getElementById("sumShipping").textContent = formatLKR(shipping);
  document.getElementById("sumTotal").textContent = formatLKR(total);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const item = btn.closest(".cart-item");

  if (action === "inc" && item) {
    const input = item.querySelector(".qval");
    input.value = (parseInt(input.value || "1", 10) + 1);
    recalc();
  }

  if (action === "dec" && item) {
    const input = item.querySelector(".qval");
    input.value = Math.max(1, parseInt(input.value || "1", 10) - 1);
    recalc();
  }

  if (action === "remove" && item) {
    item.remove();
    recalc();
  }
});

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("qval")) {
    recalc();
  }
});

document.getElementById("clearCart")?.addEventListener("click", () => {
  document.querySelectorAll(".cart-item").forEach(i => i.remove());
  recalc();
});

window.addEventListener("DOMContentLoaded", recalc);

// whishlist
const updateEmptyState = () => {
  const items = document.querySelectorAll(".wish-item");
  const empty = document.querySelector(".wishlist-empty");
  if (items.length === 0) {
    empty.style.display = "block";
  }
};

document.addEventListener("click", (e) => {

  // Remove item
  if (e.target.closest(".remove-wish")) {
    e.target.closest(".wish-item").remove();
    updateEmptyState();
  }

  // Move to cart (UI only)
  if (e.target.closest(".move-cart")) {
    const item = e.target.closest(".wish-item");
    item.remove();
    updateEmptyState();
    alert("Moved to cart (demo)");
  }

});

window.addEventListener("DOMContentLoaded", updateEmptyState);

function wishlist() {
  window.location.href = "wishlist.html";
}
function cart() {
  window.location.href = "cart.html";
}
function profile() {
  window.location.href = "profile.html";
}