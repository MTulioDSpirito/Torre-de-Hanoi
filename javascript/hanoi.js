let towers = [[5,4,3,2,1],[],[]];
let positions = ['p1', 'p2','p3','p4','p5','p0','t1','t2','t3'];
let movements = [];

function render() {
    towers.forEach((tower, towerId) => {
        tower.forEach((disk, position) => {
            let d = document.querySelector('.d' + disk);
            positions.forEach(position => {
                d.classList.remove(position);
            });
            d.classList.add('t' + (towerId + 1));
            d.classList.add('p' + (position + 1));
        });
    });
}

function move(fromTower, toTower) {
    if (!towers[fromTower].length) return;
    let disk = towers[fromTower].pop();
    if (towers[toTower].length) {
        if (towers[toTower][towers[toTower].length - 1] < disk) {
            towers[fromTower].push(disk);
            return;
        }
    }
    let d = document.querySelector('.d' + disk);
    d.classList.add('p0');
    towers[toTower].push(disk);
    setTimeout(render, 400);
}

function clicktower(n) {
    if (movements.length && movements[0].length === 1) {
        movements[0].push(n);
    } else {
        movements.unshift([n]);
    }
    
}

function move(fromTower, toTower) {
    if (!towers[fromTower].length) return;
    let disk = towers[fromTower].pop();
    if (towers[toTower].length) {
        if (towers[toTower][towers[toTower].length - 1] < disk) {
            towers[fromTower].push(disk);
            document.getElementById('error-message').innerText = 'Movimento incorreto';
            setTimeout(() => {
                document.getElementById('error-message').innerText = '';
            }, 2000);
            return;
        }
    }
    function clicktower(n) {
        if (movements.length && movements[0].length === 1) {
            movements[0].push(n);
        } else {
            movements.unshift([n]);
        }
    }
    
    let d = document.querySelector('.d' + disk);
    d.classList.add('p0');
    towers[toTower].push(disk);
    setTimeout(render, 300);
}
function resetGame() {
    towers = [[5,4,3,2,1],[],[]];
    movements = [];
    moveCounter = 0; // Zera o contador de movimentos
    document.getElementById('move-counter').innerText = moveCounter; // Atualiza o placar
    render();
}


let moveCounter = 0;
const maxMoves = 65;

function move(fromTower, toTower) {
    if (!towers[fromTower].length) return;
    let disk = towers[fromTower].pop();
    if (towers[toTower].length) {
        if (towers[toTower][towers[toTower].length - 1] < disk) {
            towers[fromTower].push(disk);
            document.getElementById('error-message').innerText = 'Movimento incorreto';
            setTimeout(() => {
                document.getElementById('error-message').innerText = '';
            }, 2000);
            return;
        }
    }
    let d = document.querySelector('.d' + disk);
    d.classList.add('p0');
    towers[toTower].push(disk);
    moveCounter++;
    document.getElementById('move-counter').innerText = moveCounter;
    if (moveCounter >= maxMoves) {
        endGame();
    } else {
        setTimeout(render, 600);
    }
}

function endGame() {
    // Implemente esta função para terminar o jogo quando o número máximo de movimentos for atingido
}

function simulateGame() {
    // Reseta o jogo
    resetGame();

    // Executa a simulação
    executeSimulation(0, 2, towers[0].length);
}

function executeSimulation(fromTower, toTower, diskCount) {
    if (diskCount > 0) {
        let otherTower = 3 - fromTower - toTower;
        executeSimulation(fromTower, otherTower, diskCount - 1);
        setTimeout(() => {
            move(fromTower, toTower);
            executeSimulation(otherTower, toTower, diskCount - 1);
        }, diskCount * 2000);
    }
}






setInterval(() => {
    if (movements.length && movements[movements.length - 1].length === 2) {
        let m = movements.pop();
        move(m[0], m[1]);
    }
}, 500);

render();
