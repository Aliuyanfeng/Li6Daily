# Supervisor
## 在线安装
1. 执行安装命令  
`yum -y install supervisor `  
或者  
`apt-get install supervisor  `
2. 校验安装成功  
`supervisorctl -h`
3. 修改配置  
配置存放位置 `/etc/supervisord.conf`，内容大致如下：
``` shell
# 修改配置  
/etc/supervisord.conf

# 读取配置文件存放的目录
[include]
files = supervisord.d/*.ini

# 开放web访问端口
[inet_http_server]
port=*:9001
username=admin
password=123456
```

4. 在目标服务器上启动supervisor  
   - 添加服务托管给系统配置文件
```shell
[Unit]
Description=Supervisor process control system for UNIX
Documentation=http://supervisord.org
After=network.target

[Service]
ExecStart=/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
ExecStop=/usr/bin/supervisorctl $OPTIONS shutdown
ExecReload=/usr/bin/supervisorctl -c /etc/supervisor/supervisord.conf $OPTIONS reload
KillMode=process
Restart=on-failure
RestartSec=50s

[Install]
WantedBy=multi-user.target
```
   - 启动并配置自启动  
`systemctl start supervisord`  
`systemctl enable supervisord`  
   - 离线安装  
后续整理 
[离线方式安装supervisor](https://blog.csdn.net/qq_31851107/article/details/126238826)

## 常用命令
``` shell
# 停止进程nonroad
supervisorctl stop nonroad
 
# 启动进程nonroad
supervisorctl start nonroad
 
# 查看所有进程状态
supervisorctl status
 
# 重启进程nonroad
supervisorctl restart nonroad
 
# 清理进程nonroad日志
supervisorctl clear nonroad
 
# 加载修改过的应用配置文件，并且会重启应用
systemctl update
 
# 关闭supervisord
supervisorctl shutdown 
 
# 关闭所有进程
supervisorctl stop all

# 启动所有进程
supervisorctl start all
 
# 输出program最新日志(默认stdout，Ctrl+C退出)
supervisorctl tail [-f] <name> [stdout|stderr] (default stdout)

# 有新的配置加入 更新新的配置
supervisorctl reread
supervisorctl update

# 重新启动配置中的所有程序
supervisorctl reload
```
## 卸载
``` shell
## easy install -m supervisor

which supervisorctl
## 以下操作视情况而定
rm /usr/local/bin/echo_supervisord_conf

rm /usr/local/bin/pidproxy

rm /usr/local/bin/supervisor*

rm -r /etc/supervisor*
```

## 问题
1. unix:///var/run/supervisor.sock no such file
`supervisord -c /etc/supervisord.conf `


## 引用
[参考资料](https://blog.csdn.net/bland107/article/details/133343814)
