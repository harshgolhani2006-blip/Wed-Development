// Motors Showroom demo frontend
// Replace demo inventory and image URLs with your actual stock.
// Forms are validated locally only; connect a backend or form service to receive submissions.

const vehicles = [
  {id:1,category:"cars",name:"Tata Nexon",brand:"Tata",year:2024,price:1050000,type:"SUV",fuel:"Petrol",details:"Compact SUV with modern features and comfortable seating.",mileage:"17 km/l",status:"Available",image:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",specs:{Engine:"1.2L turbo petrol",Seats:"5",Transmission:"Manual"}},
  {id:2,category:"cars",name:"Mahindra Scorpio-N",brand:"Mahindra",year:2024,price:1650000,type:"SUV",fuel:"Diesel",details:"A rugged SUV designed for family trips and long journeys.",mileage:"15 km/l",status:"Available",image:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",specs:{Engine:"2.2L diesel",Seats:"7",Transmission:"Automatic"}},
  {id:3,category:"cars",name:"Hyundai Creta",brand:"Hyundai",year:2023,price:1500000,type:"SUV",fuel:"Petrol",details:"A practical SUV with a spacious cabin and everyday comfort.",mileage:"16 km/l",status:"Booked",image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",specs:{Engine:"1.5L petrol",Seats:"5",Transmission:"Automatic"}},
  {id:4,category:"cars",name:"Maruti Suzuki Swift",brand:"Maruti Suzuki",year:2022,price:650000,type:"Hatchback",fuel:"Petrol",details:"Compact, city-friendly hatchback with efficient running costs.",mileage:"22 km/l",status:"Available",image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",specs:{Engine:"1.2L petrol",Seats:"5",Transmission:"Manual"}},
  {id:5,category:"cars",name:"Toyota Fortuner",brand:"Toyota",year:2024,price:4400000,type:"Luxury SUV",fuel:"Diesel",details:"A premium full-size SUV with a commanding road presence.",mileage:"11 km/l",status:"Available",image:"https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",specs:{Engine:"2.8L diesel",Seats:"7",Transmission:"Automatic"}},
  {id:6,category:"cars",name:"BMW 3 Series",brand:"BMW",year:2024,price:5900000,type:"Luxury Sedan",fuel:"Petrol",details:"A premium sports sedan focused on comfort and driving dynamics.",mileage:"14 km/l",status:"Sold",image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",specs:{Engine:"2.0L turbo petrol",Seats:"5",Transmission:"Automatic"}},
  {id:7,category:"bikes",name:"Royal Enfield Classic 350",brand:"Royal Enfield",year:2024,price:195000,type:"Cruiser",fuel:"Petrol",details:"Classic styling with a relaxed riding position.",mileage:"35 km/l",status:"Available",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",specs:{Engine:"349 cc",Power:"20 bhp",Brakes:"Disc + ABS"}},
  {id:8,category:"bikes",name:"KTM Duke 390",brand:"KTM",year:2024,price:310000,type:"Street",fuel:"Petrol",details:"A sporty naked motorcycle for enthusiastic riders.",mileage:"28 km/l",status:"Available",image:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",specs:{Engine:"399 cc",Power:"46 bhp",Brakes:"Disc + ABS"}},
  {id:9,category:"bikes",name:"Yamaha R15",brand:"Yamaha",year:2023,price:185000,type:"Sports",fuel:"Petrol",details:"A fully-faired sport motorcycle with sharp styling.",mileage:"45 km/l",status:"Available",image:"https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",specs:{Engine:"155 cc",Power:"18 bhp",Brakes:"Disc + ABS"}},
  {id:10,category:"bikes",name:"TVS Apache RTR 160",brand:"TVS",year:2022,price:120000,type:"Street",fuel:"Petrol",details:"A practical street bike with an athletic design.",mileage:"45 km/l",status:"Available",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",specs:{Engine:"160 cc",Power:"16 bhp",Brakes:"Disc"}},
  {id:11,category:"bikes",name:"Bajaj Pulsar NS200",brand:"Bajaj",year:2023,price:155000,type:"Street",fuel:"Petrol",details:"A sporty commuter with responsive performance.",mileage:"36 km/l",status:"Booked",image:"https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=80",specs:{Engine:"199 cc",Power:"24 bhp",Brakes:"Disc + ABS"}},
  {id:12,category:"bikes",name:"Royal Enfield Himalayan",brand:"Royal Enfield",year:2024,price:290000,type:"Adventure",fuel:"Petrol",details:"An adventure motorcycle suited to touring and rough roads.",mileage:"30 km/l",status:"Available",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",specs:{Engine:"411 cc",Power:"24 bhp",Brakes:"Disc + ABS"}}
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const inr = (amount) => new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(amount);
let activeCategory = "cars";
let favourites = loadJSON("motorsWishlist", []);

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be disabled. */ }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function fillSelect(select, values, firstLabel) {
  const oldValue = select.value;
  select.innerHTML = `<option value="">${firstLabel}</option>` + values.map(v => `<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join("");
  if (values.includes(oldValue)) select.value = oldValue;
}
function setupFilters() {
  const list = vehicles.filter(v => activeCategory === "all" || v.category === activeCategory);
  fillSelect($("#typeFilter"), [...new Set(list.map(v => v.type))].sort(), "All types");
  fillSelect($("#fuelFilter"), [...new Set(list.map(v => v.fuel))].sort(), "All fuels");
}
function cardTemplate(v) {
  const liked = favourites.includes(v.id);
  const statusClass = v.status.toLowerCase();
  return `<article class="vehicle-card">
    <div class="vehicle-photo">
      <img src="${escapeHTML(v.image)}" alt="${escapeHTML(v.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/800x500/17171c/eeeeee?text=Vehicle+Photo'">
      <span class="vehicle-badge ${statusClass}">${escapeHTML(v.status)}</span>
      <button class="wish-btn ${liked ? "active" : ""}" data-wish="${v.id}" aria-label="${liked ? "Remove from" : "Add to"} wishlist" aria-pressed="${liked}">${liked ? "♥" : "♡"}</button>
    </div>
    <div class="vehicle-info">
      <h3>${escapeHTML(v.name)}</h3>
      <div class="vehicle-meta">${v.year} · ${escapeHTML(v.type)} · ${escapeHTML(v.fuel)} · ${escapeHTML(v.mileage)}</div>
      <div class="vehicle-price">${inr(v.price)}</div>
      <div class="vehicle-actions"><button class="btn btn-outline" data-details="${v.id}">View Details</button><button class="btn btn-red" data-enquire="${v.id}">Enquire</button></div>
    </div>
  </article>`;
}
function renderVehicles() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const type = $("#typeFilter").value;
  const fuel = $("#fuelFilter").value;
  const maxPrice = Number($("#priceFilter").value) || Infinity;
  const sort = $("#sortFilter").value;
  let list = vehicles.filter(v =>
    (activeCategory === "all" || v.category === activeCategory) &&
    `${v.name} ${v.brand}`.toLowerCase().includes(query) &&
    (!type || v.type === type) && (!fuel || v.fuel === fuel) && v.price <= maxPrice
  );
  if (sort === "low") list.sort((a,b) => a.price-b.price);
  if (sort === "high") list.sort((a,b) => b.price-a.price);
  if (sort === "year") list.sort((a,b) => b.year-a.year || a.name.localeCompare(b.name));
  $("#resultsCount").textContent = `${list.length} vehicle${list.length === 1 ? "" : "s"} found`;
  $("#vehicleGrid").innerHTML = list.length ? list.map(cardTemplate).join("") : '<div class="empty-state">No vehicles match your filters. Try changing your search or reset the filters.</div>';
  updateTestVehicleOptions();
}
function updateTestVehicleOptions() {
  const select = $("#testVehicle");
  const old = select.value;
  select.innerHTML = '<option value="">Select a vehicle</option>' + vehicles.map(v => `<option value="${v.id}">${escapeHTML(v.name)} — ${inr(v.price)}</option>`).join("");
  if (vehicles.some(v => String(v.id) === old)) select.value = old;
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function openDetails(id) {
  const v = vehicles.find(item => item.id === Number(id));
  if (!v) return;
  const specs = Object.entries(v.specs).map(([key,value]) => `<div><dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("");
  $("#modalContent").innerHTML = `<div class="modal-layout">
    <div><img src="${escapeHTML(v.image)}" alt="${escapeHTML(v.name)}" onerror="this.onerror=null;this.src='https://placehold.co/800x500/17171c/eeeeee?text=Vehicle+Photo'"></div>
    <div><p class="eyebrow">${v.category === "cars" ? "CAR" : "BIKE"} DETAILS</p><h2 id="modalTitle">${escapeHTML(v.name)}</h2><p class="vehicle-price">${inr(v.price)}</p><p class="muted">${escapeHTML(v.details)}</p><dl><div><dt>Year</dt><dd>${v.year}</dd></div><div><dt>Type</dt><dd>${escapeHTML(v.type)}</dd></div><div><dt>Fuel</dt><dd>${escapeHTML(v.fuel)}</dd></div><div><dt>Mileage</dt><dd>${escapeHTML(v.mileage)}</dd></div>${specs}</dl><button class="btn btn-red" id="modalBook">Book a Test Drive</button></div>
  </div>`;
  $("#vehicleModal").hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
  $("#modalBook").addEventListener("click", () => {
    $("#testVehicle").value = String(v.id);
    closeModal();
    $("#testdrive").scrollIntoView({behavior:"smooth"});
  });
}
function closeModal() {
  $("#vehicleModal").hidden = true;
  document.body.style.overflow = "";
}
function validateAndDemoSubmit(form, messageElement, successMessage) {
  const data = new FormData(form);
  const mobile = String(data.get("mobile") || "").trim();
  const message = $(messageElement);
  message.className = "form-message";
  if (!form.reportValidity()) return;
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    message.textContent = "Enter a valid 10-digit Indian mobile number.";
    message.classList.add("error");
    return;
  }
  if (data.has("date")) {
    const date = String(data.get("date"));
    const today = new Date();
    today.setHours(0,0,0,0);
    const chosen = new Date(`${date}T00:00:00`);
    if (!date || Number.isNaN(chosen.getTime()) || chosen < today) {
      message.textContent = "Choose today or a future date.";
      message.classList.add("error");
      return;
    }
  }
  message.textContent = successMessage;
  message.classList.add("success");
  form.reset();
}
$$(".tab").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.category;
  $$(".tab").forEach(tab => tab.classList.toggle("active", tab === button));
  setupFilters();
  renderVehicles();
}));
["searchInput","typeFilter","fuelFilter","priceFilter","sortFilter"].forEach(id => {
  $("#" + id).addEventListener(id === "searchInput" ? "input" : "change", renderVehicles);
});
$("#resetFilters").addEventListener("click", () => {
  $("#searchInput").value = "";
  $("#priceFilter").value = "";
  $("#sortFilter").value = "featured";
  setupFilters();
  $("#typeFilter").value = "";
  $("#fuelFilter").value = "";
  renderVehicles();
});
$("#vehicleGrid").addEventListener("click", event => {
  const wishButton = event.target.closest("[data-wish]");
  const detailButton = event.target.closest("[data-details]");
  const enquireButton = event.target.closest("[data-enquire]");
  if (wishButton) {
    const id = Number(wishButton.dataset.wish);
    favourites = favourites.includes(id) ? favourites.filter(item => item !== id) : [...favourites, id];
    saveJSON("motorsWishlist", favourites);
    renderVehicles();
    showToast(favourites.includes(id) ? "Added to wishlist" : "Removed from wishlist");
  }
  if (detailButton) openDetails(detailButton.dataset.details);
  if (enquireButton) {
    const vehicle = vehicles.find(v => v.id === Number(enquireButton.dataset.enquire));
    if (vehicle) {
      $("#contact").scrollIntoView({behavior:"smooth"});
      $("#contactForm [name='message']").value = `I would like to enquire about ${vehicle.name} (${inr(vehicle.price)}).`;
      showToast(`Enquiry prepared for ${vehicle.name}. Submit the form to validate it.`);
    }
  }
});
$("#modalClose").addEventListener("click", closeModal);
$("#vehicleModal").addEventListener("click", event => { if (event.target === $("#vehicleModal")) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !$("#vehicleModal").hidden) closeModal(); });
$("#testDriveForm").addEventListener("submit", event => {
  event.preventDefault();
  validateAndDemoSubmit(event.currentTarget, "#testDriveMessage", "Form validated. Demo mode: your request has not been sent or saved.");
});
$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  validateAndDemoSubmit(event.currentTarget, "#contactMessage", "Enquiry validated. Demo mode: your message has not been sent or saved.");
});
function calculateEMI() {
  const price = Math.max(0, Number($("#vehiclePrice").value) || 0);
  const down = Math.min(price, Math.max(0, Number($("#downPayment").value) || 0));
  const annualRate = Math.min(50, Math.max(0, Number($("#interestRate").value) || 0));
  const months = Math.max(1, Number($("#loanTenure").value) || 1);
  const principal = price - down;
  const monthlyRate = annualRate / 1200;
  const emi = monthlyRate === 0 ? principal / months : principal * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1);
  $("#emiAmount").textContent = inr(emi);
  $("#loanAmount").textContent = inr(principal);
  $("#totalInterest").textContent = inr(Math.max(0, emi * months - principal));
  $("#totalRepayment").textContent = inr(emi * months);
}
["vehiclePrice","downPayment","interestRate","loanTenure"].forEach(id => $("#" + id).addEventListener("input", calculateEMI));
$("#menuToggle").addEventListener("click", () => {
  const open = $("#navLinks").classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
  $("#menuToggle").textContent = open ? "×" : "☰";
});
$("#navLinks").addEventListener("click", event => {
  if (event.target.closest("a")) {
    $("#navLinks").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
    $("#menuToggle").textContent = "☰";
  }
});
$("#testDate").min = new Date().toISOString().slice(0,10);
$("#year").textContent = new Date().getFullYear();
setupFilters();
renderVehicles();
calculateEMI();
