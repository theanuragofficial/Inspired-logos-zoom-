const IMAGES = [
  {
    name: "Apple",
    url: "https://logo.clearbit.com/apple.com",
  },
  {
    name: "Google",
    url: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Amazon",
    url: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Microsoft",
    url: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Facebook",
    url: "https://logo.clearbit.com/facebook.com",
  },
  {
    name: "Twitter",
    url: "https://logo.clearbit.com/twitter.com",
  },
  {
    name: "Netflix",
    url: "https://logo.clearbit.com/netflix.com",
  },
  {
    name: "Tesla",
    url: "https://logo.clearbit.com/tesla.com",
  },
  {
    name: "Nike",
    url: "https://logo.clearbit.com/nike.com",
  },
  {
    name: "Adidas",
    url: "https://logo.clearbit.com/adidas.com",
  },
  {
    name: "McDonald's",
    url: "https://logo.clearbit.com/mcdonalds.com",
  },
  {
    name: "Starbucks",
    url: "https://logo.clearbit.com/starbucks.com",
  },
  {
    name: "Coca-Cola",
    url: "https://logo.clearbit.com/coca-cola.com",
  },
  {
    name: "Pepsi",
    url: "https://logo.clearbit.com/pepsi.com",
  },
  {
    name: "Toyota",
    url: "https://logo.clearbit.com/toyota.com",
  },
  {
    name: "BMW",
    url: "https://logo.clearbit.com/bmw.com",
  },
  {
    name: "Mercedes-Benz",
    url: "https://logo.clearbit.com/mercedes-benz.com",
  },
  {
    name: "Honda",
    url: "https://logo.clearbit.com/honda.com",
  },
  {
    name: "Sony",
    url: "https://logo.clearbit.com/sony.com",
  },
  {
    name: "Samsung",
    url: "https://logo.clearbit.com/samsung.com",
  },
  {
    name: "IBM",
    url: "https://logo.clearbit.com/ibm.com",
  },
  {
    name: "Intel",
    url: "https://logo.clearbit.com/intel.com",
  },
  {
    name: "NVIDIA",
    url: "https://logo.clearbit.com/nvidia.com",
  },
  {
    name: "Adobe",
    url: "https://logo.clearbit.com/adobe.com",
  },
  {
    name: "PayPal",
    url: "https://logo.clearbit.com/paypal.com",
  },
  {
    name: "eBay",
    url: "https://logo.clearbit.com/ebay.com",
  },
  {
    name: "LinkedIn",
    url: "https://logo.clearbit.com/linkedin.com",
  },
  {
    name: "Uber",
    url: "https://logo.clearbit.com/uber.com",
  },
  {
    name: "Airbnb",
    url: "https://logo.clearbit.com/airbnb.com",
  },
  {
    name: "Spotify",
    url: "https://logo.clearbit.com/spotify.com",
  },
];

const OFFSET_CENTER = 300;
const OFFSET_CORNER = 300;
const MAX_IMAGES = 15;
const MIN_SCALE = 5;
const MAX_SCALE = 50;
const MIN_SPEED = 5000;
const MAX_SPEED = 10000;
const IMAGE_START_DELAY = 0;
const IMAGE_CREATION_INTERVAL = 100;

const imagesWrapperEl = document.querySelector("#images");
const displayedIMAGES = new Set();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getNearestEdge(x, y) {
  const edges = [
    { x: 0, y: y },
    { x: window.innerWidth, y: y },
    { x: x, y: 0 },
    { x: x, y: window.innerHeight },
  ];

  let minDistance = Infinity;
  let nearestEdge = null;

  edges.forEach((edge) => {
    const distance = calculateDistance(x, y, edge.x, edge.y);
    if (distance < minDistance) {
      minDistance = distance;
      nearestEdge = edge;
    }
  });

  return nearestEdge;
}

function createRandomImage() {
  const randomNumber = getRandomNumber(0, IMAGES.length - 1);
  const currentImage = IMAGES[randomNumber];

  if (displayedIMAGES.has(currentImage)) {
    return;
  }

  if (displayedIMAGES.size > MAX_IMAGES) {
  }

  const img = new Image();

  img.src = `${currentImage.url}?+${Date.now()}`;
  img.alt = currentImage.name;

  displayedIMAGES.add(currentImage);

  const offsetX = getRandomNumber(-OFFSET_CENTER, OFFSET_CENTER);
  const offsetY = getRandomNumber(-OFFSET_CENTER, OFFSET_CENTER);

  const nearestEdge = getNearestEdge(offsetX, offsetY);
  const destinationLeft =
    nearestEdge.x + getRandomNumber(-OFFSET_CORNER, OFFSET_CORNER);
  const destinationTop =
    nearestEdge.y + getRandomNumber(-OFFSET_CORNER, OFFSET_CORNER);

  // Add custom properties with units
  img.style.setProperty("--start-x", `${offsetX}%`);
  img.style.setProperty("--start-y", `${offsetY}%`);
  img.style.setProperty("--destination-left", `${destinationLeft}px`);
  img.style.setProperty("--destination-top", `${destinationTop}px`);

  // Generate random scale within the defined range
  const scale = getRandomNumber(MIN_SCALE, MAX_SCALE);
  img.style.setProperty("--scale", `${scale}%`);

  // random animation speed
  const randomSpeed = getRandomNumber(MIN_SPEED, MAX_SPEED);
  img.style.setProperty("--speed", `${randomSpeed}ms`);

  // Append the image to the wrapper
  imagesWrapperEl.appendChild(img);

  // Listen for animation iteration event
  img.addEventListener(
    "animationiteration",
    function animationIterationHandler() {
      // Remove the image
      imagesWrapperEl.removeChild(img);

      // Remove the currentImage from the set of displayed IMAGES so that it can be used again
      displayedIMAGES.delete(currentImage);
    }
  );
}

// Schedule continuous creation of new images
setInterval(createRandomImage, IMAGE_CREATION_INTERVAL);
