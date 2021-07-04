const express = require('express');
const app = express();
// serve static folder public.
// e.g http://localhost:3000/static/css/styles.css
app.use('/static',express.static('public'));
app.set('view engine','pug');
// import data from json file which includes portfolio details 
const data = require('./data.json');
// some simple utility functions 
const { getRandomIndex, logMessage } = require('./utils');
const port = 3000;

// home page
app.get('/', (req,res)=>{
    // decontruct data by properties for index.pug
    const { potential_headings, portfolio_description, projects } = data;

    const homePageInfo = {
    // return a radom heading each time the page loads     
    heading: potential_headings[getRandomIndex(potential_headings.length)],
    portfolioDescription: portfolio_description,
    projects,
    }
    // inject data into index.pug template. 
    res.render('index',homePageInfo);
});
/**
 * when client calls http://localhost:3000/about
 * render about page with data from data.json
 */
app.get('/about', (req,res)=>{
    const { about } = data
    res.render("about",about);
});
/**
 * when client calls http://localhost:3000/project/:a-valid-id
 * render project page with project from data.json
 *  ** if for some reason client calls http://localhost:3000/project/:a-invalid-id
 *     redirect user to 404 page. 
 */
app.get('/project/:id', (req,res)=>{
    logMessage(`loading project:id ${req.params.id}`)
    const { projects } = data;
    const { id } = req.params;
    let projectDetails = {}
    // iterate through all projects and compare id sent.
    // if id matches assign to projectDetails
    projects.forEach( ( project ) => {
        if(project.id === id){
            projectDetails = project;
        }
    });
    // if a project was found inject project details to project.pug
    if(Object.keys(projectDetails).length > 0 ){
        res.render('project',projectDetails);
    }else{
        //when a project was not found with the correct id. 
        //redirect user to a 404 page 
        res.redirect(`/projects/${id}`)
    }
});
/**
 * catch all routes that are not defined 
 * create a new error object and send to catch all error handler
 */
app.use((req,res,next)=>{
    const err = new Error();
    err.message = `Page Not found for url: ${req.url}`;
    err.status = 404;
    //send error object with details to catch all error handler
    next(err);

});

app.use((err,req, res,next) => {
    // reconstruct error message.
    const notFound = 404;
    const internalError = 500; 
    const catchAllError = new Error()
    
    // if there are no error status from other middleware function
    // assume an internal error happened
    if(!err.status){
        catchAllError.message = "Internal Server Error :(";
        catchAllError.status = internalError;
        catchAllError.stack = err.stack;
    } else {
        // set message from non found err sent by previous  middleware function
        catchAllError.message = err.message;
        catchAllError.status = notFound;
        catchAllError.stack = err.stack;
        
    }
    res.locals.error = catchAllError;
    res.status(catchAllError.status);
    // log error to server console. 
    console.log('+ + + error + + +');
    console.log(catchAllError);
    // if error message is 404 render page-not-found and error otherwise. 
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