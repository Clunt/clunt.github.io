# Linux命令之man
## 简介
`NAME` - 简短的命令、数据名称说明
`SYNOPSIS` - 简短的命令下达语法(syntax)简介
`DESCRIPTION` - 较为完整的说明，这部分最好仔细看看！
`OPTIONS` - 针对 SYNOPSIS 部分中，有列举的所有可用的选项说明
`COMMANDS` - 当这个程序(软件)在运行的时候，可以在此程序(软件)中下达的命令
`FILES` - 这个程序或数据所使用或参考或连结到的某些文件
`SEE` - ALSO  可以参考的，跟这个命令或数据有相关的其他说明！
`EXAMPLE` - 一些可以参考的范例
`BUGS` - 是否有相关的臭虫！

## 类别
`1` - `用户命令` -  使用者在shell环境中可以操作的命令或可运行文件，可由任何人启动的,如env、cat、man、touch文档
`2` - `系统调用或内核函数` - 系统核心可呼叫的函数与工具等，即由内核提供的函数 如link、sethostname、mkdir
`3` - `库程序` - 一些常用的函数(function)与函式库(library)，大部分为C的函式库(libc)，即库函数 如acosh、asctime、btree、locale
`4` - `与设备有关的信息` -  装置文件的说明，通常在/dev下的文件，如zero null sda
`5` - `文件格式描述` -  配置文件或者是某些文件的格式，如/etc/passwd
`6` - `游戏` -  游戏的帮助文件
`7` - `其他` -  惯例与协议等，例如Linux文件系统、网络协议、ASCII code等
`8` - `系统管理` -  系统管理员可用的管理命令，只能由root启动，如fdisk、fsck、renice、rpm、yum
`9` - `内核` -  跟kernel有关的文件

## SYNOPSIS
> SYNOPSIS的语法格式源自[巴克斯范式](http://baike.baidu.com/link?url=jwmFp2det8fvRDStJe_abUbm8kPKn7YGhCkMliecBEbe_0U1zf2mhkKc0gvF29yP57X3Aft3KbFAEJIlGOKDQq)

- 在BNF中，双引号`""`中的字代表着这些字符本身。而double_quote用来代表双引号，在双引号外的字（有可能有下划线）代表着语法部分。
- `<>`内包含的为必选项；
- `[]`内包含的为可选项；
- `{}`内包含的为可重复0至无数次的项；
- `| `表示在其左右两边任选一项；
- `::=`是“被定义为”的意思；
- `...`代表可重复N次；
- `[...]`选项，最多出现一次；
- `{...}`重复项，任意次数，包括0次；
- `(...)`分组；
- `|`并列选项，只能选一个；
- 斜体字: 参数，在其它地方有解释；

## 中文拓展
[manpages-zh](https://github.com/lidaobing/manpages-zh)

## 参考
1. [巴克斯范式](http://baike.baidu.com/link?url=jwmFp2det8fvRDStJe_abUbm8kPKn7YGhCkMliecBEbe_0U1zf2mhkKc0gvF29yP57X3Aft3KbFAEJIlGOKDQq)
2. [鸟哥的Linux私房菜，第五章、首次登陆与在线求助 man page](http://vbird.dic.ksu.edu.tw/linux_basic/0160startlinux_3.php)