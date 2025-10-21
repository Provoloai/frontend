import { useState } from "react";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Logo from "../../Reusables/Logo";
import TextInputField from "../../Reusables/TextInputField";
import CustomButton from "../../Reusables/CustomButton";
import { Link, useNavigate } from "@tanstack/react-router";
import { getCleanErrorMessage } from "../../utils/firebaseError.util";
import { Key, Mail } from "lucide-react";
import CustomSnackbar from "../../Reusables/CustomSnackbar";
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";

const Login = () => {
  const navigate = useNavigate();
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
      const idToken = await getIdToken(user, true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });
      if (response.ok) {
        navigate({ to: "/optimizer", replace: true });
      } else {
        throw new Error("Server authentication failed");
      }
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
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 relative">
      <Link
        to="/"
        className="w-fit mx-auto z-50"
      >
        <Logo />
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white lg:p-10 md:p-8 p-5 mt-10 rounded-md border z-50 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-medium tracking-tight text-gray-900">
            Welcome to Provolo
          </h2>
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
            <Link
              to="/forgot-password"
              className="underline text-gray-600 hover:text-gray-500 text-xs text-right"
            >
              Forgot Password?
            </Link>
          </div>

          <div>
            <CustomButton type="submit" disabled={loading} className="btn-primary text-sm">
              {loading ? "Logging in..." : "Login"}
            </CustomButton>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="underline text-gray-600 hover:text-gray-500 ">Sign Up</span>
          </Link>
        </p>
      </div>
      {error && <CustomSnackbar open={error} snackbarColor={"danger"} snackbarMessage={error} />}

      <img alt="Provolo" src={Vector} className="absolute top-0 left-0 lg:w-1/5 w-1/2 opacity-40" />
      <img alt="Provolo" src={Vector2} className="absolute bottom-0 right-0 w-1/3 opacity-40" />
    </div>
  );
};

export default Login;
