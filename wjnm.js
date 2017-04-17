/**
* World Job Network Map
*
* Omer Citak - www.omercitak.com - @Om3rCitak
*
*/

jQuery.noConflict();
jQuery(function(){
	var $ = jQuery;

	var height = $(document).height();  
	$('#map').height(height);
	$('#results').height(height);

	$.getJSON("data.json").done(function (data) {
		var countries = {};
		
		$.each(data, function(key, val) {
			countries[key] = 1;
        });
		
		$('#map').vectorMap({
			panOnDrag: true,
			onRegionClick: function(event, code){           
				var name = (code);
				listPeoples(data[code]);
			},
			series: {
				regions: [{
					scale: ['#0071A4'],
					normalizeFunction: 'polynomial',
					values: countries
				}]
			}
		});
	});
})

function listPeoples(data){
	var $ = jQuery;
	var list = "<ul>";
	
	if(data){
		$.each(data, function(key, val) {
			list = list + '<li>' + val + '</li>';
		});
	}else{
		list = list + '<li> :( none. <a href="https://github.com/Om3rCitak/wjnm/edit/gh-pages/data.json">add?</a></li>';
	}
	
	list = list + '</ul>';
	
	$("#list").html(list);
}