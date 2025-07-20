// src/utils/schemaGenerator.ts

import { SchemaField, JSONSchema } from '@/types/schema';

export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generateJSONSchema(fields: SchemaField[]): JSONSchema {
  const schema: JSONSchema = {};

  fields.forEach((field) => {
    if (field.type === 'object') {
      schema[field.key] = {
        type: 'object',
        properties: generateJSONSchema(field.children || []),
      };
    } else if (field.type === 'array') {
      schema[field.key] = {
        type: 'array',
        items: {
          type: 'object',
          properties: generateJSONSchema(field.children || []),
        },
      };
    } else {
      schema[field.key] = { type: field.type };
    }
  });

  return schema;
}
