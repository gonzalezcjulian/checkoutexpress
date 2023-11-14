'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //Relacion entre tablas
  class orders_lists extends Model {
    static associate(models) {
      orders_lists.belongsTo(models.orders,{foreignKey:"idOrder",as:"orden",targetKey:"id"});
    }
  }
  //Columnas
  orders_lists.init({
    idProduct: DataTypes.INTEGER,
    idOrder: DataTypes.INTEGER,
  }, {
    //Configuraciones generales de la tabla
    sequelize,
    modelName: 'orders_lists',
    paranoid:false,
    timestamps:false
  });
  return orders_lists;
};