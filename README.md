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
