import { createBucketClient } from '@cosmicjs/sdk'
import { PracticeTest, TestSubject, Question } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch all test subjects, sorted by display_order
export async function getTestSubjects(): Promise<TestSubject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'test-subjects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const subjects = response.objects as TestSubject[]
    return subjects.sort((a, b) => {
      const orderA = a.metadata?.display_order ?? 999
      const orderB = b.metadata?.display_order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch test subjects')
  }
}

// Fetch single subject by slug
export async function getTestSubject(slug: string): Promise<TestSubject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'test-subjects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as TestSubject
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch test subject')
  }
}

// Fetch all practice tests
export async function getPracticeTests(): Promise<PracticeTest[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'practice-tests' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as PracticeTest[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch practice tests')
  }
}

// Fetch single practice test by slug
export async function getPracticeTest(slug: string): Promise<PracticeTest | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'practice-tests', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as PracticeTest
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch practice test')
  }
}

// Fetch practice tests for a given subject id
export async function getPracticeTestsBySubject(subjectId: string): Promise<PracticeTest[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'practice-tests', 'metadata.subject': subjectId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as PracticeTest[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch practice tests by subject')
  }
}

// Fetch questions for a practice test id
export async function getQuestionsByTest(testId: string): Promise<Question[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'questions', 'metadata.practice_test': testId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Question[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch questions')
  }
}