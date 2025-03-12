module.exports = app => {
  const users = require("../controllers/user.controller.js");
  
  // Route pour créer un nouvel utilisateur
  app.post("/users", users.create);
}; 