import Link from 'next/link'

export default function SignInFooter() {
  return (
    <p className="text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      By signing up, you agree to our{' '}
      <Link
        className="underline transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        href="/termsofservice"
      >
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        className="underline transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        href="/privacypolicy"
      >
        Privacy Policy
      </Link>
    </p>
  )
}
