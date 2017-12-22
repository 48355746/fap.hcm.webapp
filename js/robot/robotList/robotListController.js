define(["app", "js/utils", "js/robot/robotList/robotListView"], function(app, utils, robotListView) {
	var $ = Dom7;
	var docs = {};
	var bindings = [{
			element: '#pull-robot-refresh',
			event: 'refresh',
			handler: refreshRobot
		},
		{
			element: '.hcm-layout-theme',
			event: 'click',
			handler: layoutTheme
		},
		{
			element: '.hcm-color-theme',
			event: 'click',
			handler: colorTheme
		},
		{
			element: '.clearcache-button',
			event: 'click',
			handler: clearCache
		}
	];

	function init() {
		var hrdocuments = loadDocuments();
		robotListView.render({
			model: hrdocuments,
			bindings: bindings
		});
	}
	var themes = 'theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray';
	var layouts = 'layout-dark layout-white';

	function layoutTheme() {
		$('body').removeClass(layouts).addClass('layout-' + $(this).attr('data-theme'));
	}

	function colorTheme() {
		$('body').removeClass(themes).addClass('theme-' + $(this).attr('data-theme'));
		$(".list-index").css("color",$(this).attr('data-theme'));
	}

	function clearCache() {
		app.f7.showIndicator();
		var server = localStorage.getItem(hcmServerAddressConst);
		var token = localStorage.getItem(hcmIdentityTokenConst);
		//员工信息
		var empinfo = localStorage.getItem(hcmEmployeeInfoConst);
		localStorage.clear();
		localStorage.setItem(hcmServerAddressConst, server);
		localStorage.setItem(hcmIdentityTokenConst, token);
		//员工信息
		localStorage.setItem(hcmEmployeeInfoConst, empinfo);
		app.robotView.router.refreshPage();
		app.workView.router.refreshPage();
		app.contactsView.router.refreshPage();
		app.personalView.router.refreshPage();
		app.f7.hideIndicator();
	}

	function refreshRobot() {
		localStorage.removeItem("hrdocument");
		var hrdocuments = loadDocuments();
		robotListView.reRender({
			model: hrdocuments
		});
		app.f7.pullToRefreshDone("#pull-robot-refresh");
	}

	function loadDocuments() {
		var f7hrdocs = localStorage.getItem("hrdocument");
		var hrdocs = f7hrdocs ? JSON.parse(f7hrdocs) : initializeDocuments();
		return hrdocs;
	}

	function initializeDocuments() {
		var data = {
			tablename: 'HrDocument',
			rows: 10,
			page: 1,
			sidx: "SortBy",
			sord: "asc",
			filters: ""
		};
		app.utils.ajaxPost("api/webapi/QueryEntity", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				//处理逻辑
				docs = rv;
				localStorage.setItem("hrdocument", JSON.stringify(docs));
			}
		});
		return docs;
	}

	return {
		init: init
	};
});