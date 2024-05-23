// Player.tsx
import React, { useState, useEffect, useRef } from "react";
import playerSprite from "../images/player.png";
import { Button } from "react-bootstrap";

interface PlayerProps {
  x: number;
  y: number;
  updatePosition: (x: number, y: number) => void;
  handlePickUpDropItem: () => void;
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
  const isIpad = window.innerWidth <= 1400 && window.innerHeight <= 1400; // 判断是否为 iPad 大小

  useEffect(() => {
    if (!isIpad) {
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
    }
  }, [position, frame, updatePosition, carryingItem, isIpad]);

  type Stick = {
    direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  };

  const handleMove = (stick: Stick) => {
    let newX = position.x;
    let newY = position.y;
    let newFrameX = frame.x;
    let newFrameY = frame.y;

    switch (stick.direction) {
      case "UP":
        newY -= 20;
        newFrameY = 0;
        break;
      case "DOWN":
        newY += 20;
        newFrameY = 0;
        break;
      case "LEFT":
        newX -= 20;
        newFrameY = 1;
        break;
      case "RIGHT":
        newX += 20;
        newFrameY = 1;
        break;
    }

    updatePosition(newX, newY);
    setFrame({ x: newFrameX, y: newFrameY });
  };

  return (
    <div>
      {isIpad ? (
        <div>
          <Button onClick={() => handleMove({ direction: "UP" })}>上</Button>
          <Button onClick={() => handleMove({ direction: "DOWN" })}>下</Button>
          <Button onClick={() => handleMove({ direction: "LEFT" })}>左</Button>
          <Button onClick={() => handleMove({ direction: "RIGHT" })}>右</Button>
          <Button onClick={handlePickUpDropItem}>Pick</Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Player;
