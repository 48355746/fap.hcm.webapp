define(['hbs!js/robot/robotList/robotList'], function(template) {
	var $ = Dom7;
	//注册一个翻译用的Helper，翻译分类
	Handlebars.registerHelper("transHrDocumentCategory", function(value) {
		if(value == 'Desc') {
			return "说明书";
		} else if(value == 'Rule') {
			return "规章制度";
		}
	});

	function render(params) {
		$('.docs-list ul').html(template(params.model));
		bindEvents(params.bindings);
	}

	function reRender(params) {
		$('.docs-list ul').html(template(params.model));
	}

	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).off(bindings[i].event, bindings[i].handler).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		render: render,
		reRender: reRender
	};
});