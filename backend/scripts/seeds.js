const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000'; // Substitua pela URL base da sua aplicação

async function createUser(username, email, password) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: { username, email, password }
    }),
  });

  return response.json();
}

async function createItem(title, description, image, tagList) {
  const response = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, description, image, tagList
    }),
  });

  return response.json();
}

async function createComment(itemId, comment) {
  const response = await fetch(`${BASE_URL}/items/${itemId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  });

  return response.json();
}

async function seedData() {
  for (let i = 0; i < 100; i++) {
    // Cria usuários
    const username = `user${i}`;
    const email = `user${i}@example.com`;
    const password = 'password';
    await createUser(username, email, password);

    // Cria produtos
    const title = `Product ${i}`;
    const description = 'Description for product ' + i;
    const image = 'Image URL here';
    const tagList = [];
    const item = await createItem(title, description, image, tagList);

    // Cria comentários para cada produto
    await createComment(item.id, `Comment for product ${item.id}`);
  }
}

seedData().then(() => console.log('Seeding completed!'));