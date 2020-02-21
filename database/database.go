package  database

import (
     "encoding/json"
    _ "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "net/http"
    "database/sql"
   _ "fmt"
    "strings"
    _ "github.com/lib/pq"
    "os"
    "io/ioutil"
)

type ProvinceData struct{
	Agri Production `json:"agri"`
	Grp  Grp  `json:"grp"`
	Debt  Debt  `json:"debt"`
	Poverty  []interface{}  `json:"poverty"`
	TotalGDP  []interface{}  `json:"tgdp"`
	GDPCapita  []interface{}  `json:"gdpcapita"`
}

type Debt struct{
	Num1 []interface{}  `json:"1"`
	Num2 []interface{}  `json:"2"`
	Num3 []interface{}  `json:"3"`
	Num4 []interface{}  `json:"4"`
	Num5 []interface{}  `json:"5"`
	Num6 []interface{}  `json:"6"`
	Num7 []interface{}  `json:"7"`
}

type ProvDataAggrigate struct{
	Num0101 ProvinceData `json:"0101"`
	Num0102 ProvinceData `json:"0102"`
	Num0103 ProvinceData `json:"0103"`
	Num0104 ProvinceData `json:"0104"`
	Num0105 ProvinceData `json:"0105"`
	Num0106 ProvinceData `json:"0106"`
	Num0107 ProvinceData `json:"0107"`
	Num0108 ProvinceData `json:"0108"`
	Num0109 ProvinceData `json:"0109"`
	Num0110 ProvinceData `json:"0110"`
	Num0111 ProvinceData `json:"0111"`
	Num0112 ProvinceData `json:"0112"`
	Num0113 ProvinceData `json:"0113"`
	Num0114 ProvinceData `json:"0114"`
	Num0115 ProvinceData `json:"0115"`
	Num0116 ProvinceData `json:"0116"`
	Num0117 ProvinceData `json:"0117"`
	Num0118 ProvinceData `json:"0118"`
	Num0119 ProvinceData `json:"0119"`
	Num0120 ProvinceData `json:"0120"`
	Num0201 ProvinceData `json:"0201"`
	Num0202 ProvinceData `json:"0202"`
	Num0203 ProvinceData `json:"0203"`
	Num0204 ProvinceData `json:"0204"`
	Num0205 ProvinceData `json:"0205"`
	Num0206 ProvinceData `json:"0206"`
	Num0207 ProvinceData `json:"0207"`
	Num0208 ProvinceData `json:"0208"`
	Num0209 ProvinceData `json:"0209"`
	Num0210 ProvinceData `json:"0210"`
	Num0211 ProvinceData `json:"0211"`
	Num0212 ProvinceData `json:"0212"`
	Num0213 ProvinceData `json:"0213"`
	Num0214 ProvinceData `json:"0214"`
	Num0215 ProvinceData `json:"0215"`
	Num0216 ProvinceData `json:"0216"`
	Num0217 ProvinceData `json:"0217"`
	Num0301 ProvinceData `json:"0301"`
	Num0302 ProvinceData `json:"0302"`
	Num0303 ProvinceData `json:"0303"`
	Num0304 ProvinceData `json:"0304"`
	Num0305 ProvinceData `json:"0305"`
	Num0306 ProvinceData `json:"0306"`
	Num0307 ProvinceData `json:"0307"`
	Num0308 ProvinceData `json:"0308"`
	Num0309 ProvinceData `json:"0309"`
	Num0310 ProvinceData `json:"0310"`
	Num0311 ProvinceData `json:"0311"`
	Num0312 ProvinceData `json:"0312"`
	Num0313 ProvinceData `json:"0313"`
	Num0314 ProvinceData `json:"0314"`
	Num0401 ProvinceData `json:"0401"`
	Num0402 ProvinceData `json:"0402"`
	Num0403 ProvinceData `json:"0403"`
	Num0404 ProvinceData `json:"0404"`
	Num0405 ProvinceData `json:"0405"`
	Num0406 ProvinceData `json:"0406"`
	Num0407 ProvinceData `json:"0407"`
	Num0408 ProvinceData `json:"0408"`
	Num0501 ProvinceData `json:"0501"`
	Num0502 ProvinceData `json:"0502"`
	Num0503 ProvinceData `json:"0503"`
	Num0504 ProvinceData `json:"0504"`
	Num0505 ProvinceData `json:"0505"`
	Num0506 ProvinceData `json:"0506"`
	Num0601 ProvinceData `json:"0601"`
	Num0602 ProvinceData `json:"0602"`
	Num0603 ProvinceData `json:"0603"`
	Num0604 ProvinceData `json:"0604"`
	Num0605 ProvinceData `json:"0605"`
	Num0606 ProvinceData `json:"0606"`
	Num0701 ProvinceData `json:"0701"`
	Num0702 ProvinceData `json:"0702"`
	Num0703 ProvinceData `json:"0703"`
	Num0704 ProvinceData `json:"0704"`
	Num0705 ProvinceData `json:"0705"`
	Num0706 ProvinceData `json:"0706"`
}

