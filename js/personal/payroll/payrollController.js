define(["app", "js/personal/payroll/payrollView", "js/utils"], function(app, payrollView, utils) {
	var $ = Dom7;
	var contact = null;
	var bindings = [{
			element: '#btnPreOne',
			event: 'click',
			handler: queryOne
		},
		{
			element: '#btnPreThree',
			event: 'click',
			handler: queryThree
		},
		{
			element: '#btnPreSix',
			event: 'click',
			handler: querySix
		}
	];

	function init(query) {
		var payroll = queryPayroll(1);
		payrollView.render({
			model: payroll,
			bindings: bindings
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}

	function queryOne() {
		var payroll = queryPayroll(1);
		payrollView.reRender({
			model: payroll,
		});
		$("#btnPreOne").addClass("active");
		$("#btnPreThree").removeClass("active");
		$("#btnPreSix").removeClass("active");
	}

	function queryThree() {
		var payroll = queryPayroll(3);
		payrollView.reRender({
			model: payroll,
		});
		$("#btnPreOne").removeClass("active");
		$("#btnPreThree").addClass("active");
		$("#btnPreSix").removeClass("active");
	}

	function querySix() {
		var payroll = queryPayroll(6);
		payrollView.reRender({
			model: payroll,
		});
		$("#btnPreOne").removeClass("active");
		$("#btnPreThree").removeClass("active");
		$("#btnPreSix").addClass("active");
	}

	function queryPayroll(period) {
		var payroll = {};
		app.f7.showPreloader();
		var url = 'api/webapi/mypayrollperiod/' + period;
		app.utils.ajaxGet(url, {}, function(rv) {
			if(rv) {
				payroll = rv;
			}

		}, function() {
			app.f7.hidePreloader();
		});

		return payroll;
	}
	return {
		init: init
	};
});