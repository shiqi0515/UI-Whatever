// Player.tsx
import React, { useState, useEffect, useRef } from "react";
import playerSprite from "../images/hamster.png";

interface PlayerProps {
  x: number;
  y: number;
  updatePosition: (x: number, y: number) => void;
  handlePickUpDropItem: () => void;
}

const frameSize = { width: 76, height: 85 };

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
          newFrameY = 1; // 朝上
          break;
        case "s":
          newY += 20;
          newFrameY = 0; // 朝下
          break;
        case "a":
          newX -= 20;
          newFrameY = 3; // 朝左
          break;
        case "d":
          newX += 20;
          newFrameY = 2; // 朝右
          break;
        case "j":
          handlePickUpDropItem();//
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
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Player;
