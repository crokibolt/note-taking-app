package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Note struct {
	gorm.Model
	Title      string
	Categories pq.StringArray `gorm:"type:text[]"`
	Body       string
	UserID     uint
}
