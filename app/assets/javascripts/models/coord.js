Portfolio.Models.Coord = Backbone.Model.extend({
  initialize: function (array) {
    this.i = array[0];
	this.j = array[1];
  },
  
  plus: function (coord2) {
    return new Portfolio.Models.Coord([this.i + coord2.i, this.j + coord2.j]);
  }
})