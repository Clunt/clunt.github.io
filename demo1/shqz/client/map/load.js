Game.Map.LOAD = function() {};
Game.Map.LOAD.prototype = {
  preload: function() {
    Game.player.preload();
    Game.npc.preload();
  },
  create: function() {
    this.game.state.start('XXCD');
  }
};

/**
 * Map Name
 * XXC - 星秀村
 * YTF - 应天府
 * YGX - 阳谷县
 * CJZ - 柴家庄
 * BJC - 汴京城
 * CZ - 沧州
 * QHX - 清河县
 * WTS - 五台山
 * MDSL - 芒砀山麓
 * HNG - 黄泥岗
 * XXCD - 星秀村东
 * YTXJ - 应天西郊
 * YTDJ - 应天东郊
 * YTFX - 应天府西
 * YTFD - 应天府东
 * JYG - 景阳岗
 * JYGD - 景阳岗东
 * JYSL - 景阳松林
 * QHSX - 清河湿地
 * YGXN - 阳谷县南
 * CZD - 沧州道
 * YZL - 野猪林
 * WZCW - 渭州城外
 * LZXJ - 林中小居
 * BJDJ - 汴京东郊
 * BJNJ - 汴京南郊
 * QFS - 清风山
 * KHL - 快活林
 * SZP - 十字坡
 * LS - 梁山
 * WTSX - 五台山下
 * DYSD - 大禹水道
 * HTF - 虎头峰
 * LSSD - 梁山水道
 * SHSL - 少华山麓
 * ELSL - 二龙山麓
 * ELS - 二龙山
 * PL - 蓬莱
 * LJJY - 辽军军营
 * SLZC - 宋辽战场
 */