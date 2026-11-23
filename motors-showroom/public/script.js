
/* =========================================
   MOTORS SHOWROOM - MAIN JAVASCRIPT
========================================= */

const API_URL = "/api";

// =========================================
// SAMPLE VEHICLES
// =========================================

const sampleVehicles = [
  {
    id: "car-1",
    name: "BMW 5 Series",
    brand: "BMW",
    type: "Car",
    price: 7200000,
    fuel: "Petrol",
    transmission: "Automatic",
    year: 2025,
    mileage: "14 km/l",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
    description: "A premium luxury sedan combining elegant design, advanced technology and impressive performance.",
    featured: true
  },
  {
    id: "car-2",
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    type: "Car",
    price: 6500000,
    fuel: "Petrol",
    transmission: "Automatic",
    year: 2025,
    mileage: "16 km/l",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
    description: "Experience luxury, comfort and refined engineering with this premium Mercedes-Benz sedan.",
    featured: true
  },
  {
    id: "car-3",
    name: "Audi A6",
    brand: "Audi",
    type: "Car",
    price: 7000000,
    fuel: "Petrol",
    transmission: "Automatic",
    year: 2025,
    mileage: "15 km/l",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
    description: "A sophisticated luxury sedan offering stylish design, comfort and modern technology.",
    featured: false
  },
  {
    id: "car-4",
    name: "Toyota Fortuner",
    brand: "Toyota",
    type: "Car",
    price: 3800000,
    fuel: "Diesel",
    transmission: "Automatic",
    year: 2025,
    mileage: "10 km/l",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    description: "A powerful SUV designed for comfortable journeys and challenging roads.",
    featured: true
  },
  {
    id: "car-5",
    name: "Hyundai Creta",
    brand: "Hyundai",
    type: "Car",
    price: 1500000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "17 km/l",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85",
    description: "A practical and stylish SUV with modern features and comfortable interiors.",
    featured: false
  },
  {
    id: "car-6",
    name: "Tata Nexon EV",
    brand: "Tata",
    type: "Car",
    price: 1700000,
    fuel: "Electric",
    transmission: "Automatic",
    year: 2025,
    mileage: "465 km range",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85",
    description: "An electric SUV offering a modern driving experience with zero tailpipe emissions.",
    featured: true
  },
  {
    id: "bike-1",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    type: "Bike",
    price: 220000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "35 km/l",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
    description: "A timeless motorcycle with classic styling and a comfortable riding experience.",
    featured: true
  },
  {
    id: "bike-2",
    name: "KTM Duke 390",
    brand: "KTM",
    type: "Bike",
    price: 350000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "28 km/l",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=85",
    description: "A sporty performance motorcycle built for riders who love speed and agility.",
    featured: true
  },
  {
    id: "bike-3",
    name: "Yamaha R15 V4",
    brand: "Yamaha",
    type: "Bike",
    price: 190000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "45 km/l",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=85",
    description: "A sporty motorcycle inspired by racing design and performance.",
    featured: false
  },
  {
    id: "bike-4",
    name: "Kawasaki Ninja 650",
    brand: "Kawasaki",
    type: "Bike",
    price: 710000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "21 km/l",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=85",
    description: "A powerful sport motorcycle with excellent touring and everyday riding capabilities.",
    featured: true
  },
  {
    id: "bike-5",
    name: "Honda CB350",
    brand: "Honda",
    type: "Bike",
    price: 220000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "35 km/l",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=900&q=85",
    description: "A stylish roadster offering smooth performance and comfortable riding.",
    featured: false
  },
  {
    id: "bike-6",
    name: "BMW G 310 R",
    brand: "BMW",
    type: "Bike",
    price: 290000,
    fuel: "Petrol",
    transmission: "Manual",
    year: 2025,
    mileage: "30 km/l",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85",
    description: "A premium naked street motorcycle with distinctive BMW styling.",
    featured: false
  }
];


// =========================================
// APPLICATION STATE
// =========================================

let vehicles = [...sampleVehicles];

let activeCategory = "All";
let visibleCount = 6;

let wishlist = JSON.parse(
  localStorage.getItem("motorsWishlist") || "[]"
);

let compareList = [];


