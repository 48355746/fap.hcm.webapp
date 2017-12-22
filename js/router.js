define(function() {
	var $ = Dom7;

	/**
	 * Init router, that handle page events
	 */
	function init() {
		$(document).on('pageBeforeInit', function(e) {
			var page = e.detail.page;
			var userToken = localStorage.getItem(hcmIdentityTokenConst);
			//未登录弹出登录界面
			if(userToken == null&&page.name!=='login') {
				return;
			}
			var pagePath=page.name.split("-");
			var moduleName="";
			var controllerName="";
			if(pagePath.length>1)
			{
				moduleName=pagePath[0];
				controllerName=pagePath[1];
			}else{
				controllerName=pagePath[0];
			}
			load(moduleName,controllerName, page.query);
		});
		
	}

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
	 */
	function load(moduleName,controllerName, query) {
		var controller = 'js/'+(moduleName==''?'':(moduleName+'/')) + controllerName + '/' + controllerName + 'Controller';
		require([controller], function(controller) {
			controller.init(query);
		});
	}

	return {
		init: init,
		load: load
	};
});