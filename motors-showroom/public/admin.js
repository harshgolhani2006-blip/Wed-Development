
"use strict";

/* =========================================
   MOTORS SHOWROOM - ADMIN DASHBOARD
========================================= */

const API_URL = "/api";
const TOKEN_KEY = "motorsAdminToken";
const EMAIL_KEY = "motorsAdminEmail";

let adminToken = localStorage.getItem(TOKEN_KEY);
let vehicles = [];
let testDrives = [];
let contacts = [];

const $ = (id) => document.getElementById(id);

/* =========================================
   HELPERS
========================================= */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatPrice(value) {
  const price = Number(value || 0);
  return "₹" + price.toLocaleString("en-IN");
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function showNotice(message, type = "success") {
  const notice = $("adminNotice");

  if (!notice) {
    alert(message);
    return;
  }

  notice.textContent = message;
  notice.className = `admin-notice ${type}`;
  notice.hidden = false;

  clearTimeout(showNotice.timer);

  showNotice.timer = setTimeout(() => {
    notice.hidden = true;
  }, 3500);
}

async function apiRequest(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401 || response.status === 403) {
    if (adminToken && endpoint !== "/admin/login") {
      logout(false);
    }

    throw new Error(data.message || "Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Something went wrong.");
  }

  return data;
}

function getArray(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

/* =========================================
   LOGIN AND LOGOUT
========================================= */

function showLogin() {
  if ($("loginPage")) $("loginPage").hidden = false;
  if ($("dashboard")) $("dashboard").hidden = true;
}

function showDashboard() {
  if ($("loginPage")) $("loginPage").hidden = true;
  if ($("dashboard")) $("dashboard").hidden = false;

  const email = localStorage.getItem(EMAIL_KEY);

  if ($("adminEmailDisplay")) {
    $("adminEmailDisplay").textContent = email || "Administrator";
  }

  if ($("adminYear")) {
    $("adminYear").textContent = new Date().getFullYear();
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const email = $("adminEmail")?.value.trim();
  const password = $("adminPassword")?.value;
  const button = $("loginButton");
  const message = $("loginMessage");

  if (!email || !password) {
    if (message) message.textContent = "Please enter email and password.";
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Signing in...";
  }

  if (message) message.textContent = "";

  try {
    const data = await apiRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    const token = data.token || data.accessToken;

    if (!token) {
      throw new Error("Login response did not contain an authentication token.");
    }

    adminToken = token;

    localStorage.setItem(TOKEN_KEY, adminToken);
    localStorage.setItem(EMAIL_KEY, data.email || email);

    if ($("adminPassword")) $("adminPassword").value = "";

    showDashboard();
    showNotice("Welcome to the admin dashboard!");

    await loadDashboard();
  } catch (error) {
    if (message) message.textContent = error.message;
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Login to Dashboard";
    }
  }
}

function logout(showMessage = true) {
  adminToken = null;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);

  showLogin();

  if (showMessage) {
    showNotice("You have been logged out.");
  }
}

/* =========================================
   DASHBOARD NAVIGATION
========================================= */

function switchSection(sectionName) {
  const allowedSections = [
    "overview",
    "vehicles",
    "testDrives",
    "messages"
  ];

  if (!allowedSections.includes(sectionName)) return;

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.querySelectorAll("[data-section]").forEach((button) => {
    button.classList.remove("active");
  });

  const target = $(`${sectionName}Section`);

  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(`[data-section="${sectionName}"]`).forEach((button) => {
    button.classList.add("active");
  });

  const headings = {
    overview: "Dashboard Overview",
    vehicles: "Manage Vehicles",
    testDrives: "Test Drive Bookings",
    messages: "Contact Messages"
  };

  const heading = document.querySelector(".page-heading h1");

  if (heading) {
    heading.textContent = headings[sectionName];
  }

  $("sidebar")?.classList.remove("open");

  if (sectionName === "vehicles") loadVehicles();
  if (sectionName === "testDrives") loadTestDrives();
  if (sectionName === "messages") loadMessages();
}

/* =========================================
   DASHBOARD STATISTICS
========================================= */

async function loadDashboard() {
  try {
    await Promise.all([
      loadVehicles(),
      loadTestDrives(),
      loadMessages()
    ]);

    updateStatistics();
  } catch (error) {
    showNotice(error.message, "error");
  }
}

function updateStatistics() {
  if ($("totalVehicles")) {
    $("totalVehicles").textContent = vehicles.length;
  }

  if ($("totalTestDrives")) {
    $("totalTestDrives").textContent = testDrives.length;
  }

  if ($("totalMessages")) {
    $("totalMessages").textContent = contacts.length;
  }
}

