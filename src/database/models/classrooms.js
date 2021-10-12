'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      classrooms.hasMany(models.students, {
        foreignKey: 'classroom_id',
        as: 'students',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  };
  classrooms.init({
    class_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classrooms',
  });
  return classrooms;
};