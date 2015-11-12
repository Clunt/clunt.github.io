function genRecent(recent) {
}

exports.readme = function(recent, callback) {
  var readme = '# Clunt Blog';
  readme += '## 最近更新';
  readme += genRecent(recent);
  callback(null, readme);
};


exports.detail = function(tree, callback) {
  var detail = '# 所有文章';
  detail += genCatalog(tree, 0);
  callback(null, detail);
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
  tree.__list.forEach(function(name) {
    result += '\n' + space + '1. [' + name + '](url)';
  });
  return result;
}