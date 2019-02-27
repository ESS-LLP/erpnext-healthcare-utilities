# -*- coding: utf-8 -*-
# Copyright (c) 2018, earthians and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json
from frappe.model.document import Document

class PatientConsentTemplate(Document):
	def validate(self):
		if self.active:
			# Get all Consent Template
			# Set active = 0 for all other Template
			pass
@frappe.whitelist()
def render_consent_template(template_name, doc):
	if isinstance(doc, str):
		doc = json.loads(doc)
	else:
		doc = doc.as_dict()
	consent_template = frappe.get_doc("Patient Consent Template", template_name)
	if consent_template.template:
		return frappe.render_template(consent_template.template, doc)
