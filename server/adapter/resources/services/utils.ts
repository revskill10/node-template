import parse from 'joi-to-json';
import * as jf from 'joiful';
import { ResponseGenerator } from './response-generator';
const errorSchema = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: 'false',
          },
          error_code: {
            type: 'string',
            example: 'NOT_FOUND',
          },
          message: {
            type: 'string',
            example: 'Error occurred while processing the request.',
          },
        },
      },
    },
  },
};
function generateSchema(
  options,
  components = {
    schemas: {},
  }
) {
  const route = options.handlers.reduce((prev: any, opts: any) => {
    const schema = jf.getSchema(opts.response);
    const responseName = opts.response?.name;

    const openApiSchema = parse(
      jf.joi.object().keys({
        data: schema,
        success: jf.joi.boolean(),
      }),
      'open-api'
    );
    components.schemas[responseName] = openApiSchema;
    const method = opts.method.toLowerCase();
    const example = ResponseGenerator.generateBySchema(openApiSchema);
    const requestBodyName = opts.body?.name;
    const request_body_schema = opts.body
      ? parse(jf.getSchema(opts.body), 'open-api')
      : null;
    if (request_body_schema) {
      components.schemas[requestBodyName] = request_body_schema;
    }

    const request_params_schema = opts.params
      ? parse(jf.getSchema(opts.params), 'open-api')
      : null;

    const request_query_schema = opts.query
      ? parse(jf.getSchema(opts.query), 'open-api')
      : null;

    const request_headers_schema = opts.headers
      ? parse(jf.getSchema(opts.headers), 'open-api')
      : null;

    const requestBody = request_body_schema
      ? {
          content: {
            ['application/json']: {
              schema: {
                $ref: `#/components/schemas/${requestBodyName}`,
                example:
                  ResponseGenerator.generateBySchema(request_body_schema),
              },
            },
          },
        }
      : null;
    let requestParams = null;
    if (request_params_schema) {
      requestParams = [];

      Object.keys(request_params_schema.properties).forEach((k: string) => {
        const tmp = {
          name: k,
          required: true,
          in: 'path',
          style: 'simple',
          schema: request_params_schema.properties[k],
          example: ResponseGenerator.generateBySchema(
            request_params_schema.properties[k]
          ),
        };
        requestParams.push(tmp);
      });
    }

    if (request_query_schema) {
      if (!requestParams) requestParams = [];
      Object.keys(request_query_schema.properties).forEach((k: string) => {
        const tmp = {
          name: k,
          in: 'query',
          schema: request_query_schema.properties[k],
          example: ResponseGenerator.generateBySchema(
            request_query_schema.properties[k]
          ),
        };
        requestParams.push(tmp);
      });
    }

    if (request_headers_schema) {
      if (!requestParams) requestParams = [];
      Object.keys(request_headers_schema.properties).forEach((k: string) => {
        const tmp = {
          name: k,
          in: 'header',
          schema: request_headers_schema.properties[k],
          example: ResponseGenerator.generateBySchema(
            request_headers_schema.properties[k]
          ),
        };
        requestParams.push(tmp);
      });
    }

    let errors = null;
    if (opts.errors && opts.errors.length > 0) {
      errors = {};
      opts.errors.forEach((item) => {
        const k = Object.keys(item)[0];
        const desc = item[k];
        errors[k] = {
          description: desc,
          ...errorSchema,
        };
      });
    }
    return {
      ...prev,
      [method]: {
        description: opts.description,
        ...(opts.tags ? { tags: opts.tags } : {}),
        ...(opts.parameters ?? {}),
        ...(requestBody ? { requestBody } : {}),
        ...(requestParams ? { parameters: requestParams } : {}),
        responses: {
          200: {
            description: opts.successResponseDescription || 'Success response',
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${responseName}`,
                  example,
                },
              },
            },
          },
          ...(errors ? errors : {}),
          500: {
            description: 'Internal server error',
            ...errorSchema,
          },
        },
      },
    };
  }, {});
  const parts = options.route
    .split('/')
    .map((item: string) => {
      if (item[0] === ':') {
        return `{${item.replace(':', '')}}`;
      } else {
        return item;
      }
    })
    .join('/');
  return {
    [parts]: route,
  };
}
export default generateSchema;
