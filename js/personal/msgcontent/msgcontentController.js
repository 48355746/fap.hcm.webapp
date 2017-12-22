define(["app", "js/utils", "js/personal/msgcontent/msgcontentView"], function(app, utils, msgcontentView) {
	var $ = Dom7;

	function init(query) {
		var msg;
		var messages = JSON.parse(localStorage.getItem(hcmf7MessagesConst));
		if(query && query.id) {
			msg = _.find(messages.rows, {
				Fid: query.id
			});
			msg.HasRead = 1;
			localStorage.setItem(hcmf7MessagesConst, JSON.stringify(messages));
			remarkHasRead(query.id);
		}
		msgcontentView.render({
			model: msg,
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}
	//标记已读
	function remarkHasRead(fid) {
		app.utils.ajaxPost("api/webapi/MessageHasRead", {
			muid: fid,
		}, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			}
		});

	};
	return {
		init: init
	};
});