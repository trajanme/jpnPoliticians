import { z } from 'zod';

export const PartySchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  color: z.string(),
  description: z.string(),
  website: z.string().url(),
  logo: z.string().optional(),
  founded: z.number().optional(),
  policies: z.array(z.string()).optional(),
});

// 型
export type Party = z.infer<typeof PartySchema>; 