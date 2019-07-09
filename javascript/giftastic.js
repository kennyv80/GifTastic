$(document).ready(function(){   

	$("button").on("click", function(){
		var pants = $(this).data("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pants + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response)
			var results = response.data;
			for(var i = 0; i < results.length; i++) {
				var pantsDiv = $("<div/>");
				var p = $("<p/>");
				p.text(results[i].rating);
				var pantsImage = $("<img/>");
				pantsImage.addClass("pantsImg")
				pantsImage.attr("src",results[i].images.fixed_height.url);
				pantsImage.attr("data-still", results[i].images.fixed_height_still.url)
				pantsImage.attr("data-animate", results[i].images.fixed_height.url)
				.attr("data-state","still");
				pantsDiv.append(p);
				pantsDiv.append(pantsImage);
				pantsDiv.prependTo($("#gifs"));
			}
			$(".pantsImg").on("click",function(){
				var state = $(this).attr("data-state");
				console.log(this);
				if(state === "still") {
					$(this).attr("src", $(this).data("animate"));
					$(this).attr("data-state","animate");
				} else {
					$(this).attr("src", $(this).data("still"));
					$(this).attr("data-state", "still");
				}
			});
		});
	});
});
