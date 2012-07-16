/************************************ Model *******************************/
var svgStructure = Backbone.Model.extend({
//~ on definit la structure de l'element css
	defaults: function() {
      return {
		id : null,
        name: ""};
    },
  	clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/
var svgStructureList = Backbone.Collection.extend({
	initialize: function(props) {
		//~ this.bind('reset', this.populate);
		props=(props==undefined)?{model: svgStructure} : props;
		this.url=(props.url==undefined)? "model.json" : props.url;
		this.model=(props.model==undefined)? svgStructure : props.model;
	}
});


/************************************ View *******************************/
//~ on affiche une vue mais faut passer le model en parametre
  var svgStructureView = Backbone.View.extend({
		events: {
			"click button" : "insertElement"
        },
		initialize: function(){
			_.bindAll(this, "render","insertElement");
		},

		insertElement: function(e){

				//~ e.preventDefault();
				var elementChg = $(e.currentTarget).attr('id');
				var elementCurr=this.model.get("id");
				var elementId=elementCurr+(mContent.length+1);

				if ("bt_"+elementCurr==elementChg){
					var myCssList=new svgParameterList({url: "svgElement/"+elementCurr+"/"+elementCurr+".json", elem: "#contentZone"});
					myCssList.fetch({ success: function(response) {

						//~ //creation de l'objet physique
							var mstr="var maShape=new "+elementCurr+"({id : elementId});";
							mstr=mstr+"var maVue=new "+elementCurr+"View({el: '#contentZone', model: maShape});";
							eval(mstr)

						//~ //on ajoute une entree dans la liste des contenu
						var tmpContent=new content({id : elementId, svgStructure: elementCurr, svgParameterList: myCssList, mObject: maShape});
						mContent.add(tmpContent);

						//~ on met à jour l'objet
							myCssList.each(function(model){
									mContent.get(elementId).get("mObject").set(model.get('id'),model.get('value'));
							},this);


						//~ // on ajoute le nom dans la zone current
						mCurrent.set("currentElement",elementId);
						mCurrent.set("currentType",elementCurr);
						mCurrent.set("currentName",elementId);


						var drag = d3.behavior.drag().origin(Object).on("drag", function(){
										$("#svgStyleZone").html(d3.mouse(this));
										var monObjet=mContent.get(elementId).get("mObject")
										monObjet.set("x",d3.event.x);
										monObjet.set("y",d3.event.y);
									});

						//on implement le changement d'objet
						d3.select("#"+elementId)
								.on("mousedown",  function(){mCurrent.set("currentElement",elementId);})
								//~ .call(drag);
								//~ .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})

						//on drop style--> change style
					}}); //end fetch

				}//end if
		},
        render: function(){
		//~ on recupere les valeurs de this declarer dans initialize bind
			var mname=this.model.get('name');
			var template ="<td><button type='button' id='bt_"+mname+"'>"+mname+"</button></td>";
			return template;
		}
	});

/************************************ CollectionView *******************************/
//~ /on affiche la liste de vue
var svgStructureListView = Backbone.View.extend({
		initialize: function() {
		    _.bindAll(this, 'render');
			this.collection.on('reset', this.render, this);
			this.collection.fetch();
		},
		render: function(){
			//~ alert("render");
			var self=this;
			var tmpString="<table><tr>";
			this.collection.each(function(model){
				var view = new svgStructureView({el: this.el, model: model});
				tmpString=tmpString+view.render();
			},this);
			tmpString=tmpString+"</tr></table>"
			$(this.el).append(tmpString);
		},
	});