type Data struct{
//	Lo Lc `json:"lc"`
	Po Population `json:"pop"`
//	Ag AgriData `json:"agri"`
//	Gr Grp `json:"grp"`
	BeachLoss BeachData `json:"beachloss"`
	LandSlide  LandSlideData `json:"landslide"`
	FloodFreq  FloodFreqData `json:"floodfreq"`
}


type Lc struct {
	Prov_code string `json:"prov_code"`
	P_code string `json:"p_code"`
	Prov_nam_t string `json:"prov_nam_t"`
	Prov_nam_e string `json:"prov_nam_e"`
	Amphoe_idn string `json:"amphoe_idn"`
	Amphoe_e string `json:"amphoe_e"`
	Amphoe_t string `json:"amphoe_t"`
	Tambon_idn string `json:"tambon_idn"`
	Tam_nam_t string `json:"tam_nam_t"`
}

type PopulationRaw struct {
	Population  json.RawMessage
}

type Population struct {
        PopTambon  []interface{} `json:"tambon"`
        PopAmphoe  []interface{} `json:"amphoe"`
        PopProvince  []interface{} `json:"province"`
}

type AgriRaw struct{
	AgriData  json.RawMessage
}

type LandSlideData struct{
	Province interface{} `json:"province"`
	Amphoe interface{} `json:"amphoe"`
	Tambon interface{} `json:"tambon"`
}

type FloodFreqData struct{
	Province interface{} `json:"province"`
	Amphoe interface{} `json:"amphoe"`
	Tambon interface{} `json:"tambon"`
}

type Production struct {
	OilPalm    []interface{} `json:"Oil Palm"`
	Maize      []interface{} `json:"Maize"`
	Cassava    []interface{} `json:"Cassava"`
	SecondRice []interface{} `json:"Second Rice"`
	ParaRubber []interface{} `json:"Para Rubber"`
	MajorRice  []interface{} `json:"Major Rice"`
	Orchid     []interface{} `json:"Orchid"`
	Sugarcane  []interface{} `json:"Sugarcane"`
}

type AgriData struct {
    Production Production `json:"production"`
}

type GrpRaw struct{
	Grp  json.RawMessage
}

type Grp struct {
	Mining     []interface{} `json:"mining"`
	Finance    []interface{} `json:"finance"`
	Manufact   []interface{} `json:"manufact"`
	Admin      []interface{} `json:"admin"`
	Hotel      []interface{} `json:"hotel"`
	Sales      []interface{} `json:"sales"`
	Realestate []interface{} `json:"realestate"`
	Agri       []interface{} `json:"agri"`
	Education  []interface{} `json:"education"`
	Others     []interface{} `json:"others"`
}

type BeachData struct {
	Province BeachLoss  `json:"province"`
	Amphoe   BeachLoss  `json:"amphoe"`
	Tambon   BeachLoss  `json:"tambon"`

}

type BeachLossRaw struct{
	BeachLoss  json.RawMessage
}

type BeachLoss struct {
	Mn struct {
		R45 []interface{} `json:"r45"`
		R26 []interface{} `json:"r26"`
		R60 []interface{} `json:"r60"`
		R85 []interface{} `json:"r85"`
	} `json:"mn"`
	Mx struct {
		R45 []interface{} `json:"r45"`
		R26 []interface{} `json:"r26"`
		R60 []interface{} `json:"r60"`
		R85 []interface{} `json:"r85"`
	} `json:"mx"`
}


