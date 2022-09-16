'use strict';

const { Superhero } = require('../models');

// DON'T SPEND ALL YOUR TIME MAKING REAL SEED DATA!!!
// Try to just spend only 5 minutes to create the seed data for testing
// You do not need to put in real superhero data as values! The data values
  // just need to make sense based from the migration and model files.

const validSuperheros = [
  // Your code here
  {
    name: "NAME1",
    alias: "alias1",
    affiliation: "Avengers",
    heightCm: 181,
    isMutant: true,
    race: "human",
    universe: "Marvel",
    releaseYear: 1991
  },
  {
    name: "NAME2",
    alias: "alias2",
    affiliation: "Avengers",
    heightCm: 182,
    isMutant: true,
    race: "human",
    universe: "Marvel",
    releaseYear: 1992
  },
  {
    name: "NAME3",
    alias: "alias3",
    affiliation: "Avengers",
    heightCm: 183,
    isMutant: true,
    race: "human",
    universe: "Marvel",
    releaseYear: 1993
  },
  {
    name: "NAME4",
    alias: "alias4",
    affiliation: "Avengers",
    heightCm: 184,
    isMutant: true,
    race: "human",
    universe: "Marvel",
    releaseYear: 1994
  },
  {
    name: "NAME5",
    alias: "alias5",
    affiliation: "Avengers",
    heightCm: 185,
    isMutant: true,
    race: "human",
    universe: "Marvel",
    releaseYear: 1995
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Superhero.bulkCreate(validSuperheros, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    for (let superheroInfo of validSuperheros) {
      try {
        await Superhero.destroy({
          where: superheroInfo
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  // DO NOT MODIFY BELOW (for testing purposes):
  validSuperheros,
};
