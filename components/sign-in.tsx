/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/xGQcYkSFxr6
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function SignIn() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-sm underline" href="#">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Sign in</Button>
        <Separator />
        <Button className="w-full" variant="outline">
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  )
}