const express = require('express')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const app = express()

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.use(cookieParser())

// 메인페이지
app.get('/',(req,res)=>{
    res.render('index')
})

// 회원가입
app.get('/user/join',(req,res)=>{
    res.render('join')
})

// 로그인페이지
app.get('/user/login',(req,res)=>{
    res.render('login')
})

// 프로필페이지
app.get('/user/profile',(req,res)=>{
    res.render('profile')
})

app.get('/board/list', async (req,res)=>{
    // token을 읽어야함. 
    console.log(req.cookies)
    const { token } = req.cookies
    const body = {
        token:token
    }
    const response = await axios.post('http://localhost:4001/api/auth',body,{
        'Content-type':'application/json'
    })

    console.log(`응답왔니 ? : `,response.data)

    if(response.data === true) {
        res.render('list')
    } else {
        // 검증이안됨
        res.render('token')
    }
})

app.listen(3001,()=>{
    console.log(`server 시작`)
})