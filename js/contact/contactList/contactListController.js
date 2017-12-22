define(["app", "js/contact/contactModel", "js/contact/contactList/contactListView", "js/pinYin"], function(app, Contact, ListView, pinYin) {
	var $ = Dom7;
	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.contact-refresh-link',
		event: 'click',
		handler: refreshContacts
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}];

	var state = {
		isFavorite: false
	};

	function init() {
		var contacts = loadContacts();
		ListView.render({
			bindings: bindings,
			model: contacts
		});
	}
	//从服务器刷新通讯录
	function refreshContacts() {
		localStorage.removeItem(hcmContactsConst);
		var contacts = loadContacts();
		ListView.reRender({
			model: contacts
		});
	}

	function showAll() {
		state.isFavorite = false;
		var contacts = loadContacts();
		ListView.reRender({
			model: contacts,
			header: "Contacts"
		});
	}

	function showFavorites() {
		state.isFavorite = true;
		var contacts = loadContacts({
			isFavorite: true
		});
		ListView.reRender({
			model: contacts,
			header: "Favorites"
		});
	}

	function loadContacts(filter) {
		var f7Contacts = localStorage.getItem(hcmContactsConst);
		var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
		if(filter) {
			contacts = _.filter(contacts, filter);
		}
		contacts.sort(contactSort);
		contacts = _.groupBy(contacts, function(contact) {
			return pinYin.getFirstLetter(contact.firstName.charAt(0))[0];
		});
		contacts = _.toArray(_.mapValues(contacts, function(value, key) {
			return {
				'letter': key,
				'list': value
			};
		}));
		return _.sortBy(contacts, 'letter');
	}

	function tempInitializeStorage() {
		app.f7.showPreloader();
		var data = {
			tablename: 'Employee',
			querycols: 'Fid, EmpCode,EmpName,Gender, Mailbox,Mobile,DeptUid,EmpPosition,CreateDate',
			rows: 1000,
			page: 1,
			sidx: "EmpName",
			sord: "asc",
			filters: ""
		};
		app.utils.ajaxPost("api/webapi/QueryEntity", data, function(rv) {
			if(rv.success == false) {
				app.f7.alert(rv.msg);
				return;
			} else {
				//处理逻辑
				docs = rv;
				var contacts = [];
				$.each(rv.rows, function(index, item) {
					contacts.push(new Contact(item));
				});
				localStorage.setItem(hcmContactsConst, JSON.stringify(contacts));
			}
		}, function() {
			app.f7.hidePreloader();
		})

		return JSON.parse(localStorage.getItem(hcmContactsConst));
	}

	function contactSort(a, b) {
		if(a.firstName > b.firstName) {
			return 1;
		}
		if(a.firstName === b.firstName && a.lastName >= b.lastName) {
			return 1;
		}
		return -1;
	}

	return {
		init: init
	};
});