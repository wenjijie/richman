# 秋富翁前端

## 项目简介

这是一个大富翁游戏项目的前端

后端项目地址：<https://github.com/wenjijie/richmanServe>

demo体验地址：http://richman.qiuluo.xin



项目利用websocket实现多人实时在线游戏。可以注册、登录，创建房间，实时游戏。

游戏截图展示：

![image](https://blog.qiuluo.xin/wp-content/uploads/2019/04/70Y23K9KJJESYA2RUMJ.png)

![image](https://blog.qiuluo.xin/wp-content/uploads/2019/04/1PIEDRUC3IJU3WW8N_KP.png)![image](https://blog.qiuluo.xin/wp-content/uploads/2019/04/SAS__VV48SJM@4YOZ5H.png)



## 环境依赖

- nodejs
- mongodb
- redis



## 项目结构

![](https://blog.qiuluo.xin/wp-content/uploads/2019/04/D0ZONFOPLD1NC6XXTDK.png)



## 项目运行

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:8080/
```

### 部署

```bash
$ npm run build
```

打包后使用nginx、Apache等服务进行部署