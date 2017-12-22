require.config({
	paths: {
		handlebars: "lib/handlebars",
		text: "lib/text",
		hbs: "lib/hbs"
	},
	shim: {
		handlebars: {
			exports: "Handlebars"
		}
	}
});
define('app', ['js/router', 'js/utils'], function(Router, Utils) {
	var $$ = Dom7;
	Router.init();
	var f7 = new Framework7({
		modalTitle: 'HCM',
		swipePanel: 'left',
		animateNavBackIcon: true,
		// Hide and show indicator during ajax requests page
		//		onAjaxStart: function(xhr) {
		//			f7.showIndicator();
		//		},
		//		onAjaxComplete: function(xhr) {
		//			f7.hideIndicator();
		//		}
	});
	$$(document).on('ajaxStart', function(e) {
		var xhr = e.detail.xhr;
		xhr.setRequestHeader("Authorization", "Basic " + Utils.getUserToken());
		//f7.showPreloader();
		console.log('ajaxStart');
	});
	$$(document).on('ajaxComplete', function(e) {
		var xhr = e.detail.xhr;
		//f7.hidePreloader();
		console.log('ajaxComplete');
	});
	$$(document).on('ajaxSuccess', function(e) {
		var xhr = e.detail.xhr;
		console.log('ajaxSuccess');
	});
	$$(document).on('ajaxError', function(e) {
		//var xhr = e.detail.xhr;
		f7.alert("ajaxError");
	});
	var userToken = localStorage.getItem(hcmIdentityTokenConst);
	//未登录弹出登录界面
	if(userToken == null) {
		f7.loginScreen();
	}
	//一定要初始化view 切记
	var robot = f7.addView('#robot', {
		dynamicNavbar: true
	});
	var work = f7.addView('#work', {
		dynamicNavbar: true
	});
	var contacts = f7.addView('#contacts', {
		dynamicNavbar: true
	});
	var personal = f7.addView('#personal', {
		dynamicNavbar: true
	});
	var isAndroid = Framework7.prototype.device.android === true;
	var isIos = Framework7.prototype.device.ios === true;
	return {
		f7: f7,
		robotView: robot,
		contactsView: contacts,
		workView: work,
		personalView: personal,
		router: Router, //路由
		utils: Utils,
		android:isAndroid,
		ios:isIos
	};
});