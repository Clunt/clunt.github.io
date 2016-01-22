Game.System.Npc = function(game) {
  this.game = game;
};

Game.System.Npc.prototype = {
  preload: function() {
    this.game.load.spritesheet('NPC_QiangDao', 'client/data/npc/QiangDao/index.png', 66, 90, 8);
  },
  create: function() {
    var position = {
      x: Game.tileW * 32,
      y: Game.tileH * 40
    };
    Game.npc = this.sprite = this.game.add.sprite(position.x, position.y, 'NPC_QiangDao');
    this.game.physics.p2.enable(this.sprite, true);
    this.sprite.body.fixedRotation = true;
    this.sprite.body.collideWorldBounds = false;
    this.sprite.anchor.setTo(0.5);
    this.sprite.body.setCircle(45);
    // this.sprite.body.clearShapes();
    // this.sprite.body.addRectangle(160, 16, 8, 8);

    this.sprite.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    this.sprite.animations.play('stand')
  }
};