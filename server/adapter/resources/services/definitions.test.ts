import * as Joi from 'joi';
import parse from 'joi-to-json';
import * as jf from 'joiful';
import { ResponseGenerator } from './response-generator';
class TestSchema {
  @jf.string()
  name: string;
}
describe('openapi', () => {
  test('generate schema', () => {
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      access_token: [Joi.string(), Joi.number()],
      birthyear: Joi.number().integer().min(1900).max(2013),
      email: Joi.string().email({ minDomainSegments: 2 }),
    });
    const openApiSchema = parse(schema, 'open-api');
    expect(openApiSchema).toEqual({
      required: ['username'],
      type: 'object',
      properties: {
        username: { maxLength: 30, minLength: 3, type: 'string' },
        password: { pattern: '^[a-zA-Z0-9]{3,30}$', type: 'string' },
        access_token: {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        birthyear: { maximum: 2013, minimum: 1900, type: 'integer' },
        email: { format: 'email', type: 'string' },
      },
      additionalProperties: false,
    });
  });

  test('joiful', () => {
    const schema = jf.getSchema(TestSchema);
    const openApiSchema = parse(schema, 'open-api');
    expect(openApiSchema).toEqual({
      type: 'object',
      properties: { name: { type: 'string' } },
      additionalProperties: false,
    });
    const mock = ResponseGenerator.generateBySchema(openApiSchema);
    console.log('mock', mock);
  });
});
