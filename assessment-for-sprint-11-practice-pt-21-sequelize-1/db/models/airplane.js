'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplane.init({
    flightNumber: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate: {
        isValid(value) {
          if (value.length > 6 || value.length < 3) throw new Error("error")
          if (parseInt(value[0]) || parseInt(value[1])) throw new Error("error")
          if (value[0] !== value[0].toUpperCase() || value[0] !== value[0].toUpperCase()) {
            throw new Error("error")
          }
          for (let i = 2; i < value.length; i++) {
            if (!(parseInt(value[i]) >= 0)) {
              throw new Error("error")
            }
          }
        }
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValid(value) {
          if (value.length > 6 || value.length < 3) {
            throw new Error("error")
          }
        }
      }
    },
    inService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    homeBase: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isVald(value) {
          if (value.length !== 3) {
            throw new Error("error")
          }
          for (let i = 0; i < value.length; i++) {
            if (value[i].charCodeAt(0) < 65 || value[i].charCodeAt(0) > 90 ) {
              throw new Error("error")
            }
          }
        }
      }
    },
    maxNumPassengers: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isValid(value) {
          if (value < 2 || value > 853) {
            throw new Error("error")
          }
        }
      }
    },
    currentNumPassengers: {
      type: DataTypes.FLOAT,
      validate: {
        isValid(value) {
          if (value > this.maxNumPassengers ||
              value < 0) {
            throw new Error("error")
          }
        }
      }
    },
    cruisingAltitudeFt: {
      type: DataTypes.FLOAT,
      validate: {
        isValid(value) {
          if (value < 500 || value > 41000) {
            throw new Error("error")
          }
        }
      }
    },
    firstFlightDate: {
      type: DataTypes.STRING,
      validate: {
        isValid(value) {
          value = value.split("-")[0]
          if (Number(value) < 2020 || Number(value)> 2021) {
            throw new Error("error")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
    indexes: [{unique: true, fields: ['homeBase', 'cruisingAltitudeFt']}]
  });
  return Airplane;
};
