export default {
    "/Linux/": [
      {
        text: "Linux相关",
        items: [
          {
            text: "计算机网络",
            collapsed: true,
            items: [
              {
                text: "TCP/IP",
                link: "/Linux/计算机网络/TCP-IP",
              },
              {
                text: "网卡配置",
                link: "/Linux/计算机网络/网卡配置",
              },
            ],
          },
          { text: "操作系统", link: "/Linux/操作系统" },
          { text: "常用命令", link: "/Linux/基础知识" },
          { text: "htop命令详解", link: "/Linux/htop" },
          {
            text: "性能优化实战",
            collapsed: true,
            items: [
              {
                text: "优化路线",
                link: "/Linux/性能优化实战/优化路线",
              },
              {
                text: "CPU性能",
                link: "/Linux/性能优化实战/CPU性能",
              },
              {
                text: "内存性能",
                link: "/Linux/性能优化实战/内存性能",
              },
              {
                text: "网络性能",
                link: "/Linux/性能优化实战/网络性能",
              },
              {
                text: "综合实战",
                link: "/Linux/性能优化实战/综合实战",
              },
            ],
          },
        ],
      },
    ],
    "/Golang/": [
      {
        text: "安装环境",
        link: "/Golang/基础环境.md"
      },
      {
        text: "Package管理",
        link: "/Golang/Package管理.md"
      },
      {
        text: "性能分析pprof",
        link: "/Golang/pprof.md"
      },
      {
        text: "内存管理",
        link: "/Golang/内存管理.md"
      },
      {
        text: "缓存命中分析pcstat",
        link: "/Golang/pcstat.md"
      },
    ],
    "/Python/": [
      {
        text: "psycopg2",
        link: "/Python/psycopg2.md"
      },
      {
        text: "wkhtmltopdf进行PDF的生成",
        link: "/Python/htmltopdf.md"
      },
    ],
    "/Protocol": [
      {
        text: "文件传输协议",
        collapsed: true,
        items: [
          {
            text: "FTP",
            link: "/Linux/Protocol/文件传输协议/ftp.md",
          },
          {
            text: "SFTP",
            link: "/Linux/Protocol/文件传输协议/sftp.md",
          },
          {
            text: "S3",
            link: "/Linux/Protocol/文件传输协议/s3.md",
          },
          {
            text: "SMB",
            link: "/Linux/Protocol/文件传输协议/smb.md",
          },
        ],
      },
    ],
    "/Other/": [
      {
        text: "Supervisor",
        link: "/Other/Supervisor.md"
      },
      {
        text: "PostgreSQL",
        link: "/Other/PostgreSQL.md"
      },
      {
        text: "SQL病毒注入与清除",
        link: "/Other/SQL病毒注入与清除.md"
      },
      {
        text: "bcc-tools安装",
        link: "/Other/bcc-tools安装.md"
      },
      {
        text: "nload安装",
        link: "/Other/nload安装.md"
      },
      {
        text: "网卡速率脚本",
        link: "/Other/speed.md"
      },
            {
        text: "ffmpeg离线安装",
        link: "/Other/ffmpeg离线安装.md"
      }
    ]
  }