Portfolio.Models.Coord = Backbone.Model.extend({
  initialize: function (i, j) {
    this.i = i;
	this.j = j;
  },
  
  plus: function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  }
})