module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contactId: {
      type: Sequelize.INTEGER,
      references: {
        model: "contacts",
        key: "id",
      },
      allowNull: false,
    },
    // DEFINE YOUR MODEL HERE
  });

  return Contact;
};
