import React, { useState, useEffect, useCallback } from "react";
import { randomGenerator } from "./hooks/randomGenertor";

interface Point {
  x: number;
  y: number;
}
type Direction = "UP" | "DOWN" | "RIGHT" | "LEFT";

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Point>(randomGenerator);
  const [direction, setDirection] = useState<Direction>("UP");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState(3);
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      setSnake((prevSnake) => {
        const newBlock = { ...prevSnake[prevSnake.length - 1] };

        switch (direction) {
          case "UP":
            newBlock.y += 1;
            break;
          case "DOWN":
            newBlock.y -= 1;
            break;
          case "LEFT":
            newBlock.x += 1;
            break;
          case "RIGHT":
            newBlock.x -= 1;
            break;
        }

        return [...prevSnake, newBlock];
      });
      setFood(randomGenerator);
    }
  }, [snake, food, direction]);

  useEffect(() => {
    if (gameOver) {
      localStorage.setItem("highScore", JSON.stringify(score));
    }
  }, [gameOver, score]);
  useEffect(() => {
    const checkCrash = () => {
      const head = snake[0];
      if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20) {
        setGameOver(true);
      }
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          setGameOver(true);
        }
      }
    };
    checkCrash();
  }, [snake]);

  useEffect(() => {
    setScore(snake.length);
    console.log(score);
  }, [score, snake.length]);
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }
      return [head, ...prevSnake.slice(0, -1)];
    });
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        moveSnake();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [moveSnake, gameOver]);
  return (
    <div>
      <h1 className={"font-bold"}>Snake Game</h1>
      <div className="grid grid-cols-20 gap-px mx-auto">
        {Array.from({ length: 20 * 20 }, (_, i) => {
          const x = i % 20;
          const y = Math.floor(i / 20);
          const isSnake = snake.some((part) => part.x === x && part.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0].x === x && snake[0].y === y;
          return (
            <div
              key={i}
              className={`w-6 h-6 ${
                isHead
                  ? "bg-amber-200"
                  : isSnake
                  ? "bg-green-500"
                  : isFood
                  ? "bg-red-800"
                  : "bg-gray-300"
              } border`}
            />
          );
        })}
      </div>
      {gameOver && <h2>Game Over!</h2>}
    </div>
  );
};

export default SnakeGame;
