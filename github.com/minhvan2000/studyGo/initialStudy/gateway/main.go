package main

import (
	"log"
	"net/http"

	_ "github.com/joho/godotenv/autoload"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	common "github.com/minhvan2000/studyGo/initialStudy/commons"
	pb "github.com/minhvan2000/studyGo/initialStudy/commons/api"
)

var (
	httpAddr = common.EnvString("HTTP_ADDR", ":9090")
	ordersServiceAddr = "localhost:2000" 
)

func main() {
	conn, err := grpc.NewClient(ordersServiceAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		log.Fatalf("Failed to dial server %v", err)
	}

	defer conn.Close()

	log.Println("Dialing orders service at ", ordersServiceAddr)
	
	c := pb.NewOrderServiceClient(conn)

	//done
	mux := http.NewServeMux()
	handler := NewHandler(c)
	handler.registerRouters(mux)

	log.Printf("Starting HTTP server at %s", httpAddr)

	if err := http.ListenAndServe(httpAddr, mux); err != nil {
		log.Fatal("Failed to start http server")
	}
}