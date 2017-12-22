define(["app", "js/contact/contact/contactView", "js/contact/contactModel", "js/utils"], function(app, ContactView, Contact, utils) {
	var $ = Dom7;
	var contact = null;
	var bindings = [{
		element: '.contact-edit-link',
		event: 'click',
		handler: runEditMode
	}];

	function init(query) {
		var contacts = JSON.parse(localStorage.getItem(hcmContactsConst));
		debugger
		if(query && query.id) {
			contact = _.find(contacts, {
				id: query.id
			});
		}
		ContactView.render({
			model: contact,
			bindings: bindings
		});
		if(app.android === true) {
			$(".back.link").off("click", utils.backPrePage).on("click", utils.backPrePage);
		}
	}

	function runEditMode() {
		app.router.load('contactEdit', {
			id: contact.id
		});
	}

	return {
		init: init
	};
});