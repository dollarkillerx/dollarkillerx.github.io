# Middleware
> https://github.com/dollarkillerx/light/tree/main/examples/middleware

### Define payload
```go
type Request struct {
	Name string
}

type Response struct {
	RPName string
}
```

### Server
```go
func main() {
	ser := server.NewServer()
	err := ser.RegisterName(&Demo{}, "Demo")  // Service Instance, Service Name
	if err != nil {
		log.Fatalln(err)
	}

	// Global Before Middleware
    ser.Before(func(ctx *light.Context, request interface{}, response interface{}) error {
        fmt.Println("before 1")
        ctx.SetValue("s1", "s1")
        return nil
    })

    // Global After Middleware
    ser.After(func(ctx *light.Context, request interface{}, response interface{}) error {
        fmt.Println("after 1")
        ctx.SetValue("s5", "s5")
        return nil
    })
    
	// Specify the path under the Before Middleware
	// Path: ServerName.ServerMethod
    ser.BeforePath("Demo.HelloWorld", func(ctx *light.Context, request interface{}, response interface{}) error {
        fmt.Println("before 2")
        ctx.SetValue("s2", "s2")
        return nil
    })
    
	// Specify the path under the After Middleware
    ser.AfterPath("Demo.HelloWorld", func(ctx *light.Context, request interface{}, response interface{}) error {
        fmt.Println("after 2")
        fmt.Println(ctx.GetMetaData())
        return nil
    })
	
	if err := ser.Run(server.UseTCP("0.0.0.0:8074"),server.SetAUTH(authFunc)); err != nil {
		log.Fatalln(err)
	}
}

type Demo struct{}

func (s *Demo) HelloWorld(ctx *light.Context, req *Request, resp *Response) error {
	resp.RPName = fmt.Sprintf("hello world by: %s", req.Name)
	return nil
}

// Define permission verification methods
func authFunc(ctx *light.Context, token string) error {
    if token == "token" {
    	return nil
    }

    return errors.New("error 401")
}
```

### Client
```go
func main() {
	client := client.NewClient(discovery.NewSimplePeerToPeer("127.0.0.1:8074", transport.TCP), client.SetAUTH("token"))
	connect, err := client.NewConnect("Demo")
	if err != nil {
		log.Fatalln(err)
		return
	}

	req := Request{
		Name: "hello",
	}
	resp := Response{}
	err = connect.Call(light.DefaultCtx(), "HelloWorld", &req, &resp)
	if err != nil {
		log.Fatalln(err)
	}
}
```

