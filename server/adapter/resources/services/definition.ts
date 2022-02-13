const definition = {
  //  Your OpenApi definition
  openapi: '3.0.0',
  info: {
    title: 'Sample API',
    description:
      'Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.',
    version: '0.1.9',
  },
  servers: [
    {
      url: 'http://api.example.com/v1',
      description: 'Optional server description, e.g. Main (production) server',
    },
    {
      url: 'http://staging-api.example.com',
      description:
        'Optional server description, e.g. Internal staging server for testing',
    },
  ],
  paths: {},
};

export default definition;
