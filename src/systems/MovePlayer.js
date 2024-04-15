export function MovePlayer(entities, { events }) {
    const { player } = entities;

    events.forEach(e => {
        if (e.type === 'move') {
            switch (e.payload) {
                case 'ArrowRight':
                    player.x += 10;
                    break;
                case 'ArrowLeft':
                    player.x -= 10;
                    break;
                case 'ArrowUp':
                    player.y -= 10;
                    break;
                case 'ArrowDown':
                    player.y += 10;
                    break;
                default:
                    break;
            }
        }
    });

    return entities;
}