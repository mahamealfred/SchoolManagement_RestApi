'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      courses.belongsToMany(models.students,{
       through:'studentcourses',
       as:'students',
       foreignkey:'course_id',
       onDelete:'CASCADE',
       onUpdate:'CASCADE',
      });
      courses.belongsTo(models.lecturers,{
        foreignKey:'lecturer_id',
        as:'lecturers',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      })
    }
  };
  courses.init({
    lecturer_id: DataTypes.INTEGER,
    course_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courses',
  });
  return courses;
};