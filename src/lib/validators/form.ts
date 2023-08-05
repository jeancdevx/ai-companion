import { z } from 'zod'

export const FormValidatorSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  instructions: z
    .string()
    .min(200, { message: 'Instructions are required' })
    .max(10000, { message: 'Instructions must be less than 10000 characters' }),
  seed: z
    .string()
    .min(200, { message: 'Seed is required' })
    .max(10000, { message: 'Seed must be less than 10000 characters' }),
  src: z.string().min(1, { message: 'Image is required' }),
  categoryId: z.string().min(1, { message: 'Category is required' })
})

export type FormValidatorType = z.infer<typeof FormValidatorSchema>
