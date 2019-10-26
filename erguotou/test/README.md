# 快速入门
### 要求
- Go1.6及其以上

## 安装
1. 下载并安装erguotou
```
$ go get -u github.com/dollarkillerx/erguotou
```
2. 导入erguotou
```
import "github.com/dollarkillerx/erguotou"
```

## 使用erguo 工具初始化项目
erguo 工具 在编写中

## 开始
首先创建一个名为`main.go`的文件
```go
package main

import "github.com/dollarkillerx/erguotou"

func main() {
	app := erguotou.New()

	// 全局基础中间件
	app.Use(erguotou.Logger)

	// 注册路由
	app.Get("/hello", func(ctx *erguotou.Context) {
		ctx.String(200, "Hello Erguotou")
	})

	err := app.Run(erguotou.SetHost(":8081"), erguotou.SetDebug(false))
	if err != nil {
		panic(err)
	}
}

```
然后,执行`go run main.go`命令来运行代码
```
$ go run main.go
```
