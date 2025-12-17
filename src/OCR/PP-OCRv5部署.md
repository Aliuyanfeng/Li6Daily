---
date: 2025-11-24 15:52:17
title: PP-OCRv5部署
permalink: /pages/b63a9d
top: true
categories:
  - OCR
---

# aarch64架构 PP-OCRv5离线部署 

## PP-OCRv5部署
### 服务化部署  
通过将推理功能封装为服务，客户端可以通过网络请求来访问这些服务，以获取推理结果。  
制作镜像，容器服务化运行,参照本地python运行方式，将离线python依赖打入镜像，采用离线模型，离线字体运行，额外需要OpenCV依赖，因为PaddleOCR涉及到图像的处理，  
``` dockerfile
FROM docker.1ms.run/library/python:3.11.14-bookworm
# 设置时区为上海
ENV TZ=Asia/Shanghai
# 设置工作目录
WORKDIR /home/antiy/paddlex
# 复制requirements.txt
COPY requirements.txt .
# 复制离线包
COPY aarch64_offline_pkgs ./aarch64_offline_pkgs
# 复制OCR.yaml配置文件
COPY OCR.yaml .
# 复制模型文件
COPY PPModel ./PPModel
# 复制字体文件
COPY fonts ./fonts
# 使用 sed 命令替换默认的软件源为阿里云镜像源
RUN sed -i 's@deb.debian.org@mirrors.aliyun.com@g' /etc/apt/sources.list.d/debian.sources 
# 使用 sed 命令注释掉 docker-clean 配置文件中的 APT 和 DPkg 清理命令
RUN sed -i -e 's/^APT/# APT/' -e 's/^DPkg/# DPkg/' /etc/apt/apt.conf.d/docker-clean
# 安装libgl1  OpenCV 运行依赖
RUN apt-get update && apt-get install -y --no-install-recommends libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*
# 设置环境变量，关闭pip缓存
ENV PIP_NO_CACHE_DIR=off
# 下载依赖包到离线目录（仅在需要更新离线包时使用）
# RUN pip download --retries=5 --timeout=120 -r requirements.txt -d /aarch64_offline_pkgs -i https://pypi.tuna.tsinghua.edu.cn/simple --progress-bar off
# 采用离线包安装依赖
RUN pip3.11 install --no-index --find-links=./aarch64_offline_pkgs -r requirements.txt
# 设置字体环境变量
ENV PADDLE_PDX_LOCAL_FONT_FILE_PATH=/home/antiy/paddlex/fonts/simfang.ttf
# 设置缓存目录
ENV PADDLE_PDX_CACHE_HOME=/home/antiy/paddlex
# 暴露端口并运行PaddleX服务
EXPOSE 9997
CMD ["paddlex", "--serve", "--pipeline", "./OCR.yaml", "--host", "0.0.0.0", "--port", "9997"]

```

制作完成后可以按需到其他机器运行，命令参考：   
```shell
docker run -itd --privileged=true --restart=always --name paddlex --shm-size=8g --network=host paddlex:3.3.9 paddlex --serve --pipeline ./OCR.yaml --port 9997
```
### 端侧部署  
主要是Android端部署
### 高性能推理
PaddleX 通过高性能推理插件在生产环境中提升模型推理速度。插件支持多后端并能自动配置，让使用者无需处理复杂底层细节即可获得更快的响应性能。它不仅能加速完整产线，也可用于独立模块的推理加速。

![alt text](assets/PP-OCRv5部署/image.png)