define(["app", "js/personal/message/messageView", "js/utils"], function(app, messageView, utils) {
	var $ = Dom7;
	var bindings = [{
		element: '.infinite-scroll',
		event: 'infinite',
		handler: refreshMessages
	}, {
		element: '.msg-mark-read',
		event: 'click',
		handler: markRead
	}, {
		element: '.swipeout',
		event: 'deleted',
		handler: deleteMessage
	}];

	function init(query) {
		debugger
		if(query && query.id == 0) {
			localStorage.removeItem(hcmf7MessagesConst);
		}
		var messages = getMessage();
		messageView.render({
			model: messages,
			bindings: bindings
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}

	// 加载flag
	var loading = false;

	// 上次加载的序号
	var lastIndex = 0;

	// 最多可加载的条目
	var maxItems = 60;

	function refreshMessages() {

		if(lastIndex >= maxItems) {
			// 加载完毕，则注销无限加载事件，以防不必要的加载
			app.f7.detachInfiniteScroll($('.infinite-scroll'));
			// 删除加载提示符
			$('.infinite-scroll-preloader').remove();
			return;
		}
		// 如果正在加载，则退出
		if(loading) {
			return;
		}
		var totalmsg = JSON.parse(localStorage.getItem(hcmf7MessagesConst));
		// 设置flag
		loading = true;
		var page = Math.floor(lastIndex / 10) + 1;
		var filter = {
			"groupOp": "AND",
			rules: [{
				"field": "REmpUid",
				"op": "eq",
				"data": utils.getLoginInfo().empUid
			}]
		};
		var data = {
			tablename: 'FapMessage',
			rows: 10,
			page: page,
			sidx: "SendTime",
			sord: "desc",
			filters: JSON.stringify(filter)
		};
		utils.ajaxPost("api/webapi/QueryEntity", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				// 重置加载flag
				loading = false;
				// 更新最后加载的序号
				lastIndex = (page - 1) * 10 + rv.rows.length;

				$.each(rv.rows, function(i, item) {
					var html = messageView.reRender({
						model: item
					});
					$('#message-page').append(html);
				});
				rv.rows = _.union(totalmsg.rows, rv.rows);
				localStorage.setItem(hcmf7MessagesConst, JSON.stringify(rv));
			}
		})

	}

	function markRead(e) {
		var fid = $(e.currentTarget).data("fid");
		utils.ajaxPost("api/webapi/MessageHasRead", {
			muid: fid
		}, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				var messages = JSON.parse(localStorage.getItem(hcmf7MessagesConst));
				msg = _.find(messages.rows, {
					Fid: fid
				});
				msg.HasRead = 1;
				localStorage.setItem(hcmf7MessagesConst, JSON.stringify(messages));
				$(e.currentTarget).parent().prev().find(".badge").remove();
			}

		});
	}

	function deleteMessage(e) {
		debugger
		var fid = $(e.currentTarget).data("fid");
		var data = {
			TableName: "FapMessage",
			Id: fid,
			oper: "del",
		};
		utils.ajaxPost("api/webapi/Persistence/", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				var messages = JSON.parse(localStorage.getItem(hcmf7MessagesConst));
				_.remove(messages, function(n) {
					return n.Fid == fid;
				});
				localStorage.setItem(hcmf7MessagesConst, JSON.stringify(messages));
			}
		});

	}

	function getMessage() {
		var msg = localStorage.getItem(hcmf7MessagesConst);
		var messages = msg ? JSON.parse(msg) : tempInitializeMessageStorage();
		//var messages = tempInitializeMessageStorage(1);
		return messages;
	}

	function tempInitializeMessageStorage(page) {
		var message;
		var filter = {
			"groupOp": "AND",
			rules: [{
				"field": "REmpUid",
				"op": "eq",
				"data": utils.getLoginInfo().empUid
			}]
		};
		var data = {
			tablename: 'FapMessage',
			rows: 10,
			page: page,
			sidx: "SendTime",
			sord: "desc",
			filters: JSON.stringify(filter)
		};
		utils.ajaxPost("api/webapi/QueryEntity", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				//处理逻辑
				message = rv;
				maxItems = rv.records;
				lastIndex = rv.rows.length;
				localStorage.setItem(hcmf7MessagesConst, JSON.stringify(message));
				if(maxItems <= 10) {
					// 加载完毕，则注销无限加载事件，以防不必要的加载
					app.f7.detachInfiniteScroll($('.infinite-scroll'));
					// 删除加载提示符
					$('.infinite-scroll-preloader').remove();
				}
			}
		});
		return message;
	}
	return {
		init: init
	};
});