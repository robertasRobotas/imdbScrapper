const fetch = require('node-fetch');
const cheerio =require('cheerio');

const searchURL = 'https://www.imdb.com/find?ref_=nv_sr_fn&q=';
const movieURL = 'https://www.imdb.com/title/';



let searchMoviesName = (searchTerm) =>{
 return fetch(`${searchURL}${searchTerm}`).then(response =>
 	response.text()).then(body=>{

 		const movies = [];
 		const $ = cheerio.load(body);

 		$('.findResult').each((i,element)=>{

 			const $element = $(element);

 			let $title = $element.find('td.result_text a');
 			let $url = $element.find('td.result_text a');
 			let movieID  = $title.attr('href').match(/title\/(.*)\//);

 			const movie = {
 				title : $title.text(),
 				movieID : movieID
 			};

 			movies.push(movie);
 		})

 			return movies;
 	});
 
};

let getMovie = (imdbID) =>{

return fetch(`${movieURL}${imdbID}`).then(response =>
 	response.text()).then(body =>{
 		
 		const genres =[];
const $ = cheerio.load(body);
const $title = $('.title_wrapper h1');
const $rating = $('span[itemProp = "ratingValue"]');
const $imgURL =  $(('.poster a img')).attr('src');
const $summary = $('.summary_text').text().trim();


 		return {
 			title : $title.text().trim(),
 			raiting : $rating.text(),
 			imgURL : $imgURL,
 			summary : $summary

 		};
 	});
};

module.exports.searchMoviesName = searchMoviesName;
module.exports.getMovie = getMovie;