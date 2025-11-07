---
date: 2024-11-14 11:41:24
title: speed
permalink: /pages/54f3ac
categories:
  - Other
---
# speed.sh


版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/weixin_45631469/article/details/138317139

脚本来源：https://blog.csdn.net/weixin_45631469/article/details/138317139
```shell
#!/bin/bash
#实时网速监测工具
#作者: ysj
#date：2024/4/28
while [ "1" ]
do

#---------获取全部网卡信息------------------

eth_all=$(cat /proc/net/dev|egrep '^ *e+[a-z0-9]+' -o)
ip_all=''
#---------获取当前接收与发送速率----------------------

for eth in $eth_all
 do
    flow_Receive_old+=$(cat /proc/net/dev | grep "^ *$eth:" | awk '{print $2}')" "    #获取当前所有网卡接收速率
    flow_Transmit_old+=$(cat /proc/net/dev | grep "^ *$eth:" | awk '{print $10}')" "  #获取当前所有网卡发送速率
 done
sleep 1

#----------获取一秒后的接收与发送速率---------------------

for eth in $eth_all
  do
    flow_Receive_new+=$(cat /proc/net/dev | grep "^ *$eth:" | awk '{print $2}')" "        #获取当前所有网卡接收速率
    flow_Transmit_new+=$(cat /proc/net/dev | grep "^ *$eth:" | awk '{print $10}')" "      #获取当前所有网卡发送速率  
    network_status+=$(ip a | grep $eth: | awk -F ' ' '{print $9}')" "                     #获取全部网卡状态
    ip_detect=$(ip a | grep -E "$eth$" | awk -F ' ' '{print $2}' | awk -F '/' '{print $1}') #获取全部ip信息,判断是否为空ip
    if [[ -z "$ip_detect" ]] ;then
         ip_all+='null|'
         ip_detect=''
    else
         ip_all+="$ip_detect|"
         ip_detect=''
    fi
  done
#-----------接收发送速率计算与显示方法------------------------------

flow_formula (){
flow_count=1
for eth in $eth_all
do

#------------计算发送与接收速率，flow_count用来打印对应网卡信息-------
  flow_Receive=$(echo "$(echo $flow_Receive_new | cut -d' ' -f$flow_count) - $(echo $flow_Receive_old | cut -d' ' -f$flow_count)" | bc -l)    #计算当前网卡接收速率
  flow_Transmit=$(echo "$(echo $flow_Transmit_new | cut -d' ' -f$flow_count) - $(echo $flow_Transmit_old | cut -d' ' -f$flow_count)" | bc -l) #计算当前网卡发送速率
  network_now=$(echo $network_status | cut -d' ' -f$flow_count)  #取出当前网卡状态
  ip_now=$(echo $ip_all | cut -d'|' -f$flow_count)               #取出当前网卡ip
  ((flow_count+=1))
#------------接收速率判断，打印对应的单位-------------------
  if [ $flow_Receive -gt 1048576 ];then
    flow+="$eth 接收速率:"$(echo "scale=2; $flow_Receive/1048576" | bc)"MB/s "
  elif [[ $flow_Receive -lt 1024 ]];then
    flow+="$eth 接收速率:"$flow_Receive"B/s "
  else
    flow+="$eth 接收速率:"$(($flow_Receive/1024))"KB/s "
  fi
#------------发送速率判断--------------------
  if [ $flow_Transmit -gt 1048576 ];then
    flow+="发送速率:"$(echo "scale=2; $flow_Transmit/1048576" | bc)"MB/s ""网卡状态:"$network_now" "$ip_now
  elif [ $flow_Transmit -lt 1024 ];then
    flow+="发送速率:"$flow_Transmit"B/s ""网卡状态:"$network_now" "$ip_now
  else
    flow+="发送速率:"$(($flow_Transmit/1024))"KB/s ""网卡状态:"$network_now" "$ip_now
  fi
  flow_eth=$(echo $flow | cut -d' ' -f1)      #取出当前网卡名
  flow_Receive=$(echo $flow | cut -d' ' -f2)  #取出当前网卡接收速度
  flow_Transmit=$(echo $flow | cut -d' ' -f3) #取出当前网卡发送速度
  network_now=$(echo $flow | cut -d' ' -f4)   #取出当前网卡状态
  ip_now=$(echo $flow | cut -d' ' -f5)        #取出当前网卡ip
  printf "${LIGHT_PURPLE}|${LIGHT_GREEN}%-10s ${LIGHT_PURPLE}|${LIGHT_YELLOW}%-16s ${LIGHT_PURPLE}|${LIGHT_CYAN}%-23s ${LIGHT_PURPLE}|${LIGHT_CYAN}%-20s${LIGHT_PURPLE} ${LIGHT_PURPLE}|${LIGHT_CYAN}%-20s${LIGHT_PURPLE}|\n" "$flow_eth" "$ip_now" "$flow_Receive" "$flow_Transmit" "$network_now"  #格式化打印网卡信息
  echo "---------------------------------------------------------------------------------------"
  flow=''
done
}
clear
LIGHT_PURPLE='\033[1;35m'
LIGHT_CYAN='\033[1;36m'
LIGHT_GREEN='\033[1;32m'
LIGHT_RED='\033[0;31m'
LIGHT_YELLOW='\033[33m'
NC='\033[0m' # 恢复默认颜色
# 打印带颜色的文本
printf "\033[1;35m---------------------------------------------------------------------------------------\033[0m\n"
printf "${LIGHT_PURPLE}|%-32s ${LIGHT_CYAN}%-52s${LIGHT_PURPLE}|\n" " " "$(date "+%Y-%m-%d %H:%M:%S")"
echo "---------------------------------------------------------------------------------------"
printf "${LIGHT_PURPLE}|${LIGHT_GREEN}%-14s ${LIGHT_PURPLE}%-1s${LIGHT_YELLOW}%-18s ${LIGHT_PURPLE}%-1s${LIGHT_CYAN}%-23s ${LIGHT_PURPLE}%-1s${LIGHT_CYAN}%-20s${LIGHT_PURPLE} ${LIGHT_PURPLE}%-1s${LIGHT_CYAN}%-20s${LIGHT_PURPLE}|\n" "网卡名称" "|" "网卡IP" "|" "接收速率" "|" "发送速率" "|" "网卡状态"
echo "---------------------------------------------------------------------------------------"
flow_formula;
printf "${NC}"  #清除所有格式化打印

#------------清空数据，重新进入循环获取----------------
flow_Receive_old=''
flow_Receive_new=''
flow_Transmit_old=''
flow_Transmit_new=''
network_status=''
ip_all=''
#sleep 0.55
done
```

