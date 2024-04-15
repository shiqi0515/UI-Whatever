import React from 'react';

export function Player(x, y) {
    return {
        x: x,
        y: y,
        renderer: <div style={{ position: 'absolute', width: 50, height: 50, backgroundColor: 'red', left: x, top: y }} />
    };
}