/* =========================================
   VEHICLE MANAGEMENT
========================================= */

async function loadVehicles() {
  try {
    const data = await apiRequest("/vehicles");

    vehicles = getArray(data, "vehicles");

    renderVehicles();
    updateStatistics();

    return vehicles;
  } catch (error) {
    showNotice(error.message, "error");
    throw error;
  }
}

function renderVehicles() {
  const tbody = $("vehiclesTableBody");

  if (!tbody) return;

  if (vehicles.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-table">
          No vehicles found. Add your first vehicle.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = vehicles.map((vehicle) => {
    const id = vehicle._id || vehicle.id;

    return `
      <tr>
        <td>
          <img
            class="vehicle-table-image"
            src="${escapeHTML(vehicle.image || "https://placehold.co/120x80?text=Vehicle")}"
            alt="${escapeHTML(vehicle.name)}"
            onerror="this.src='https://placehold.co/120x80?text=Vehicle'"
          >
        </td>

        <td>${escapeHTML(vehicle.name)}</td>
        <td>${escapeHTML(vehicle.brand)}</td>
        <td>${escapeHTML(vehicle.type)}</td>
        <td>${formatPrice(vehicle.price)}</td>
        <td>
          <span class="status-badge">
            ${vehicle.featured ? "Featured" : "Active"}
          </span>
        </td>

        <td>
          <div class="table-actions">
            <button
              class="btn btn-secondary"
              data-admin-action="edit"
              data-id="${escapeHTML(id)}"
              type="button"
            >
              Edit
            </button>

            <button
              class="btn btn-danger"
              data-admin-action="delete"
              data-id="${escapeHTML(id)}"
              type="button"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function resetVehicleForm() {
  $("vehicleForm")?.reset();

  if ($("vehicleId")) {
    $("vehicleId").value = "";
  }

  if ($("vehicleFormMessage")) {
    $("vehicleFormMessage").textContent = "";
  }

  if ($("saveVehicleButton")) {
    $("saveVehicleButton").textContent = "Save Vehicle";
  }
}

function editVehicle(id) {
  const vehicle = vehicles.find((item) =>
    String(item._id || item.id) === String(id)
  );

  if (!vehicle) {
    showNotice("Vehicle not found.", "error");
    return;
  }

  $("vehicleId").value = vehicle._id || vehicle.id || "";
  $("vehicleName").value = vehicle.name || "";
  $("vehicleBrand").value = vehicle.brand || "";
  $("vehicleType").value = vehicle.type || "Car";
  $("vehiclePrice").value = vehicle.price || "";
  $("vehicleFuel").value = vehicle.fuel || "";
  $("vehicleTransmission").value = vehicle.transmission || "";
  $("vehicleYear").value = vehicle.year || "";
  $("vehicleMileage").value = vehicle.mileage || "";
  $("vehicleImage").value = vehicle.image || "";
  $("vehicleDescription").value = vehicle.description || "";
  $("vehicleFeatured").checked = Boolean(vehicle.featured);

  if ($("saveVehicleButton")) {
    $("saveVehicleButton").textContent = "Update Vehicle";
  }

  if ($("vehicleFormPanel")) {
    $("vehicleFormPanel").hidden = false;
  }

  $("vehicleFormPanel")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

async function saveVehicle(event) {
  event.preventDefault();

  const id = $("vehicleId")?.value.trim();

  const vehicleData = {
    name: $("vehicleName")?.value.trim(),
    brand: $("vehicleBrand")?.value.trim(),
    type: $("vehicleType")?.value,
    price: Number($("vehiclePrice")?.value),
    fuel: $("vehicleFuel")?.value,
    transmission: $("vehicleTransmission")?.value,
    year: Number($("vehicleYear")?.value) || undefined,
    mileage: $("vehicleMileage")?.value.trim(),
    image: $("vehicleImage")?.value.trim(),
    description: $("vehicleDescription")?.value.trim(),
    featured: Boolean($("vehicleFeatured")?.checked)
  };

  const button = $("saveVehicleButton");
  const message = $("vehicleFormMessage");

  if (!vehicleData.name || !vehicleData.brand || !vehicleData.price) {
    if (message) message.textContent = "Please fill in the required fields.";
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Saving...";
  }

  if (message) message.textContent = "";

  try {
    const endpoint = id
      ? `/vehicles/${encodeURIComponent(id)}`
      : "/vehicles";

    await apiRequest(endpoint, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(vehicleData)
    });

    showNotice(id ? "Vehicle updated successfully." : "Vehicle added successfully.");

    resetVehicleForm();

    if ($("vehicleFormPanel")) {
      $("vehicleFormPanel").hidden = true;
    }

    await loadVehicles();
  } catch (error) {
    if (message) message.textContent = error.message;
    showNotice(error.message, "error");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = $("vehicleId")?.value
        ? "Update Vehicle"
        : "Save Vehicle";
    }
  }
}

async function deleteVehicle(id) {
  const vehicle = vehicles.find((item) =>
    String(item._id || item.id) === String(id)
  );

  if (!vehicle) return;

  const confirmed = confirm(
    `Are you sure you want to delete "${vehicle.name}"?`
  );

  if (!confirmed) return;

  try {
    await apiRequest(`/vehicles/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });

    showNotice("Vehicle deleted successfully.");
    await loadVehicles();
  } catch (error) {
    showNotice(error.message, "error");
  }
}

