define(['app', 'hbs!js/serverUrl/serverUrl'], function(app, editTemplate) {
	var $ = Dom7;

	function render(params) {
		var template = editTemplate({
			model: params.model
		});
		app.f7.popup(template);
		//bindEvents(params.bindings);
		bindSaveEvent(params.doneCallback);
	}

	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function bindSaveEvent(doneCallback) {
		$('.serveraddress-save-link').on('click', function() {
			var inputValues = $('.serveraddress-edit-form input');
			var model = {};
			$.each(inputValues, function(i, item) {
				if(item.type === 'checkbox') {
					model[item.id] = item.checked;
				} else {
					model[item.id] = item.value;
				}
			});
			doneCallback(model);
		});
	}

	return {
		render: render
	};
});