angular.module('AngularD3BarGraph', [])
  .directive('bargraph', function () {
    return {
      restrict: 'E',
	  replace: true,
      transclude: false,
      compile: function (elem, attrs) {
		console.log(attrs.id);
		console.log(attrs.datajson);
		var html = "<div id='" + attrs.id + "' ></div>";
		var newElem = $(html);
        elem.replaceWith(newElem);
		var ourGraph = new BarGraph(attrs.datajson,attrs.xaxisName,attrs.xaxisPos,attrs.yaxisName,attrs.yaxisPos,attrs.d3Format);
		ourGraph.workOnElement('#'+attrs.id);
        ourGraph.generateGraph();
      }
    }
  });
