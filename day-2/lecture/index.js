const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.write("Welcome to homepage");
    } else if (req.url === "/about") {
      res.write("Welcome to About page");
    } else if (req.url === "/contact") {
      res.write("Welcome to Contact page");
    } else if (req.url === "/details") {
      //   read from the file and store that data
      let data = fs.readFileSync("./data.txt", { encoding: "utf-8" });
      //   send that data
      res.write(data);
    } else if (req.url === "/welcome") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ name: "masai" }));
      // res.end({name:"masai"})  // cannot send plane object we need to stingfy it becuase data can only be string or intance of buffer(array of bits)
    }
  } else if (req.method === "POST") {
    if (req.url === "/adddetails") {
      req.on('data',(data)=>{
        console.log(data);
      })
      req.on('end',()=>{
        res.end("Thanks for sending data")
      })
      /// get data from client
      // store it in file
    }
  }
  res.end();
});
server.listen(5000, () => {
  console.log("server started at 5000 port");
});

//   SYNC -----synchronous
//   ASYNC ----asynchronous
// GET - / return 'Welcome to homepage'
// GET - /contact return 'This is contact page';
// GET - /about return "This is about page";

// POST - / add details - payload - write in some file

// console.log(http.createServer());
// reading URL
// http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     res.write("Hello world");
//     res.end();
// }).listen(8080,()=>{
//     console.log("Server started at port 8080")
// });

// http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     var q = url.parse(req.url,true).query;
//     var txt = q.year+" "+q.month;
//     res.end(txt);
// }).listen(8080,()=>{
//     console.log("server started at 8080")
// });
