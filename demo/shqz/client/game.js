var Game = {
  tileW: 16,
  tileH: 16,
  width: 400,
  height: 300,
  System: {},
  Map: {}
};

Game.BOOT = function() {};
Game.BOOT.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = '#eee';
    Game.operate = new Game.System.Operate(this.game);
    Game.player = new Game.System.Player(this.game);
    Game.npc = new Game.System.Npc(this.game);
  },
  create: function() {
    this.game.state.start('LOAD');
  }
};
