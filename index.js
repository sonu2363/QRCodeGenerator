const express=require('express');
const ejs=require('ejs')
const path=require('path')
const app=express();
const qrcode=require('qrcode')
const exp=require('constants')
const port=process.env.port || 4000;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'view'));

app.get('/',(req,res,next)=>{
    res.render('index')
})
app.post('/scan',(req,res,next)=>{
    const input_text=req.body.text;
    qrcode.toDataURL(input_text,(err,src)=>{
        if(err){
         res.send('Something got wrong');
    }
        res.render("scan",{
            qr_code:src,
        })
    })

})

app.listen(port,console.log(`listening on port ${port
}`));

