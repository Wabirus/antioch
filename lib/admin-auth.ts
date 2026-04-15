import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

export type AdminAccess =
  | {
      ok: true
      email: string
    }
  | {
      ok: false
      reason: 'unauthenticated' | 'forbidden'
    }

export async function requireAdminAccess(): Promise<AdminAccess> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email) {
      return { ok: false, reason: 'unauthenticated' }
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    })

    const isAdmin = dbUser?.roles.some((entry) => entry.role.name === 'ADMIN') ?? false

    if (!isAdmin) {
      return { ok: false, reason: 'forbidden' }
    }

    return { ok: true, email: user.email }
  } catch {
    return { ok: false, reason: 'forbidden' }
  }
}
