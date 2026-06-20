import { getPracticeTests } from '@/lib/cosmic'
import TestCard from '@/components/TestCard'

export const metadata = {
  title: 'Practice Tests — Selective Test Pro',
  description: 'Browse all NSW selective practice tests including free trial tests.',
}

export default async function TestsPage() {
  const tests = await getPracticeTests()

  const freeTrial = tests.filter((t) => t.metadata?.free_trial === true)
  const others = tests.filter((t) => t.metadata?.free_trial !== true)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Practice Tests</h1>
        <p className="mt-3 text-gray-500">
          Choose a test to begin practicing. Free trial tests are available with no payment.
        </p>
      </div>

      {tests.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">No practice tests available yet.</p>
        </div>
      ) : (
        <>
          {freeTrial.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                🆓 Free Trial Tests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeTrial.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Tests</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}