func db_query_location(db *sql.DB, latlong string) Lc {
    var sql string
    sql = "select prov_code,p_code,prov_nam_e,prov_nam_t,amphoe_idn,amphoe_e,amphoe_t,tambon_idn,tam_nam_t from tambon32647 where st_within(st_transform(st_setSRID(st_point(" + latlong + "),4326),32647),geom);"
    rows, _ := db.Query(sql)
    var d Lc
    for rows.Next(){
        rows.Scan(&d.Prov_code,&d.P_code,&d.Prov_nam_e,&d.Prov_nam_t,&d.Amphoe_idn,&d.Amphoe_e,&d.Amphoe_t,&d.Tambon_idn,&d.Tam_nam_t)
    }

   if d.Prov_code == "10" {
    sql = "select dcode,dname_e,dname from bangkok_district where st_within(st_transform(st_setSRID(st_point(" + latlong + "),4326),32647),geom);"
    rows, _ = db.Query(sql)
    	for rows.Next(){
        	rows.Scan(&d.Amphoe_idn,&d.Amphoe_e,&d.Amphoe_t)
    	}
    sql = "select scode,sname from bangkok_subdistrict where st_within(st_transform(st_setSRID(st_point(" + latlong + "),4326),32647),geom);"
    rows, _ = db.Query(sql)
    	for rows.Next(){
        	rows.Scan(&d.Tambon_idn,&d.Tam_nam_t)
    	}
    
    } else {
    sql = "select amphoe_idn from amphoe4326 where st_within(st_setSRID(st_point(" + latlong + "),4326),geom);"
    rows, _ = db.Query(sql)
    	for rows.Next(){
        	rows.Scan(&d.Amphoe_idn)
    	}

   }

    return d
}

func db_query_agri(db *sql.DB, d Lc) AgriData {
    var sql string
    sql = "with temp as(select production from agriv2 where pcode like '" + d.P_code + "')select row_to_json(temp) from temp"
    rows, _ := db.Query(sql)
    var data AgriRaw
    for rows.Next(){
        rows.Scan(&data.AgriData)
    }

    var data2 AgriData
	json.Unmarshal(data.AgriData,&data2)

   return data2
}

func db_query_grp(db *sql.DB, d Lc) Grp {
    var sql string
    sql = "select r_rgp from gdp95_17v2 where pcode like '" + d.P_code + "'" 
    rows, _ := db.Query(sql)
    var data GrpRaw
    for rows.Next(){
        rows.Scan(&data.Grp)
    }
   var data2 Grp
   json.Unmarshal(data.Grp,&data2)
   return data2
}

func db_query_pop(db *sql.DB, d Lc) Population {
    var sql string

    // SELECT Tambon
    if d.Prov_code == "10" {
    	sql = "with temp as(select pop_array as tambon from bangkok_subdistrict where scode like '" + d.Tambon_idn + "') select to_json(temp) from temp"
     } else{
    	sql = "with temp as(select pop_array as tambon from tambon32647 where tambon_idn like '" + d.Tambon_idn + "') select to_json(temp) from temp"
	}
    rows, _ := db.Query(sql)
    var data PopulationRaw
    for rows.Next(){
        rows.Scan(&data.Population)
    }
   var data2 Population
   json.Unmarshal(data.Population,&data2)

    // SELECT Amphoe
    if d.Prov_code == "10" {
    	sql = "with temp as(select pop_array as amphoe from bangkok_district where dcode like '" + d.Amphoe_idn + "') select to_json(temp) from temp"
     } else{
    	sql = "with temp as(select pop_array as amphoe from amphoe4326 where amphoe_idn like '" + d.Amphoe_idn + "') select to_json(temp) from temp"
	}
    rows, _ = db.Query(sql)
    for rows.Next(){
        rows.Scan(&data.Population)
    }
   json.Unmarshal(data.Population,&data2)

    // SELECT Province
    sql = "with temp as(select pop_array as province from province2011 where prov_code like '" + d.Prov_code + "') select to_json(temp) from temp"
    rows, _ = db.Query(sql)
    for rows.Next(){
        rows.Scan(&data.Population)
    }
   json.Unmarshal(data.Population,&data2)

   return data2
}

func db_query_beachloss(db *sql.DB, d Lc) BeachData{
    var sql string

    // SELECT Tambon
    sql = "select bloss_tambon from tambon_disaster32647 where tambon_idn like '" + d.Tambon_idn + "'"
    rows, _ := db.Query(sql)

    var tam BeachLossRaw
    for rows.Next() {
        rows.Scan(&tam.BeachLoss)
    }

    var tam2 BeachLoss
    json.Unmarshal(tam.BeachLoss,&tam2)


    // SELECT Amphoe
    sql =  "select bloss_amphoe from amphoe4326 where amphoe_idn like '" + d.Amphoe_idn + "'"
    rows, _ = db.Query(sql)

    var amp BeachLossRaw
    for rows.Next() {
        rows.Scan(&amp.BeachLoss)
    }

   var amp2 BeachLoss
   json.Unmarshal(amp.BeachLoss,&amp2)

    // SELECT Province
    sql = "select bloss_province from province2011 where prov_code like '" + d.Prov_code + "'"
    rows, _ = db.Query(sql)

    var pro BeachLossRaw
    for rows.Next() {
        rows.Scan(&pro.BeachLoss)
    }
    var pro2 BeachLoss
    json.Unmarshal(pro.BeachLoss,&pro2)

    newData := BeachData{Province:pro2,Amphoe:amp2, Tambon:tam2}
  return newData 
}

