# Execution instructions

### Install required dependencies - yarn is recommended

- `yarn install`

### Startup mongo server with docker

- `cd .dev`
- `docker-compose up -d`

### Configure secrets

- `cp .env-docker .env`
  Specify secrets accordingly
- `MONGO_DB_URI='mongodb://root:password@localhost:27017'`
- `PORT=8080`
- `JWT_SECRET='super_jwt_secret'`
- `JWT_TTL='60mins'`

### start backend application

- `yarn start`

### Test Application

- `yarn test`

## App Logic

- On signup, users are assigned a Cart. Cart details are returned on url/user/me endpoint.

- Users can only carry out operations on cart when signed in

- username and password required for signin. (JWT Authentication)

- User can add and modify cart items as well as delete them.

- Edge cases are covered in tests.

## Restrictions

- Authenticated users can't access other users' carts
- Limit on quantity for each item
