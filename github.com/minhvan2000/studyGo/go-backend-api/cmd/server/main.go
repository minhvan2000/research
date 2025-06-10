package main

import (
	"github.com/minhvan2000/go-backend-api/internal/routers"
)

func main() {

	r := routers.NewRouter()
	
  	r.Run(":9000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

