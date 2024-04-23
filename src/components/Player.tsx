// Player.tsx
import React, { useState, useEffect, useRef } from "react";
import playerSprite from "../images/player.jpg";

interface PlayerProps {
  x: number;
  y: number;
  updatePosition: (x: number, y: number) => void;
  handlePickUpDropItem: () => void; // 新增属性
}

const frameSize = { width: 58.8, height: 58.8 };

const Player: React.FC<PlayerProps> = ({
  x,
  y,
  updatePosition,
  handlePickUpDropItem,
}) => {
  const [position, setPosition] = useState({ x, y });
  const [frame, setFrame] = useState({ x: 0, y: 0 });
  const [carryingItem, setCarryingItem] = useState(false); // 新增状态
  const frameCount = useRef(0);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      let newX = position.x;
      let newY = position.y;
      let newFrameX = frame.x;
      let newFrameY = frame.y;

      switch (event.key) {
        case "w":
          newY -= 20;
          newFrameY = 0; // 假设向上行走的帧在第一行
          break;
        case "s":
          newY += 20;
          newFrameY = 0; // 假设向下行走的帧在第一行
          break;
        case "a":
          newX -= 20;
          newFrameY = 1; // 假设向左行走的帧在第二行
          break;
        case "d":
          newX += 20;
          newFrameY = 1; // 假设向右行走的帧在第二行
          break;
        case "j":
          handlePickUpDropItem();
          break;
        // ...
      }

      frameCount.current = (frameCount.current + 1) % 5; // 假设每个方向有5帧
      newFrameX = frameCount.current;
      setPosition({ x: newX, y: newY });
      setFrame({ x: newFrameX, y: newFrameY });
      updatePosition(newX, newY);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [position, frame, updatePosition, carryingItem]);

  return (
    <div>
      <img
        src={playerSprite}
        alt="Player sprite"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: frameSize.width,
          height: frameSize.height,
          objectPosition: `${-frame.x * frameSize.width}px ${
            -frame.y * frameSize.height
          }px`,
          objectFit: "none",
        }}
      />
    </div>
  );
};

export default Player;
