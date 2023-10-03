module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    contactId: {
      type: Sequelize.INTEGER,
      references: {
        model: "contacts", // name of the table, not the model
        key: "id",
      },
      allowNull: false,
    },
    // DEFINE YOUR MODEL HERE
  });

  return Phone;
};
