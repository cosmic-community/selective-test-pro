// app/tests/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getPracticeTest,
  getQuestionsByTest,
  getMetafieldValue,
} from '@/lib/cosmic'
import QuestionPlayer from '@/components/QuestionPlayer'
import DifficultyBadge from '@/components/DifficultyBadge'

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const test = await getPracticeTest(slug)

  if (!test) {
    notFound()
  }

  const questions = await getQuestionsByTest(test.id)
  const title = getMetafieldValue(test.metadata?.title) || test.title
  const instructions = getMetafieldValue(test.metadata?.instructions)
  const timeLimit = test.metadata?.time_limit
  const freeTrial = test.metadata?.free_trial === true
  const coverImage = test.metadata?.cover_image
  const subjectName = test.metadata?.subject
    ? getMetafieldValue(test.metadata.subject.metadata?.name) || test.metadata.subject.title
    : ''

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/tests"
        className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to tests
      </Link>

      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white mb-8">
        <div className="relative h-48 bg-gradient-to-br from-brand-500 to-accent-600">
          {coverImage?.imgix_url ? (
            <img
              src={`${coverImage.imgix_url}?w=1600&h=400&fit=crop&auto=format,compress`}
              alt={title}
              width={800}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-white/90">
              📝
            </div>
          )}
        </div>
        <div className="p-6">
          {subjectName && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-2">
              {subjectName}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={test.metadata?.difficulty} />
            {typeof timeLimit === 'number' && timeLimit > 0 && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {timeLimit} min
              </span>
            )}
            {freeTrial && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                🆓 Free Trial
              </span>
            )}
            <span className="inline-flex items-center text-sm text-gray-500">
              {questions.length} {questions.length === 1 ? 'question' : 'questions'}
            </span>
          </div>
          {instructions && (
            <div className="mt-5 rounded-xl bg-brand-50 border border-brand-100 p-4">
              <p className="text-sm font-semibold text-brand-800 mb-1">Instructions</p>
              <p className="text-sm text-gray-700">{instructions}</p>
            </div>
          )}
        </div>
      </div>

      <QuestionPlayer questions={questions} />
    </div>
  )
}