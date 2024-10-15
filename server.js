const mongoose=require("mongoose");
const next=require("next")
const dotenv=require("dotenv");


const dev=process.env.NODE_ENV !="production"


const nextserver=next({dev});
const handle=nextserver.getRequestHandler();

dotenv.config({path: "./config.env"});

const app=require("./app")

const DB=process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(()=> console.log("db connected"))


const port=3000;

nextserver.prepare().then(()=>{
     app.get("*",  (req, res)=>{
         return handle(req, res)
     })

     app.listen(port, ()=>{
          console.log(`server is running ${port}`)
     })
})