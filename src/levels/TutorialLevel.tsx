import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // 导入 Bootstrap 的 Modal 和 Button 组件
import Player from "../components/Player";
import itemSprite from "../images/basketball.png";
import "../style/tutorial.css";
import Header from "../Header";
import { useLanguage } from "../LanguageProvider";
import winSound from "../sounds/success.mp3";

const TutorialLevel: React.FC = () => {
  const { translate } = useLanguage(); // Use the hook here
  const targetX = 1500; // 目标区域的X坐标
  const targetY = 600; // 目标区域的Y坐标
  const goalX = 1000; // 篮球的目标X坐标
  const goalY = 400; // 篮球的目标Y坐标
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [itemX, setItemX] = useState(200); // 物品的X坐标
  const [itemY, setItemY] = useState(200); // 物品的Y坐标
  const [carryingItem, setCarryingItem] = useState(false); // 玩家是否正在携带物品
  const [isWin, setIsWin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const winAudio = new Audio(winSound);

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
          zIndex: 2,
        }}
      />
    );
  };

  const handlePickUpDropItem = () => {
    const isNearItem =
      Math.abs(playerX - itemX) <= 30 && Math.abs(playerY - itemY) <= 30;
    if (isNearItem || carryingItem) {
      setCarryingItem(!carryingItem);
    }
  };

  const updatePosition = (x: number, y: number) => {
    if (isWin) return;
    setPlayerX(x);
    setPlayerY(y);
    if (carryingItem) {
      setItemX(x); // 当携带物品时，更新物品的位置
      setItemY(y); // 当携带物品时，更新物品的位置
    }
  };

  useEffect(() => {
    // 检查篮球是否在红色方块上
    const isItemOnTarget =
      Math.abs(itemX - goalX) <= 40 && Math.abs(itemY - goalY) <= 40;
    // 检查玩家是否在绿色方块上
    const isPlayerOnGreen =
      Math.abs(playerX - targetX) <= 40 && Math.abs(playerY - targetY) <= 40;
    // 如果两个条件都满足，那么游戏获胜
    if (isItemOnTarget && isPlayerOnGreen) {
      setIsWin(true);
      setShowModal(true);
    }
    if (isWin) {
      winAudio.play(); // 当 isWin 变为 true 时，播放音频
    }
  }, [itemX, itemY, playerX, playerY]);

  return (
    <div className="container">
      <Header title={translate("tutorial")} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>游戏胜利！</Modal.Title>
        </Modal.Header>
        <Modal.Body>恭喜你完成了这一关！</Modal.Body>
        <Modal.Footer>
          <Button variant="primary">下一关</Button>
        </Modal.Footer>
      </Modal>
      <Player
        x={playerX}
        y={playerY}
        updatePosition={updatePosition}
        handlePickUpDropItem={handlePickUpDropItem}
      />
      <Item x={itemX} y={itemY} />
      <div className="goal" style={{ left: `${goalX}px`, top: `${goalY}px` }} />
      <div
        className="target"
        style={{ left: `${targetX}px`, top: `${targetY}px` }}
      />
      {isWin && (
        <div
          style={{ color: "red", position: "absolute", top: "50", left: "50" }}
        >
          You've won!
        </div>
      )}
      <div className="rules">{translate("ruleTutorial")}</div>
    </div>
  );
};

export default TutorialLevel;
