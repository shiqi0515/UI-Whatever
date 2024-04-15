import React from 'react';
import { GameEngine } from 'react-game-engine';
import { MovePlayer } from '../systems/MovePlayer';
import { Player } from '../entities/Player';

export default function Game() {
    const gameEngineRef = React.useRef(null);
    const initialEntities = {
        player: Player(100, 100) // 初始位置
    };

    return (
        <GameEngine
            ref={gameEngineRef}
            style={{ width: 800, height: 600, backgroundColor: 'skyblue' }}
            systems={[MovePlayer]}
            entities={initialEntities}
            onEvent={(e) => {
                if (e.type === 'keydown') {
                    gameEngineRef.current.dispatch({ type: 'move', payload: e.key });
                }
            }}>
        </GameEngine>
    );
}
