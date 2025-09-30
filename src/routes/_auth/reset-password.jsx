import { createFileRoute } from '@tanstack/react-router'
import ResetPassword from '../../pages/auth/ResetPassword'
import { z } from 'zod'

// Define search params schema for Firebase password reset
const resetPasswordSearchSchema = z.object({
  mode: z.string().optional(),
  oobCode: z.string().optional(),
  apiKey: z.string().optional(),
  lang: z.string().optional(),
})

export const Route = createFileRoute('/_auth/reset-password')({
  component: ResetPassword,
  validateSearch: resetPasswordSearchSchema,
})
