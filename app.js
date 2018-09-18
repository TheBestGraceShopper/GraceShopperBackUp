const express = require("express");
const app = express();

const morgan = require('morgan')

const postBank = require('./postBank')

// app.get("/", (req, res) => res.send("Hello World!"));

app.use(morgan('dev'));

app.get('/list',(req,res)=> {
  const list = postBank.list()

  const html = `
  <html>
      <head>
      <title>Title of the document</title>
      </head>
      <body>
        <ul>
            ${list.map(post => `<li> Title: ${post.title}; Author: ${post.name}</li>`)}
        </ul>
      </body>
</html> `

  res.send(html)
  }
)

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
