import { getTestSubjects } from '@/lib/cosmic'
import SubjectCard from '@/components/SubjectCard'

export const metadata = {
  title: 'Test Subjects — Selective Test Pro',
  description: 'Browse all NSW selective test subjects and practice tests.',
}

export default async function SubjectsPage() {
  const subjects = await getTestSubjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Test Subjects</h1>
        <p className="mt-3 text-gray-500">
          Explore each subject area covered in the NSW selective placement exam.
        </p>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">No subjects available yet.</p>
        </div>
      )}
    </div>
  )
}