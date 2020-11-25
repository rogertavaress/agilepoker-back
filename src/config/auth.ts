export default {
  jwt: {
    secret: process.env.APP_SECRET || 'dev',
    expiresIn: '1d',
  },
};
