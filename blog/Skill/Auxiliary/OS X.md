# OS X
> 从Windows平台迁移到OS X后非常的不适应，之前的操作习惯都需要重新适应，否则对于工作效率有着较大的影响。在此记录一下遇到的一些较为重要的适应过程。

## 终端
### 环境配置
> 终端下要经常输入一些较长的重复性的命令行，所以自动补全、自定义设计等功能是必须的。在设置过程中需要了解一些环境配置的内容。

Home(~)下有如下几个文件，在打开终端时会依次加载：

1. /etc/profile
2. 用户每次登录系统，以下文件仅载入按顺序最先存在的一个
    - ~/.bash_profile
    - ~/.bash_login
    - ~/.profile
3. bash shell调用另一个bash shell时读取
    - ~/.bashrc
4. 退出shell时被读取
    - ~/.bash_logout

*`/etc/`下的配置是针对系统,`~/`下的主要是针对用户*

### 快捷键

- `ctrl + a` 光标移到行首
- `ctrl + b` 光标左移一个字母
- `ctrl + c` 杀死当前进程。
- `ctrl + d` 退出当前 Shell。
- `ctrl + e` 光标移到行尾。
- `ctrl + h` 删除光标前一个字符，同 backspace 键相同。
- `ctrl + k` 清除光标后至行尾的内容。
- `ctrl + l` 清屏，相当于clear。
- `ctrl + r` 搜索之前打过的命令。会有一个提示，根据你输入的关键字进行搜索bash的history
- `ctrl + u` 清除光标前至行首间的所有内容。
- `ctrl + w` 移除光标前的一个单词
- `ctrl + t` 交换光标位置前的两个字符
- `ctrl + y` 粘贴或者恢复上次的删除
- `ctrl + d` 删除光标所在字母;注意和backspace以及`ctrl` + `h`的区别，这2个是删除光标前的字符
- `ctrl + f` 光标右移
- `ctrl + z` 把当前进程转到后台运行，使用`fg`命令恢复。比如`top -d1`然后`ctrl + z` ，到后台，然后fg,重新恢复
- `esc + d` 删除光标后的一个词
- `esc + f` 往右跳一个词
- `esc + b` 往左跳一个词
- `esc + t` 交换光标位置前的两个单词

### 自定义快捷键

- [编写 Bash 补全脚本](http://kodango.com/bash-competion-programming)

## Mysql

- [mac_MySQL安装](http://www.2cto.com/database/201409/332022.html)