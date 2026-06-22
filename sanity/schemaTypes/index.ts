import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './serviceType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, testimonialType],
}
