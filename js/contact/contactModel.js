define(['app'],function(app) {

    function Contact(values) {
		values = values || {};
		this.id = values['Fid'] || app.utils.generateGUID();
		this.picId =values["Gender"]=='male'?app.utils.getRandomInt(1,8):app.utils.getRandomInt(9,13);
		this.createdOn = values['CreateDate'] || new Date();

		this.firstName = values['EmpName'] || '';
		this.lastName = values['EmpCode'] || '';
		this.gender=values["Gender"]||'';
		this.company = values['DeptUidMC'] || '';
		this.phone = values['Mobile'] || '';
		this.email = values['MailBox'] || '';
		this.city = values['EmpPositionMC'] || '';
		this.isFavorite = values['isFavorite'] || false;
    }
    return Contact;
});