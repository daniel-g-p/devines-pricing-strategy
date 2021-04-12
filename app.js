const form = document.querySelector("form");

const missingVineDetection = document.querySelector("#missingVineDetection + label div");
const yieldAndGrowthTracking = document.querySelector("#yieldAndGrowthTracking + label div");
const workforceManagement = document.querySelector("#workforceManagement +label div");
const allServices = [
    missingVineDetection,
    yieldAndGrowthTracking,
    workforceManagement
];
const vineyardArea = document.querySelector("#vineyardArea");
const maxEmployees = document.querySelector("#maxEmployees");
const minEmployees = document.querySelector("#minEmployees");
const vehicles = document.querySelector("#vehicles");
const vehicleDrivers = document.querySelector("#vehicleDrivers");
const grapeVariety = document.querySelector("#grapeVariety");
const regular = document.querySelector("#regular");
const bio = document.querySelector("#bio");
const biodynamic = document.querySelector("#biodynamic");

let A;
let V;
let D;
let GV;
let MV;
let YG;
let WM;
let VT;
let R;
let C;
let S = 0;
let P;

const receivers = document.querySelector("#receiverCount");
const storage = document.querySelector("#storageCount");
const price = document.querySelector(".price h4");
const receiverSlider = document.querySelector("#receivers");
const storageSlider = document.querySelector("#storage");
const allSliders = [receiverSlider, storageSlider];

const offer = document.querySelector("#step2");
const serviceMV = document.querySelector("#serviceMV");
const serviceYG = document.querySelector("#serviceYG");
const serviceWM = document.querySelector("#serviceWM");
const allServiceSelections = [serviceMV, serviceYG, serviceWM];

allServices.forEach(s => s.addEventListener("click", () => {
    s.classList.toggle("active");
}));

form.addEventListener("submit", e => {
    e.preventDefault();
    A = vineyardArea.value;
    V = vehicles.value;
    D = vehicles.value;
    GV = grapeVariety.value;
    MV;
    if (missingVineDetection.classList.contains("active")) {
        MV = 1;
        serviceMV.classList.add("selected");
    } else {
        MV = 0;
        serviceMV.classList.remove("selected");
    };
    YG;
    if (yieldAndGrowthTracking.classList.contains("active")) {
        YG = 1;
        serviceYG.classList.add("selected");
    } else {
        YG = 0;
        serviceYG.classList.remove("selected");
    };
    WM;
    if (workforceManagement.classList.contains("active")) {
        WM = 1;
        serviceWM.classList.add("selected");
    } else {
        WM = 0;
        serviceWM.classList.remove("selected");
    };
    VT;
    if (biodynamic.checked) { VT = 1 } else if (bio.checked) { VT = 0.5 } else { VT = 0 };
    receiverSlider.value = R;
    R = calculateReceivers();
    storageSlider.value = Math.round(C);
    C = calculateStorage();
    S = calculateServicePremium();
    P = calculatePrice();
    changePrice();
    offer.scrollIntoView({ behavior: "smooth" });
});

allSliders.forEach(s => s.addEventListener("input", () => {
    updateOffer();
}));

allSliders.forEach(s => s.addEventListener("change", () => {
    changePrice();
}));

const calculateReceivers = () => {
    if (V < D) {
        R = V;
    } else {
        R = D;
    };
    return R;
}

const calculateStorage = () => {
    C = A * (0.75 + 0.1 * YG + 0.05 * MV + 0.05 * WM + 0.1 * GV + 0.1 * VT);
    return C;
};

const calculateServicePremium = () => {
    S = 600 * MV + 300 * YG + 300 * WM;
    return S
};

const calculatePrice = () => {
    P = 1600 * R + 120 * C + S;
    receivers.innerHTML = R;
    storage.innerHTML = Math.round(C) + "GB";
    return P;
};

const changePrice = () => {
    price.innerHTML = "€" + Math.round(P / 12);
}

const updateOffer = () => {
    R = receiverSlider.value;
    C = storageSlider.value;
    calculatePrice();
}

const allFAQs = document.querySelectorAll(".faq");

allFAQs.forEach(faq => faq.addEventListener("click", () => {
    allFAQs.forEach(f => {
        f.classList.remove("active");
        f.lastElementChild.style.maxHeight = 0;
    });
    faq.classList.toggle("active");
    if (faq.classList.contains("active")) {
        faq.lastElementChild.style.maxHeight = faq.lastElementChild.scrollHeight + "px";
    } else {
        faq.lastElementChild.style.maxHeight = 0;
    };
}));