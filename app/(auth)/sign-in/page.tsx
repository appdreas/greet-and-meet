"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import createSession from "@/app/actions/auth/createSession";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useActionState(createSession, null);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: state.error,
      });
    }
    if (state?.success) {
      setIsAuthenticated(true);
      router.push("/activities");
    }
  }, [state, toast, router, setIsAuthenticated]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          {`Don't have an account? `}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
