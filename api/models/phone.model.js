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
  });

  return Phone;
};
