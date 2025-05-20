module.exports = (sequelize, DataTypes) => {
  const Tenders = sequelize.define('Tenders', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    financial_year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: true
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return Tenders
}
