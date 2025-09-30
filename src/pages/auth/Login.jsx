import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import Logo from "../../Reusables/Logo";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import { Link, useNavigate } from "@tanstack/react-router";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import { ensureUserExists } from "../../utils/firebase.util";
import useAuthStore from "../../stores/authStore";
import { Key, Mail } from "lucide-react";
import CustomSnackbar from "../../Reusables/CustomSnackbar";

const Login = () => {
  const navigate = useNavigate();
  // Zustand auth store
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const signInWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError("");
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ensure user exists in Firestore
      await ensureUserExists(db, user);
      
      setUser(user);
      navigate({ to: "/optimizer", replace: true });
    } catch (error) {
      setError(getCleanErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    await signInWithEmail(email, password);
  };
  
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <Logo />
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white p-10 mt-10 rounded-md border ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-medium tracking-tight text-gray-900">Welcome to Provolo</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="mt-2">
              <TextInputField
                id="email"
                name="email"
                required
                type={"email"}
                value={email}
                autoComplete="email"
                label={"Email"}
                iconStart={<Mail size={20} />}
                placeholder={"example@mail.com"}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                touched={touched.email || error}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <TextInputField
                id="password"
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                label={"Password"}
                iconStart={<Key size={20} />}
                placeholder={"**********"}
                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                touched={touched.password || error}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="underline text-gray-600 hover:text-gray-500 text-xs text-right">
              Forgot Password?
            </Link>
          </div>

          <div>
            <CustomButton type="submit" disabled={loading} className="btn-primary">
              {" "}
              {loading ? "Logging in..." : "Login"}
            </CustomButton>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="underline text-gray-600 hover:text-gray-500">Sign Up</span>
          </Link>
        </p>
      </div>
      {error && (
        <>
          <CustomSnackbar open={error} snackbarColor={"danger"} snackbarMessage={error} />
        </>
      )}
    </div>
  );
};

export default Login;
