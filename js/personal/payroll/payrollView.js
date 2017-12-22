define(['hbs!js/personal/payroll/payroll'], function(viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('#payroll-list').html(viewTemplate(params.model));
		bindEvents(params.bindings);
	}

	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function reRender(params) {
		$('#payroll-list').html(viewTemplate(params.model));
	}
	return {
		render: render,
		reRender: reRender
	}
});