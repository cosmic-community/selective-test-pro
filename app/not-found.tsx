import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-extrabold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-500">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}