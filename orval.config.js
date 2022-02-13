module.exports = {
  service: {
    input: './server/adapter/resources/services/spec.json',
    output: {
      mode: 'single',
      target: './client/core/service.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './client/core/axios/index.ts',
          name: 'customInstance',
        },
      },
    },
  },
};
