'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //Relacion entre tablas
  class categories extends Model {
    static associate(models) {
      categories.hasOne(models.products,{foreignKey:"idCategoria"})
    }
  }
  //Columnas
  categories.init({
    categoryName: DataTypes.STRING,
  }, {
    //Configuraciones generales de la tabla
    sequelize,
    modelName: 'categories',
    paranoid:true,
    timestamps:true
  });
  return categories;
};