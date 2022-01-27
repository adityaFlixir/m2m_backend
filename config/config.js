module.exports = {
  serverPort: process.env.PORT || 4001,
  dbUrl: "mongodb://localhost:27017/m2m" ,
  jwt: {
    TokenLife: 86400,
    secret: "M2M",
  },
};