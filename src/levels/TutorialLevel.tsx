import React, { useState } from "react";
import Player from "../components/Player";

const TutorialLevel: React.FC = () => {
  const targetX = 300; // 目标区域的X坐标
  const targetY = 300; // 目标区域的Y坐标
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [hasWon, setHasWon] = useState(false);

  // 检查玩家是否到达目标区域
  const checkWin = (x: number, y: number) => {
    if (
      x >= targetX &&
      x <= targetX + 50 &&
      y >= targetY &&
      y <= targetY + 50
    ) {
      setHasWon(true);
    }
  };

  const updatePlayerPosition = (x: number, y: number) => {
    setPlayerX(x);
    setPlayerY(y);
    checkWin(x, y);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        border: "1px solid black",
      }}
    >
      <Player x={playerX} y={playerY} updatePosition={updatePlayerPosition} />
      <div
        style={{
          position: "absolute",
          left: `${targetX}px`,
          top: `${targetY}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "green",
        }}
      >
        {/* 目标区域 */}
      </div>
      {hasWon && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "blue",
            fontSize: "24px",
          }}
        >
          You Win!
        </div>
      )}
    </div>
  );
};

export default TutorialLevel;
