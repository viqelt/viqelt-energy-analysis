import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Mail, Lock, ArrowRight, X, Send, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const closeForgotModal = () => {
    setShowForgot(false);
    setForgotEmail("");
    setForgotSent(false);
  };

  const handleForgot = () => {
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSent(true);
    }, 1500);
  };
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Demo mode: accept any credentials
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <img src="https://raw.githubusercontent.com/viqelt/viqelt-energy-analysis/main/logo.jpeg" className="w-16 h-16 rounded-2xl object-cover mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">VEAM</h1>
          <p className="text-gray-500 mt-1 text-sm">Smart Energy Analysis & Monitor</p>
        </div>

        <Card className="border-0 shadow-xl shadow-gray-200/50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {isLogin
                ? "Sign in to access your energy dashboard"
                : "Get started with energy monitoring"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>
            

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@veam.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
              
    

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" onClick={() => setShowForgot(true)} className="text-xs font-medium text-indigo-600 hover:text-purple-600 transition-colors hover:underline">
                    Forgot my password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <p className="text-xs text-indigo-600 text-center font-medium">
                🔓 Demo Mode — Any email & password will work
              </p>
            </div>
          </CardContent>
        </Card>

      <p className="text-center text-xs text-gray-400 mt-6 animate-in fade-in duration-700 delay-500">
          Smart Energy Analysis & Monitor v1.0 - Demo Version
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeForgotModal} />
          <Card className="relative z-10 w-full max-w-sm border-0 shadow-2xl">
            <CardHeader className="pb-2 relative">
              <button onClick={closeForgotModal} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100">
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <CardTitle className="text-lg font-semibold text-gray-900">Reset Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {forgotSent ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">Email Sent!</p>
                  <p className="text-xs text-gray-500">Check your inbox for reset instructions</p>
                  <Button onClick={closeForgotModal} className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Done</Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Enter your email to receive reset instructions</p>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="example@veam.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="pl-10 h-11 border-gray-200 rounded-lg" />
                  </div>
                  <Button onClick={handleForgot} disabled={forgotLoading} className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
                    {forgotLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4 mr-2" />Send Reset Email</>}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
