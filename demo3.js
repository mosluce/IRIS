/**
 * @author MOS CHEN
 */

(function() {
	var scene_points = [];
	
	function init() {
		initSettings();
		initEvents();
	}
	
	function initSettings() {
		jsPlumb.Defaults.Container = 'canvas';
	}
	
	function initEvents() {
		$('#canvas').click(function(e) {
			var newPoint = $(document.createElement('div'))
				.attr('id', 'scene_point_' + scene_points.length)
				.addClass('scene_point')
				.css('left', e.offsetX)
				.css('top', e.offsetY);
			
			newPoint.click(function() {
				return false;
			});
				
			scene_points.push(newPoint);
			
			$(this).append(newPoint);
			
			var last_index = scene_points.length - 1;
			
			if(last_index != 0) {
				connect(scene_points[last_index], scene_points[last_index-1]);
			}
		});
	}
	
	function connect(source, target) {
		var s = jsPlumb.addEndpoint(source.attr('id'));
		var t = jsPlumb.addEndpoint(target.attr('id'));
		
		jsPlumb.connect({
			source:s, 
			target:t
		});
		
		jsPlumb.draggable(source.attr('id'));
		jsPlumb.draggable(target.attr('id'));
	}
	
	jsPlumb.bind("ready", init);
})();
