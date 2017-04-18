/**
* World Job Network Map
*
* Omer Citak - www.omercitak.com - @Om3rCitak
*
*/
var description = "This map lists people who work in different countries around the world and want to help developers who want to move to those countries.";

jQuery.noConflict();
jQuery(function(){
	var $ = jQuery;
	$('#description').html(description);
	var height = $(document).height();  
	$('#map').height(height);
	$('#results').height(height);

	$.getJSON("data.json").done(function (data) {
		var countries = {};
		
		$.each(data, function(key, val) {
			countries[key] = 1;
        });
		
		$('#map').vectorMap({
			backgroundColor: "#4e5d6c",
			panOnDrag: true,
			regionStyle: {
			  initial: {
				fill: "#ebebeb",
				"fill-opacity": 1,
				stroke: 'none',
				"stroke-width": 0,
				"stroke-opacity": 1
			  },
			  hover: {
				"fill-opacity": 0.8,
				cursor: 'pointer'
			  },
			  selected: {
				fill: 'yellow'
			  },
			  selectedHover: {
			  }
			},
			onRegionClick: function(event, code){           
				var name = (code);
				listPeoples(data[code]);
				/*
				var map = $('#map').vectorMap('get', 'mapObject');
				map.setFocus({region:code})
				$('#map').dblclick(function(){
					map.setFocus({x:1,y:1,scale:1})
					$("#list").html("");
					$("#list").removeClass("fadeInUp animated");
					$("#description").addClass("fadeInUp animated");
					$('#description').html(description);
				})
				*/
			},
			series: {
				regions: [{
					scale: ['#ba007f'],
					normalizeFunction: 'polynomial',
					values: countries
				}]
			}
		});
	});
})

function listPeoples(data){
	var $ = jQuery;
	var list = "<h4>Results:</h4><ul>";
	if(data){
		$.each(data, function(key, val) {
			list = list + '<li>' + val + '</li>';
		});
	}else{
		list = list + '<li> :( none. <a href="https://github.com/Om3rCitak/wjnm/edit/gh-pages/data.json">add?</a></li>';
	}
	
	list = list + '</ul>';
	
	$("#list").html(list);
	$("#list").addClass("fadeInUp animated");
	$('#description').html("");
	$('#description').removeClass("fadeInUp animated");
}
