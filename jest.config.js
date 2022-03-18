/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@Applications/(.*)': '<rootDir>/src/Applications/$1',
    '@Commons/(.*)': '<rootDir>/src/Commons/$1',
    '@Domains/(.*)': '<rootDir>/src/Domains/$1',
    '@Infrastructures/(.*)': '<rootDir>/src/Infrastructures/$1',
    '@Interfaces/(.*)': '<rootDir>/src/Interfaces/$1',
  },
};
