package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/minhvan2000/go-backend-api/internal/controller"
)

func NewRouter() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("/v1/api")
	{
		v1.GET("/user/get-info-user", controller.NewUserController().GetUserByID)
	}

	return r
}