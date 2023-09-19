import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseObjects";

export default function Home() {
  const [user] = useAuthState(auth);
  return <div>Welcome, {user?.email}</div>;
}
