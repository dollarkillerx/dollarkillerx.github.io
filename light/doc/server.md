# Server Plug-in

> https://github.com/dollarkillerx/light/blob/main/server/options.go

### Available configurations: 
- [UseTCP](#UseTCP)    default 
- [UseUnix](#UseUnix)
- [UseKCP](#UseKCP)
- [SetAESCryptology](#SetAESCryptology)   ！！！ Official environment must be configured
- [SetAUTH](#SetAUTH)
- [SetDiscovery](#SetDiscovery)
- [SetTimeout](#SetTimeout)     # Default is fine
- [SetContext](#SetContext)
- [Trace](#Trace)

### UseTCP
```go
    ser := server.NewServer()
	err := ser.RegisterName(&HelloWorld{}, "helloworld")
	if err != nil {
		log.Fatalln(err)
	}

	if err := ser.Run(server.UseTCP("0.0.0.0:8074")); err != nil {
		log.Fatalln(err)
	}
```

### UseUnix
```go
    ser := server.NewServer()
	err := ser.RegisterName(&HelloWorld{}, "helloworld")
	if err != nil {
		log.Fatalln(err)
	}

	if err := ser.Run(server.UseUnix("light.sock")); err != nil {
		log.Fatalln(err)
	}
```

### UseKCP
```go
    ser := server.NewServer()
	err := ser.RegisterName(&HelloWorld{}, "helloworld")
	if err != nil {
		log.Fatalln(err)
	}

	if err := ser.Run(server.UseKCP("0.0.0.0:8674")); err != nil {
		log.Fatalln(err)
	}
```

### SetTimeout
```go
	ser := server.NewServer()
    err := ser.RegisterName(&HelloWorld{}, "helloworld")
    if err != nil {
        log.Fatalln(err)
    }
    
    if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.SetTimeout(time.Second * 60, time.Second * 3)); err != nil {
        log.Fatalln(err)
    }
```

### SetAESCryptology
Official environment must be configured
```go
	ser := server.NewServer()
    err := ser.RegisterName(&HelloWorld{}, "helloworld")
    if err != nil {
        log.Fatalln(err)
    }

    if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.SetAESCryptology([]byte("key Length 16 or 32"))); err != nil {
        log.Fatalln(err)
    }
```

### SetAUTH
```go
func main() {
	ser := server.NewServer()
	err := ser.RegisterName(&HelloWorld{}, "helloworld")
	if err != nil {
		log.Fatalln(err)
	}

	if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.SetAUTH(authFunc)); err != nil {
		log.Fatalln(err)
	}
}

func authFunc(ctx *light.Context, token string) error {
	if token == "token" {
		return nil
	}

	return errors.New("error 401")
}
```

### SetDiscovery
```go
	ser := server.NewServer()
	err := ser.RegisterName(&HelloWorld{}, "helloworld")
	if err != nil {
		log.Fatalln(err)
	}

	redisDiscovery, err := discovery.NewRedisDiscovery("127.0.0.1:6379", 10, nil)
	if err != nil {
		log.Fatalln(err)
	}
	if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.Trace(), server.SetDiscovery(redisDiscovery, "127.0.0.1:8074", 10)); err != nil {
		log.Fatalln(err)
	}
```


### SetContext
```go
	ser := server.NewServer()
    err := ser.RegisterName(&HelloWorld{}, "helloworld")
    if err != nil {
        log.Fatalln(err)
    }

    ctx := context.Background()
    if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.SetContext(ctx)); err != nil {
        log.Fatalln(err)
    }
```

### Trace
```go
	ser := server.NewServer()
    err := ser.RegisterName(&HelloWorld{}, "helloworld")
    if err != nil {
        log.Fatalln(err)
    }

    if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.Trace()); err != nil {
        log.Fatalln(err)
    }
```
