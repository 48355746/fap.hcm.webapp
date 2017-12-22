define(function() {
	var $ = Dom7;

	function generateGUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return(c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
		});
		return uuid;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	//获取服务器地址
	function getServerUrl() {
		var serverModel = JSON.parse(localStorage.getItem(hcmServerAddressConst));
		var basePath;
		if(serverModel) {
			basePath = "http://" + serverModel.host + ":" + serverModel.port + "/";
		}
		return basePath;
	}
	//获取用户令牌
	function getUserToken() {
		var userToken = localStorage.getItem(hcmIdentityTokenConst);
		return userToken;
	}
	//获取登录信息
	function getLoginInfo() {
		return JSON.parse(localStorage.getItem(hcmEmployeeInfoConst));
	}
	//获取待办
	function rendTodoCount() {
		var url = getServerUrl() + 'api/webapi/todocount';
		var todo;
		$.ajax({
			type: "GET",
			url: url,
			async: false,
			dataType: 'json',
			success: function(rv) {
				if(rv.success == false) {
					//app.f7.alert(rv.msg);
					return;
				} else {
					//处理逻辑
					todo = rv;
				}
			}
		})
		if(todo.total > 0) {
			$("[href='#work']").html("<i class='icon f7-icons inactive'>drawers<span class='badge bg-red'>" + todo.total + "</span></i><i class='icon f7-icons active'>drawers_fill<span class='badge bg-red'>" + todo.total + "</span></i><span class='tabbar-label'>工作</span>");
		} else {
			$("[href='#work']").html('<i class="icon f7-icons inactive">drawers</i><i class="icon f7-icons active">drawers_fill</i><span class="tabbar-label">工作</span>');
		}
		if(todo.todoTotal > 0) {
			$("[href='#mytodo']").html("待办任务<span class='badge bg-red'>" + todo.todoTotal + "</span>");
		} else {
			$("[href='#mytodo']").html("待办任务");
		}
		if(todo.agentTotal > 0) {
			$("[href='#myagent']").html("代理任务<span class='badge bg-red'>" + todo.todoTotal + "</span>");
		} else {
			$("[href='#myagent']").html("代理任务");
		}
		$("#agentTaskList li a .item-content .item-inner .item-after").remove();
		$("#todoTaskList li a .item-content .item-inner .item-after").remove();
		$.each(todo.todo, function(k, v) {
			$(".todo-" + k).append('<div class="item-after"><span class="badge bg-red">' + v + '</span></div>');
		});

		$.each(todo.agent, function(k, v) {
			$(".agent-" + k).append('<div class="item-after"><span class="badge bg-red">' + v + '</span></div>');
		});
		return todo;
	}

	function ajaxPost(url, data, success, complete) {
		var ajaxUrl = getServerUrl() + url;
		$.ajax({
			type: "POST",
			url: ajaxUrl,
			async: false,
			data: data,
			dataType: 'json',
			success: function(rv) {
				success && success(rv);
			},
			beforeSend: function() {

			},
			complete: function(xhr) {
				complete && complete(xhr);
			}
		})
	}

	function ajaxGet(url, data, success, complete) {
		var ajaxUrl = getServerUrl() + url;
		$.ajax({
			type: "GET",
			url: ajaxUrl,
			async: false,
			data: data,
			dataType: 'json',
			success: function(rv) {
				success && success(rv);
			},
			beforeSend: function() {

			},
			complete: function(xhr) {
				complete && complete(xhr);
			}
		})
	}
	//安卓回退事件
	function backPrePage() {
		var view = $(this).parents('.view')[0] && $(this).parents('.view')[0].f7View
		view.allowPageChange = true;
		view.router.reloadPreviousPage();
	}
	return {
		ajaxPost: ajaxPost,
		ajaxGet: ajaxGet,
		generateGUID: generateGUID,
		getRandomInt: getRandomInt,
		getServerUrl: getServerUrl,
		getUserToken: getUserToken,
		getLoginInfo: getLoginInfo,
		rendTodoCount: rendTodoCount,
		backPrePage: backPrePage
	};
});