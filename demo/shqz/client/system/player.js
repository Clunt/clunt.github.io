Game.System.Player = function(game) {
  this.game = game;
  this.sprite = null;
  this.name = 'Clunt';
  this.direction = 'd';
  this.speed = 2.2;
  this.coordinate = {
    x: 40,
    y: 40
  };
  this.position = {
    x: 40 * Game.tileW,
    y: 40 * Game.tileH
  };
  this.path = [];
};

Game.System.Player.prototype = {
  preload: function() {
    this.game.load.spritesheet('PLAYER_JK', 'client/data/player/jk/stand.png', 170, 113, 64);
    this.game.load.spritesheet('PLAYER_JK_Run', 'client/data/player/jk/run.png', 170, 113, 64);
  },
  create: function() {
    var position = {
      x: Game.tileW * this.coordinate.x,
      y: Game.tileH * this.coordinate.y
    };
    // this.sprite = this.game.add.sprite(position.x, position.y, 'PLAYER_JK');
    this.sprite = this.game.add.sprite(position.x, position.y, 'PLAYER_JK_Run');
    this.game.physics.p2.enable(this.sprite, true);
    this.sprite.body.fixedRotation = true;
    this.sprite.body.collideWorldBounds = false;
    this.sprite.anchor.setTo(0.44, 0.75);
    this.sprite.body.clearShapes();
    this.sprite.body.addRectangle(16, 16, 8, 8);
    this.game.camera.follow(this.sprite);

    this.sprite.animations.add('d', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    this.sprite.animations.add('l', [8, 9, 10, 11, 12, 13, 14, 15], 8, true);
    this.sprite.animations.add('r', [16, 17, 18, 19, 20, 21, 22, 23], 8, true);
    this.sprite.animations.add('u', [24, 25, 26, 27, 28, 29, 30, 31], 8, true);
    this.sprite.animations.add('dl', [32, 33, 34, 35, 36, 37, 38, 39], 8, true);
    this.sprite.animations.add('dr', [40, 41, 42, 43, 44, 45, 46, 47], 8, true);
    this.sprite.animations.add('ul', [48, 49, 50, 51, 52, 53, 54, 55], 8, true);
    this.sprite.animations.add('ur', [56, 57, 58, 59, 60, 61, 62, 63], 8, true);

    this.sprite.animations.play('d')
  },
  move: function(tile) {
    var distance = {
      x: Math.abs(tile.x * Game.tileW - this.position.x),
      y: Math.abs(tile.y * Game.tileH - this.position.y)
    };
    if (!distance.x && !distance.y) {
      return;
    }
    var direction = {
      x: tile.x * Game.tileW < this.position.x ? -1 : 1,
      y: tile.y * Game.tileH < this.position.y ? -1 : 1
    };


    this.path = [];
    for (var i = 0, l = Math.max(distance.x, distance.y) / this.speed + 1; i < l; i++) {
      this.path.unshift({
        x: (i * this.speed) > distance.x ? tile.x * Game.tileW : (this.position.x + direction.x * (i * this.speed)),
        y: (i * this.speed) > distance.y ? tile.y * Game.tileH : (this.position.y + direction.y * (i * this.speed))
      });
    }
  },
  update: function() {
    this.sprite.body.setZeroVelocity();
    if (this.path.length > 0) {
      var path = this.path.pop();
      var direction = {
        x: path.x > this.position.x ? 'r' : path.x < this.position.x ? 'l' : '',
        y: path.y > this.position.y ? 'd' : path.y < this.position.y ? 'u' : ''
      };
      this.sprite.body.x = this.position.x = path.x;
      this.sprite.body.y = this.position.y = path.y;
      this.coordinate.x = Math.round(path.x / Game.tileW);
      this.coordinate.y = Math.round(path.y / Game.tileH);
      this.sprite.animations.play(direction.y + direction.x);
    } else {
      this.sprite.animations.stop()
    }
  }
};