/* =========================================
   TEST DRIVE BOOKINGS
========================================= */

async function loadTestDrives() {
  try {
    const data = await apiRequest("/admin/test-drives");

    testDrives = getArray(data, "testDrives");

    renderTestDrives();
    updateStatistics();

    return testDrives;
  } catch (error) {
    showNotice(error.message, "error");
    throw error;
  }
}

function renderTestDrives() {
  const tbody = $("testDrivesTableBody");

  if (!tbody) return;

  if (testDrives.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-table">
          No test-drive bookings available.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = testDrives.map((booking) => `
    <tr>
      <td>${escapeHTML(booking.name)}</td>
      <td>${escapeHTML(booking.email)}</td>
      <td>${escapeHTML(booking.phone)}</td>
      <td>${escapeHTML(booking.vehicle || booking.vehicleName || "—")}</td>
      <td>${escapeHTML(booking.date || "—")}</td>
      <td>${formatDate(booking.createdAt)}</td>
    </tr>
  `).join("");
}

/* =========================================
   CONTACT MESSAGES
========================================= */

async function loadMessages() {
  try {
    const data = await apiRequest("/admin/contacts");

    contacts = getArray(data, "contacts");

    renderMessages();
    updateStatistics();

    return contacts;
  } catch (error) {
    showNotice(error.message, "error");
    throw error;
  }
}

function renderMessages() {
  const tbody = $("messagesTableBody");

  if (!tbody) return;

  if (contacts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-table">
          No contact messages available.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = contacts.map((contact) => `
    <tr>
      <td>${escapeHTML(contact.name)}</td>
      <td>${escapeHTML(contact.email)}</td>
      <td>${escapeHTML(contact.phone || "—")}</td>
      <td style="white-space:normal;min-width:220px">
        ${escapeHTML(contact.message)}
      </td>
      <td>${formatDate(contact.createdAt)}</td>
    </tr>
  `).join("");
}

/* =========================================
   EVENT LISTENERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Login form
  $("loginForm")?.addEventListener("submit", handleLogin);

  // Logout
  $("logoutButton")?.addEventListener("click", () => logout());

  // Navigation buttons
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      switchSection(button.dataset.section);
    });
  });

  // Mobile sidebar
  $("sidebarToggle")?.addEventListener("click", () => {
    $("sidebar")?.classList.toggle("open");
  });

  // Refresh buttons
  $("refreshDashboard")?.addEventListener("click", loadDashboard);
  $("refreshVehicles")?.addEventListener("click", loadVehicles);
  $("refreshTestDrives")?.addEventListener("click", loadTestDrives);
  $("refreshMessages")?.addEventListener("click", loadMessages);

  // Vehicle form
  $("vehicleForm")?.addEventListener("submit", saveVehicle);

  // Add vehicle button
  document.querySelectorAll("[data-add-vehicle]").forEach((button) => {
    button.addEventListener("click", () => {
      resetVehicleForm();

      if ($("vehicleFormPanel")) {
        $("vehicleFormPanel").hidden = false;
      }

      $("vehicleFormPanel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Cancel vehicle form
  document.querySelectorAll("[data-cancel-vehicle]").forEach((button) => {
    button.addEventListener("click", () => {
      resetVehicleForm();

      if ($("vehicleFormPanel")) {
        $("vehicleFormPanel").hidden = true;
      }
    });
  });

  // Edit and delete vehicle buttons
  $("vehiclesTableBody")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-action]");

    if (!button) return;

    const id = button.dataset.id;

    if (button.dataset.adminAction === "edit") {
      editVehicle(id);
    }

    if (button.dataset.adminAction === "delete") {
      deleteVehicle(id);
    }
  });

  // Initial dashboard state
  if (adminToken) {
    showDashboard();
    loadDashboard();
  } else {
    showLogin();
  }
});
