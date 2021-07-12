# Auth
> https://github.com/dollarkillerx/light/tree/main/examples/auth

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
