'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //Relacion entre tablas
  class orders extends Model {
    static associate(models) {
      orders.hasOne(models.orders_lists,{foreignKey:"idOrder"})
      orders.belongsTo(models.users,{foreignKey:"idUser",as:"usuario",targetKey:"id"});
    }
  }
  //Columnas
  orders.init({
    idUser: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    estate: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    codPostal: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    receipt: DataTypes.STRING,
  }, {
    //Configuraciones generales de la tabla
    sequelize,
    modelName: 'orders',
    paranoid:true,
    timestamps:true
  });
  return orders;
};