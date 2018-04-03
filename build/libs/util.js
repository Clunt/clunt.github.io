exports.recent = function(filelist, num) {
  num = num || 0;
  filelist.sort(function(prev, next) {
    var mtime_prev = +new Date(prev.mtime);
    var mtime_next = +new Date(next.mtime);
    return mtime_prev < mtime_next;
  });
  filelist = filelist.slice(0, num);
  return filelist;
};

exports.name = function(name) {
  name = name || '';
  var index = name.lastIndexOf('.');
  name = name.slice(0, index);
  return name;
};

exports.link = function(path, root) {
  path = path || '';
  root = root || '';
  var rootReg = new RegExp('^' + root);
  var link = path.replace(rootReg, '') || '';
  var linkArr = link.split('/');
  for (var i = 0; i < linkArr.length; i++) {
    linkArr[i] = encodeURIComponent(linkArr[i]);
  }
  link = linkArr.join('/');
  return link;
};

exports.dateFormat = function(date, format) {
  var date = typeof date === 'number' ? new Date(date * 1000) : new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S" : date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};