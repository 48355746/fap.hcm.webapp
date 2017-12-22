define(['hbs!js/personal/msgcontent/msgcontent'], function(viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('.msgcontent-page').html(viewTemplate({ model: params.model }));
	}


	return {
		render: render
	}
});