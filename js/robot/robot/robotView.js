define(['hbs!js/robot/robot/robot'], function(viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('.robot-page').html(viewTemplate({ model: params.model }));
	}


	return {
		render: render
	}
});