'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //Relacion entre tablas
  class carts extends Model {
    static associate(models) {
      carts.belongsTo(models.products,{foreignKey:"idProduct",as:"producto",targetKey:"id"})
      carts.belongsTo(models.users,{foreignKey:"idUser",as:"usuario",targetKey:"id"})
    }
  }
  //Columnas
  carts.init({
    idUser: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
  }, {
    //Configuraciones generales de la tabla
    sequelize,
    modelName: 'carts',
    paranoid:true,
    timestamps:true
  });
  return carts;
};