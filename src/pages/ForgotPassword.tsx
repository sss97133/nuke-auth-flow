
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate password reset process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast({
        title: "Reset email sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
    } catch (error) {
      toast({
        title: "Failed to send reset email",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Branding Panel - Simplified version */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-center items-center md:w-2/5">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 text-4xl font-bold">NUKE</div>
          <h1 className="text-3xl font-bold mb-6">
            The Complete Vehicle Management Platform
          </h1>
          <p className="text-xl mb-8">
            Reset your password to regain access to your account.
          </p>
        </div>
      </div>

      {/* Reset Form Panel */}
      <div className="flex-1 flex justify-center items-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          <Link 
            to="/auth" 
            className="inline-flex items-center text-sm text-primary hover:underline mb-6"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to sign in
          </Link>

          {!submitted ? (
            <>
              <h2 className="text-2xl font-semibold mb-2">Forgot your password?</h2>
              <p className="text-muted-foreground mb-6">
                No problem. Enter your email and we'll send you a reset link.
              </p>

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
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send reset instructions
                      <ArrowRight className="ml-2" size={18} />
                    </span>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Check your inbox</h3>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox (and spam folder) for instructions.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setEmail("");
                  setSubmitted(false);
                }}
                className="mr-4"
              >
                Try a different email
              </Button>
              <Link to="/auth">
                <Button>Return to sign in</Button>
              </Link>
            </div>
          )}

          <div className="mt-12 text-center text-sm text-muted-foreground">
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

export default ForgotPassword;
