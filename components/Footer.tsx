import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📝</span>
              <span className="font-extrabold text-lg text-white">SelectiveTestPro</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Helping NSW students prepare for selective school entry exams with free trial practice tests.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/subjects" className="hover:text-white transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-white transition-colors">
                  Practice Tests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">About</h4>
            <p className="text-sm text-gray-400">
              Built for students preparing for the NSW Selective High School Placement Test.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500">
          © {year} Selective Test Pro. All rights reserved.
        </div>
      </div>
    </footer>
  )
}