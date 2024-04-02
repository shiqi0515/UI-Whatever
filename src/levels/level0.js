import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Banner from '../Banner';

function Level0() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Banner/>
            <div>
                <h1>Tutorial</h1>
            </div>
        </DndProvider>
    );
}

export default Level0;