var Util = require('./util');


function genRecent(list) {
  list = list || [];
  var recent = '';
  list.forEach(function(item) {
    recent += '\n1. [' + Util.name(item.name) + '](' + Util.link(item._path, config.path) + ') - `' + Util.dateFormat(item.mtime, 'yyyy-MM-dd') + '`';
  });
  return recent;
}

exports.readme = function(recent, option, callback) {
  callback = typeof callback === 'function' ? callback : typeof option === 'function' ? option : function() {};
  option = typeof option === 'object' ? option : {};
  var readme = option.readme || '# Clunt Blog';
  readme += '\n## 最近更新';
  readme += genRecent(recent);
  readme += '\n';
  readme += '\n## 所有文章';
  readme += '\n[查看全部](./content.md)';
  callback(null, readme);
};

function genCatalog(tree, index) {
  index = index || 0;
  var space = (function(index) {
    var result = '';
    for (var i = 0; i < index; i++) {
      result += '    ';
    }
    return result;
  }(index));
  var keys = Object.keys(tree);
  var result = '';
  keys.forEach(function(name) {
    if (name === '__list') return;
    result += '\n' + space + '- ' + name;
    result += genCatalog(tree[name], index + 1);
  });
  tree.__list.forEach(function(file) {
    result += '\n' + space + '- [' + Util.name(file.name) + '](' + Util.link(file._path, config.path) + ')';
  });
  return result;
}

exports.detail = function(tree, option, callback) {
  callback = typeof callback === 'function' ? callback : typeof option === 'function' ? option : function() {};
  var detail = '# 所有文章';
  detail += genCatalog(tree, 0);
  callback(null, detail);
};