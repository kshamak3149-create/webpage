/* ========================================
   Mobile Navigation Toggle
   ======================================== */

// Get references to the hamburger button and navigation menu
const hamburgerButton = document.getElementById("hamburger-toggle");
const navigationMenu = document.getElementById("navigation");

// Add event listener to hamburger button for click events
hamburgerButton.addEventListener("click", function () {
  // Toggle the 'active' class on both the button and the navigation menu
  hamburgerButton.classList.toggle("active");
  navigationMenu.classList.toggle("active");
});

// Optional: Close menu when a navigation link is clicked
const navLinks = navigationMenu.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove 'active' class from both button and menu to close the menu
    hamburgerButton.classList.remove("active");
    navigationMenu.classList.remove("active");
  });
});

/* ========================================
   Explanation of the code:
   
   1. We select the hamburger button and navigation menu using their IDs
   2. We add a 'click' event listener to the hamburger button
   3. When clicked, we toggle the 'active' class on both elements
   4. The CSS handles the visual changes (menu visibility, hamburger animation)
   5. We also close the menu automatically when a user clicks a navigation link
   ======================================== */

/* ========================================
   Product Image Gallery
   ======================================== */

// Get the main product image and all thumbnail images
const mainImage = document.getElementById("mainProductImage");
const thumbnails = document.querySelectorAll(".thumb");

// Add click event listener to each thumbnail
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    // Change main image source to the clicked thumbnail's source
    mainImage.src = thumb.src;

    // Remove active class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add active class to the clicked thumbnail
    thumb.classList.add("active");
  });
});

/* ========================================
   Explanation of the code:
   
   1. We select the main product image and all thumbnail images
   2. We loop through each thumbnail and add a click event listener
   3. When a thumbnail is clicked:
      - The main image source is updated to show the thumbnail image
      - All thumbnails lose the 'active' class
      - The clicked thumbnail gets the 'active' class (highlighted)
   ======================================== */

/* ========================================
   Arrow Navigation for Image Gallery
   ======================================== */

// Get arrow navigation buttons
const prevButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");
let currentImageIndex = 0;

// Array of image sources (same as thumbnails)
const images = [
  "assets/images/main_img.png",
  "assets/images/Photoroom 1.png",
  "assets/images/Photoroom 2.png",
  "assets/images/Photoroom 3.png",
];

// Function to update image
function updateImage(index) {
  mainImage.src = images[index];

  // Update active thumbnail
  thumbnails.forEach((thumb, i) => {
    thumb.classList.remove("active");
    if (i === index) {
      thumb.classList.add("active");
    }
  });

  // Update active dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.classList.remove("active");
    if (parseInt(dot.getAttribute("data-index")) === index) {
      dot.classList.add("active");
    }
  });
}

// Previous button click
prevButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage(currentImageIndex);
});

// Next button click
nextButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImage(currentImageIndex);
});

// Update currentImageIndex when thumbnail is clicked
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentImageIndex = index;
  });
});

/* ========================================
   Gallery Dots Navigation
   ======================================== */

// Get all dots
const dots = document.querySelectorAll(".dot");

// Add click event listener to each dot
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"));
    currentImageIndex = index;
    updateImage(index);
  });
});

/* ========================================
   Product Selection & Dynamic URL Logic
   ======================================== */

// Get form elements
const fragranceInputs = document.querySelectorAll('input[name="fragrance"]');
const purchaseInputs = document.querySelectorAll('input[name="purchase"]');
const addToCartLink = document.getElementById("addToCart");
const singleSubDetails = document.getElementById("singleSubDetails");
const doubleSubDetails = document.getElementById("doubleSubDetails");

// Map fragrances and purchase types to URL parameters
const fragrances = {
  "oud-noir": "oud-noir",
  "amber-rose": "amber-rose",
  "vetiver-musk": "vetiver-musk",
};

const purchaseTypes = {
  single: "single",
  "single-sub": "single-subscription",
  "double-sub": "double-subscription",
};

