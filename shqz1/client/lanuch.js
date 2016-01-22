var game = new Phaser.Game(Game.width, Game.height, Phaser.CANVAS, 'shqz');

game.custom = Game;
game.state.add('BOOT', Game.BOOT);
game.state.add('LOAD', Game.Map.LOAD);
game.state.add('XXC', Game.Map.XXC);
game.state.add('XXCD', Game.Map.XXCD);

game.state.start('BOOT');