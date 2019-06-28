# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


1有赞vant weapp第三方框架的引入
  1.1 miniprogram文件夹下打开cmd npm init ----生成package.json
  1.2 npm i vant-weapp -S --production   安装依赖
  1.3 微信开发工具中  工具=》构建npm   ----生成miniprogram_npm 文件夹
  1.4 微信开发工具中  详情=》使用npm模块   ----使得npm 模块生效
  1.5 movie.json中配置
      {
 			   	"usingComponents": {
     				"van-button": "vant-weapp/button"
  				}
			}