// Function to generate cart URL based on selections
function updateAddToCart() {
  // Get selected fragrance
  let selectedFragrance = "";
  fragranceInputs.forEach((input) => {
    if (input.checked) {
      selectedFragrance = input.value;
    }
  });

  // Get selected purchase type
  let selectedPurchase = "";
  purchaseInputs.forEach((input) => {
    if (input.checked) {
      selectedPurchase = purchaseTypes[input.value];
    }
  });

  // Generate URL with parameters (9 combinations)
  const cartUrl = `/cart?fragrance=${selectedFragrance}&type=${selectedPurchase}`;
  addToCartLink.href = cartUrl;
}

// Add event listeners to all radio buttons
fragranceInputs.forEach((input) => {
  input.addEventListener("change", updateAddToCart);
});

purchaseInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateAddToCart();
    updateSubscriptionDetails();
    updateWhatsIncluded();
  });
});

/* ========================================
   Subscription Details Toggle
   ======================================== */

function updateSubscriptionDetails() {
  const selectedPurchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;

  // Hide all subscription details by default
  singleSubDetails.style.display = "none";
  doubleSubDetails.style.display = "none";

  // Show selected subscription details
  if (selectedPurchase === "single-sub") {
    singleSubDetails.style.display = "block";
  } else if (selectedPurchase === "double-sub") {
    doubleSubDetails.style.display = "block";
  }
}

/* ========================================
   What's Included Cards Toggle
   ======================================== */

function updateWhatsIncluded() {
  const selectedPurchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;

  const includedSingle = document.getElementById("includedSingle");
  const includedOnce = document.getElementById("includedOnce");
  const includedDouble = document.getElementById("includedDouble");

  // Hide all included cards by default
  if (includedSingle) includedSingle.style.display = "none";
  if (includedOnce) includedOnce.style.display = "none";
  if (includedDouble) includedDouble.style.display = "none";

  // Show selected card
  if (selectedPurchase === "single-sub" && includedSingle) {
    includedSingle.style.display = "block";
  } else if (selectedPurchase === "single" && includedOnce) {
    includedOnce.style.display = "block";
  } else if (selectedPurchase === "double-sub" && includedDouble) {
    includedDouble.style.display = "block";
  }
}

/* ========================================
   9 Variations: 3 Fragrances × 3 Purchase Types
   ========================================
   
   The cart system supports all 9 combinations:
   
   Fragrances: oud-noir, amber-rose, vetiver-musk
   Purchase Types: single, single-subscription, double-subscription
   
   Example URLs:
   /cart?fragrance=oud-noir&type=single
   /cart?fragrance=amber-rose&type=single-subscription
   /cart?fragrance=vetiver-musk&type=double-subscription
   
   All 9 combinations are handled dynamically by the updateAddToCart() function
   ======================================== */

/* ========================================
   Stats Counter with Intersection Observer
   ======================================== */

// Get all stat numbers
const statNumbers = document.querySelectorAll(".stat-number");

// Function to animate counter
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for stats section
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
      entry.target.classList.add("counted");
      animateCounter(entry.target);
    }
  });
}, observerOptions);

// Observe all stat numbers
statNumbers.forEach((stat) => {
  observer.observe(stat);
});

// Initialize cart URL on page load
updateAddToCart();
updateWhatsIncluded();

/* ========================================
   Accordion Toggle
   ======================================== */

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const toggleId = header.getAttribute("data-toggle");
    const content = document.getElementById(`accordion-${toggleId}`);
    const icon = header.querySelector(".accordion-icon");

    // Close all other accordions
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item.id !== `accordion-${toggleId}`) {
        item.style.display = "none";
      }
    });

    // Update all icons
    accordionHeaders.forEach((h) => {
      const hIcon = h.querySelector(".accordion-icon");
      if (h.getAttribute("data-toggle") !== toggleId) {
        hIcon.textContent = "+";
      }
    });

    // Toggle current accordion
    if (content.style.display === "none") {
      content.style.display = "block";
      icon.textContent = "−";
    } else {
      content.style.display = "none";
      icon.textContent = "+";
    }
  });
});
