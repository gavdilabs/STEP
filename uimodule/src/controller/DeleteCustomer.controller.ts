import ComboBox from "sap/m/ComboBox";
import { URLHelper } from "sap/m/library";
import List from "sap/m/List";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import Text from "sap/m/Text";
import MessageBox from "sap/m/MessageBox";
/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class DeleteCustomer extends BaseController {
    _oSelectedRows: any[] = []
    _selectedCustomerID: any = ""
	onInit(): void {
	}

    onSelectionChange(oEvent: any){
        this._selectedCustomerID = oEvent.getSource().getSelectedItem().getBindingContext("DB").getObject().customerID
		const deleteButton =  sap.ui.getCore().byId('container-finalchallenge---main--deleteCustomerButton');
		deleteButton.setEnabled(true)
    }

    onSearchCustomer(oEvent: any){
		const aFilters_customer = [];
		const sQuery = oEvent.getSource().getValue();

		if (sQuery && sQuery.length > 0) {
			const filter1 = new Filter("customerName", FilterOperator.Contains, sQuery);
			aFilters_customer.push(filter1);
		}

		// update list binding
		const oList = sap.ui.getCore().byId('container-finalchallenge---main--customersListDelete');;

		const oBinding = oList.getBinding("items");
		oBinding.filter(aFilters_customer, "Application");
	}

    createContent(){

        var oList = new sap.m.List("functieplaatsenList", {
                          headerText : "mein Headertext"  ,

                });
                var oTemplateListItem = new sap.m.StandardListItem( {
                          title : "{AllTasks>name}",
                          description : "{AllTasks>date}",
                          info : "{AllTasks>status}",
                });
            oList.bindItems("AllTasks>/modelData", oTemplateListItem);
          return oList;
    }

    onCancelDeleteCustomerPress(){
        sap.ui.getCore().byId('container-finalchallenge---main--customerDelete').destroy();
    }

    onDeleteCustomer(){
        const oView = this.getView()
		//var customer = String(this.getView().getBindingContext("DB"))
		const customerId = this._selectedCustomerID
		const sMessage = "Are you sure you want to delete this customer? All of the associated projects and allocations will be deleted as well"
		const associatedProjects: string[] = []
        const associatedAllocations:  string[]  = []
        const associatedSkills:  string[]  = []


			MessageBox.confirm(
				sMessage,
				{
					title: "Confirm",
					onClose: function (oAction) {
						if (oAction === "OK") {
                            $.get("/odata/Customer(" + customerId + ")/projects", function (data) {
                                data['value'].forEach(project => {
                                    const projectID = project.projectID;
                                    associatedProjects.push(projectID)
                                });;
                            }).done(function () {
                                for (let i = 0; i < associatedProjects.length; i++){
                                    const url = '/odata/Project(' + associatedProjects[i] + ')'
                                    $.get("/odata/Project(" + associatedProjects[i] + ")/allocations", function (data) {
                                        data['value'].forEach(allocation => {
                                            const allocationID = allocation.allocationID;
                                            $.get("/odata/Allocation(" + allocationID + ")/skills", function (data) {
                                                associatedSkills = []
                                                data['value'].forEach(skill => {
                                                    const allocationSkillID = skill.allocationSkillID;
                                                    associatedSkills.push(allocationSkillID)
                                                });

                                                for(var j = 0; j<associatedSkills.length; j++){
                                                    $.ajax({
                                                        url: '/odata/AllocationSkill(' + associatedSkills[j] + ')',
                                                        method: 'DELETE',
                                                        dataType: 'json',
                                                        success: function (data) {
                                                            // NOTE: Handle data retrieval success
                                                        }
                                                    });
                                                }
                                            }).done(function () {
                                                $.ajax({
                                                    url: '/odata/Allocation(' + allocationID + ')',
                                                    method: 'DELETE',
                                                    dataType: 'json',
                                                    success: function (data) {
                                                        // NOTE: Handle data retrieval success
                                                    }
                                                });
                                            });

                                        });
                                    })


                                    $.ajax({
                                        url: '/odata/Project(' + associatedProjects[i] + ')',
                                        method: 'DELETE',
                                        dataType: 'json',
                                        success: function (data) {
                                            // NOTE: Handle data retrieval success
                                        }
                                    });
                                }
                                $.ajax({
                                    url: '/odata/Customer(' + customerId + ')',
                                    method: 'DELETE',
                                    dataType: 'json',
                                    success: function (data) {
                                        // NOTE: Handle data retrieval success
                                    }
                                });
                            })
						}
					}
				}
			);
        sap.ui.getCore().byId('container-finalchallenge---main--customerDelete').destroy();
    }

}
