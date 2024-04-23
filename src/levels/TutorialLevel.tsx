import React, { useState, useEffect } from "react";
import Player from "../components/Player";
import itemSprite from "../images/basketball.png";

const TutorialLevel: React.FC = () => {
  const targetX = 1500; // 目标区域的X坐标
  const targetY = 600; // 目标区域的Y坐标
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [itemX, setItemX] = useState(200); // 物品的X坐标
  const [itemY, setItemY] = useState(200); // 物品的Y坐标
  const [hasWon, setHasWon] = useState(false);
  const [carryingItem, setCarryingItem] = useState(false); // 玩家是否正在携带物品
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });

  type ItemProps = {
    x: number;
    y: number;
  };

  const Item: React.FC<ItemProps> = ({ x, y }) => {
    return (
      <img
        src={itemSprite} // 物品的图片
        alt="Item"
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
    );
  };

  // 检查玩家是否到达目标区域
  const checkWin = (x: number, y: number) => {
    if (
      x >= targetX &&
      x <= targetX + 60 &&
      y >= targetY &&
      y <= targetY + 60
    ) {
      setHasWon(true);
    }
  };

  const handlePickUpDropItem = () => {
    const isNearItem =
      Math.abs(playerX - itemX) <= 10 && Math.abs(playerY - itemY) <= 10;
    if (isNearItem || carryingItem) {
      setCarryingItem(!carryingItem);
    }
  };

  const updatePosition = (x: number, y: number) => {
    setPlayerX(x);
    setPlayerY(y);
    if (carryingItem) {
      setItemX(x); // 当携带物品时，更新物品的位置
      setItemY(y); // 当携带物品时，更新物品的位置
    }
  };

  useEffect(() => {
    if (carryingItem) {
      setItemX(playerX); // 当携带物品时，更新物品的位置
      setItemY(playerY); // 当携带物品时，更新物品的位置
    }
  }, [playerX, playerY, carryingItem]);

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        border: "1px solid black",
      }}
    >
      <Player
        x={playerX}
        y={playerY}
        updatePosition={updatePosition}
        handlePickUpDropItem={handlePickUpDropItem}
      />
      {!carryingItem && <Item x={itemX} y={itemY} />}
      <div
        style={{
          position: "absolute",
          left: `${targetX}px`,
          top: `${targetY}px`,
          width: "100px",
          height: "100px",
          backgroundColor: "green",
        }}
      >
        {/* 目标区域 */}
      </div>
      {hasWon && <div style={{ color: "red" }}>You've won!</div>}
    </div>
  );
};

export default TutorialLevel;
