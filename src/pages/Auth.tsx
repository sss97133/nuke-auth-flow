
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type AuthMode = "signin" | "signup";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: mode === "signin" ? "Signed in successfully" : "Account created",
        description: mode === "signin" 
          ? "Welcome back to Nuke platform!" 
          : "Please check your email for verification instructions.",
      });
      
      // In a real implementation, you would redirect the user or update auth state
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setEmail("");
    setPassword("");
  };

  const handleGuestAccess = () => {
    toast({
      title: "Continuing as guest",
      description: "You'll have limited access to the platform features.",
    });
    // In a real implementation, you would redirect the user or update auth state
  };

  const passwordStrength = (): { strength: string; color: string } => {
    if (!password) return { strength: "No password", color: "text-gray-400" };
    if (password.length < 8) return { strength: "Weak", color: "text-red-500" };
    if (password.length < 12) return { strength: "Medium", color: "text-yellow-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const { strength, color } = passwordStrength();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Branding Panel */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-center items-center md:w-2/5">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 text-4xl font-bold">NUKE</div>
          <h1 className="text-3xl font-bold mb-6">
            The Complete Vehicle Management Platform
          </h1>
          <p className="text-xl mb-8">
            Everything you need to manage your vehicle in one place.
          </p>
          <div className="text-sm opacity-80">
            Joined by 12,000+ vehicle owners & businesses
          </div>
          
          {/* Optional background pattern or vehicle imagery would go here */}
          <div className="mt-12 hidden md:block">
            <div className="h-32 w-32 mx-auto bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Auth Form Panel */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mode Switcher */}
          <div className="flex mb-8 border-b">
            <button
              className={`pb-2 px-4 text-lg font-medium ${
                mode === "signin"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
            <button
              className={`pb-2 px-4 text-lg font-medium ${
                mode === "signup"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {mode === "signin" && (
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {mode === "signup" && (
                <div className={`text-sm ${color} mt-1`}>
                  Password strength: {strength}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="ml-2" size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" className="h-12">
                <Github size={18} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="h-12">
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                </svg>
                Google
              </Button>
            </div>

            <Button 
              variant="ghost" 
              className="w-full mt-4 h-12" 
              onClick={handleGuestAccess}
            >
              Continue as Guest
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <div className="mb-2">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleMode}
                className="text-primary hover:underline"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </div>
            <div>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
              {" · "}
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              {" · "}
              <Link to="/support" className="hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

