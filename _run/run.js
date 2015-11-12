var fs = require('fs');
var Config = require('./config')
var Util = require('./libs/util');
var File = require('./libs/file');
var Markdown = require('./libs/markdown');


global.config = {
  path: Config.path,
  source: Config.source || 'blog',
  ignore: {
    directory: Config.ignore.directory || [],
    files: Config.ignore.files || []
  }
};

if (typeof config.path === 'undefined') {
  return console.log('\33[31m出错了！配置文件config.json未指定\'path\'属性，请配置正确后再试。\33[0m');
}

try {
  process.chdir(config.path);
} catch(e) {
  return console.log('\33[31m出错了！目录不存在。\33[0m');
}

var _fileList = File.list(config.path, config.ignore);
var fileList = File.deal(_fileList, config.path);

var fileTree = File.tree(fileList);
var fileRecent = Util.recent(fileList, 10);


try {
  var readme = fs.readFileSync('_run/README.md', 'utf8');
} catch(e) {}

Markdown.readme(fileRecent, {readme: readme}, function(err, readme) {
  if (err) throw err;
  fs.writeFile('README.md', readme, function (err) {
    if (err) throw err;
    console.log('\33[32m[Saved]\33[0m README.md');
  });
});

Markdown.detail(fileTree, function(err, detail) {
  if (err) throw err;
  fs.writeFile('content.md', detail, function (err) {
    if (err) throw err;
    console.log('\33[32m[Saved]\33[0m content.md');
  });
});