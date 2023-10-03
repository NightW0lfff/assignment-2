const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
  //Validate request
  if (!req.body.number || !req.body.type) {
    res.status(400).send({
      message: "Phone number or Type can't be empty!",
    });
    return;
  }

  //Create a phone
  const phone = {
    type: req.body.type,
    phone: req.body.phone,
    contactId: req.params.contactId,
  };

  Phones.create(phone)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the contact.",
      });
    });
};

// Get all phones
exports.findAll = (req, res) => {
  Phones.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Phones.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `No Phone found with ID ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Contact with ID ${id}}`,
      });
    });
};

// Update one phone by id
exports.update = (req, res) => {
  const id = req.params.id;

  Phones.update(req.body, {
    where: { id: id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: "Phone was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Phone with id = ${id}. Phone was not found or is empty`,
      });
    }
  });
};

// Delete one phone by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Phones.delete({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Phone with id=${id}. Phone was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Phone with id =${id}`,
      });
    });
};
