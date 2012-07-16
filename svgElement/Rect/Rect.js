/************************************ Model *******************************/
var Rect = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
        name: "",
		x: 0,
		y: 0,
		w: 10,
		h: 10,
		style:""
      };
    },
    clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/

/************************************ View *******************************/
var RectView = Backbone.View.extend({
		model: Rect,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var selection=d3.select(this.el)
			selection.append("rect").attr("id",this.model.get("id"))
					//~ .on("mouseover", this.mouseover())
					//~ .on("mouseout",  this.mouseout())
					//~ .on("mousedown",  this.mousedown());
				this.update();


		},
		update: function(){
			var selection=d3.select("#"+this.model.get("id"))
			selection
				.transition()
				.duration(750)
				.delay(10)
					.attr("x",this.model.get('x'))
					.attr("y",this.model.get('y'))
					.attr("width",this.model.get('w'))
					.attr("height", this.model.get('h'))
					.attr("class", this.model.get('style'))

		//~ },
		//~ mouseover: function(){

		//~ },
		//~ mouseout: function(){

		//~ },
		//~ mousedown: function(){

		}

	});
/************************************ CollectionView *******************************/

/************************************ Application *******************************/
//~ var maZone=d3.select("#graphZone").append("svg")
				//~ .attr("id","drawZone");

//~ var  maShape=new Rect({ 	id : "monrect",
							//~ name: "monrect",
							//~ x: 20,
							//~ y: 20,
							//~ w: 100,
							//~ h: 100,
							//~ style:"cssShape1"});

//~ var maVue=new RectView({el: "#drawZone", model: maShape});