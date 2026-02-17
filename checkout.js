const fmt = (n) => `LKR ${Number(n).toLocaleString("en-US")}`;

const sumItems = document.getElementById("sumItems");
const tSubtotal = document.getElementById("tSubtotal");
const tShipping = document.getElementById("tShipping");
const tTotal = document.getElementById("tTotal");

const shippingRadios = document.querySelectorAll('input[name="ship"]');

function getShipping() {
  const checked = document.querySelector('input[name="ship"]:checked');
  return checked ? parseInt(checked.value, 10) : 0;
}

function recalc() {
  let subtotal = 0;

  sumItems.querySelectorAll(".sum-item").forEach(item => {
    const price = parseInt(item.dataset.price, 10);
    const q = parseInt(item.querySelector("[data-qval]").textContent, 10);
    subtotal += price * q;
  });

  const ship = subtotal > 0 ? getShipping() : 0;
  const total = subtotal + ship;

  tSubtotal.textContent = fmt(subtotal);
  tShipping.textContent = fmt(ship);
  tTotal.textContent = fmt(total);
}

// qty buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".qmini");
  if (!btn) return;

  const wrap = btn.closest(".sum-item");
  const qEl = wrap.querySelector("[data-qval]");
  let q = parseInt(qEl.textContent, 10);

  if (btn.dataset.q === "inc") q++;
  if (btn.dataset.q === "dec") q = Math.max(1, q - 1);

  qEl.textContent = q;
  recalc();
});

// shipping change
shippingRadios.forEach(r => r.addEventListener("change", recalc));

// payment switcher
const payBtns = document.querySelectorAll(".co-pay-btn");
const panels = {
  card: document.getElementById("pay-card"),
  koko: document.getElementById("pay-koko"),
  mintpay: document.getElementById("pay-mintpay"),
  payzy: document.getElementById("pay-payzy"),
};

payBtns.forEach(b => {
  b.addEventListener("click", () => {
    payBtns.forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");

    const key = b.dataset.pay;
    Object.keys(panels).forEach(k => panels[k].classList.toggle("is-show", k === key));
  });
});

// demo place order validation
document.getElementById("placeOrder")?.addEventListener("click", () => {
  const requiredIds = ["fullName","phone","email","addr1","city","district","zip"];
  const missing = requiredIds.filter(id => !document.getElementById(id)?.value.trim());

  if (missing.length) {
    alert("Please fill all required fields.");
    return;
  }

  alert("Order placed successfully! (demo)");
});

window.addEventListener("DOMContentLoaded", recalc);
