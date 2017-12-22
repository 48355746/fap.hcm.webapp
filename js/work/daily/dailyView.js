define(['hbs!js/work/daily/myApply','hbs!js/work/daily/todoTask','hbs!js/work/daily/agentTask'], function(myApplyViewTmpl,todoTaskViewTmpl,agentTaskViewTmpl) {
	var $ = Dom7;

	function render(params) {
		$('#myApplyContent').html(myApplyViewTmpl(params.model));
		$('#myTodoContent').html(todoTaskViewTmpl(params.model));
		$('#myAgentContent').html(agentTaskViewTmpl(params.model));
		bindEvents(params.bindings);
	}

	function bindEvents(bindings) {
		for(var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	function reRender(params) {
		$('#myApplyContent').html(myApplyViewTmpl(params.model));
		$('#myTodoContent').html(todoTaskViewTmpl(params.model));
		$('#myAgentContent').html(agentTaskViewTmpl(params.model));
	}
	
	return {
		render: render,
		reRender: reRender
	}
});