// =========================================
// DOM ELEMENTS
// =========================================

const vehicleGrid = document.getElementById("vehicleGrid");
const vehicleCount = document.getElementById("vehicleCount");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const fuelFilter = document.getElementById("fuelFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");

const wishlistCount = document.getElementById("wishlistCount");
const wishlistModal = document.getElementById("wishlistModal");
const wishlistContent = document.getElementById("wishlistContent");

const vehicleModal = document.getElementById("vehicleModal");
const vehicleModalContent = document.getElementById("vehicleModalContent");

const compareContent = document.getElementById("compareContent");

const toast = document.getElementById("toast");


// =========================================
// HELPER FUNCTIONS
// =========================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function getVehicleId(vehicle) {
  return String(vehicle._id || vehicle.id);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function getVehicleImage(vehicle) {
  return escapeHTML(
    vehicle.image ||
    "https://placehold.co/900x600?text=Vehicle"
  );
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}


// =========================================
// LOAD VEHICLES FROM BACKEND
// =========================================

async function loadVehicles() {
  try {
    const response = await fetch(`${API_URL}/vehicles`);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      vehicles = data;
    } else {
      vehicles = [...sampleVehicles];
    }

  } catch (error) {
    console.warn("Using sample vehicle data:", error.message);
    vehicles = [...sampleVehicles];
  }

  populateBrands();
  populateTestDriveVehicles();
  renderVehicles();
  renderWishlist();
  renderCompare();
}


// =========================================
// BRAND FILTER
// =========================================

function populateBrands() {
  if (!brandFilter) return;

  const selectedBrand = brandFilter.value || "All";

  const brands = [...new Set(
    vehicles.map(vehicle => vehicle.brand).filter(Boolean)
  )].sort();

  brandFilter.innerHTML = `
    <option value="All">All Brands</option>
    ${brands.map(brand => `
      <option value="${escapeHTML(brand)}">
        ${escapeHTML(brand)}
      </option>
    `).join("")}
  `;

  if (brands.includes(selectedBrand)) {
    brandFilter.value = selectedBrand;
  }
}


// =========================================
// FILTER VEHICLES
// =========================================

function getFilteredVehicles() {
  let filtered = [...vehicles];

  const search = searchInput?.value.trim().toLowerCase() || "";
  const brand = brandFilter?.value || "All";
  const fuel = fuelFilter?.value || "All";
  const price = priceFilter?.value || "All";
  const sort = sortFilter?.value || "default";

  // Category
  if (activeCategory !== "All") {
    filtered = filtered.filter(
      vehicle => vehicle.type === activeCategory
    );
  }

  // Search
  if (search) {
    filtered = filtered.filter(vehicle =>
      `${vehicle.name} ${vehicle.brand} ${vehicle.type}`
        .toLowerCase()
        .includes(search)
    );
  }

  // Brand
  if (brand !== "All") {
    filtered = filtered.filter(
      vehicle => vehicle.brand === brand
    );
  }

  // Fuel
  if (fuel !== "All") {
    filtered = filtered.filter(
      vehicle => vehicle.fuel === fuel
    );
  }

  // Price
  if (price !== "All") {
    const [minimum, maximum] = price.split("-").map(Number);

    filtered = filtered.filter(
      vehicle => vehicle.price >= minimum &&
                 vehicle.price <= maximum
    );
  }

  // Sorting
  if (sort === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}


// =========================================
// RENDER VEHICLES
// =========================================

function renderVehicles() {
  if (!vehicleGrid) return;

  const filtered = getFilteredVehicles();
  const displayed = filtered.slice(0, visibleCount);

  if (vehicleCount) {
    vehicleCount.textContent = filtered.length;
  }

  if (emptyState) {
    emptyState.hidden = filtered.length !== 0;
  }

  if (displayed.length === 0) {
    vehicleGrid.innerHTML = "";
  } else {
    vehicleGrid.innerHTML = displayed.map(vehicle => {
      const id = getVehicleId(vehicle);
      const isWishlisted = wishlist.includes(id);

      return `
        <article class="vehicle-card">

          <div class="vehicle-image">

            <img
              src="${getVehicleImage(vehicle)}"
              alt="${escapeHTML(vehicle.name)}"
              loading="lazy"
            >

            <span class="vehicle-tag">
              ${escapeHTML(vehicle.type)}
            </span>

            <button
              class="vehicle-wishlist ${isWishlisted ? "active" : ""}"
              data-action="wishlist"
              data-id="${escapeHTML(id)}"
              aria-label="Add to wishlist"
            >
              ${isWishlisted ? "♥" : "♡"}
            </button>

          </div>

          <div class="vehicle-details">

            <span class="vehicle-brand">
              ${escapeHTML(vehicle.brand || "Motors")}
            </span>

            <h3>${escapeHTML(vehicle.name)}</h3>

            <div class="vehicle-specs">
              <span>⛽ ${escapeHTML(vehicle.fuel || "N/A")}</span>
              <span>⚙ ${escapeHTML(vehicle.transmission || "N/A")}</span>
              <span>📅 ${escapeHTML(vehicle.year || "N/A")}</span>
            </div>

            <div class="vehicle-bottom">

              <div class="vehicle-price">
                ${formatPrice(vehicle.price)}
              </div>

              <div class="vehicle-actions">

                <button
                  class="small-btn"
                  data-action="compare"
                  data-id="${escapeHTML(id)}"
                >
                  Compare
                </button>

                <button
                  class="small-btn"
                  data-action="details"
                  data-id="${escapeHTML(id)}"
                >
                  Details
                </button>

              </div>

            </div>

          </div>

        </article>
      `;
    }).join("");
  }

  const showMoreBtn = document.getElementById("showMoreBtn");

  if (showMoreBtn) {
    showMoreBtn.style.display =
      filtered.length > visibleCount ? "inline-flex" : "none";
  }
}


// =========================================
// CATEGORY TABS
// =========================================

document.querySelectorAll(".tab-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");

    activeCategory = button.dataset.category;
    visibleCount = 6;

    renderVehicles();
  });
});


