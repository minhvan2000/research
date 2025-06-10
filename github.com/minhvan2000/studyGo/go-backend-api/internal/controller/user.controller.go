// * uc: user controller
package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/minhvan2000/go-backend-api/internal/service"
	"github.com/minhvan2000/go-backend-api/pkg/response"
)

type UserController struct{
	userService *service.UserService
}

func NewUserController() *UserController {
	return &UserController{
		userService: service.NewUserService(),
	}
}

func (uc *UserController) GetUserByID (c *gin.Context) {
	response.ErrorResponse(c, 20003, "No need")
}