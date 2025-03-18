// Enable live inventory updates
const inventoryEventSource = new EventSource('https://localhost:3443/logistics/inventory/stream');

inventoryEventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update the inventory display with new data
  data.forEach(item => {
    const row = document.querySelector(`tr[data-product-id="${item.product_id}"]`);
    if (row) {
      row.querySelector('.quantity').textContent = item.quantity;
    }
  });
};

inventoryEventSource.onerror = () => {
  console.error('Error occurred while fetching inventory updates');
};

inventoryEventSource.onopen = () => {
  console.log('Connected to inventory updates stream');
};