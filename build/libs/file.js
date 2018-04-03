var fs = require('fs');


exports.list = function list(path, ignore) {
  ignore = ignore || {
    directory: [],
    files: []
  };
  function isIgnore(file, isDirectory) {
    var arr = isDirectory ? ignore.directory : ignore.files;
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      var reg = new RegExp(arr[i]);
      if (reg.test(file)) {
        return true;
      }
    }
    return false;
  }
  var arr = [];
  var files = fs.readdirSync(path);
  files.forEach(function(file, index, files) {
    var file_path = path + '/' + file;
    var file_stat = fs.statSync(file_path);
    var isDirectory = file_stat.isDirectory();
    if (isIgnore(file, isDirectory, file_path)) return;
    console.log(file);
    if (isDirectory) {
      arr = arr.concat(list(file_path, ignore));
    } else if (/.*.md$/.test(file)) {
      arr.push({
        name: file,
        path: file_path,
        size: file_stat.size,
        directory: path,
        atime: file_stat.atime.toLocaleString(),
        ctime: file_stat.ctime.toLocaleString(),
        mtime: file_stat.mtime.toLocaleString(),
        birthtime: file_stat.birthtime.toLocaleString()
      });
    }
  });
  return arr;
};

exports.tree = function tree(fileList) {
  fileList = fileList || [];
  var result = {__list: []};
  function setTree(root, arr, index, file) {
    index = index || 0;
    var name = arr[index];
    var length = arr.length;
    if (typeof name === 'undefined' || name === '__list') {
      return console.warn('\33[32m出错了，文件夹/名不支持"__list"\33[0m');
    }
    if (index === length - 1) {
      root.__list.push(file);
    } else if (index < length - 1) {
      if (typeof root[arr[index]] === 'undefined') {
        root[arr[index]] = {__list: []};
      }
      setTree(root[arr[index]], arr, ++index, file);
    }
  }
  fileList.forEach(function(file, index, files) {
    var path = file.path;
    if (path.charAt(0) === '/') {
      path = path.slice(1);
    }
    var path_arr = path.split('/');
    setTree(result, path_arr, 0, file);
  });
  return result;
};

exports.deal = function deal(fileList, root) {
  fileList = fileList || [];
  root = root || '';
  var rootRegStr = '^' + root;
  var rootReg = new RegExp(rootRegStr);
  fileList.forEach(function(file, index, files) {
    file._path = file.path;
    file._directory = file.directory;
    file.path = file.path.replace(rootReg, '');
    file.directory = file.directory.replace(rootReg, '');
  });
  return fileList;
};