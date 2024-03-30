import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Level0() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <h1>Tutorial</h1>
            </div>
        </DndProvider>
    );
}

export default Level0;