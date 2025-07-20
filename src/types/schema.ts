// src/types/schema.ts

export type FieldType = 'string' | 'number' | 'boolean' | 'object' | 'array';

export interface Field {
  id: string;
  key: string;
  type: FieldType;
  children?: Field[]; // for 'object' and 'array' types
}

export interface SchemaField extends Field {}

export interface JSONSchema {
  [key: string]: any;
}

export interface FormData {
  fields: SchemaField[];
}
