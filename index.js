const express = require('express');
const imdbScraper = require('./searchMovies');

const app = express();

const port = process.env.POST || 3000;

  
app.get('/', (req, res)=>{
	res.json({
		message: 'workingsss'
	});
}); 


app.get('/search/:title', (req, res)=>{
	imdbScraper.searchMoviesName(req.params.title).then(movies =>{
		res.json(movies)
	});
	
});

app.get('/movie/:imdbID', (req,res) =>{
	imdbScraper.getMovie(req.params.imdbID).then(movie =>{
		res.json(movie);
	})
});


app.listen(port, ()=>{
	console.log(`Listening on port ${port}`);
});