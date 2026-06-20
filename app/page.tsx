import Link from 'next/link'
import { getTestSubjects, getPracticeTests } from '@/lib/cosmic'
import SubjectCard from '@/components/SubjectCard'
import TestCard from '@/components/TestCard'

export default async function HomePage() {
  const [subjects, tests] = await Promise.all([getTestSubjects(), getPracticeTests()])

  const freeTrialTests = tests.filter((t) => t.metadata?.free_trial === true).slice(0, 3)
  const featuredTests = freeTrialTests.length > 0 ? freeTrialTests : tests.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            🆓 Free Trial Available Now
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            NSW Selective School
            <br />
            Practice Tests
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90">
            Prepare for the selective high school placement test with interactive practice
            questions, detailed explanations, and instant feedback.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tests"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-700 hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/subjects"
              className="inline-flex items-center rounded-xl border border-white/30 px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-colors"
            >
              Browse Subjects
            </Link>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Test Subjects</h2>
            <p className="mt-2 text-gray-500">Master every area of the selective exam.</p>
          </div>
          <Link href="/subjects" className="hidden sm:inline text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.slice(0, 6).map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No subjects available yet.</p>
        )}
      </section>

      {/* Featured tests */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Practice Tests</h2>
              <p className="mt-2 text-gray-500">Try these free trial tests right now.</p>
            </div>
            <Link href="/tests" className="hidden sm:inline text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          {featuredTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No practice tests available yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Ready to ace the test?</h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Start practicing today with our free trial — no credit card required.
        </p>
        <Link
          href="/tests"
          className="mt-8 inline-flex items-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-bold text-white hover:bg-brand-700 transition-colors shadow-lg"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  )
}