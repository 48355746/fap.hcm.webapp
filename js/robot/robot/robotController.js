define(["app","js/utils","js/robot/robot/robotView"], function(app,utils, robotView) {	
	var $ = Dom7;
	function init(query){
		var doc;
		var hrdocument = JSON.parse(localStorage.getItem("hrdocument"));
		if (query && query.id) {
			doc = _.find(hrdocument.rows, { Fid: query.id });
		}
		robotView.render({
			model: doc,
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}

	return {
		init: init
	};
});