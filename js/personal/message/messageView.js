define(['hbs!js/personal/message/message','hbs!js/personal/message/msg'], function(viewTemplate,msgViewTmp) {
	var $ = Dom7;

	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function render(params) {
		$('#message-page').html(viewTemplate(params.model));
		bindEvents(params.bindings);
	}
	function reRender(params)
	{
		return msgViewTmp(params.model);
	}
	return {
		render: render,
		reRender:reRender
	}
});