func db_query_landslide(db *sql.DB, d Lc) LandSlideData{
    var sql string

    // SELECT Tambon
    sql = "select landslidex::integer from tambon_disaster32647 where tambon_idn like '" + d.Tambon_idn + "'"
    rows, _ := db.Query(sql)

    var tam interface{} 
    for rows.Next() {
        rows.Scan(&tam)
    }

    // SELECT Amphoe
    sql =  "select landslidex::integer from amphoe4326 where amphoe_idn like '" + d.Amphoe_idn + "'"
    rows, _ = db.Query(sql)

    var amp interface{}
    for rows.Next() {
        rows.Scan(&amp)
    }

    // SELECT Province
    sql = "select landslidex::integer from province2011 where prov_code like '" + d.Prov_code + "'"
    rows, _ = db.Query(sql)

    var pro interface{}
    for rows.Next() {
        rows.Scan(&pro)
    }
    newData := LandSlideData{Province:pro,Amphoe:amp,Tambon:tam}
    return newData

}

func db_query_floodfreq(db *sql.DB, d Lc) FloodFreqData{
    var sql string

    // SELECT Tambon
    if d.Prov_code == "10" {
    	sql = "select flood_freq from bangkok_subdistrict where scode like '" + d.Tambon_idn + "'"
     } else {
        sql = "select flood_freq from tambon_disaster32647 where tambon_idn like '" + d.Tambon_idn + "'"
     }
    rows, _ := db.Query(sql)

    var tam interface{} 
    for rows.Next() {
        rows.Scan(&tam)
    }

    // SELECT Amphoe
    if d.Prov_code == "10" {
    	sql = "select flood_freq from bangkok_subdistrict where scode like '" + d.Tambon_idn + "'"
    } else {
        sql =  "select flood_freq from amphoe4326 where amphoe_idn like '" + d.Amphoe_idn + "'"
    }
    rows, _ = db.Query(sql)

    var amp interface{}
    for rows.Next() {
        rows.Scan(&amp)
    }

    // SELECT Province
    sql = "select flood_freq from province2011 where prov_code like '" + d.Prov_code + "'"
    rows, _ = db.Query(sql)

    var pro interface{}
    for rows.Next() {
        rows.Scan(&pro)
    }
    newData := FloodFreqData{Province:pro,Amphoe:amp,Tambon:tam}
    return newData

}

func DataFetch(val string, c *gin.Context){
db, _ := sql.Open("postgres", "user=adapt password=thai2050 dbname=thai sslmode=disable")
defer db.Close()
latlong := strings.Replace(string(val),":","",1)
//latlong = "100.9067,6.9073"
location  := db_query_location(db,latlong)
//agri := db_query_agri(db,location)
//grp := db_query_grp(db,location)
pop := db_query_pop(db,location)
beachloss := db_query_beachloss(db,location)
landslide := db_query_landslide(db,location)
floodfreq := db_query_floodfreq(db,location)

data := Data{Po:pop,BeachLoss:beachloss,LandSlide:landslide,FloodFreq:floodfreq}

c.JSON(http.StatusOK, data)

//fmt.Println(data)
}

func Address(val string, c *gin.Context){
db, _ := sql.Open("postgres", "user=adapt password=thai2050 dbname=thai sslmode=disable")
defer db.Close()
latlong := strings.Replace(string(val),":","",1)
location  := db_query_location(db,latlong)
c.JSON(http.StatusOK, location)

}


func Portal(c *gin.Context){
        c.HTML(http.StatusOK, "index.tmpl", gin.H{
            "title": "Main website",
        })
}

func GeneralData(c *gin.Context){
    raw, err := ioutil.ReadFile("./assets/data/general.json")
    if err != nil {
        //fmt.Println(err.Error())
        os.Exit(1)
    }
    var fc ProvDataAggrigate
    json.Unmarshal(raw, &fc)
    c.JSON(http.StatusOK, fc)
}
