import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormData, LoginTouchedFields } from "@/types/auth";
import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { LOGIN_CONFIG } from "@/constants/auth";
import { Link } from "@tanstack/react-router";

const Login = () => {
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<LoginTouchedFields>({
    email: false,
    password: false,
  });

  // Auth hook
  const { signInWithEmail, isLoading, error, clearError } = useAuth();

  // Event handlers
  const handleInputChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleBlur = useCallback((field: keyof LoginTouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        return;
      }
      await signInWithEmail(formData.email, formData.password);
    },
    [formData, signInWithEmail]
  );

  return (
    <AuthLayout>
      <LoginForm
        formData={formData}
        touched={touched}
        isLoading={isLoading}
        error={error}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onErrorClose={clearError}
      />
      <Link
        to="/"
        className="underline text-center mt-10 text-xs text-gray-500"
      >
        {LOGIN_CONFIG.backHome}
      </Link>
    </AuthLayout>
  );
};

export default Login;
