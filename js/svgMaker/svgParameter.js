
/************************************ Model *******************************/
var svgParameter = Backbone.Model.extend({
//~ on definit la structure de l'element css
	defaults: function() {
      return {
		id : null,
        name: "",
		defaultvalue: "",
        value: "",
		categorie: "",
        info: "",
		type: ""
      };
    },
     clear: function() {
	//~ on permet aussi de detruire l'element
		this.destroy();
    }
  });


/************************************ Collection *******************************/
  var svgParameterList = Backbone.Collection.extend({
	//on permet de charger different model de donnée
		initialize: function(props) {
			var self=this;

		// on definit les comportement de la collection
			_.bindAll(this, "cssStyle","changeCollectionvalue");

			//les valeurs par default doiven,t etre coder en dur
			props=(props==undefined)?{model: svgParameter} : props;
			this.url=(props.url==undefined)? "model.json" : props.url;
			this.elem=(props.elem==undefined)? "#age" : props.elem;
			this.model=(props.model==undefined)? svgParameter : props.model;

			//on remplit avec les valeurs dans le fichier JSON
			this.fetch();
		},

		cssStyle: function(){
			//on genere la sequence json pour ce style
			mstr="{";
			this.each(function(model){
				var mname=model.get('name');
				var mvalue=model.get('value');
				mstr=mstr+mname+': "'+mvalue+'", ';
			},this);
			mstr=mstr.substring(0,mstr.length-2)+"}";
			return mstr;
		},

		changeCollectionvalue: function(newColl){
		//~ copie data from a collection to another
			newColl.each(function(model){
				var mname=model.get('id');
				var mvalue=model.get('value');
				//~ alert(mname);
				this.get(mname).set("value",mvalue)
			},this);
			//~ alert(JSON.stringify(this));

		}

});

/************************************ View *******************************/
//~ on affiche une vue mais faut passer le model en parametre
  var svgParameterView = Backbone.View.extend({
		events: {
			"change input" : "fieldChange",
			"click button" : "selectField"
        },
		initialize: function(){
			var that=this;
			_.bindAll(that, "render","fieldChange","changeStyle");
			this.model.bind('change', this.changeStyle, this);
        },
		fieldChange: function(e){
		//~ si change valeur champ on change l'objet model
			var field = $(e.currentTarget);
			var elementCurr=this.model.get("id");
				var elementChg=field.attr('id');
				var valChg=field.val();
				if (elementCurr==elementChg){
					this.model.set({value: valChg});
				}
		},

		changeStyle: function(){
		//on met à jour l'affichage de l'objet
			var elementCurr=mCurrent.get("currentElement");
			mCurrent.set("currentField",this.model.get("id"));
			mCurrent.set("currentFieldData",this.model.get("value"));
			if (elementCurr!=""){
				var monObjet=mContent.get(elementCurr).get("mObject").set(this.model.get("id"),this.model.get("value"));
			}
		},
		selectField: function(e){
			//select a field and it's widget
				var elementChg = $(e.currentTarget).attr('id');
				var elem = elementChg.split('_');
					widgetType=elem[1];
					fieldSel=elem[2];

				var elementField=this.model.get("id");
				//on evite de boucler sur tous les boutons
				if ("wdgt_"+widgetType+"_"+elementField==elementChg){
						var elementCurr=mCurrent.get("currentElement");

					if (elementCurr!=""){
						//on change le champ selectionner
						var monObjet=mContent.get(elementCurr).get("mObject").get(fieldSel);
						mCurrent.set("currentField",fieldSel);
						mCurrent.set("currentFieldData",monObjet);
						showWidget(widgetType);
					} //end if
				}//end if bt
		},

       render: function(){
		//~ on recupere les valeurs de this declarer dans initialize bind
			var mname=this.model.get('name');
			var mvalue=this.model.get('value');
			var mdefault=this.model.get('defaultvalue');
			var mid=this.model.get('id');
			var mtype=this.model.get('type');

			var mstyle=(mvalue==mdefault)? "default":"pasdefault";

		//~ on retourne une ligne de code html
			var template ="<tr class='"+mstyle+"'><td>"+mname+"</td><td><input type='text' id='"+mid+"' value='"+mvalue+"'/></td>";
			template=template+"<td><button id='wdgt_"+mtype+"_"+mid+"'>Widget</button></td>";
			template=template+"<td><button id='info_"+mid+"'>I</button></td>";

			template=template+"</tr>";
			return template;
			}
	});

/************************************ CollectionView *******************************/
//~ /on affiche la liste de vue
var svgParameterListView = Backbone.View.extend({
		initialize: function() {
		    _.bindAll(this, 'render');
			this.collection.on('reset', this.render, this);
			this.collection.bind('change', this.render, this);

		},
		render: function(){
			var self=this;
			var tmpstr="<table>";
			this.collection.each(function(model){
				var view = new svgParameterView({ el: this.el, model: model });
					tmpstr=tmpstr+view.render();
			},this);
			tmpstr=tmpstr+"</table>";

			$(this.el).html(tmpstr);
		}

	});

//~ /************************************ Application *******************************/
var msvgParameterList=new svgParameterList({url: "svgElement/Shape/Shape.json", elem: "#contentZone"})
var msvgParameterListView=new svgParameterListView({el: $("#svgParameterZone"), collection: msvgParameterList});