import { useState } from "react";
import SnakeGame from "./snakeGame";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SnakeGame />
    </>
  );
}

export default App;
