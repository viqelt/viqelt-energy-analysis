import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function HelpContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Help & Contact</h2>
        <p className="text-sm text-gray-500 mt-0.5">Get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <Card className="border-0 shadow-md shadow-gray-100 lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-gray-900">Send us a Message</CardTitle>
              <p className="text-xs text-gray-400">We typically respond within 24 hours</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-700 font-medium">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10 h-11 border-gray-200 focus:border-indigo-500 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm text-gray-700 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10 h-11 border-gray-200 focus:border-indigo-500 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-gray-700 font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  rows={5}
                  className="border-gray-200 focus:border-indigo-500 rounded-lg resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className={`w-full sm:w-auto h-11 px-8 rounded-xl font-medium transition-all duration-300 ${
                  status === "sent"
                    ? "bg-green-500 hover:bg-green-600 shadow-green-200"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-200"
                } text-white shadow-lg hover:shadow-xl`}
              >
                {status === "sending" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : status === "sent" ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message Sent!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-4">
          <Card className="border-0 shadow-md shadow-gray-100">
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">Email Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:viqsene@gmail.com"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors group"
              >
                <span>viqsene@gmail.com</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-xs text-gray-400 mt-2">For general inquiries and support</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md shadow-gray-100">
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">FAQ</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { q: "How does the IoT device connect?", a: "Via WiFi using ESP32 microcontroller" },
                { q: "Is the data real-time?", a: "Yes, data updates every 3 seconds" },
                { q: "How accurate is AI prediction?", a: "Approximately 85-92% accuracy" },
              ].map((faq, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 transition-colors">
                  <p className="text-xs font-semibold text-gray-800">{faq.q}</p>
                  <p className="text-xs text-gray-500 mt-1">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}