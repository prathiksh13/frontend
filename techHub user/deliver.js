function getDelivered(deliveries) {
  return deliveries.filter(d => d.delivered === true);
}

function getTotalDistance(deliveries) {
  return deliveries.reduce((sum, d) => sum + d.distance, 0);
}

function getTopCity(deliveries) {
  // Consider only delivered orders
  const delivered = getDelivered(deliveries);

  const cityDistance = {};

  delivered.forEach(d => {
    cityDistance[d.city] = (cityDistance[d.city] || 0) + d.distance;
  });

  // Find city with highest distance
  let topCity = null;
  let maxDistance = 0;

  for (let city in cityDistance) {
    if (cityDistance[city] > maxDistance) {
      maxDistance = cityDistance[city];
      topCity = city;
    }
  }

  return topCity;
}


// ---- SAMPLE DATA ----
const deliveries = [
  { id: 1, city: "New York", distance: 120, delivered: true },
  { id: 2, city: "Chicago", distance: 340, delivered: false },
  { id: 3, city: "New York", distance: 230, delivered: true },
  { id: 4, city: "Boston", distance: 150, delivered: true }
];

// Sort deliveries by distance (descending)
const sortedDeliveries = [...deliveries].sort((a, b) => b.distance - a.distance);

// --------- PRINT REPORT ---------
console.log("Delivery Performance Report");
console.log("--------------------------");
console.log(`Total Deliveries: ${deliveries.length}`);
console.log(`Delivered Deliveries: ${getDelivered(deliveries).length}`);
console.log(`Total Distance Covered: ${getTotalDistance(deliveries)} km`);
console.log(`Top City (by distance): ${getTopCity(deliveries)}`);
console.log("Deliveries sorted by distance:");

sortedDeliveries.forEach(d => {
  console.log(`- [ID:${d.id}] ${d.city} - ${d.distance}km - Delivered: ${d.delivered}`);
});
