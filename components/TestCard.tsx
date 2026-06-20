import Link from 'next/link'
import { PracticeTest } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import DifficultyBadge from '@/components/DifficultyBadge'

interface TestCardProps {
  test: PracticeTest
}

export default function TestCard({ test }: TestCardProps) {
  if (!test) return null

  const title = getMetafieldValue(test.metadata?.title) || test.title
  const subjectName = test.metadata?.subject
    ? getMetafieldValue(test.metadata.subject.metadata?.name) || test.metadata.subject.title
    : ''
  const timeLimit = test.metadata?.time_limit
  const freeTrial = test.metadata?.free_trial === true
  const coverImage = test.metadata?.cover_image

  return (
    <Link
      href={`/tests/${test.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
    >
      <div className="relative h-40 bg-gradient-to-br from-brand-500 to-accent-600 overflow-hidden">
        {coverImage?.imgix_url ? (
          <img
            src={`${coverImage.imgix_url}?w=800&h=320&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-white/90">
            📝
          </div>
        )}
        {freeTrial && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow">
            🆓 Free Trial
          </span>
        )}
      </div>
      <div className="p-5">
        {subjectName && (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-1">
            {subjectName}
          </p>
        )}
        <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <DifficultyBadge difficulty={test.metadata?.difficulty} />
          {typeof timeLimit === 'number' && timeLimit > 0 && (
            <span className="inline-flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeLimit} min
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}