'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      students.belongsTo(models.classrooms, {
        foreignKey: 'classroom_id',
        as: 'classrooms',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
      students.belongsToMany(models.courses,{
        thro