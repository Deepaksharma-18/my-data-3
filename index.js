const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
let port=8080;
const connetion=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        database:'college',
        password:'977037'
    }
);

app.listen(port,()=> console.log(`Listening to port ${port}`));
app.get("/",(req,res)=>
{
   let q="select count(*) from user";
   try{
    connetion.query(q,(err,result)=>
    {
        if(err) throw err;
        let count=result[0]["count(*)"];
        res.render("home.ejs",{count});
    });
}
catch(err)
{
    console.log(err);
}
});
app.get("/user",(req,res)=>
{
   let q="select id,username,email, from user";
   try{
    connetion.query(q,(err,result)=>
    {
        if(err) throw err;
        // console.log(result);
        let data=result;
        res.render("show.ejs",{data});
    });
}
catch(err)
{
    console.log(err);
}

});
app.get("/user/:id",(req,res)=>
{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;
    try{
        connetion.query(q,(err,result)=>
            {
                if(err) throw err;
                let data=result[0];
                res.render("edit.ejs",{data});
            });
    }
    catch(err)
    {
        console.log(err);
    }
});
app.patch("/user/:id",(req,res)=>
{
    let {id}=req.params;
    let q=`select * from user where id='${id}'`;
    let{username:newusername,password:formpass}=req.body;
    try{
        connetion.query(q,(err,result)=>
            {
                if(err) throw err;
                let data=result[0];
                if(formpass!=data.password)
                {
                    res.send("Wrong password!");
                }
                else{
                      let q2=`update user set username='${newusername}' where id='${id}'`;
                      connetion.query(q2,(err,result)=>
                    {
                        if(err) throw err;
                      res.redirect("/user");
                    });
                }
            });
    }
    catch(err)
    {
        console.log(err);
    }
})
// let getuser=()=>
//     {
//         return [
//              faker.string.uuid(),
//              faker.internet.userName(),
//              faker.internet.email(),
//              faker.internet.password(),
//           ];
//     }
// let users=[["102","lakhan","Lakhan@11","8103"],["103","Chintu","SS@17","7377"]];
// let data=[];
// for(let i=1;i<=37;i++)
// {
//     data.push(getuser());
// }


// connetion.end();

