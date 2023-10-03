const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
    return;
  }

  // Create a contact
  const contact = {
    name: req.body.name,
  };

  // Save contact in the database
  Contacts.create(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contact.",
      });
    });
};

// Get all contacts
exports.findAll = (req, res) => {
  Contacts.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  //Find id by Primary Key
  Contacts.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Not found Contact with id " + id });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id,
      });
    });
};

// Update one contact by id
exports.update = (req, res) => {
  const id = req.params.id;

  Contacts.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Contact was not found or is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id,
      });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
  Contacts.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};
