# Git

- [廖雪峰](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013743858312764dca7ad6d0754f76aa562e3789478044000)
- [Pro Git](http://git.oschina.net/progit/)
- [Git教程](http://www.cnblogs.com/zhangjing230/archive/2012/05/09/2489745.html)

## .gitignore
> `.gitignore`是git项目文件的过滤机制，分为全局过滤和单一过滤。

### 配置语法

- `/` 表示目录(根目录 - 项目顶层目录)
- `*` 通配多个字符
- `?` 通配单个字符
- `[]` 包含单个字符的匹配列表
- `!` 表示不忽略(跟踪)匹配到的文件或目录

示例：

- `/*`
  忽略目录fd1下的全部内容(注意，根目录下的`/fd1/`目录和子目录`/child/fd1/`目录，都会被忽略)
- `/fd1/*`
  忽略根目录下的 /fd1/ 目录的全部内容；
- `/*`
  `!.gitignore`
  `!/fw/bin/`
  `!/fw/sf/`
  忽略全部内容，但是不忽略`.gitignore`文件、`/fw/bin/`和`/fw/sf/`目录
