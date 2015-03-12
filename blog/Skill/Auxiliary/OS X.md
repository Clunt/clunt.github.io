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
### 安装
`brew install mysql`

*[Install MySQL For .dmg](http://www.2cto.com/database/201409/332022.html)*

### 配置
- `mkdir -p ~/Library/LaunchAgents/`
  `cp /usr/local/Cellar/mysql/5.6.13/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/`
  `launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist`
  设置开机自启动

### 卸载
首先可以在System Preferences中的Other里MySQL设置，停止其服务，然后参照以下手工删除命令行。

```
apple$ sudo rm /usr/local/mysql
apple$ sudo rm -rf /usr/local/mysql*
apple$ sudo rm -rf /Library/StartupItems/MySQLCOM
apple$ sudo rm -rf /Library/PreferencePanes/My*
apple$ sudo rm -rf /Library/Receipts/mysql*
apple$ sudo rm -rf /Library/Receipts/MySQL*
apple$ sudo rm -rf /var/db/receipts/com.mysql.*
编辑/etc/hostconfig，删除其中的MYSQLCOM=-YES-这行
```

## Nginx
### 安装
`brew install nginx` 安装nginx，其他nginx版本，可以`brew edit nginx`，修改nginx的安装信息包formula，默认会用 vi 打开，在文件开头处修改 nginx 相应版本的下载地址

### 配置
- `sudo nginx`
  打开nginx
- `nginx -s reload|reopen|stop|quit`
  重新加载|重启|停止|退出 nginx
- `vim /usr/local/etc/nginx/nginx.conf`
  修改端口(nginx默认的访问端口为8080)
- `/usr/local/Cellar/nginx/version/`
  默认的文件访问目录，`version`为nginx的版本号
- `mkdir -p ~/Library/LaunchAgents/`
  `cp /usr/local/Cellar/nginx/1.4.2/homebrew.mxcl.nginx.plist ~/Library/LaunchAgents/`
  `launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist`
  设置nginx为开机启动
- `sudo chown root:wheel /usr/local/Cellar/nginx/1.4.2/bin/nginx`
  `sudo chmod u+s /usr/local/Cellar/nginx/1.4.2/bin/nginx`
  给予nginx管理员权限(普通用户登陆时，nginx监听1024以下的端口无法开机自启)


## SFTP
> 举例：
> 远程主机IP：8.8.8.8 or www.8888.com
> 用户名：root

命令行：`sftp root@8.8.8.8 or root@www.8888.com`
回车进入提示符 `sftp>`

- `sftp> get /var/www/sftp.md /home/root/`
  从远程主机的`/var/www/`目录下将`sftp.md`下载到本地`/home/root/`目录下

- `sftp> put /home/root/sftp.pdf /var/www/`
  把本地`/home/root/s`目录下的`sftp.pdf`文件上传至远程主机`/var/www/`目录下

- `sftp> get -r /var/www/* /home/root/`
  从远程主机的`/var/www/`文件夹（*目录内所有文件*）下载到本地`/home/root/`目录下

- `sftp> put -r /home/root/* /var/www/`
  把本地`/home/root/`文件夹（*目录内所有文件*）上传至远程主机`/var/www/`目录下

- `sftp> get -r /var/www/ /home/root/`
  从远程主机的`/var/www/`文件夹下载到本地`/home/root/`目录下
  --> `/home/root/www/`

- `sftp> put -r /home/root/ /var/www/`
  把本地`/home/root/`文件夹上传至远程主机`/var/www/`目录下
  --> `/var/www/root`


### 查询命令
> 远程主机`基本命令`，本机`l + 基本命令`
  eg. 远程主机的当前路径：`pwd`，本机当前路径：`lpwd`


可使用的命令：

- `cd`
- `ls`
- `rm`
- `rmdir`
- `mkdir`

**离开**sftp，用`exit` or `quit` or `bye`均可

### 更多
`man sftp`

`find . -type f | xargs dos2unix` 转换文件夹内所有文件换行符为Unix(LF)


