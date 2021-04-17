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

  /**
   * Двигает игрока по переданному направлению.
   * @param {{x: int, y: int}} nextPoint Следующая точка пользователя.
   */
  move(nextPoint) {
    this.init(nextPoint.x, nextPoint.y);
  },

  /**
   * Отдает следующую точку в которой будет находиться пользователь после движения.
   * @param {int} direction Направление движения игрока.
   * @returns {{x: int, y: int}} Следующая позиция игрока.
   */
  getNextPosition(direction) {
    const nextPosition = {
      x: player.x,
      y: player.y,
    };

    switch (direction) {
      case 8:
        nextPosition.y--;
        break;
      case 9:
        nextPosition.y--;
        nextPosition.x++;
        break;
      case 7:
        nextPosition.y--;
        nextPosition.x--;
        break;
      case 2:
        nextPosition.y++;
        break;
      case 3:
        nextPosition.y++;
        nextPosition.x++;
        break;
      case 1:
        nextPosition.y++;
        nextPosition.x--;
        break;
      case 4:
        nextPosition.x--;
        break;
      case 6:
        nextPosition.x++;
        break;
    }

    return nextPosition;
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

      const nextPoint = this.player.getNextPosition(direction);

      if (this.canPlayerMakeStep(nextPoint)) {
        this.player.move(nextPoint);
      }
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

  /**
   * Проверяет может ли пользователь перейти на точку.
   * @param {{x: int, y: int}} nextPoint Точка, которую проверяем.
   * @returns {boolean} true если пользователь может перейти в направлении, false если нет.
   */
  canPlayerMakeStep(nextPoint) {
    return (
      nextPoint.x >= 0 &&
      nextPoint.x < settings.colsCount &&
      nextPoint.y >= 0 &&
      nextPoint.y < settings.rowsCount
    );
  },
};

game.run();
