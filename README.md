# Nodejs实战

## 网络爬虫和数据操作

>mongoose客户端推荐robomongo:https://github.com/Studio3T/robomongo

### issues

- [x] 抓包有丢失，数据库数据不是完整的
- [ ] mongoose连接数据库内存占用过高，待优化
- [ ] mongoose对数据库操作，如果出错，如何回滚


## 项目开发

项目使用es6开发，需要安装`babel`和`babel-node`。

```sh
npm install # 按照项目依赖
npm run dev # 开启服务
```

打开[http://localhost:3000](http://localhost:3000)，查看爬取的博客内容。


## readings

+	[mongoose-connection-best-practice](http://theholmesoffice.com/mongoose-connection-best-practice/)
+	[Native cross-platform MongoDB management tool](https://github.com/Studio3T/robomongo)
