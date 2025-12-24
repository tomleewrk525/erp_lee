'use client';

import AuthForm from "@/components/auth/auth-form";
import { ShaderGradient } from 'shadergradient';

export default function AuthenticationPage() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <ShaderGradient
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={2.7}
        color1="#A69080"
        color2="#D9AAB3"
        color3="#8C7D85"
        range="disabled"
        uSpeed={0.4}
        className="absolute inset-0 -z-10"
      />
      <AuthForm />
    </div>
  );
}