// =========================================
// FILTER EVENTS
// =========================================

[
  searchInput,
  brandFilter,
  fuelFilter,
  priceFilter,
  sortFilter
].forEach(element => {
  if (!element) return;

  element.addEventListener(
    element === searchInput ? "input" : "change",
    () => {
      visibleCount = 6;
      renderVehicles();
    }
  );
});


// =========================================
// CLEAR FILTERS
// =========================================

document.getElementById("clearFilters")?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (brandFilter) brandFilter.value = "All";
  if (fuelFilter) fuelFilter.value = "All";
  if (priceFilter) priceFilter.value = "All";
  if (sortFilter) sortFilter.value = "default";

  activeCategory = "All";
  visibleCount = 6;

  document.querySelectorAll(".tab-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );
  });

  renderVehicles();
});


// =========================================
// SHOW MORE VEHICLES
// =========================================

document.getElementById("showMoreBtn")?.addEventListener("click", () => {
  visibleCount += 6;
  renderVehicles();
});


// =========================================
// WISHLIST
// =========================================

function saveWishlist() {
  localStorage.setItem(
    "motorsWishlist",
    JSON.stringify(wishlist)
  );

  updateWishlistCount();
}

function updateWishlistCount() {
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist");
  }

  saveWishlist();
  renderVehicles();
  renderWishlist();
}

function renderWishlist() {
  if (!wishlistContent) return;

  const savedVehicles = vehicles.filter(vehicle =>
    wishlist.includes(getVehicleId(vehicle))
  );

  if (savedVehicles.length === 0) {
    wishlistContent.innerHTML = `
      <div class="wishlist-empty">
        <h3>Your wishlist is empty</h3>
        <p>Add your favourite vehicles to see them here.</p>
      </div>
    `;
    return;
  }

  wishlistContent.innerHTML = savedVehicles.map(vehicle => `
    <div class="wishlist-item">

      <img src="${getVehicleImage(vehicle)}"
        alt="${escapeHTML(vehicle.name)}">

      <div>
        <h3>${escapeHTML(vehicle.name)}</h3>
        <p>${formatPrice(vehicle.price)}</p>
      </div>

      <button
        data-action="wishlist"
        data-id="${escapeHTML(getVehicleId(vehicle))}"
        aria-label="Remove from wishlist"
      >
        ×
      </button>

    </div>
  `).join("");
}

