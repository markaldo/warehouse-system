// public/js/sales-dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const row = e.target.closest('tr');
        const productId = row.dataset.productId;
        const discount = row.querySelector('.discount-input').value;
  
        try {
          const response = await fetch('/sales/update-price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, discount })
          });
          
          if (!response.ok) throw new Error('Update failed');
          showNotification('Price updated successfully');
        } catch (err) {
          showNotification(err.message, 'error');
        }
      });
    });
  });
  
  // Price validation helper function
function validateDiscount(input) {
  const value = parseFloat(input.value);
  if (isNaN(value) || value < 0 || value > 100) {
    input.classList.add('error');
    return false;
  }
  input.classList.remove('error');
  return true;
}

// Add event listener to all discount inputs
document.querySelectorAll('.discount-input').forEach(input => {
  input.addEventListener('blur', () => {
    validateDiscount(input);
  });
});

// Enable live price updates
const priceEventSource = new EventSource('https://localhost:3443/sales/prices/stream');

priceEventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update the price display with new data
  data.forEach(modifier => {
    const row = document.querySelector(`tr[data-product-id="${modifier.product_id}"]`);
    if (row) {
      row.querySelector('.discount').textContent = modifier.discount;
    }
  });
};

priceEventSource.onerror = () => {
  console.error('Error occurred while fetching price updates');
};

priceEventSource.onopen = () => {
  console.log('Connected to price updates stream');
};