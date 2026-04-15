'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'
import { requireAdminAccess } from '@/lib/admin-auth'
import { parseStreamFormData, type StreamInput } from '@/lib/validation/stream'
import type { StreamStatus } from '@/lib/streaming/status'

type ActionResult =
  | { success: true }
  | {
      success?: false
      error: string
      fieldErrors?: Record<string, string>
    }

function unauthorizedResult(): ActionResult {
  return { error: 'You do not have permission to manage streams.' }
}

function validationResult(
  error: Exclude<ReturnType<typeof parseStreamFormData>, { success: true }>
): ActionResult {
  return {
    error: error.formError ?? 'Please fix the highlighted fields.',
    fieldErrors: error.fieldErrors,
  }
}

function buildStreamData(input: StreamInput) {
  return {
    title: input.title,
    description: input.description,
    youtubeUrl: input.youtubeUrl,
    facebookUrl: input.facebookUrl,
    tiktokUrl: input.tiktokUrl,
    embedUrl: input.embedUrl ?? '',
    status: input.status as StreamStatus,
    isActive: input.isActive,
    scheduledAt: input.scheduledAt,
  }
}

function invalidateStreamPages() {
  revalidatePath('/admin/streams')
  revalidatePath('/admin')
  revalidatePath('/live')
}

function getErrorCode(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code?: unknown }).code
    return typeof code === 'string' ? code : undefined
  }

  return undefined
}

export async function getStreams() {
  try {
    const streams = await prisma.stream.findMany({
      orderBy: [{ isActive: 'desc' }, { updatedAt: 'desc' }],
    })

    return { streams }
  } catch {
    return { error: 'Failed to fetch streams.' }
  }
}

export async function getStreamById(id: string) {
  try {
    const stream = await prisma.stream.findUnique({ where: { id } })

    if (!stream) {
      return { error: 'Stream not found.' }
    }

    return { stream }
  } catch {
    return { error: 'Failed to fetch stream.' }
  }
}

export async function getActiveLiveStream() {
  try {
    const stream = await prisma.stream.findFirst({
      where: {
        isActive: true,
        status: 'live',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return { stream }
  } catch {
    return { error: 'Failed to fetch active stream.' }
  }
}

export async function createStream(formData: FormData): Promise<ActionResult> {
  const access = await requireAdminAccess()

  if (!access.ok) {
    return unauthorizedResult()
  }

  const parsed = parseStreamFormData(formData)

  if (!parsed.success) {
    return validationResult(parsed)
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (parsed.data.isActive) {
        await tx.stream.updateMany({
          where: {
            isActive: true,
          },
          data: {
            isActive: false,
          },
        })
      }

      await tx.stream.create({
        data: buildStreamData(parsed.data),
      })
    })

    invalidateStreamPages()
    return { success: true }
  } catch (error) {
    if (getErrorCode(error) === 'P2002') {
      return { error: 'Only one active stream can exist at a time. Please try again.' }
    }

    return { error: 'Failed to create stream.' }
  }
}

export async function updateStream(id: string, formData: FormData): Promise<ActionResult> {
  const access = await requireAdminAccess()

  if (!access.ok) {
    return unauthorizedResult()
  }

  const parsed = parseStreamFormData(formData)

  if (!parsed.success) {
    return validationResult(parsed)
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (parsed.data.isActive) {
        await tx.stream.updateMany({
          where: {
            isActive: true,
            NOT: { id },
          },
          data: {
            isActive: false,
          },
        })
      }

      await tx.stream.update({
        where: { id },
        data: buildStreamData(parsed.data),
      })
    })

    invalidateStreamPages()
    return { success: true }
  } catch (error) {
    if (getErrorCode(error) === 'P2002') {
      return { error: 'Only one active stream can exist at a time. Please try again.' }
    }

    return { error: 'Failed to update stream.' }
  }
}

export async function deleteStream(id: string): Promise<ActionResult> {
  const access = await requireAdminAccess()

  if (!access.ok) {
    return unauthorizedResult()
  }

  try {
    await prisma.stream.delete({
      where: { id },
    })

    invalidateStreamPages()
    return { success: true }
  } catch (error) {
    if (getErrorCode(error) === 'P2025') {
      return { error: 'Stream not found.' }
    }

    return { error: 'Failed to delete stream.' }
  }
}
