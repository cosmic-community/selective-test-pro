// app/subjects/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTestSubject, getPracticeTestsBySubject, getMetafieldValue } from '@/lib/cosmic'
import TestCard from '@/components/TestCard'

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const subject = await getTestSubject(slug)

  if (!subject) {
    notFound()
  }

  const tests = await getPracticeTestsBySubject(subject.id)
  const name = getMetafieldValue(subject.metadata?.name) || subject.title
  const description = getMetafieldValue(subject.metadata?.description)
  const icon = getMetafieldValue(subject.metadata?.icon) || '📘'
  const color = getMetafieldValue(subject.metadata?.color) || '#2563eb'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/subjects"
        className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 mb-8"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to subjects
      </Link>

      <div className="flex items-center gap-4 mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${color}1a` }}
        >
          <span>{icon}</span>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{name}</h1>
          {description && <p className="mt-2 text-gray-500 max-w-2xl">{description}</p>}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Tests</h2>
      {tests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">No practice tests for this subject yet.</p>
        </div>
      )}
    </div>
  )
}