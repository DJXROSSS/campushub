import GoogleSignInButton from '@/components/auth/signin/GoogleSignInButton'

interface SignInActionsProps {
  loading: boolean
  onSignIn: () => void
  onSkip: () => void
}

export default function SignInActions({
  loading,
  onSignIn,
  onSkip,
}: SignInActionsProps) {
  return (
    <div className="space-y-4">
      <GoogleSignInButton loading={loading} onClick={onSignIn} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500 dark:bg-black dark:text-neutral-400">
            or
          </span>
        </div>
      </div>

      <button
        onClick={onSkip}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 px-8 text-sm font-medium text-neutral-600 transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 hover:text-black dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-900/50 dark:hover:text-white"
      >
        Skip Login {'->'}
      </button>
    </div>
  )
}
