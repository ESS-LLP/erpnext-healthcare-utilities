frappe.ui.form.on('Patient', {
	refresh: function(frm) {
		if(!frm.doc.__islocal){
			frm.add_custom_button(__('Print Consent Form'), function(){
				print_consent(frm)
			}, "Actions");
		}
	}
});

var print_consent = function(frm) {
	var d = new frappe.ui.Dialog({
			title:__("Print Consent"),
			fields:[
				{
					"fieldtype": "Link",
					"label": "Consent Template",
					"options": "Patient Consent Template",
					"fieldname": "consent_template",
					reqd:1
				},
				{
					"fieldtype": "Button",
					"label": __("Print"),
					click: function() {
						var values = d.get_values();
						if(!values)
							return;
						get_consent(d.get_value('consent_template'), frm.doc, function(r) {
							if(!r.exc) {
								// sec_concent Custom field to set consent details in Patient
								frm.set_value("sec_consent", r.message)
								frm.meta.default_print_format = "Patient Consent Form" // Name of your Print Format
								frm.print_doc()
							}
						});
						d.hide();
					}
				}
			]
		})
		d.show();
}

var get_consent= function(consent_template, doc, callback) {
	if(consent_template) {
		return frappe.call({
			method: '<your_app>.<your_module>.doctype.patient_consent_template.patient_consent_template.render_consent_template',
			args: {
				template_name: consent_template,
				doc: doc
			},
			callback: function(r) {
				callback(r)
			}
		});
	}
}
