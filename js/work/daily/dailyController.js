define(["app", 'js/utils', "js/work/daily/dailyView"], function(app, utils, dailyView) {
	var $ = Dom7;
	var bindings = [{
		element: '.work-refresh-link',
		event: 'click',
		handler: refreshWorks
	}];

	function init(query) {
		var applist = loadAppList();
		dailyView.render({
			model: applist,
			bindings: bindings,
		});
		utils.rendTodoCount();
	}

	function refreshWorks() {
		localStorage.removeItem(hcmf7AppListConst);
		var apps = loadAppList();
		dailyView.reRender({
			model: apps
		});
		utils.rendTodoCount();
	}

	function loadAppList() {
		var f7AppList = localStorage.getItem(hcmf7AppListConst);
		var apps = f7AppList ? JSON.parse(f7AppList) : tempInitializeStorage();
		return apps;
	}

	function tempInitializeStorage() {
		app.f7.showPreloader();
		var data = {
			tablename: 'WfBusinessType',
			querycols: 'Fid,TypeName,TypeCode',
			rows: 1000,
			page: 1,
			sidx: "BillTable",
			sord: "asc",
			filters: ""
		};
		app.utils.ajaxPost("api/webapi/QueryEntity", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				//处理逻辑					
				localStorage.setItem(hcmf7AppListConst, JSON.stringify(rv.rows));
			}
		}, function() {
			app.f7.hidePreloader();
		})
		return JSON.parse(localStorage.getItem(hcmf7AppListConst));
	}

	return {
		init: init
	};
});