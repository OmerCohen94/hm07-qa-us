// eslint-disable-next-line no-undef
const config = require('../config');

const requestBodyPost = {
	"name": "testingyadayada",
	"cardId": 44
}

const requestBody = {
	"productsList": [
		{
			"id": 5,
			"quantity": 4
		}
	],
	"name": "testforthis"
}
let newId;

async function createKit() {
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBodyPost)
		});
		const data = await response.json();
		return data.id;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

beforeAll(async () => {
	newId = await createKit();
});

test('Status should be 200', async () => {
	let actualStatus;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/${newId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)

		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(200);
});


test('Response body should contain "ok": true', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/${newId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualResponseBody = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualResponseBody).toHaveProperty("ok", true);
});
