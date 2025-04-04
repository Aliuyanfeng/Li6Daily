# SQL病毒注入与清除
## SQL注入 
SQL注入是一种常见的网络攻击技术，攻击者通过在Web应用程序的输入字段中注入恶意构造的SQL代码，以欺骗后端数据库执行非预期的SQL命令。这种攻击可以导致数据泄露、权限提升、数据篡改甚至系统瘫痪。
### 注入类型
以下为SQL注入的类型：

数字型注入

攻击者在输入参数中注入数字值，利用这些值来改变原始的SQL查询逻辑。例如，通过在查询参数中添加额外的条件，可以绕过验证逻辑，实现非法的数据访问或操作。

字符串注入

攻击者在输入参数中注入字符串，这些字符串可能包含特殊字符，如单引号、双引号等，用以关闭或修改SQL语句的结构，从而执行攻击者期望的命令。

联合查询注入（UNION注入）

攻击者通过注入UNION语句，将自己构造的SELECT查询与原始查询的结果合并，从而获取额外的数据库信息。这种类型的注入通常需要攻击者猜测或探测原始查询的列数和类型。

布尔盲注

在无法直接观察到数据库返回结果的情况下，攻击者通过构造SQL语句，利用数据库的TRUE或FALSE响应来判断查询条件是否成立，从而间接获取数据库信息。

时间盲注

类似于布尔盲注，攻击者通过构造SQL语句引起数据库的延迟响应，根据响应时间的差异来推断数据库信息。这种方法适用于应用程序不显示数据库错误或直接响应的情况。

堆叠注入

攻击者在一个查询中执行多条SQL语句，通常通过在SQL语句末尾添加分号来分隔多个语句。这种注入方法可以用来执行如删除表、关闭数据库等恶意操作。

解决：
- 输入验证：严格验证所有输入数据的合法性，过滤掉非法字符。
- 使用预编译语句：采用预编译语句和参数化查询，避免将用户输入直接拼接到SQL语句中。
- 限制数据库权限：最小化应用程序的数据库权限，避免使用高权限账号进行查询操作。
- 安全编码规范：遵循安全编码规范，定期进行代码审查和安全测试。
- 使用安全框架：利用安全框架（如ORM）简化数据库操作，同时增加安全性。

## RushQL勒索病毒
专门针对数据库设计、并且具备一定潜伏期和隐蔽性，危害极大，该病毒最早被发现是捆绑在被感染的绿色版/破解版PS/SQL安装程序上，一旦用户使用此类破解版软件连接到数据库，会立即执行“Afterconnet.sql”中的代码（此文件一般在官方PL/SQL软件中是一个空文件），在数据库中创建多个存储过程和触发器。RushQL感染后并不会立即造成数据损坏，具备一定时间的潜伏期，它会首先判断数据库创建时间是否大于1200天（比较狠，专挑运行较长时间的数据库下手）。如果大于1200天，则重启数据库后触发病毒触发器，加密并删除sys.tab$，导致用户无法访问数据库中所有的数据库对象集合（schema），提示“你的数据库已经被SQL RUSH Team锁死，请发送5个比特币到这个地址……”的勒索信息（也有变种会要求以太币等），并设置定时任务，如果在期限内不交赎金，就删除所有的表。

RushQL包含多个存储过程和触发器，选取其中一个PROCEDURE DBMS_SUPPORT_INTERNAL来看主要的操作为：1. 创建并备份`sys.tab$`表的数据到表 `ORACHK || SUBSTR(SYS_GUID,10)`；
2. 删除`sys.tab$`中的数据，条件是所有表的创建者ID 在（0,38）范围（针对核心表）；
3. 在你的alert日志中写上2046次勒索信息，并触发异常告警

解决：
1. 删除4个存储过程和3个触发器
2. 检查相关登录工具的自动化脚本，清理有风险的脚本
3. 使用备份将表恢复到truncate之前，视严重程度可能要用到DUL工具
（不一定能恢复所有的表，例如truncate的空间已被使用）