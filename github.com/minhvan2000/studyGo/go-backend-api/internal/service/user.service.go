// * us: user service
package service

import "github.com/minhvan2000/go-backend-api/internal/repo"

type UserService struct{
	userRepo * repo.UserRepo
} 

func NewUserService() *UserService {
	return &UserService{
		userRepo: repo.NewUserRepo(),
	}
}

func (us *UserService) GetInfoUserService() string {
	return us.userRepo.GetInfoUser()
}