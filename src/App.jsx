import { useState } from "react";
import Landing from "./pages/Landing";
import JarvisInterface from "./pages/JarvisInterface";

export default function App() {
  const [entered, setEntered] = useState(false);

  return entered ? <JarvisInterface /> : <Landing onEnter={() => setEntered(true)} />;
}