document.getElementById("wishlistNavBtn")?.addEventListener("click", () => {
  renderWishlist();
  openModal(wishlistModal);
});


// =========================================
// VEHICLE DETAILS MODAL
// =========================================

function showVehicleDetails(id) {
  const vehicle = vehicles.find(
    item => getVehicleId(item) === id
  );

  if (!vehicle) return;

  vehicleModalContent.innerHTML = `
    <div class="modal-vehicle-image">
      <img
        src="${getVehicleImage(vehicle)}"
        alt="${escapeHTML(vehicle.name)}"
      >
    </div>

    <span class="vehicle-brand">
      ${escapeHTML(vehicle.brand || "")}
    </span>

    <h2>${escapeHTML(vehicle.name)}</h2>

    <div class="modal-vehicle-info">

      <p><strong>Price:</strong> ${formatPrice(vehicle.price)}</p>

      <p><strong>Type:</strong> ${escapeHTML(vehicle.type)}</p>

      <p><strong>Fuel:</strong> ${escapeHTML(vehicle.fuel || "N/A")}</p>

      <p><strong>Transmission:</strong>
        ${escapeHTML(vehicle.transmission || "N/A")}
      </p>

      <p><strong>Year:</strong> ${escapeHTML(vehicle.year || "N/A")}</p>

      <p><strong>Mileage:</strong>
        ${escapeHTML(vehicle.mileage || "N/A")}
      </p>

      <p><strong>Description:</strong>
        ${escapeHTML(vehicle.description || "Contact us for more details.")}
      </p>

    </div>

    <button
      class="btn btn-primary"
      data-action="book"
      data-id="${escapeHTML(getVehicleId(vehicle))}"
    >
      Book Test Drive
    </button>

  `;

  openModal(vehicleModal);
}


// =========================================
// MODAL FUNCTIONS
// =========================================

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".modal.show")) {
    document.body.classList.remove("modal-open");
  }
}

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", () => {
    closeModal(element.closest(".modal"));
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach(modal => {
      closeModal(modal);
    });
  }
});


// =========================================
// COMPARE VEHICLES
// =========================================

function toggleCompare(id) {
  if (compareList.includes(id)) {
    compareList = compareList.filter(item => item !== id);
    showToast("Vehicle removed from comparison");
  } else {
    if (compareList.length >= 3) {
      showToast("You can compare up to 3 vehicles");
      return;
    }

    compareList.push(id);
    showToast("Vehicle added to comparison");
  }

  renderCompare();
}

function renderCompare() {
  if (!compareContent) return;

  const selected = vehicles.filter(vehicle =>
    compareList.includes(getVehicleId(vehicle))
  );

  if (selected.length === 0) {
    compareContent.innerHTML = `
      <div class="compare-empty">
        <h3>No Vehicles Selected</h3>
        <p>Add vehicles to compare from the collection above.</p>
      </div>
    `;
    return;
  }

  const fields = [
    ["Brand", "brand"],
    ["Vehicle", "name"],
    ["Type", "type"],
    ["Price", "price"],
    ["Fuel", "fuel"],
    ["Transmission", "transmission"],
    ["Year", "year"],
    ["Mileage", "mileage"]
  ];

  compareContent.innerHTML = `
    <table class="compare-table">

      <thead>
        <tr>
          <th>Specification</th>

          ${selected.map(vehicle => `
            <th>
              ${escapeHTML(vehicle.name)}
              <br>
              <button
                data-action="remove-compare"
                data-id="${escapeHTML(getVehicleId(vehicle))}"
              >
                Remove
              </button>
            </th>
          `).join("")}

        </tr>
      </thead>

      <tbody>
        ${fields.map(([label, key]) => `
          <tr>
            <td><strong>${label}</strong></td>

            ${selected.map(vehicle => `
              <td>
                ${key === "price"
                  ? formatPrice(vehicle[key])
                  : escapeHTML(vehicle[key] ?? "N/A")}
              </td>
            `).join("")}

          </tr>
        `).join("")}
      </tbody>

    </table>
  `;
}


