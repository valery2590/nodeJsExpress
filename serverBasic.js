const express = require('express');
const morgan = require('morgan') //actua como middleware 
const app = express();


//Settings
app.set('appName', 'Express Tutorial');
app.set('port', 450)
app.set('view engine', 'ejs');

//Middleware
app.use(express.json());  //interpreta json
app.use(morgan('dev'));

// middleware propio
// function logger (req, res, next){
//     console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }


//Routes
app.get('/', (req,res)=>{
   const data = [{name:"John"}, {name:"Juan"}, {name:"Jean"}, {name: "Javier"}]
    res.render('index.ejs', {people: data})
})

app.all('/user', (req,res, next)=>{
    console.log('Por aquí paso')
    next();
})

app.get('/user', (req,res)=>{
    res.json({
        userName: "Cameron",
        lastName: "Howe"
    })
});

app.post('/user/:id', (req,res)=>{
    console.log(req.body);
    console.log(req.params)
    res.send('Petición POST recibida')
})

app.put('/user/:id', (req,res)=>{
    console.log(req.body);
    res.send(`User ${req.params.id} updated`)
})

app.delete('/user/:id', (req,res)=>{
    res.send(`User ${req.params.id} deleted`)
})

app.use(express.static('public'));

app.listen(app.get('port'), ()=>{
    console.log(app.get('appName'))
    console.log("Server on port", app.get('port'))
})

