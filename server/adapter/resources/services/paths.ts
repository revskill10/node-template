require('events').EventEmitter.defaultMaxListeners = Infinity;
import generateSchema from './utils';
import { openApiConfig as usersConfig } from '../../../spec/config';
const components = {
  // securitySchemes: {
  //   bearerAuth: {
  //     type: 'http',
  //     scheme: 'bearer',
  //     bearerFormat: 'JWT',
  //   },
  // },
  // security: {
  //   bearerAuth: [],
  // },
  schemas: {},
};
const paths = {
  ...generateSchema(usersConfig, components)
};
const schemaRoot = {
  openapi: '3.0.0',
  info: {
    title: 'Vetting Engine Backend',
    description: 'API of all Vetting Engine services',
    version: '0.1.0',
  },
  paths,
  components,
};
console.log(JSON.stringify(schemaRoot, null, 2));
