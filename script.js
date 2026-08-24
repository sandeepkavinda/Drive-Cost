// ─────────────────────────────────────────
// VEHICLE DATA — edit to add/remove/change vehicles
// Fields: name, pricePerDay, pricePerExtraKm
// (fuelConsumption removed — fill that manually)
// ─────────────────────────────────────────
const VEHICLES = [
    {
        name: "Toyota Aqua",
        pricePerDay: 6000,
        pricePerExtraKm: 30,
    },
    {
        name: "Honda Fit GP 5",
        pricePerDay: 6000,
        pricePerExtraKm: 30,
    },
    {
        name: "Toyota Prius 3rd Gen",
        pricePerDay: 7000,
        pricePerExtraKm: 30,
    },
    {
        name: "Wagon R",
        pricePerDay: 4500,
        pricePerExtraKm: 25,
    },
    {
        name: "Suzuki Spacia",
        pricePerDay: 4500,
        pricePerExtraKm: 25,
    },
];

// ─────────────────────────────────────────
// DEFAULT VEHICLE — index of the vehicle selected on page load (0 = first)
// ─────────────────────────────────────────
const DEFAULT_VEHICLE_IDX = -1;

// ─────────────────────────────────────────
// TRIP DEFAULTS — optional preset values for trip fields
// Set any field to null to leave it untouched
// Fields: freeKmPerDay, numDays, fuelPrice
// ─────────────────────────────────────────
const TRIP_DEFAULTS = {
    freeKmPerDay: 100,
    numDays: 1,
    fuelPrice: 414,
};
// ─────────────────────────────────────────

// activeIdx === -1 means "default vehicle is active"
// activeIdx === null means "no vehicle / user has diverged"
let activeIdx = -1;

function renderChips() {
    const wrap = document.getElementById("vehicleChips");
    // Index -1 = default chip, 0+ = specific vehicles
    const defaultChip = `<div class="chip ${activeIdx === -1 ? "active" : ""}" onclick="selectVehicle(-1)">Custom</div>`;
    const vehicleChips = VEHICLES.map(
        (v, i) =>
            `<div class="chip ${activeIdx === i ? "active" : ""}" onclick="selectVehicle(${i})">${v.name}</div>`,
    ).join("");
    wrap.innerHTML = defaultChip + vehicleChips;
}

function selectVehicle(idx) {
    activeIdx = idx;
    renderChips();

    if (idx === -1) {
        // Default — clear vehicle-specific fields
        setVal("pricePerDay", "");
        setVal("pricePerExtraKm", "");
    } else {
        const v = VEHICLES[idx];
        if (!v) return;
        setVal("pricePerDay", v.pricePerDay);
        setVal("pricePerExtraKm", v.pricePerExtraKm);
    }

    // Apply trip defaults — only if value is not null
    if (TRIP_DEFAULTS.freeKmPerDay !== null) setVal("freeKmPerDay", TRIP_DEFAULTS.freeKmPerDay);
    if (TRIP_DEFAULTS.numDays !== null) setVal("numDays", TRIP_DEFAULTS.numDays);
    if (TRIP_DEFAULTS.fuelPrice !== null) setVal("fuelPrice", TRIP_DEFAULTS.fuelPrice);

    const tag = document.getElementById("activeVehicleTag");
    if (idx === -1) {
        tag.classList.remove("show");
    } else {
        tag.textContent = "🚗 " + VEHICLES[idx].name;
        tag.classList.add("show");
    }

    calculate();

    // Focus Total Distance Driven only if it's empty
    const numKmEl = document.getElementById("numKm");
    if (!numKmEl.value) {
        setTimeout(() => numKmEl.focus(), 80);
    }
}

function setVal(id, val) {
    const el = document.getElementById(id);
    el.value = val !== null && val !== undefined ? val : "";
    el.classList.remove("pulse");
    void el.offsetWidth;
    el.classList.add("pulse");
}

// ── Calculator ──
const calcIds = [
    "pricePerDay",
    "freeKmPerDay",
    "pricePerExtraKm",
    "numDays",
    "numKm",
    "fuelConsumption",
    "fuelPrice",
];

// Fields that belong to the vehicle — editing them falls back to Default
const VEHICLE_FIELDS = ["pricePerDay", "pricePerExtraKm"];

