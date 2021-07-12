# Discovery 
> https://github.com/dollarkillerx/light/tree/main/examples/redis_discorey

## Current implementation of the service discovery plug-in
- [x] redis_discovery
- [ ] etcd
- [ ] consul

## The following uses redis as a service discovery 


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
> Note: The service name and method name must be public !!!

```go
func main() {
	ser := server.NewServer()
	err := ser.RegisterName(&Demo{}, "Demo")  // Service Instance, Service Name
	if err != nil {
		log.Fatalln(err)
	}

    redisDiscovery, err := discovery.NewRedisDiscovery("127.0.0.1:6379", 10, nil)
    if err != nil {
    	log.Fatalln(err)
    }
    
    // server.SetDiscovery(Service Registration Plugin, Registered Service Address, Current service weights)
	if err := ser.Run(server.UseTCP("0.0.0.0:8074"), server.SetDiscovery(redisDiscovery, "127.0.0.1:8074", 10)); err != nil {
		log.Fatalln(err)
	}
}

type Demo struct{}

func (s *Demo) HelloWorld(ctx *light.Context, req *Request, resp *Response) error {
	resp.RPName = fmt.Sprintf("hello world by: %s", req.Name)
	return nil
}
```

### client

```go
func main() {
    redisDiscovery, err := discovery.NewRedisDiscovery("127.0.0.1:6379", 10, nil)
    if err != nil {
        log.Fatalln(err)
    }

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
