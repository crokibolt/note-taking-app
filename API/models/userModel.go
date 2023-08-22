package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm: not null; unique`
	Password string `gorm: not null`
	Notes    []Note `gorm: not null`
}

func (u *User) PrepareGive() {
	u.Password = ""
}
