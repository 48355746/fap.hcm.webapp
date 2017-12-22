define(["app",  "js/serverUrl/serverUrlView"], function(app,  View) {
	function init(){
		var serverModel =JSON.parse(localStorage.getItem(hcmServerAddressConst));		
		View.render({ model: serverModel, doneCallback: saveServerAddress });
	}
	function saveServerAddress(inputValues) {		
		if (inputValues.host=='') {
			app.f7.alert("地址不能为空");
			return;
		}
		if(inputValues.port=='')
		{
			inputValues.port=80;
		}
		var model={host:inputValues.host,port:inputValues.port};
		localStorage.clear();
		localStorage.setItem(hcmServerAddressConst, JSON.stringify(model));	
		closePage();
	}
	function closePage() {
		app.f7.closeModal(".popup-serverUrl");
	}
	return {
		init: init
	};
});