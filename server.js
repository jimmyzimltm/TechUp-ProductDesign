// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());       
app.use(express.urlencoded({extended: true}));

// Needed for Prisma to connect to database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Main landing page
app.get('/', async function(req, res) {
  res.render('pages/home');
});

// About page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Top scores page
app.get('/topscores', async function(req, res) {

  // Try-Catch for any errors
  try {
      // Get all topscores 
      const savedscores = await prisma.post.findMany({
              orderBy: [
                {
                  id: 'desc'
                }
              ]
      });

      // Render the homepage with all the blog posts
      await res.render('pages/topscores', { savedscores: savedscores });
    } catch (error) {
      res.render('pages/topscores');
      console.log(error);
    } 
});

// New post page
app.get('/new', function(req, res) {
    res.render('pages/new');
});

// Create a new post
app.post('/new', async function(req, res) {
    
    // Try-Catch for any errors
    try {
        // Get the title and content from submitted form
        const { username, score } = req.body;

        // Reload page if empty title or content
        if (!username || !score) {
            console.log("Unable to create new post, no title or content");
            res.render('pages/new');
        } else {
            // Create post and store in database
            const parsedScore = parseInt(score, 10);
            const blog = await prisma.post.create({
                data: { username, score:parsedScore },
            });

            // Redirect back to the homepage
            res.redirect('/topscores');
        }
      } catch (error) {
        console.log(error);
        res.render('pages/new');
      }

});

// Save score from home
app.post('/', async function(req, res) {
    
  // Try-Catch for any errors
  try {
      // Get the title and content from submitted form
      const { username, score } = req.body;

      // Reload page if empty title or content
      if (!username || !score) {
          console.log("Unable to create new post, no title or content");
          res.render('pages/new');
      } else {
          // Create post and store in database
          const parsedScore = parseInt(score, 10);
          const blog = await prisma.post.create({
              data: { username, score:parsedScore },
          });

          // Redirect back to the homepage
          res.redirect('/topscores');
      }
    } catch (error) {
      console.log(error);
      res.render('pages/topscores');
    }

});


// Delete a post by id
app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
      
        // Redirect back to the homepage
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
  });





// Tells the app which port to run on
app.listen(8080);



