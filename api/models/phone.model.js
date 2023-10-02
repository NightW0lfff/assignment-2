module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // DEFINE YOUR MODEL HERE
  });

  return Phone;
};