calcIds.forEach((id) =>
    document.getElementById(id).addEventListener("input", () => {
        if (VEHICLE_FIELDS.includes(id) && activeIdx !== -1) {
            // User manually edited a vehicle field — revert chip to Default
            activeIdx = -1;
            document.getElementById("activeVehicleTag").classList.remove("show");
            renderChips();
        }
        calculate();
    }),
);

function fmt(n) {
    return n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function calculate() {
    const g = (id) => parseFloat(document.getElementById(id).value) || 0;

    const pricePerDay = g("pricePerDay");
    const freeKmPerDay = g("freeKmPerDay");
    const pricePerExtraKm = g("pricePerExtraKm");
    const numDays = g("numDays");
    const numKm = g("numKm");
    const fuelConsumption = g("fuelConsumption");
    const fuelPrice = g("fuelPrice");

    const stickyEl = document.getElementById("stickyTotal");

    if (pricePerDay <= 0 || numDays <= 0) {
        document.getElementById("summary").innerHTML =
            '<div class="zero-state">Fill in your rental details<br>to see the cost breakdown.</div>';
        stickyEl.classList.remove("visible");
        return;
    }

    const rentalBase = pricePerDay * numDays;
    const totalFreeKm = freeKmPerDay * numDays;
    const extraKm = Math.max(0, numKm - totalFreeKm);
    const extraKmCost = extraKm * pricePerExtraKm;
    const litersNeeded = fuelConsumption > 0 ? numKm / fuelConsumption : 0;
    const fuelCost = litersNeeded * fuelPrice;
    const totalCost = rentalBase + extraKmCost + fuelCost;
    const costPerDay = numDays > 0 ? totalCost / numDays : 0;
    const costPerKm = numKm > 0 ? totalCost / numKm : 0;

    const kmStatus =
        numKm <= totalFreeKm
            ? `<span class="badge">Within free KMs</span>`
            : `<span class="badge warn">+${Math.round(extraKm)} extra km</span>`;

    let html = `
      <div class="line-item">
        <span class="line-label">Base Rental (${numDays} day${numDays > 1 ? "s" : ""})</span>
        <span class="line-value">${fmt(rentalBase)}</span>
      </div>
      <div class="line-item extra">
        <span class="line-label">Free KM Allowance</span>
        <span class="line-value">${Math.round(totalFreeKm).toLocaleString()} km total</span>
      </div>
      <div class="line-item extra">
        <span class="line-label">Distance Driven ${kmStatus}</span>
        <span class="line-value">${Math.round(numKm).toLocaleString()} km</span>
      </div>`;

    if (extraKm > 0) {
        html += `
      <div class="line-item">
        <span class="line-label">Extra KM Charge (${Math.round(extraKm).toLocaleString()} km)</span>
        <span class="line-value highlight">${fmt(extraKmCost)}</span>
      </div>`;
    }

    if (fuelCost > 0) {
        html += `
      <div class="line-item extra">
        <span class="line-label">Fuel needed (~${fmt(litersNeeded)} L)</span>
        <span class="line-value">${Math.round(numKm).toLocaleString()} km ÷ ${fuelConsumption} km/L</span>
      </div>
      <div class="line-item">
        <span class="line-label">Fuel Cost</span>
        <span class="line-value">${fmt(fuelCost)}</span>
      </div>`;
    }

    html += `
      <div class="total-block">
        <span class="total-label">Total Cost</span>
        <span class="total-value">${fmt(totalCost)}</span>
      </div>
      <p class="per-day">
        <span>${fmt(costPerDay)} / day</span>
        ${numKm > 0 ? ` &nbsp;·&nbsp; <span>${fmt(costPerKm)} / km</span>` : ""}
      </p>`;

    const el = document.getElementById("summary");
    el.innerHTML = html;
    el.querySelectorAll(".total-value, .line-value").forEach((e) => {
        e.classList.remove("pulse");
        void e.offsetWidth;
        e.classList.add("pulse");
    });

    // Update & show sticky bar (mobile only — CSS hides it on desktop)
    document.getElementById("stickyTotalAmount").textContent = fmt(totalCost);
    const subParts = [`${fmt(costPerDay)} / day`];
    if (numKm > 0) subParts.push(`${fmt(costPerKm)} / km`);
    document.getElementById("stickyTotalSub").textContent = subParts.join("  ·  ");
    stickyEl.classList.add("visible");
}

// ── Init: select default vehicle on load ──
selectVehicle(DEFAULT_VEHICLE_IDX);