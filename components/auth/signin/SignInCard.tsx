import { Logo } from '@/components/ui/logo'
import SignInActions from '@/components/auth/signin/SignInActions'
import SignInFooter from '@/components/auth/signin/SignInFooter'

interface SignInCardProps {
  signinLoading: boolean
  onSignIn: () => void
  onSkip: () => void
}

export default function SignInCard({
  signinLoading,
  onSignIn,
  onSkip,
}: SignInCardProps) {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-primary">
          Welcome to CampusHub
        </h2>
      </div>

      <SignInActions loading={signinLoading} onSignIn={onSignIn} onSkip={onSkip} />
      <SignInFooter />
    </div>
  )
}
