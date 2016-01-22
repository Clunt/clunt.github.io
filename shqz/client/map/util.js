Game.Map.create = function(game) {
  // Create Operate
  Game.operate.create(game);
  // Create Player
  Game.player.create(game);
  // Create Npc
  Game.npc.create(game);
};