# Git SVN
## Setup
```shell
$ mkdir root/
$ cd root/
# 初始化
$ git svn init svn://123.57.69.21/huizhaofang/1/pc/
# 拉取代码
$ git svn fetch
$ git reset --hard git-svn
$ alias gsvnupdate='git svn fetch && git rebase git-svn && git checkout git-svn && git merge master && git svn dcommit && git checkout master && git rebase git-svn'

# git svn fetch
# git rebase git-svn
# git checkout git-svn
# git merge master
# git svn dcommit
# git checkout master
# git rebase git-svn'
```


## More
```shell
$ git svn fetch 拉取svn更新
$ git rebase git-svn rebase代码到最新的svn
$ git merge $branch 合并分支上的修改
$ git blame $filename  查看文件修改日志, 详细到每行
$ git show $commitid 查看单次修改内容
$ git grep $keyword 搜索代码中包含关键字
$ git log 查看修改日志(不需要和服务器通信)
$ git commit --amend 重新修改commitlog
$ git bisect 用于bisect
```
