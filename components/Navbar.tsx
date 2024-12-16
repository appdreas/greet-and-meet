import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                Greet n Meet
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="text-primary">
              Sign In
            </Button>
            <Button className="ml-4">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
