import { z } from 'zod';

// SNSリンク用スキーマ
const SocialLinksSchema = z.object({
  youtube: z.string().url().optional(),
  x: z.string().url().optional(),
  instagram: z.string().url().optional(),
});

export const PoliticianSchema = z.object({
  id: z.string(),
  name: z.string(),
  kana: z.string(),
  birthDate: z.string().optional(), // ISO 8601 形式（YYYY-MM-DD）を想定
  partyId: z.string(),
  caucus: z.string().optional(),
  house: z.enum(['衆議院', '参議院']),
  constituency: z.string(),
  electionCount: z.number().int(),
  firstElected: z.string(), // 例: "2005"
  position: z.string().optional(), // 党内役職など
  gender: z.enum(['男性', '女性']).optional(), // 性別
  sns: SocialLinksSchema.optional(),
  disabled: z.boolean().optional(), // 落選・引退などで非表示にするフラグ
  elected2025: z.boolean().optional(), // 2025年参議院選挙当選者フラグ
});

export type Politician = z.infer<typeof PoliticianSchema>; 