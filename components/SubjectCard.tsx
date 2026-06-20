import Link from 'next/link'
import { TestSubject } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SubjectCardProps {
  subject: TestSubject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  if (!subject) return null

  const name = getMetafieldValue(subject.metadata?.name) || subject.title
  const description = getMetafieldValue(subject.metadata?.description)
  const icon = getMetafieldValue(subject.metadata?.icon) || '📘'
  const color = getMetafieldValue(subject.metadata?.color) || '#2563eb'

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: `${color}1a` }}
      >
        <span>{icon}</span>
      </div>
      <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-600 transition-colors">
        {name}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{description}</p>
      )}
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600">
        View tests
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}