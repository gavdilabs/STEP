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
export default class NewCustomer extends BaseController {
    checkURL(url: any) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    showUploadedImage(evt: any){
        const img  = String(sap.ui.getCore().byId('container-finalchallenge---main--imageCustomer').getValue());
        URLHelper.redirect(img, true);
    }

    checkValid(oEvent: any){
        var emailCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--emailCustomer').getValue());
        var phoneCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--phoneCustomer').getValue());
        var nameCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--nameCustomer').getValue());
        var img  = String(sap.ui.getCore().byId('container-finalchallenge---main--imageCustomer').getValue());
		var createButton = sap.ui.getCore().byId('container-finalchallenge---main--createCustomerButton');

		if (emailCustomer.length > 0 && phoneCustomer.length == 8 && nameCustomer.length > 0  &&  img.length > 0) {
			createButton.setProperty("enabled", true);
		} else {
			createButton.setProperty("enabled", false);

		}
    }
    onCreateCustomer(){
        const emailCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--emailCustomer').getValue());
        const phoneCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--phoneCustomer').getValue());
        const nameCustomer  = String(sap.ui.getCore().byId('container-finalchallenge---main--nameCustomer').getValue());
        const img  = String(sap.ui.getCore().byId('container-finalchallenge---main--imageCustomer').getValue());

        const oNewCustomer = {
            customerID: crypto.randomUUID(),
            customerName: nameCustomer,
            image: img,
            phone: parseInt(phoneCustomer),
            email: emailCustomer
        }

		$.post({
			url: "/odata/Customer",
			contentType: 'application/json',
			data: JSON.stringify(oNewCustomer),
			success: function (data) {
                // NOTE: Handle data creation success
			},
			error: function (err) {
                // NOTE: Handle data creation error
			}
		});

        this.onCancelCustomerPress()
    }

    onCancelCustomerPress(){
        sap.ui.getCore().byId('container-finalchallenge---main--customerCreator').destroy();

    }
    onEmailInputChange(oEvent: any){
        const emailCustomer  = sap.ui.getCore().byId('container-finalchallenge---main--emailCustomer');
        const newValue = oEvent.getParameter("newValue") as string;

        if(newValue.includes("@")==false){
            emailCustomer.setValueState(sap.ui.core.ValueState.Error);
            emailCustomer.setValueStateText("Invalid adress");
        }else{
            if (newValue.split('@', 2)[1].includes(".") == false){
                emailCustomer.setValueState(sap.ui.core.ValueState.Error);
                emailCustomer.setValueStateText("Invalid adress");
            }else{
                emailCustomer.setValueState(sap.ui.core.ValueState.None);
                emailCustomer.setValueStateText("");
            }
        }
    }

    containsAnyLetter(str: string) {
        return /[a-zA-Z]/.test(str);
    }

    onPhoneInputChange(oEvent: any){
        const phoneCustomer  = sap.ui.getCore().byId('container-finalchallenge---main--phoneCustomer');
        const newValue = oEvent.getParameter("newValue") as string;

        //you can also use None, or just remove this line
        phoneCustomer.setValueState(sap.ui.core.ValueState.Success);

        if(this.containsAnyLetter(newValue)){
            phoneCustomer.setValueState(sap.ui.core.ValueState.Error);
            phoneCustomer.setValueStateText("No letters are allowed");

        }
    }

}
