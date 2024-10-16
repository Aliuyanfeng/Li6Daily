# PostgreSQL
## 常用命令

### 重置表&索引
```sql
TRUNCATE
t_device,
t_device_vuln
RESTART IDENTITY CASCADE
```

### 设置时间字段默认值精度
```sql
-- 设置精度到秒  其中 second可替换为minute hour day 等常用的单位
ALTER TABLE your_table
ALTER COLUMN timestamp_column SET DEFAULT date_trunc('second', now());
```

### 清除连接数
```sql
SELECT
        pg_terminate_backend ( pg_stat_activity.pid ) 
FROM
        pg_stat_activity 
WHERE
        datname = 'sbjc_db' 
        AND pid <> pg_backend_pid ( );
```


### 查询分区表
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 't_file_%';
```

### 创建分区表 
```sql
CREATE TABLE "t_file_20240523_copy1" PARTITION OF "public"."t_file_copy1" FOR VALUES FROM (
'2024-05-23 00:00:00'
) TO (
'2024-05-24 00:00:00'
);
```



## 附件
[银河麒麟V10使用编译安装postgresql完整部署参考1](https://www.cnblogs.com/liunaixu/p/17148634.html)  
[银河麒麟V10使用编译安装postgresql完整部署参考2](https://www.cnblogs.com/liunaixu/p/17222695.html)

