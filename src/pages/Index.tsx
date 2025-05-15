
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Nuke Platform</h1>
        <p className="text-xl mb-10">The Complete Vehicle Management Platform</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" className="flex items-center">
              Sign In
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="lg">Explore as Guest</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
