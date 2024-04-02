import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Banner from '../Banner';
=======
import '../style/level0.css';
import mapImage from '../images/map.png';
import waterBottleImage from '../images/watercup.png';

function Item({ name, image, onDrop }) {
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: { name },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                // 如果放置成功，你可能想调用onDrop函数
                // 但是首先需要检查onDrop是否存在并是一个函数
                if (onDrop && typeof onDrop === 'function') {
                    onDrop(item.name, monitor.getDropResult().name);
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} style={{ opacity, border: '1px solid black', padding: '10px', backgroundColor: 'white' }} className="item">
            <img src={image} alt={name} />
        </div>
    );
}

function ItemBox({ items, onDrop, itemsInDestination }) {
    return (
        <div>
            {items.filter(item => !itemsInDestination.includes(item)).map(item => (
                <Item key={item.name} name={item.name} image={item.image} onDrop={onDrop} />
            ))}
        </div>
    );
}

function Destination({ name, onDrop, style }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'item',
        drop: (item) => {
            onDrop(item.name, name);
            return { name };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    let backgroundColor = isOver ? '#4ecca3' : canDrop ? '#3db897' : '#fdd';

    return (
        <div ref={drop} style={{ ...style, backgroundColor, padding: '10px', margin: '10px', borderRadius: '5px' }} className="destination">
            {name}
        </div>
    );
}

function Map({ destinations, onDrop }) {
    const positions = {
        path: { top: '20%', left: '20%', width: '100px', height: '100px' },
        desert: { top: '40%', left: '60%', width: '100px', height: '100px' },
    };

    const calculateCenter = (position, containerSize) => ({
        x: containerSize.width * (parseFloat(position.left) / 100) + parseInt(position.width) / 2,
        y: containerSize.height * (parseFloat(position.top) / 100) + parseInt(position.height) / 2,
    });

    const pathCenter = calculateCenter(positions.path);
    const desertCenter = calculateCenter(positions.desert);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <line x1={`${pathCenter.x}%`} y1={`${pathCenter.y}%`} x2={`${desertCenter.x}%`} y2={`${desertCenter.y}%`}
                    stroke="#ff0000" strokeWidth="4" />
            </svg>
            {destinations.map(destination => (
                <Destination key={destination} name={destination} onDrop={onDrop} style={positions[destination]} />
            ))}
        </div>
    );
}


function Level0() {
    const [heldItem, setHeldItem] = useState(null);
    const [chosenDestination, setChosenDestination] = useState(null);
    const [actionMessage, setActionMessage] = useState('Choose an item and decide where to use it.');
    const [itemsInDestination, setItemsInDestination] = useState([]);

    const handlePickup = (itemName, destinationName) => {
        const isCorrect = (itemName === 'map' && destinationName === 'path') ||
            (itemName === 'water bottle' && destinationName === 'desert');
        if (isCorrect) {
            setItemsInDestination(prevItems => [...prevItems, itemName]);
            setActionMessage(`You correctly used ${itemName} on ${destinationName}.`);
        } else {
            setActionMessage(`Incorrectly used ${itemName} on ${destinationName}. Try again!`);
        }
        setHeldItem(null);
        setChosenDestination(null);
    };

    const items = [
        { name: 'map', image: mapImage },
        { name: 'water bottle', image: waterBottleImage },
    ];


    return (
        <DndProvider backend={HTML5Backend}>

            <Banner/>
            <div>
                <h1>Tutorial</h1>

            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ width: '20%', padding: '10px', borderRight: '2px solid gray' }}>
                    <h2>Items</h2>
                    <ItemBox items={items} onDrop={handlePickup} itemsInDestination={itemsInDestination} />
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    <h2>Map</h2>
                    <Map destinations={['path', 'desert']} onDrop={handlePickup} />
                    <p>{actionMessage}</p>
                </div>

            </div>
        </DndProvider>
    );
}

export default Level0;