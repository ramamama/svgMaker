/************************************ Model *******************************/
var Shape = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
        name: "",
		fill: "",
		stroke: "",
		strokewidth: ""
      };
    },
    clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/


/************************************ View *******************************/
var ShapeView = Backbone.View.extend({
		model: Shape,
		initialize: function() {
		    _.bindAll(this, 'render');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var selection=d3.select(this.el)
				selection.append("rect").attr("id",this.model.get("id"));
				this.update();

		},
		update: function(){
			var selection=d3.select("#"+this.model.get("id"))
			selection
				.attr("x",20)
				.attr("y",20)
				.attr("width",100)
				.attr("height", 100)
				.style("fill", this.model.get('fill'))
				.style("stroke", this.model.get('stroke'))
				.style("stroke-width", this.model.get('strokewidth'));
		}
	});

/************************************ CollectionView *******************************/

/************************************ Application *******************************/
//~ var maZone=d3.select("#graphZone").append("svg")
				//~ .attr("id","drawZone");

//~ var  maShape=new Shape({ id: "Shape1",
						//~ name: "Shape1",
						//~ fill: "Blue",
						//~ stroke: "Red",
						//~ strokewidth: "3"});

//~ var maVue=new ShapeView({el: "#drawZone", model: maShape});