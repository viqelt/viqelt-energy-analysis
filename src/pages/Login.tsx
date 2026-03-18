import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, X, Phone, Send, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotInput, setForgotInput] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSent(true);
    }, 1500);
  };

  const closeForgotModal = () => {
    setShowForgot(false);
    setForgotInput("");
    setForgotSent(false);
    setForgotLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="w-full max-w-md relative z-10">
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
              {isLogin ? "Sign in to access your energy dashboard" : "Get started with energy monitoring"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button type="button" onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Login
              </button>
              <button type="button" onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${!isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="example@veam.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="password" type="password" placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg" />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" onClick={() => setShowForgot(true)}
                    className="text-xs font-medium text-indigo-600 hover:text-purple-600 transition-colors hover:underline">
                    Forgot my password?
                  </button>
                </div>
              )}

              <Button type="submit" disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-300 group">
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

      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeForgotModal} />
          <Card className="relative z-10 w-full max-w-sm border-0 shadow-2xl shadow-gray-300/50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-2 relative">
              <button onClick={closeForgotModal} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
              <CardTitle className="text-lg font-semibold text-gray-900">Reset Password</CardTitle>
              <CardDescription className="text-gray-500 text-sm">We will send you a verification code</CardDescription>
            </CardHeader>
            <CardContent>
              {forgotSent ? (
                <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Code sent successfully</p>
                  <p className="text-xs text-gray-500 mt-1">(Demo)</p>
                  <Button onClick={closeForgotModal}
                    className="mt-4 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-md transition-all duration-300">
                    Back to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-input" className="text-gray-700 text-sm font-medium">Email or Phone Number</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-300 text-xs">/</span>
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <Input id="forgot-input" type="text" placeholder="email@example.com or +213..."
                        value={forgotInput} onChange={(e) => setForgotInput(e.target.value)}
                        className="pl-16 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg" />
                    </div>
                  </div>
                  <Button type="submit" disabled={forgotLoading}
                    className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow-lg transition-all duration-300">
                    {forgotLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Send Code</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
