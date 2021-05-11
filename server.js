const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const petList = [
    { id: 1, name: 'Fluffy', species: 'Dog' },
    { id: 2, name: 'Sassy', species: 'Cat' },
    { id: 3, name: 'Goldberg', species: 'Frog' }
];
// Define a resolver
const root = {
    allPets: () => {
        return petList;
    },
    getPet: ({ index }) => {
        return petList[index];
    },
    firstPet: () => {
        return petList[0];
    },
    addPet: ({ name, species }) => {
        const pet = { name, species };
        petList.push(pet);

        return pet
    },
    updatePet: ({ id, name, species }) => {
        const pet = petList[id];
        if (pet === undefined) {
            return null
        }

        pet.name = name || pet.name;
        pet.species = species || pet.species;

        return pet;
    },
    deletePet: ({ id }) => {
        const pet = petList[id];

        if (pet === undefined) {
            return null;
        }

        petList.splice(id, 1);

        return pet;
    },
    getTime: () => {
        return {
            hour: new Date().getHours().toString() - 12,
            minute: new Date().getMinutes().toString(),
            second: new Date().getSeconds().toString(),
        };
    }
    getRandom: ({ range }) => {
        return Math.floor(Math.random() * range);
    },