exports.recent = function(filelist, num) {
  num = num || 0;
  filelist.sort(function(prev, next) {
    var mtime_prev = +new Date(prev.mtime);
    var mtime_next = +new Date(next.mtime);
    return mtime_prev < mtime_next;
  });
  filelist = filelist.slice(0, num);
};