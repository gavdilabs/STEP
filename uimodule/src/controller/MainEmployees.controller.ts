
import BaseController from "./BaseController";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Binding from "sap/ui/model/Binding";
import EmployeeListItem from "../controls/EmployeeListItem";
import Fragment from "sap/ui/core/Fragment";
import NewEmployee from "./NewEmployee.controller";
import MessageBox from "sap/m/MessageBox";
import UIComponent from "sap/ui/core/UIComponent";
/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class MainEmployees extends BaseController {

    _oRouter: any;
    _oModel:any;
    _customer:any;

	onInit(): void {
		var oOwnerComponent = this.getOwnerComponent();

        this._oRouter = oOwnerComponent.getRouter();
        this._oModel = oOwnerComponent.getModel();
		this.getView().bindElement({
			path: "/Employee(46db8dd6-5fe5-4edc-880e-cdbcf07672fe)",
			model: "DB"
		});



	}
    onAfterRendering(): void {
        const item = this.getView().getBindingContext("DB")
        const rows = this.getView().byId("PCemployee").getBinding("rows")
		const rowsAgg = this.getView().byId("PCemployee").getAggregation("rows")

        const filter1 = new Filter("employeeID", FilterOperator.EQ, '46db8dd6-5fe5-4edc-880e-cdbcf07672fe');
        rows.filter(filter1, "Application")
	}
    onSearchEmployee(oEvent: any){
		const sQuery = oEvent.getSource().getValue();

		if (sQuery && sQuery.length > 0) {
			const filter1 = new Filter("employeeName", FilterOperator.Contains, sQuery);
            const filter2 = new Filter("employeeSurname", FilterOperator.Contains, sQuery);
            const inputFilter = new sap.ui.model.Filter({
                filters: [
                    filter1,
                    filter2
                ],
                and: false
            });
		}
		// update list binding
		const oList = this.byId("employeelist");
		const oBinding = oList.getBinding("items")
		oBinding.filter(inputFilter, "Application");

	}
	goToProjects(oEvent: any){
		const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("main");

	}
    onClickEmployee(oEvent: any){
		const src = oEvent.getSource() as EmployeeListItem;
		const projID = src.getEmployeeID()

		this.getView().bindElement({
			path: "/Employee(" + src.getEmployeeID() + ")",
			model: "DB"
		});

        const rows = this.getView().byId("PCemployee").getBinding("rows")
        const filter1 = new Filter("employeeID", FilterOperator.EQ, src.getEmployeeID());
        rows.filter(filter1, "Application")

		const rowsAgg = this.getView().byId("PCemployee").getAggregation("rows")
    }

    addSkill(){
        // NOTE: Handle event
    }

    handleEmployeeAllocSelect (oEvent: any) {
		const oAppointment = oEvent.getParameter("appointment");
		const bindEl = String(oAppointment.getBindingContext("DB"))

		const allocationId_1 = (bindEl.split('allocations', 2))[1]
		const allocationId_2 = allocationId_1.split('(', 2)[1]
		const allocationId_3 = allocationId_2.split(')', 2)[0]

		if (oAppointment) {
			this.handleSingleAppointment(oAppointment, allocationId_3);
		}
	}

	handleSingleAppointment (oAppointment: any, allocationID: string) {
		var oView = this.getView();
		if (oAppointment === undefined) {
			return;
		}

		if (!oAppointment.getSelected() && this._pDetailsPopover) {
			this._pDetailsPopover.then(function(oDetailsPopover){
				oDetailsPopover.close();
			});
			return;
		}

		if (!this._pDetailsPopover) {
			this._pDetailsPopover = Fragment.load({
				id: "detailAllocationFragment",
				name: "com.gavdilabs.finalchallenge.fragments.Details",
				controller: this
			}).then(function(oDetailsPopover){
				oDetailsPopover.bindElement({
					path: "/Allocation(" + allocationID + ")",
					model: "DB"})
				oView.addDependent(oDetailsPopover);
				return oDetailsPopover;
			});
		} else {
			this._pDetailsPopover.then(function(oDetailsPopover){
				oDetailsPopover.bindElement({
					path: "/Allocation(" + allocationID + ")",
					model: "DB"})
				oView.addDependent(oDetailsPopover);
				return oDetailsPopover;
			});

		}

		this._pDetailsPopover.then(function(oDetailsPopover){
			/*
			oDetailsPopover.bindElement({
				path: "/Allocation(" + allocationID + ")",
				model: "DB"
			});*/
			this.setDetailsDialogContent(oAppointment, oDetailsPopover);
		}.bind(this));

	}

	setDetailsDialogContent(oAppointment:any, oDetailsPopover:any){
		oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
		oDetailsPopover.openBy(oAppointment);
	}

	onAddNewEmployeePressed(){
		var oView = this.getView();
		var newModel = this.getView().getModel("appView")
		var oStoreEmployeeCreatorForm = this.byId("employeeCreator");

		if (!oStoreEmployeeCreatorForm) {
			Fragment.load({
				id: oView.getId(),
				name: "com.gavdilabs.finalchallenge.fragments.NewEmployeeFragment",
				controller: new NewEmployee("newEmployeeController")

			}).then(function (oStoreEmployeeCreatorForm) {
				oView.addDependent(oStoreEmployeeCreatorForm);
				oStoreEmployeeCreatorForm.open();
			});
		} else {
			oStoreEmployeeCreatorForm.open();
		}
	}

	OnDeleteEmployee(){
		var oView = this.getView()
		var employee = String(this.getView().getBindingContext("DB"))
		var employeeId = (employee.split("(", 2)[1]).split(")", 2)[0]
		var sMessage = "Are you sure you want to delete this employee? All of the associated allocations will be deleted as well."
		var associatedAllocations = []
			MessageBox.confirm(
				sMessage,
				{
					title: "Confirm",
					onClose: function (oAction) {
						if (oAction === "OK") {

								$.ajax({
									url: '/odata/Employee(' + employeeId + ')',
									method: 'DELETE',
									dataType: 'json',
									success: function (data) {
                                        // NOTE: Handle data retrieval success
									}
								});

								$.get("/odata/Employee(" + employeeId + ")/allocations", function (data) {
									data['value'].forEach(allocation => {
										const allID = allocation.allocationID;
										associatedAllocations.push(allID);
									});
								}).done(function () {
									for (let i = 0; i < associatedAllocations.length; i++){
										$.ajax({
											url: '/odata/Allocation(' + associatedAllocations[i] + ')',
											method: 'DELETE',
											dataType: 'json',
											success: function (data) {
                                                // NOTE: Handle data retrieval success
											}
										});
									}
								})


						}
					}
				}
			);

	}
}
