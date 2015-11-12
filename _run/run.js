var fs = require('fs');
var Config = require('./config')
var Util = require('./libs/util');
var File = require('./libs/file');
var Markdown = require('./libs/markdown');

try {
  process.chdir('../blog');
} catch(e) {}

var config = {
  path: Config.path || process.cwd(),
  ignore: {
    directory: Config.ignore.directory || [],
    files: Config.ignore.files || []
  }
};

var _fileList = File.list(config.path, config.ignore);
var fileList = File.deal(_fileList, config.path);

var fileTree = File.tree(fileList);
var fileRecent = Util.recent(fileList, 10);


process.chdir('..');

Markdown.readme(fileRecent, function(err, readme) {
  if (err) throw err;
  fs.writeFile('content.md', readme, function (err) {
    if (err) throw err;
    console.log('\33[32m[Saved]\33[0m content.md');
  });
});

Markdown.detail(fileTree, function(err, detail) {
  if (err) throw err;
  fs.writeFile('README.md', detail, function (err) {
    if (err) throw err;
    console.log('\33[32m[Saved]\33[0m README.md');
  });
});