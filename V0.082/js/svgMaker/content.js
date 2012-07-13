/************************************ Function *******************************/


/************************************ Model *******************************/
var content = Backbone.Model.extend({
	//liste les objets contenus dans la zone graphique
	defaults: function() {
      return {
		id : null,
        svgStructureName: "",
		svgParameterList: "",
		mObject:""
      };
    },
	initialize: function() {
		var self=this;
		this.svgParameterList=new svgParameterList();
    }
});

/************************************ Collection *******************************/
var contentList = Backbone.Collection.extend({
	initialize: function(props) {
		props=(props==undefined)?{model: content} : props;
		this.url=(props.url==undefined)? "model.json" : props.url;
		this.model=(props.model==undefined)? content : props.model;
	}
});

/************************************ View *******************************/

/************************************ CollectionView *******************************/

/************************************ Application *******************************/
var mContent=new contentList();