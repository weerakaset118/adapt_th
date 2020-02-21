package main

import (
    "github.com/gin-gonic/gin"
    "github.com/adapt/database"
)

func main() {

   router := gin.Default()
   router.Static("/assets","./assets")
   router.LoadHTMLGlob("templates/index.tmpl") 

   router.GET("/index", database.Portal)

   router.GET("/add:latlon",func(c *gin.Context){
       database.Address(c.Param("latlon"),c)
   })
   router.GET("/generaldata",func(c *gin.Context){
       database.GeneralData(c)
   })
   router.GET("/data:latlon",func(c *gin.Context){
       database.DataFetch(c.Param("latlon"),c)
   })

   router.Run(":8080")

}
