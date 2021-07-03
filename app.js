const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
// serve static folder public.
// http://localhost:3000/static/css/styles.css
app.use('/static',express.static('public'));
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
    const { about } = data
    res.render("about",about);
});

app.get('/project/:id', (req,res)=>{
    logMessage(`loading project:id ${req.params.id}`)
    const { projects } = data;
    const { id } = req.params;
    let projectDetails = {}
    projects.forEach( ( project ) => {
        if(project.id === id){
            projectDetails = project;
        }
    });
    if(Object.keys(projectDetails).length > 0 ){
        res.render('project',projectDetails);
    }else{
    res.redirect(`/projects/${id}`)
    }
});
app.use((req,res,next)=>{
    const err = new Error();
    err.message = `Page Not found for url: ${req.url}`;
    err.status = 404;
    next(err);

})
app.use((err,req, res,next) => {
    // reconstruct error message.
    const notFound = 404;
    const internalError = 500; 
    const catchAllError = new Error()

    if(!err.status){
        catchAllError.message = "Internal Server Error :(";
        catchAllError.status = internalError;
        catchAllError.stack = err.stack;
    } else {
        catchAllError.message = err.message;
        catchAllError.stack = err.stack;
        catchAllError.status = notFound;
    }
    res.locals.error = catchAllError;
    res.status(catchAllError.status);
    
    console.log('+ + + error + + +');
    console.log(catchAllError);

    catchAllError.status === notFound? 
                res.render('page-not-found',catchAllError) : 
                res.render('error',catchAllError);
  });
/**
 * TODO: Consider adding a target attribute set to _blank on the a tags for the live links to your projects so that they open in a new window.
 */
  

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})