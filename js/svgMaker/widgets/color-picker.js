

function colorPicker(affichage){
	if (affichage=="show"){$('#picker').show()};
	if (affichage=="hide"){$('#picker').hide()};
}


$.getScript("js/svgMaker/widgets/farbtastic/farbtastic.js", function(){
	$('#picker').farbtastic(function (color){
	//~ on recupere le nom du champ courant
		var mylay=$("#currentField").html();
		currentElement=mCurrent.get("currentElement");
		currentField=mCurrent.get("currentField");
		mContent.get(currentElement).get("svgParameterList").get(currentField).set("value",color);
		msvgParameterList.get(currentField).set("value",color);
	});

	$('#picker').hide();


});//end getScript


