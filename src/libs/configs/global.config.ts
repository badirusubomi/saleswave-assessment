export const globalConfig = () => {
  return {
    mongodb: {
      uri: process.env.MONGO_DB_URI ?? 'mongodb://localhost/nest',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      ttl: process.env.JWT_TTL ?? '60mins',
    },
    port: parseInt(process.env.PORT) ?? 3000,
  };
};
