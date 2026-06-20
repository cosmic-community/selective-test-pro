import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="font-extrabold text-lg text-gray-900">
              Selective<span className="text-brand-600">Test</span>Pro
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
              Home
            </Link>
            <Link href="/subjects" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
              Subjects
            </Link>
            <Link href="/tests" className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">
              Practice Tests
            </Link>
          </nav>
          <Link
            href="/tests"
            className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  )
}