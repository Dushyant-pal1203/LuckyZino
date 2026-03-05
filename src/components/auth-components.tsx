import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';

export function SignIn({
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const router = useRouter();

  return (
    <form
      action={ () => router.push('/sign-in') }
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignUp({
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  const router = useRouter();

  return (
    <form
      action={ () => router.push('/sign-up') }
    >
      <Button {...props}>Sign Up</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => { await signOut({ redirectTo: "/" }) }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
