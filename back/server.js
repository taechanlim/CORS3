const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const pool = require('./db').pool
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(cookieParser()) 
app.use(cors({
    origin:true,
    credentials:true,
})) // http://localhost:3001

// res.setHeader('Access-Control-Allow-Origin','*')
// res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE') // methods 사용여부
// res.setHeader('Access-Control-Allow-Credentials','true')
// res.setHeader('Access-Control-Allow-Headers','Content-type')

app.post('/',(req,res)=>{
    console.log(req.body)
    res.setHeader('Set-cookie','name=ingoo; Domain=localhost;')
    res.send('123123')
})
// POST http://localhost:4001/api/user/join
app.post('/api/user/join',async (req,res)=>{
    console.log(req.body) // req.body 
    const {userid,userpw,name,nickname,birth,gender,phone,mobile} = req.body
    const sql = `INSERT INTO user(
                    userlevel,
                    userid,
                    userpw,
                    name,
                    nickname,
                    birth,
                    gender,
                    phone,
                    mobile
                ) values(
                    ?,?,?,?,?,now(),'1',?,?
                )`
    const prepare = [1,userid,userpw,name,nickname,phone,mobile]
    const [result] = await pool.execute(sql,prepare) // 1. SQL:string , 2. prepare:array
    // DB에다가 해당 SQL을 던져서 요청을보내고.
    // DB가 그 해당 SQL을 실행을해서 결과물을 result라는 변수에 다가 준거에요.
    
    console.log(result)

    const response = {
        result:{
            row:result.affectedRows,
            id:result.insertId
        },
        errno:0,
    }

    res.setHeader('Set-cookie','name=ingoo; path=/; Domain=localhost;')
    res.cookie('name2','ingoo2',{
        path:'/',
        httpOnly:true,
        secure:true,
        domain:'localhost'
    })
    res.json(response) 
})

app.listen(4001,()=>{
    console.log(`server 시작`)
})
// 
// /home/ingoo/workspace/220307/cors/back/SQL/table.sql