const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
  //Validate request
  if (!req.body.phone || !req.body.type) {
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
  const contactId = req.params.contactId;
  Phones.findAll({ where: { contactId: contactId } })
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
  const id = req.params.phoneId;
  const contactId = req.params.contactId;

  Phones.findOne({ where: { contactId: contactId, id: id } })
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
  const id = req.params.phoneId;
  const contactId = req.params.contactId;

  Phones.update(req.body, {
    where: { id: id, contactId: contactId },
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
  const id = req.params.phoneId;
  const contactId = req.params.contactId;

  Phones.destroy({
    where: { contactId: contactId, id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Phone was deleted successfully!",
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
