# 🛠️ Execution Instructions

### Install Dependencies

```bash
yarn install
```

### Configure Environment Variables

```bash
cp .env-docker .env
```

Then update your `.env` file with the following (or your own secrets):

```env
MONGO_DB_URI='mongodb://root:password@localhost:27017'
PORT=8080
JWT_SECRET='super_jwt_secret'
JWT_TTL='60mins'
```

### Start MongoDB with Docker

```bash
cd .dev
docker-compose up -d
```

### Start Backend Application

```bash
yarn start
```

### Run End-to-End Tests

```bash
yarn test:e2e
```

> All tests are located in the `test` folder.

---

# App Logic

- On **signup**, users are assigned a **Cart**.
- Cart details can be fetched from `/user/me` or `/cart/:cartId`.
- Users must be **signed in** to access cart operations.
- **JWT authentication** is used for login (`username + password`).
- Authenticated users can:
  - Add items to cart
  - Modify items
  - Delete items

---

# Restrictions

- Users **cannot** access other users' carts.
- Each item in a cart is limited to a **maximum quantity of 100**.
