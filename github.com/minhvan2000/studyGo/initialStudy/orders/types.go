package main

import (
	"context"

	pb "github.com/minhvan2000/studyGo/initialStudy/commons/api"
)

type OrdersService interface {
	CreateOrder(context.Context) error
	ValidateOrder(context.Context, *pb.CreateOrderRequest) error
}

type OrdersStore interface {
	Create(context.Context) error
	
}