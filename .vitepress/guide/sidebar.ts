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
            ],
          },
          { text: "操作系统", link: "/guide/one" },
          { text: "常用命令", link: "/Linux/基础知识" },
          {
            text: "文件传输协议",
            collapsed: true,
            items: [
              {
                text: "FTP",
                link: "/Linux/文件传输协议/ftp",
              },
              {
                text: "SFTP",
                link: "/Linux/文件传输协议/sftp",
              },
              {
                text: "S3",
                link: "/Linux/文件传输协议/s3",
              },
              {
                text: "SMB",
                link: "/Linux/文件传输协议/smb",
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
    ],
    "/Python/": [
      {
        text: "psycopg2",
        link: "/Python/psycopg2.md"
      },
    ],
    "/Other/": [
      {
        text: "Supervisor",
        link: "/Other/Supervisor.md"
      }
    ]
  }