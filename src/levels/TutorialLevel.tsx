import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Player from "../components/Player";
import itemSprite from "../images/coin.png";
import "../style/tutorial.css";
import Header from "../Header";
import { useLanguage } from "../LanguageProvider";
import winSound from "../sounds/success.mp3";
import closeIcon from "../icons/close.png";
import SettingButton from "../SettingButton";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const TutorialLevel: React.FC = () => {
  const { translate } = useLanguage();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const targetX = (2700 / screenWidth) * 1820; // 人物目标区域X坐标
  const targetY = (320 / screenHeight) * 3900; // 人物目标区域Y坐标
  const goalX = (1680 / screenWidth) * 2600; // 篮球目标区域X坐标
  const goalY = (700 / screenHeight) * 800; // 篮球目标区域Y坐标
  const [playerX, setPlayerX] = useState((100 / screenWidth) * 1000); // 人物X坐标
  const [playerY, setPlayerY] = useState((100 / screenHeight) * 1000); // 人物Y坐标
  const [itemX, setItemX] = useState((200 / screenWidth) * 1000); // 篮球X坐标
  const [itemY, setItemY] = useState((200 / screenHeight) * 1000); // 篮球Y坐标
  const [carryingItem, setCarryingItem] = useState(false); // 玩家是否正在携带物品
  const [isWin, setIsWin] = useState(false);
  const winAudio = new Audio(winSound);
  const [countdown, setCountdown] = useState(5 * 60); // 初始化倒计时为5分钟
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // 用于存储计时器的状态

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleMove = (event: IJoystickUpdateEvent) => {
    //   if (event.x !== null && event.y !== null) {
    //     console.log(`Moving to X: ${event.x}, Y: ${event.y}`);
    // }
    console.log(event);
  };

  const handleStop = () => {
    console.log("我停止了");
  };

  useEffect(() => {
    // 检查篮球是否在红色方块上
    const isItemOnTarget =
      Math.abs(itemX - goalX) <= 40 && Math.abs(itemY - goalY) <= 40;
    // 检查玩家是否在绿色方块上
    const isPlayerOnGreen =
      Math.abs(playerX - targetX) <= 10 && Math.abs(playerY - targetY) <= 10;
    // 如果两个条件都满足，那么游戏获胜
    if (isItemOnTarget && isPlayerOnGreen) {
      setIsWin(true);
      handleShow();
    }
    if (isWin) {
      winAudio.play(); // 当 isWin 变为 true 时，播放音频
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000); // 每秒更新一次倒计时

    if (!showModal && timer === null) {
      // 当菜单被关闭且计时器未启动时，开始倒计时
      const newTimer = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000); // 每秒更新一次倒计时
      setTimer(newTimer);
    } else if (showModal && timer !== null) {
      // 当菜单被打开且计时器已启动时，停止倒计时
      clearInterval(timer);
      setTimer(null);
    }

    return () => clearInterval(timer); // 组件卸载时清除计时器
  }, [itemX, itemY, playerX, playerY, isWin]);

  return (
    <div className="game-container">
      <Header title={translate("tutorial")} />
      <SettingButton />

      <Modal
        show={showModal}
        backdrop="static"
        dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Header>
          <div className="modal_title">Success!</div>
          <Button variant="link" onClick={handleClose} className="btn_close">
            <img src={closeIcon} alt="Close" />
          </Button>
        </Modal.Header>
        <Modal.Body>Congratulations!</Modal.Body>
        <Modal.Footer>
          <Button className="modal_btn" variant="primary">
            Next level
          </Button>
          <Button className="modal_btn" variant="primary" onClick={handleClose}>
            Close
          </Button>
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

      <div className="popup_container">
        <Popup
          trigger={
            <button className="popup_btn" style={{ margin: "30px" }}>
              {" "}
              Rules
            </button>
          }
          position="bottom center"
        >
          <div>{translate("ruleTutorial")}</div>
        </Popup>
      </div>

      <div className="joystick_style">
        <Joystick
          size={100}
          baseColor="white"
          stickColor="black"
          move={handleMove}
          stop={handleStop}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Count down：{Math.floor(countdown / 60)} Min {countdown % 60} Sec
      </div>
    </div>
  );
};

export default TutorialLevel;
