# 离线安装FFMPEG


## 1. 官网下载源代码
[点击前往ffmpeg官网](https://ffmpeg.org/download.html)
## 2. 解压源代码
```shell
xz -d ffmpeg-7.1.tar.xz
tar -xf ffmpeg-7.1.tar
```
## 3. 编译
```shell
cd ffmpeg-7.1/ 
./configure --enable-shared --prefix=/usr/local/ffmpeg
```
**--enable-shared：** 这个选项告诉配置脚本生成动态链接库（在Linux系统中通常是.so文件）。动态链接库可以在运行时被程序加载，而不是在编译时静态链接到程序中。这使得库可以被多个程序共享，而不是每个程序都有一份库的副本。

**--prefix=/usr/local/ffmpeg：** 这个选项指定了安装路径。/usr/local/ffmpeg是FFmpeg安装后的根目录。这意味着FFmpeg的执行文件将会被安装到/usr/local/ffmpeg/bin，库文件会被安装到/usr/local/ffmpeg/lib，头文件会被安装到/usr/local/ffmpeg/include，等等。使用--prefix的好处是可以将软件安装到非系统默认路径，从而避免与系统自带的软件包冲突。

## 4. 安装
```shell
make && make install
```

## 5. 配置环境变量
```shell
export PATH=$PATH:/usr/local/ffmpeg
```

## 5. 注意事项
### 5.1 编译时遇到 yasm 报错修复方法
遇到如下报错
```shell
nasm/yasm not found or too old. Use –disable-x86asm for a crippled build
```

官网下载源码
http://www.tortall.net/projects/yasm/releases/

```shell
tar zxvf yasm-1.3.0.tar.gz
cd yasm-1.3.0
./configure
make
make install
```
### 5.2 安装完后，输入ffmpeg命令报错
遇到如下报错
```shell
ffmpeg: error while loading shared libraries: libavdevice.so.61: cannot open shared object file: No such file or directory
```
通过源码安装软件未进行环境变量配置，找不到启动路径
所以需要添加路径

解决：
```shell
vim /etc/ld.so.conf
```

在文件中添加路径：
`/usr/local/ffmpeg/lib`  
`usr/local/ffmpeg `目录是ffmpeg的安装目录，根据个人不同安装目录修改。  
更新环境变量：`sudo ldconfig`

## 6 相关依赖安装

### 6.1 libmp3lame
$ wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
$ tar -xzf lame-3.99.5.tar.gz
$ cd lame-3.99.5
$ ./configure --enable-static --enable-shared
$ make
$ sudo make install


./configure可能报错 error: cannot guess build type; you must specify one
需要指定参数构建架构
./configure --build=arm-linux


### 6.2 libx264


#下载并安装x264
git clone https://code.videolan.org/videolan/x264.git
cd x264
mkdir build
 
./configure --help
#### 报缺少asm 时 可加入--disable-asm
#### --prefix=/home/llh/ffmpeg/build/ 指定安装目录
./configure --prefix=/root/FFmpeg7/x264/build --enable-shared --enable-static --disable-asm
 
make
 
#### x264将会安装到 ：/root/FFmpeg7/x264/build 目录下
make install