// global variable declarations
var $grid = $('.grid');
var QUOTES_FREQUENCY_MS = 10000;
var HIDDEN_TAGS = ['Recommended', 'British'];

$( document ).ready(function() {
	
	// intialize materializecss select elements
	$('select').material_select();
	
	// render and show the quotes
	renderQuotes();
	showElementByClassifier("#quotes-div");

	// render and show the isotope grid
	initializeAndRenderGrid();
	showElementByClassifier("#grid-container");

	// add a handler to filter the isotope grid based on user selection
	$('#genre-list').on('change', function() {
		var filterValue = this.value;
		$grid.isotope({ filter: filterValue });
	});

});

function initializeAndRenderGrid() {
	renderGrid();
	initializeGrid();
	bindGridHandlers();
}

function initializeGrid() {
	$grid.imagesLoaded( function() {
	   $grid.isotope({  
		  itemSelector: '.element-item',
		  layoutMode: 'fitRows',
		  sortBy: 'score',
		  sortAscending: false,
		  getSortData: {
			score: '.showscore'
		  }
	   });
	});
}

function bindGridHandlers() {
	// bind filter button click
	$('.filters-button-group').on( 'click', 'a', function() {
	  var filterValue = $( this ).attr('data-filter');
	  $grid.isotope({ filter: filterValue });
	});
	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', 'a', function() {
		$buttonGroup.find('.disabled').removeClass('disabled');
		$( this ).addClass('disabled');
	  });
	});	
}


/*
 * The renderGrid method will generate isotope grid elements
 * by reading the JSON data of the VIDEO_DATA array.
 * 
 * The grid elements need to be rendered to produce the html structure shown below:
 *
 *	<div class="element-item Sci-fi Recommended" data-category="Sci-fi">
 *  <span class="showscore" style="display:none;">9</span>
 *
 *   <div class="card hoverable">
 *     <div class="card-image"><img class="activator responsive-img" src="images/covers/game-of-thrones.jpg" /></div>
 *
 *     <div class="card-content">
 *       <div class="chip">Sci-fi</div>
 *
 *       <div class="reveal-link">
 *         <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
 *       </div>
 *     </div>
 *
 *     <div class="card-reveal">
 *       <span class="card-title grey-text text-darken-4">Synopsis<i class="material-icons right">close</i></span>
 *
 *       <p>While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. 
 *       Meanwhile a forgotten race, bent on destruction, plans to return after thousands of years in the North.</p>
 *
 *       <p>Which USB?: 1</p>
 *
 *       <p>Seasons: 6 / <a target="_blank" href="http://www.imdb.com/title/tt0944947/">More Info</a></p>
 *     </div>
 *   </div>
 * </div>
 *
 *
 */
function renderGrid() {
	var html = '';
	$.each(TV_SHOW_DATA, function( index, tvshow ) {

	  html += '<div class="element-item ';
	  for (var i = 0; i < tvshow.tags.length; i++) {
		  if(i==(tvshow.tags.length-1)) {
			html += tvshow.tags[i];
		  } else {
			  html += tvshow.tags[i] + ' ';
		  }
	  }
	  html += '" data-category="'+ tvshow.tags[0] +'">';
	  html += '<span class="showscore" style="display:none;">'+tvshow.score+'</span>';
	  html += '<div class="card hoverable">';
	  html += '<div class="card-image">';
	  html += '<img class="activator responsive-img" src="images/covers/' + tvshow.cover + '">';
	  html += '</div>'; // close of .card-image
	  html += '<div class="card-content">'; 
	  for (var i = 0; i < tvshow.tags.length; i++) {
		  if($.inArray(tvshow.tags[i], HIDDEN_TAGS) === -1) {
			html += '<div class="chip">' + tvshow.tags[i] + '</div>';
		  }
	  }
	  html += '<div class="reveal-link">';
	  html += '<span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>';
	  html += '</div>'; // close of .reveal-link
	  html += '</div>'; // close of .card-content
	  html += '<div class="card-reveal">';
	  html += '<span class="card-title grey-text text-darken-4">Synopsis<i class="material-icons right">close</i></span>';
	  html += '<p>' + tvshow.synopsis + '</p>';
	  html += '<p>Which USB?: ' + tvshow.disk + '</p>';
	  html += '<p>Seasons: ' + tvshow.seasons + ' / <a target="_blank" href="' + tvshow.uri + '">More Info</a></p>';
	 
	  html += '</div>'; // close of .card-reveal
	  html += '</div>'; // close of .card
	  html += '</div>'; // close of .element-item

	});
	
	$('.grid').html(html);
}

function renderQuotes() {
	// create and render an inital quote
	var index = getRandomArbitrary(0, QUOTES_DATA.length-1);
	var quote = QUOTES_DATA[index];
		$("#quote-img").attr("src", 'images/icons/'+quote.image);
		$("#quote-name").html(quote.quoter);
		$("#quote").html(quote.quote);
	
	// create a timer for cyclying the quotes
	window.setInterval(function(){
		var index = getRandomArbitrary(0, QUOTES_DATA.length-1);
		var quote = QUOTES_DATA[index];
		$("#quote-img").attr("src", 'images/icons/'+quote.image);
		$("#quote-name").html(quote.quoter);
		$("#quote").html(quote.quote);
		
	}, QUOTES_FREQUENCY_MS);
}

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showElementByClassifier(elem) {
	$(elem).show();
}