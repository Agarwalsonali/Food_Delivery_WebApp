const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD
} = process.env;

export const connectionStr =
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}` +
  `@cluster0.8cwrzqx.mongodb.net/resto_db?retryWrites=true&w=majority`;
