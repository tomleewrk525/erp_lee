"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail } from "lucide-react";
import { useLanguage } from '../../contexts/language-context'; // Import useLanguage
import { getTranslation } from '../../lib/i18n'; // Import getTranslation

export default function AuthForm() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError(getTranslation(language, "auth_validation_email_password_required"));
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError(getTranslation(language, "auth_validation_email_invalid"));
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(getTranslation(language, "auth_validation_password_length"));
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful login
      if (email === "user@example.com" && password === "password") {
        console.log("Sign In successful:", { email });
        // In a real application, you would handle successful login (e.g., redirect, store token)
      } else {
        setError(getTranslation(language, "auth_validation_invalid_credentials"));
      }
    } catch (err) {
      setError(getTranslation(language, "auth_validation_unexpected_error_signin"));
      console.error("Sign-in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError(getTranslation(language, "auth_validation_email_password_required"));
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError(getTranslation(language, "auth_validation_email_invalid"));
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(getTranslation(language, "auth_validation_password_length"));
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate successful signup
      if (email !== "user@example.com") { // Simulate that "user@example.com" is already taken
        console.log("Sign Up successful:", { email });
        // In a real application, you would handle successful signup (e.g., redirect, show success message)
      } else {
        setError(getTranslation(language, "auth_validation_email_registered"));
      }
    } catch (err) {
      setError(getTranslation(language, "auth_validation_unexpected_error_signup"));
      console.error("Sign-up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">{getTranslation(language, "auth_tab_signin")}</TabsTrigger>
        <TabsTrigger value="signup">{getTranslation(language, "auth_tab_signup")}</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(language, "auth_card_title_signin")}</CardTitle>
            <CardDescription>
              {getTranslation(language, "auth_card_description_signin")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">{getTranslation(language, "auth_label_email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="lee@geunsu.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">{getTranslation(language, "auth_label_password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="signin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignIn} className="w-full" disabled={isLoading}>
              {isLoading ? getTranslation(language, "auth_button_signing_in") : getTranslation(language, "auth_button_signin")}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(language, "auth_card_title_signup")}</CardTitle>
            <CardDescription>
              {getTranslation(language, "auth_card_description_signup")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-email">{getTranslation(language, "auth_label_email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="lee@geunsu.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">{getTranslation(language, "auth_label_password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignUp} className="w-full" disabled={isLoading}>
              {isLoading ? getTranslation(language, "auth_button_signing_up") : getTranslation(language, "auth_button_signup")}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
