define(['app', 'hbs!js/work/apply/apply'], function(app, applyTemplate) {
	var $ = Dom7;

	function render(params) {
		var template = applyTemplate(params.model);
		$(".apply-page").html(template);
		app.f7.showPreloader();
		$("#iframeApplyContent")[0].onload = function() {
			app.f7.hidePreloader();
		}		

	}

	return {
		render: render
	};
});