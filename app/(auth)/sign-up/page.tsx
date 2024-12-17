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
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import createUser from "@/app/actions/auth/createUser";

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useActionState(createUser, null);
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Success! Let's sign in!",
      });
      router.push("/sign-in");
    }
  }, [state, toast, router, setIsAuthenticated]);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                name="name"
                defaultValue={state?.fieldData?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={state?.fieldData?.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                name="password"
                defaultValue={state?.fieldData?.password}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>
          {`Already have an account? `}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
