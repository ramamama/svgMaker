
/************************************ Model *******************************/
var currentData = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
        currentElement: "",
		currentField: "",
		currentFieldData: "",
        currentType: "",
		currentName: ""
      };
    },
	initialize: function() {
		_.bindAll(this, "clear");
	},
    clear: function() {
	//~ on permet aussi de detruire l'element
		this.destroy();
    }
});
/************************************ Collection *******************************/

/************************************ View *******************************/
//~ on affiche une vue mais faut passer le model en parametre
  var currentDataView = Backbone.View.extend({
 		events: {
			"click #Bt_save" : "saveStyle",
			"change input" : "fieldChange"
        },
  		initialize: function(){
			//this est passé aux fonctions render et saveStyle
			_.bindAll(this, 'render','saveStyle','fieldChange');
			//si on modifie les donnée du model on reaffiche
			this.model.bind('change', this.render, this);
			this.model.bind('change:currentField', 		this.changeCurrentField, this);
			this.model.bind('change:currentElement', 	this.changeCurrentElement, this);
			this.model.bind('change:currentName', 		this.changeCurrentName, this);
			this.render();
        },
		render: function(){
		//~ on recupere les valeurs de this declarer dans initialize bind
			var mcurrentElement=this.model.get('currentElement');
			var mcurrentField=this.model.get('currentField');
			var mcurrentFieldData=this.model.get('currentFieldData');
			var mcurrentType=this.model.get('currentType');
			var mcurrentName=this.model.get('currentName');

			//~ on retourne une ligne de code html
			var template ="<table><tr><td>Name</td><td><input type='text' id='currentNameEl' value='"+mcurrentName+"'/></td>";
			template=template+"<td><button id='Bt_save'>Save</button></td></tr>";
				template=template+"<tr><td>Current Element :</td><td><div id='currentElement'>"+mcurrentElement+"</div></td></tr>";
				template=template+"<tr><td>Current Field :</td><td><div id='currentField'>"+mcurrentField+"</div></td></tr>";
				template=template+"<tr><td>Current Field Data :</td><td><div id='currentFieldData'>"+mcurrentFieldData+"</div></td></tr>";
				template=template+"<tr><td>Current Type :</td><td><div id='currentType'>"+mcurrentType+"</div></td></tr>";
			template=template+"</tr></table>";


		//~ template=(mtype=="color")?template+"<button type='button'>Click Me!</button> ":template;
			$("#currentDataZone").html(template);
			//~ return template;
		},
		fieldChange: function(e){
			//quand on modifie le nom, on change le modele
			var field = $(e.currentTarget);
			var valChg=field.val();
			this.model.set("currentName",valChg);
		},

		changeCurrentField: function(){
			var ici=this.model.get("currentField");
			elementCurr=this.model.get("currentElement");
			field=this.model.get("currentField");
			fielddata=this.model.get("currentFieldData");
			//~ alert("changeCurrentField "+elementCurr+"  " +field+"  "+fielddata);
			//~ var monObjet=mContent.get(elementCurr).get("mObject").set(this.get("name"),this.get("value"))
		},

		changeCurrentElement: function(){
			var ici=this.model.get("currentElement");

			//~ alert("changement element "+ici);
			var maColl=mContent.get(ici).get("svgParameterList");
			// on reactualise l'affichage des valeurs
			var msvgParameterListView=new svgParameterListView({el: $("#svgParameterZone"), collection: maColl});
			msvgParameterListView.render();
		},

		changeCurrentName: function(){
			var ici=this.model.get("currentName");
			//~ alert("changement de nom "+ici);
		},

		saveStyle: function(){
			//~ alert(JSON.stringify(this.model));
			var ici=this.model.get("currentElement")
			//~ on genere le code du style
			var monstyle = "."+ici+" "+mContent.get(ici).get("svgParameterList").cssStyle();
			alert(monstyle);
		}

	});

/************************************ CollectionView *******************************/

/************************************ Application *******************************/
var mCurrent=new currentData();
