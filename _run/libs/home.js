var Util = require('./util');

function genRecent(list) {
  list = list || [];
  var recent = '';
  list.forEach(function(item) {
    recent += '<li><a href="' + Util.link(item._path, config.path) + '">' + Util.name(item.name) + '-' + Util.dateFormat(item.mtime, 'yyyy-MM-dd') + '</a></li>';
  });
  return recent;
}

exports.index = function(recent, option, callback) {
  callback = typeof callback === 'function' ? callback : typeof option === 'function' ? option : function() {};
  option = typeof option === 'object' ? option : {};
  var index = option.index || '';
  var main = '<h1>最近更新</h1>';
  main += '<ul>';
  main += genRecent(recent);
  main += '</ul>';
  index = index.replace(/\{\{main\}\}/, main)
  callback(null, index);
};