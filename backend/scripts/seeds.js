const https = require('https');

const BASE_URL = 'https://localhost:3000'; // Substitua pela URL base da sua aplicação, use https para conexões seguras

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

async function createUser(username, email, password) {
  const data = JSON.stringify({
    user: { username, email, password }
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    rejectUnauthorized: false // Apenas para desenvolvimento, pois ignora certificados SSL inválidos
  };

  return makeRequest(options, data);
}

async function createItem(title, description, image, tagList) {
  const data = JSON.stringify({ title, description, image, tagList });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/items',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    rejectUnauthorized: false // Apenas para desenvolvimento
  };

  return makeRequest(options, data);
}

async function createComment(itemId, comment) {
  const data = JSON.stringify({ comment });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/items/${itemId}/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    rejectUnauthorized: false // Apenas para desenvolvimento
  };

  return makeRequest(options, data);
}

async function seedData() {
  for (let i = 0; i < 100; i++) {
    const username = `user${i}`;
    const email = `user${i}@example.com`;
    const password = 'password';
    const userResponse = await createUser(username, email, password);

    const title = `Product ${i}`;
    const description = 'Description for product ' + i;
    const image = 'Image URL here';
    const tagList = [];
    const itemResponse = await createItem(title, description, image, tagList);

    await createComment(itemResponse.id, `Comment for product ${itemResponse.id}`);
  }

  console.log('Seeding completed!');
}

seedData().catch((error) => console.error('Seeding failed:', error));
