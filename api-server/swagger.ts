import swaggerAutogen from 'swagger-autogen';

const outFile = './swagger_output.json';
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen(outFile, endpointsFiles);