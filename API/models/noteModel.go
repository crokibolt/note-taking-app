package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Note struct {
	gorm.Model
	Title      string         `gorm: not null`
	Categories pq.StringArray `gorm:"type:text[]"; not null`
	Body       string         `gorm: not null`
	UserID     uint           `gorm: not null`
}
