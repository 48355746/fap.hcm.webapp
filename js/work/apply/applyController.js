define(["app", "js/utils", "js/work/apply/applyView"], function(app, utils, View) {
	var $ = Dom7;

	function init(query) {
		var iframesrc = utils.getServerUrl();
		var token = utils.getUserToken();
		var params = {
			"webapp-token": token
		};
		if(query && query.id) {
			params.id = query.id;
		}
		var bizUrl;
		if(query && query.type) {
			var bizType = query.type;
			if(bizType == "myapply") {
				bizUrl = "PublicApi/WebApp/BizApply?"
			} else if(bizType == 'todo') {
				bizUrl = "PublicApi/WebApp/TodoTask?"
			} else if(bizType == 'agent') {
				bizUrl = "PublicApi/WebApp/AgentTask?";
			} else if(bizType == 'calendar') {
				bizUrl = "PublicApi/WebApp/MyCalendar?";
			}else if(bizType=="time")
			{
				bizUrl="PublicApi/WebApp/MyTime?";
			}
		}
		iframesrc += bizUrl + $.serializeObject(params)
		View.render({
			model: iframesrc
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}
	//跨域通信刷新待办个数
	window.addEventListener('message', function(e) {
		var msg = e.data;
		if(msg) {
			utils.rendTodoCount();
		}
	}, false);
	return {
		init: init
	};
});