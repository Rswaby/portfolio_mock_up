const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
// serve static folder public.
// http://localhost:3000/static/css/styles.css
app.use('/static',express.static('public'));
// app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','pug');

const data = require('./data.json');
const { getRandomIndex, logMessage } = require('./utils');
const port = 3000;

// home page
app.get('/', (req,res)=>{

    const { potential_headings, portfolio_description, projects } = data;

    const homePageInfo = {
    heading: potential_headings[getRandomIndex(potential_headings.length)],
    portfolioDescription: portfolio_description,
    projects,
    }
    res.render('index',homePageInfo);
});

app.get('/about', (req,res)=>{
    res.render("about");
});

app.get('/project/:id', (req,res)=>{
    logMessage(`loading project:id ${req.params.id}`)
    res.render('project');
});
app.use((req,res,next)=>{
    const err = new Error();
    err.message = `Page Not found for url: ${req.url}`;
    err.status = 404;
    next(err);

})
app.use((err,req, res,next) => {
    if(!err.status){
        logMessage("Error Handler")
        console.error(err);
        err.status = 500;
    }
    res.locals.error = err
    res.status(err.status);
    res.send(err);
  });

  

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})