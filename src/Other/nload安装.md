# nload安装

nload 是一个实时监控网络流量和带宽使用情况的命令行工具。
## 离线安装

nload依赖 ncurses

```shell
wget http://ftp.gnu.org/pub/gnu/ncurses/ncurses-6.3.tar.gz
tar zxf ncurses-6.3.tar.gz
./cofigure
make
sudo make install

```

下载nload源码包编译安装
```shell

wget http://www.roland-riegel.de/nload/nload-0.7.4.tar.gz
tar zxf nload-0.7.4.tar.gz
./configure
make
sudo make install
```

如果`./configure` 提示报错 `can not guess build target` , 需要手工指定架构版本，这里是国产arm架构 
改为`./configure --build=arm-linux`