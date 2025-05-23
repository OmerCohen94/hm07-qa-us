// eslint-disable-next-line no-undef
const config = require('../config');

const requestBody = {
  "productsList": [
    {
      "id": 5,
      "quantity": 3
    }
  ]
}

test('Status should be 201', async () => {
	let actualStatus;
    try {
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(201);
});


test('Response body should contain courier service "Order and Go"', async () => {
	let actualResponseBody;
    try {
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualResponseBody = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualResponseBody.courierService).toBe("Order and Go");
});