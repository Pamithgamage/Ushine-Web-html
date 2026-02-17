// ===== Gallery thumbs =====
const mainImg = document.getElementById("mainImg");
const thumbs = document.getElementById("thumbs");

thumbs?.addEventListener("click", (e) => {
  const btn = e.target.closest(".pv-thumb");
  if(!btn) return;

  const img = btn.dataset.img;
  if(!img) return;

  mainImg.src = img;

  thumbs.querySelectorAll(".pv-thumb").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");
});

// ===== Wishlist toggle =====
const wishBtn = document.getElementById("wishBtn");
const wishIcon = document.getElementById("wishIcon");
let wished = false;

wishBtn?.addEventListener("click", () => {
  wished = !wished;
  wishBtn.classList.toggle("is-on", wished);
  wishIcon.className = wished ? "fa-solid fa-heart" : "fa-regular fa-heart";
});

// ===== Quantity =====
const qtyInput = document.getElementById("qtyInput");
const minus = document.getElementById("qtyMinus");
const plus = document.getElementById("qtyPlus");

const clampQty = (n) => Math.max(1, Math.min(99, n));

minus?.addEventListener("click", () => {
  const n = clampQty(parseInt(qtyInput.value || "1", 10) - 1);
  qtyInput.value = n;
});
plus?.addEventListener("click", () => {
  const n = clampQty(parseInt(qtyInput.value || "1", 10) + 1);
  qtyInput.value = n;
});

qtyInput?.addEventListener("input", () => {
  qtyInput.value = qtyInput.value.replace(/\D/g, "");
  if(qtyInput.value === "") qtyInput.value = "1";
  qtyInput.value = clampQty(parseInt(qtyInput.value, 10));
});

// ===== Add to cart toggle =====
const cartBtn = document.getElementById("addToCartBtn");
const cartText = document.getElementById("cartBtnText");
let added = false;

cartBtn?.addEventListener("click", () => {
  added = !added;
  cartText.textContent = added ? "Added" : "Add to Cart";
});

// ===== Tabs =====
const tabBar = document.getElementById("tabBar");
const panels = {
  desc: document.getElementById("tab-desc"),
  details: document.getElementById("tab-details"),
  reviews: document.getElementById("tab-reviews"),
};

tabBar?.addEventListener("click", (e) => {
  const btn = e.target.closest(".pv-tab");
  if(!btn) return;
  const key = btn.dataset.tab;

  tabBar.querySelectorAll(".pv-tab").forEach(t => t.classList.remove("is-active"));
  btn.classList.add("is-active");

  Object.keys(panels).forEach(k => panels[k]?.classList.toggle("is-show", k === key));
});

// ===== Reviews System (with default reviews + see more) =====

const reviewForm = document.getElementById("reviewForm");
const starSelect = document.getElementById("starSelect");
const reviewText = document.getElementById("reviewText");
const reviewsList = document.getElementById("reviewsList");
const seeMoreBtn = document.getElementById("seeMoreBtn");
const rvCount = document.getElementById("rvCount");

let selectedRate = 0;
let expanded = false;
const INITIAL_SHOW = 3;

// Default reviews (shown under the form)
const DEFAULT_REVIEWS = [
  { name: "Shanika", rate: 4, text: "Quality is excellent and delivery was fast." },
  { name: "Kasun",   rate: 3, text: "Nice fabric, looks premium." },
  { name: "Nimali",  rate: 5, text: "Very elegant saree. Highly recommended!" },
  { name: "Tharindu",rate: 4, text: "Good packaging and the colors are beautiful." },
  { name: "Dilani",  rate: 5, text: "Worth the price. Super comfortable." }
];

// init storage (seed once)
const ensureSeedReviews = () => {
  const existing = localStorage.getItem("reviews");
  if (!existing) {
    localStorage.setItem("reviews", JSON.stringify(DEFAULT_REVIEWS));
  }
};

// star select
starSelect?.addEventListener("click", (e) => {
  const star = e.target.closest("i");
  if(!star) return;

  selectedRate = Number(star.dataset.rate);

  starSelect.querySelectorAll("i").forEach((s, i) => {
    s.classList.toggle("active", i < selectedRate);
    s.className = i < selectedRate ? "fa-solid fa-star active" : "fa-regular fa-star";
  });
});

const renderStars = (rate) => {
  return Array.from({length:5}).map((_,i)=>`
    <i class="${i < rate ? 'fa-solid' : 'fa-regular'} fa-star"></i>
  `).join("");
};

const loadReviews = () => {
  const data = JSON.parse(localStorage.getItem("reviews") || "[]");

  rvCount.textContent = data.length;

  // Clear list
  reviewsList.innerHTML = "";

  if(!data.length){
    reviewsList.innerHTML = `<p style="font-weight:800;color:rgba(0,0,0,.55)">No reviews yet.</p>`;
    seeMoreBtn.style.display = "none";
    return;
  }

  const toShow = expanded ? data : data.slice(0, INITIAL_SHOW);

  toShow.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-card";

    div.innerHTML = `
      <div class="review-head">
        <strong>${r.name || "User"}</strong>
        <div class="review-stars">${renderStars(r.rate)}</div>
      </div>
      <p class="review-text">${r.text}</p>
    `;

    reviewsList.appendChild(div);
  });

  // see more button logic
  if(data.length > INITIAL_SHOW){
    seeMoreBtn.style.display = "block";
    seeMoreBtn.textContent = expanded ? "See less" : "See more";
  }else{
    seeMoreBtn.style.display = "none";
  }
};

// See more / less
seeMoreBtn?.addEventListener("click", () => {
  expanded = !expanded;
  loadReviews();
});
