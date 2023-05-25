import ComboBox from "sap/m/ComboBox";
import { URLHelper } from "sap/m/library";
import List from "sap/m/List";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";

/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class NewEmployee extends BaseController {
    _oSelectedRows: any[] = []
	_oSelectedRows_combobox: any[] = []
	_selectedEmployeeID:any = ""
	_selectedSkillsID:any = []

    checkURL(url: any) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    showUploadedImage(evt: any){
        const img  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--imageEmployee').getValue());
        URLHelper.redirect(img, true);
    }

    checkValid(){
        const emailEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--emailEmployee').getValue());
        const phoneEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--phoneEmployee').getValue());
        const nameEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--nameEmployee').getValue());
        const surnameEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--surnameEmployee').getValue());
        const cityEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--cityEmployee').getValue());
        const img  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--imageEmployee').getValue());
		const createButton = sap.ui.getCore().byId('container-finalchallenge---mainEmployees--createEmployeeButton');

		if (emailEmployee.length > 0 && phoneEmployee.length == 8 && nameEmployee.length > 0  && cityEmployee.length > 0  && img.length > 0) {
			createButton.setProperty("enabled", true);
		} else {
			createButton.setProperty("enabled", false);

		}
    }
    onCreateEmployee(){
        const emailEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--emailEmployee').getValue());
        const phoneEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--phoneEmployee').getValue());
        const nameEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--nameEmployee').getValue());
        const surnameEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--surnameEmployee').getValue());
        const cityEmployee  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--cityEmployee').getValue());
        const img  = String(sap.ui.getCore().byId('container-finalchallenge---mainEmployees--imageEmployee').getValue());
        const newemployeeID = crypto.randomUUID();
        const oNewEmployee = {
            employeeID: newemployeeID,
            employeeName: nameEmployee,
            employeeSurname: surnameEmployee,
            city: cityEmployee,
            phone: parseInt(phoneEmployee),
            email: emailEmployee,
            image: img
        }

		$.post({
			url: "/odata/Employee",
			contentType: 'application/json',
			data: JSON.stringify(oNewEmployee),
			success: function (data) {
                // NOTE: Handle data creation success
			},
			error: function (err) {
                // NOTE: Handle data creation error
			}
		});


        const foundSkillID = ""
        for (let i = 0; i < this._oSelectedRows.length; i++){
            const comboboxID = this._oSelectedRows_combobox[i]
			const comboboxLevelobj = sap.ui.getCore().byId(comboboxID)
			const ctxSkillLevel = comboboxLevelobj.getSelectedItem().getBindingContext("DB").getObject();
            const skillLevelID = ctxSkillLevel.skillLevelID
            const skillNameID = this._oSelectedRows[i].skillNameID

            jQuery.ajax({
                type: "GET",
                url: "/odata/Skill?$filter=skillNameID%20eq%20%27" + String(skillNameID)
                + "%27%20and%20skillLevelID%20eq%20%27" + String(skillLevelID) + "%27",
                async: false,
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                        foundSkillID = data['value'][0].skillID
                }
                }).done(function () {
                    const oNewEmployeeSkill = {
                        employeeSkillID: crypto.randomUUID,
                        employeeID: newemployeeID,
                        skillID: String(foundSkillID)
                    }

                    $.post({
                        url: "/odata/EmployeeSkill",
                        contentType: 'application/json',
                        data: JSON.stringify(oNewEmployeeSkill),
                        success: function (data) {
                            // NOTE: Handle data creation success
                        },
                        error: function (err) {
                            // NOTE: Handle data creation error
                        }
                    });
                });

        }

        this.onCancelEmployeePress()
    }

    onCancelEmployeePress(){
        sap.ui.getCore().byId('container-finalchallenge---mainEmployees--employeeCreator').destroy();

    }
    onEmailInputChange(oEvent: any){
        const emailEmployee  = sap.ui.getCore().byId('container-finalchallenge---mainEmployees--emailEmployee');
        let newValue = oEvent.getParameter("newValue") as string;

        if(newValue.includes("@")==false){
            emailEmployee.setValueState(sap.ui.core.ValueState.Error);
            emailEmployee.setValueStateText("Invalid adress");
        }else{
            if (newValue.split('@', 2)[1].includes(".") == false){
                emailEmployee.setValueState(sap.ui.core.ValueState.Error);
                emailEmployee.setValueStateText("Invalid adress");
            }else{
                emailEmployee.setValueState(sap.ui.core.ValueState.None);
                emailEmployee.setValueStateText("");
            }
        }
    }
    containsAnyLetter(str: string) {
        return /[a-zA-Z]/.test(str);
      }
    onPhoneInputChange(oEvent: any){
        const phoneEmployee  = sap.ui.getCore().byId('container-finalchallenge---mainEmployees--phoneEmployee');
        const newValue = oEvent.getParameter("newValue") as string;

        //you can also use None, or just remove this line
        phoneEmployee.setValueState(sap.ui.core.ValueState.Success);

        if(this.containsAnyLetter(newValue)){
            phoneEmployee.setValueState(sap.ui.core.ValueState.Error);
            phoneEmployee.setValueStateText("No letters are allowed");

        }
    }

    onSelectionChange(oEvent: any){
		const oTable = sap.ui.getCore().byId('container-finalchallenge---mainEmployees--idSkillTableEmployeeClass');
		const oPlugin = oEvent.getSource();
		const iIndices = oPlugin.getSelectedIndices();
		const objArray = []
		this._oSelectedRows=[]
		this._oSelectedRows_combobox = []

		for (let i=0; i< oTable.getRows().length; i++){
			if( iIndices.includes(i)){
                const obj = oTable.getContextByIndex(i).getObject()
                const comboboxId = oTable.getRows()[i].getCells()[1].getId();
                const oComboBox = sap.ui.getCore().byId(comboboxId) as ComboBox;

                oComboBox.setEnabled(true);
                objArray.push(obj)

                this._oSelectedRows.push(obj)
                this._oSelectedRows_combobox.push(comboboxId)
			} else {
				var comboboxId = oTable.getRows()[i].getCells()[1].getId();
				var oComboBox = sap.ui.getCore().byId(comboboxId) as ComboBox;
				oComboBox.setValue(null)

				oComboBox.setEnabled(false);
			}

		}
		this.checkValid()
	}

}
