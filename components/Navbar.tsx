"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import deleteSession from "@/app/actions/auth/deleteSession";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
  const router = useRouter();
  const { toast } = useToast();

  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  const handleSignOut = async () => {
    const { success, error } = await deleteSession();
    if (success) {
      setUser(undefined);
      setIsAuthenticated(false);
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center pr-8">
              <span className="text-2xl font-bold text-primary">
                Greet n Meet
              </span>
            </Link>
            <div className="flex items-center">
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/activities">Feed</Link>
              </Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/activities/user">My activities</Link>
              </Button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/attending">Attending</Link>
              </Button>
            </div>
          </div>
          {!isAuthenticated ? (
            <div className="flex items-center">
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button className="ml-4" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <Button
                variant="outline"
                className="ml-4"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
