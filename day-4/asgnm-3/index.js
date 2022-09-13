const express = require("express");
const morgan = require("morgan");
const port = 8000;
const app = express();
app.use(express.json());
app.use(morgan((tokens,req,res)=>{
        return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens.res(req,res,'content-length'),'-',
        tokens.req(req,res,'date'),
        tokens['response-time'](req,res),'ms'
    ].join(' ');
}));
app.use(morgan('tiny'));
app.use(morgan('combined'));
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(morgan('short'));
app.get("/",(req,res)=>{
    res.send("Morgan")
})
app.post("/",(req,res)=>{
    res.send("Added")
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
