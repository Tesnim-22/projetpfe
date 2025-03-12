const User = require('../models/user.model');

exports.create = (req, res) => {
  // Valider la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
  }

  // Créer un utilisateur
  const user = new User({
    nom: req.body.nom,
    email: req.body.email,
    password: req.body.password
  });

  // Sauvegarder l'utilisateur dans la base de données
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    else res.send(data);
  });
}; 