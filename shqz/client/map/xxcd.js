Game.Map.XXCD = function() {};
Game.Map.XXCD.prototype = {
  preload: function() {
    this.game.load.tilemap('MAP_XXCD', 'client/data/map/xxcd/xxcd.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('MAP_XXCD', 'client/data/map/xxcd/xxcd.jpg');
    this.game.load.image('MAP_XXCD_M', 'client/data/map/xxcd/xxcdm.png');
    this.game.load.image('MAP_COLLISION', 'client/data/map/collision.png');
  },
  create: function() {
    this.game.add.tileSprite(0, 0, 1408, 1024, 'MAP_XXCD');
    this.game.custom.map = this.map = game.add.tilemap('MAP_XXCD');
    this.map.addTilesetImage('MAP_COLLISION');
    this.map.collision = this.map.createLayer('Collision');
    this.map.collision.visible = false;
    this.map.setCollision(1);
    this.map.collision.resizeWorld();
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.convertTilemap(this.map, this.map.collision);
    this.game.physics.p2.restitution = 0;
    this.game.world.setBounds(0, 0, 1408, 1024);
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
    Game.Map.create(this.game);
    this.game.add.tileSprite(0, 0, 1408, 1024, 'MAP_XXCD_M');
  },
  update: function() {
    Game.player.update();
  },
  render: function() {
    game.debug.cameraInfo(game.camera, 10, 20);
    game.debug.spriteCoords(Game.player.sprite, 10, Game.height - 45);
    game.debug.body(Game.player.sprite);
  }
};