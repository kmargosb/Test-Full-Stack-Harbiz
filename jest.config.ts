
module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   transform: {
      transform_regex: ['ts-jest', { /* ts-jest config goes here in Jest */ }],
   },
};
