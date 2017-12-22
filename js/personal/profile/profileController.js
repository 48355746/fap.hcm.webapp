define(["app", "js/utils", "js/personal/profile/profileView"], function(app, utils, profileView) {
	var $ = Dom7;
	var bindings = [{
			element: '.logout-button',
			event: 'click',
			handler: logout
		}
	];
	function init() {
		var empinfo = JSON.parse(localStorage.getItem(hcmEmployeeInfoConst));
		var iframesrc = utils.getServerUrl();
		var token = utils.getUserToken();
		var params = {
			id: empinfo.empUid,
			"webapp-token": token
		};
		iframesrc += "Home/UserPhoto/?" + $.serializeObject(params)
		empinfo.imgsrc = iframesrc;


		profileView.render({
			model: empinfo,
			bindings: bindings
		});
	}

	function logout() {
		localStorage.removeItem(hcmIdentityTokenConst);
		app.f7.loginScreen();
	}
	return {
		init: init
	};
});