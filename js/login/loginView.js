define(['app', 'hbs!js/login/login'], function(app, viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('.login-page').html(viewTemplate());
		bindEvents(params.bindings);
		bindLoginEvent(params.loginCallback);
	}
  
	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function bindLoginEvent(loginCallback) {
		$('.login').on('click', function() {
			var loginData = app.f7.formToJSON("#login-form");
			if(loginData.un == '') {
				app.f7.alert('用户名不能为空!');
				return;
			}
			if(loginData.pwd == '') {
				app.f7.alert('密码不能为空！');
				return;
			}
			loginCallback(loginData);
		});
		
	}
	return {
		render: render
	}
});