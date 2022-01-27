module.exports = {
  serverPort: process.env.PORT || 4001,
  dbUrl: "mongodb+srv://Aditya:Aditya1420@cluster0.f50qp.mongodb.net/m2m?retryWrites=true&w=majority",
  jwt: {
    TokenLife: 86400,
    secret: "M2M",
  },
};
