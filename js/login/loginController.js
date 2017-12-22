define(['app', 'js/login/loginView', 'js/utils'], function(app, loginView, utils) {
	var $ = Dom7;
	var bindings = [{
		element:'.server-url-setting',
		event:'click',
		handler:setServerUrl	
		
	}];

	function init() {
		loginView.render({
			bindings: bindings,
			loginCallback:login
		});
	}

	function login(loginData) {		
		var basePath=app.utils.getServerUrl();
		if(!basePath)
		{
			setServerUrl();
			app.f7.alert("请设置服务器地址！");
			return;
		}
		$.post(basePath + '/api/webapp/login', loginData, function(data) {
			var jsonData = JSON.parse(data);
			if(jsonData.success == false) {
				app.f7.alert(jsonData.msg);
				return;
			}
			debugger
			//app.f7.alert(jsonData.id);
			//token
			localStorage.setItem(hcmIdentityTokenConst, jsonData.id);
			//员工信息
			localStorage.setItem(hcmEmployeeInfoConst,JSON.stringify(jsonData.empinfo));
			app.f7.closeModal(".login-screen");
			app.robotView.router.refreshPage();
			app.workView.router.refreshPage();
			app.contactsView.router.refreshPage();
			app.personalView.router.refreshPage();
		});

	}
	function setServerUrl()
	{
		app.router.load("","serverUrl");
	}
	return {
		init: init
	};
})