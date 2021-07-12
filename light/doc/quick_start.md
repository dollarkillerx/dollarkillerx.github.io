# Quick Start

### Requirements
- Go 1.13 or above

### Installation

``` 
go get github.com/dollarkillerx/light
```

### hello world 
> https://github.com/dollarkillerx/light/tree/main/examples/helloworld

**Define payload**

```go
type Request struct {
	Name string
}

type Response struct {
	RPName string
}
```

**server**
> Note: The service name and method name must be public !!!

```go
func main() {
	ser := server.NewServer()
	err := ser.RegisterName(&Demo{}, "Demo")  // Service Instance, Service Name
	if err != nil {
		log.Fatalln(err)
	}

	if err := ser.Run(server.UseTCP("0.0.0.0:8074")); err != nil {
		log.Fatalln(err)
	}
}

type Demo struct{}

func (s *Demo) HelloWorld(ctx *light.Context, req *Request, resp *Response) error {
	resp.RPName = fmt.Sprintf("hello world by: %s", req.Name)
	//return errors.New(":xx")
	//fmt.Println(resp)
	return nil
}
```

**client**

```go
func main() {
	client := client.NewClient(discovery.NewSimplePeerToPeer("127.0.0.1:8074", transport.TCP))
	connect, err := client.NewConnect("Demo")
	if err != nil {
		log.Fatalln(err)
		return
	}


	resp := Response{}
	err = connect.Call(light.DefaultCtx(), "HelloWorld", &Request{Name: "hello"}, &resp)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println(resp)
}
```
