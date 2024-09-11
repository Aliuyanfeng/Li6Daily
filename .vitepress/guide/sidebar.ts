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
          { text: "常用命令", link: "/guide/two" },
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