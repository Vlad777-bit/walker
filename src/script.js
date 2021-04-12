'use strict';

const settings = {
  rowsCount: 10,
  colsCount: 10,
  startPositionX: 1,
  startPositionY: 2,
};

const player = {
  x: null,
  y: null,

  init(startX, startY) {
    this.x = startX;
    this.y = startY;
  },

  move(direction) {
    switch (direction) {
      case 8:
        this.y--;
        break;
      case 9:
        this.y--;
        this.x++;
        break;
      case 7:
        this.y--;
        this.x--;
        break;
      case 2:
        this.y++;
        break;
      case 3:
        this.y++;
        this.x++;
        break;
      case 1:
        this.y++;
        this.x--;
        break;
      case 4:
        this.x--;
        break;
      case 6:
        this.x++;
        break;
    }
  },
};

const game = {
  settings,
  player,

  run() {
    this.player.init(
      this.settings.startPositionX,
      this.settings.startPositionY
    );

    while (true) {
      this.render();

      const direction = this.getDirection();

      if (direction === -1) {
        return alert('До свидания');
      }

      this.player.move(direction);
    }
  },

  render() {
    let map = '';

    for (let row = 0; row < this.settings.rowsCount; row++) {
      for (let col = 0; col < this.settings.colsCount; col++) {
        if (this.player.y === row && this.player.x === col) {
          map += 'o ';
        } else {
          map += 'x ';
        }
      }
      map += '\n';
    }
    console.clear();
    console.log(map);
  },

  getDirection() {
    const availableDirections = [-1, 2, 8, 4, 6, 9, 7, 3, 1];

    while (true) {
      const direction = parseInt(
        prompt('Введите число куда вы хотите переместиться, -1 для выхода')
      );
      if (!availableDirections.includes(direction)) {
        alert(
          `Для перемещения необходимо ввести одно из этих чисел: ${availableDirections.join(
            ', '
          )}`
        );
        continue;
      }
      return direction;
    }
  },
};

game.run();
