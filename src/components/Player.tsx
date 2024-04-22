// Player.tsx
import React, { useState, useEffect, useRef } from "react";
import playerSprite from "../images/player.jpeg";

interface PlayerProps {
  x: number;
  y: number;
  updatePosition: (x: number, y: number) => void;
}

const frameSize = { width: 80, height: 64 };

const Player: React.FC<PlayerProps> = ({ x, y, updatePosition }) => {
  const [position, setPosition] = useState({ x, y });
  const [frame, setFrame] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let newX = position.x;
      let newY = position.y;
      let newFrameX = frame.x;
      let newFrameY = frame.y;

      switch (event.key) {
        case "w":
          newY -= 10;
          newFrameY = 3; // 假设向上行走的帧在第四行
          break;
        case "s":
          newY += 10;
          newFrameY = 0; // 假设向下行走的帧在第一行
          break;
        case "a":
          newX -= 10;
          newFrameY = 1; // 假设向左行走的帧在第二行
          break;
        case "d":
          newX += 10;
          newFrameY = 2; // 假设向右行走的帧在第三行
          break;
      }
      newFrameX = (newFrameX + 1) % 4; // 循环帧索引
      setPosition({ x: newX, y: newY });
      setFrame({ x: newFrameX, y: newFrameY });
      updatePosition(newX, newY);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [position, frame, updatePosition]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: frameSize.width,
        height: frameSize.height,
        backgroundImage: `url(${playerSprite})`,
        backgroundPosition: `-${frame.x * frameSize.width}px -${
          frame.y * frameSize.height
        }px`,
      }}
    />
  );
};

export default Player;
