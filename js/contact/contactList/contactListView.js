define(['hbs!js/contact/contactList/contact-list-item','lib/framework7.indexed-list.js'], function(template,indexlist) {
    var $ = Dom7;

	function render(params) {
        $('.contacts-list').html(template(params.model));    
        //右侧索引列A-Z
        indexlist.initIndexedList({container: "#contactList"});
        $('.searchbar-cancel').click();
		bindEvents(params.bindings);
    }

	function reRender(params) {
		$('.contacts-list').html(template(params.model));	
		//右侧索引列A-Z
        indexlist.initIndexedList({container: "#contactList"});
        $('.searchbar-cancel').click();
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

    return {
        render: render,
		reRender: reRender
    };
});