// =========================================
// EMI CALCULATOR
// =========================================

function calculateEMI() {
  const principal = Number(
    document.getElementById("loanAmount")?.value
  );

  const annualRate = Number(
    document.getElementById("interestRate")?.value
  );

  const years = Number(
    document.getElementById("loanTenure")?.value
  );

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    principal <= 0 ||
    annualRate < 0 ||
    years <= 0 ||
    years > 30
  ) {
    showToast("Please enter valid loan details");
    return;
  }

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let emi;

  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);

    emi =
      principal * monthlyRate * factor /
      (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  document.getElementById("emiValue").textContent =
    formatPrice(Math.round(emi));

  document.getElementById("emiPrincipal").textContent =
    formatPrice(principal);

  document.getElementById("emiInterest").textContent =
    formatPrice(Math.round(totalInterest));

  document.getElementById("emiTotal").textContent =
    formatPrice(Math.round(totalPayment));
}

document.getElementById("calculateEMI")?.addEventListener(
  "click",
  calculateEMI
);


// =========================================
// TEST DRIVE VEHICLE OPTIONS
// =========================================

function populateTestDriveVehicles() {
  const select = document.getElementById("testVehicle");

  if (!select) return;

  const currentValue = select.value;

  select.innerHTML = `
    <option value="">Choose a vehicle</option>

    ${vehicles.map(vehicle => `
      <option value="${escapeHTML(vehicle.name)}">
        ${escapeHTML(vehicle.name)}
      </option>
    `).join("")}
  `;

  if (vehicles.some(vehicle => vehicle.name === currentValue)) {
    select.value = currentValue;
  }
}


// =========================================
// TEST DRIVE FORM
// =========================================

document.getElementById("testDriveForm")?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const message = document.getElementById("testDriveMessage");
    const submitButton = form.querySelector('button[type="submit"]');

    const formData = Object.fromEntries(
      new FormData(form).entries()
    );

    if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      message.textContent = "Please enter a valid phone number.";
      message.className = "form-message";
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      const response = await fetch(`${API_URL}/test-drive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request failed");
      }

      message.textContent = result.message;
      message.className = "form-message success";

      form.reset();
      showToast("Test drive request submitted!");

    } catch (error) {
      message.textContent =
        error.message || "Unable to submit your request.";

      message.className = "form-message";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Test Drive Request";
    }
  }
);


// =========================================
// CONTACT FORM
// =========================================

document.getElementById("contactForm")?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const message = document.getElementById("contactMessageStatus");
    const submitButton = form.querySelector('button[type="submit"]');

    const formData = Object.fromEntries(
      new FormData(form).entries()
    );

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Message could not be sent");
      }

      message.textContent = result.message;
      message.className = "form-message success";

      form.reset();
      showToast("Message sent successfully!");

    } catch (error) {
      message.textContent =
        error.message || "Unable to send your message.";

      message.className = "form-message";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message →";
    }
  }
);


// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");

  menuToggle.textContent =
    navLinks?.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }

    document.querySelectorAll(".nav-links a").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});


// =========================================
// HEADER SCROLL EFFECT
// =========================================

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");

  if (header) {
    header.style.boxShadow =
      window.scrollY > 30
        ? "0 5px 25px rgba(0,0,0,0.35)"
        : "none";
  }
});


// =========================================
// GLOBAL BUTTON ACTIONS
// =========================================

document.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "wishlist") {
    toggleWishlist(id);
  }

  if (action === "compare") {
    toggleCompare(id);
  }

  if (action === "details") {
    showVehicleDetails(id);
  }

  if (action === "remove-compare") {
    toggleCompare(id);
  }

  if (action === "book") {
    const vehicle = vehicles.find(
      item => getVehicleId(item) === id
    );

    closeModal(vehicleModal);

    document.getElementById("testVehicle").value =
      vehicle?.name || "";

    document.getElementById("test-drive").scrollIntoView({
      behavior: "smooth"
    });
  }
});


// =========================================
// CURRENT YEAR
// =========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// =========================================
// INITIALIZE WEBSITE
// =========================================

updateWishlistCount();
calculateEMI();
loadVehicles();

console.log("Motors Showroom JavaScript Loaded Successfully");
