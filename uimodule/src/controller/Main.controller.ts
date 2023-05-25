import MessageBox from "sap/m/MessageBox";
import ProjectListItem from "../controls/ProjectListItem";
import BaseController from "./BaseController";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Fragment from "sap/ui/core/Fragment";
import JSONModel from "sap/ui/model/json/JSONModel";
import Button from "sap/m/Button";
import UIComponent from "sap/ui/core/UIComponent";
import NewAllocation from "./NewAllocation.controller";
import NewCustomer from "./NewCustomer.controller";
import DeleteCustomer from "./DeleteCustomer.controller";

/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class Main extends BaseController {

    _projectIDnew: any = ""
    readonly config: any = {
        initialRank: 0,
        defaultRank: 1024,
        rankAlgorithm: {
            Before(iRank: any) {
                return iRank + 1024;
            },
            Between(iRank1: any, iRank2: any) {
                // limited to 53 rows
                return (iRank1 + iRank2) / 2;
            },
            After(iRank: any) {
                return iRank / 2;
            }
        }
    }

    onInit(): void {
        var oViewModel = new JSONModel({
            customer: "",
            projectName: "",
            startDate: "",
            endDate: "",
            allocations: []
        });
        this.getView().setModel(oViewModel, "appView");

        this.getView().bindElement({
            path: "/Project(49f7cb24-efa2-437e-992a-11e98bfbbc0c)",
            model: "DB"
        });
        this.tableUpdated('49f7cb24-efa2-437e-992a-11e98bfbbc0c')
    }

    buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    Before(iRank: any) {
        return (iRank + 1024);
    }

    tableUpdated(projID: String) {
        const oTable = this.byId("skillallocTable")
        const bindelemtn = projID

        const el = this.getView().getBindingContext("DB")

        const idarray = [];
        const aFilters_allocations = [];
        const aData = jQuery.ajax({
            type: "GET",
            url: "/odata/Project(" + bindelemtn + ")",
            async: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                // NOTE: Handle data retrieval success
            }

        });

        jQuery.ajax({
            type: "GET",
            url: "/odata/Allocation?$select=allocationID&$filter=projectID%20eq%20%27" + bindelemtn + "%27",
            async: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                data["value"].forEach(element => {
                    const filter1 = new Filter("allocationID", FilterOperator.EQ, element.allocationID);
                    aFilters_allocations.push(filter1);
                });
                if (aFilters_allocations.length == 0) {
                    const filter1 = new Filter("allocationID", FilterOperator.EQ, "1");
                    aFilters_allocations.push(filter1);
                }
                oTable.getBinding("items").filter(aFilters_allocations, "Application");
            }
        });
    }

    onDeleteCustomerPressed() {
        const oView = this.getView();
        const oStoreDeleteCustomerForm = this.byId("customerDelete");

        if (!oStoreDeleteCustomerForm) {
            Fragment.load({
                id: oView.getId(),
                name: "com.gavdilabs.finalchallenge.fragments.DeleteCustomerFragment",
                controller: new DeleteCustomer("newDeleteCustomerController")

            }).then(function(oStoreDeleteCustomerForm) {
                oView.addDependent(oStoreDeleteCustomerForm);
                oStoreDeleteCustomerForm.open();
            });
        } else {
            oStoreDeleteCustomerForm.open();
        }
    }

    onClickProjectItem(oEvent: any) {
        const src = oEvent.getSource() as ProjectListItem;
        const projID = src.getProjectID()

        this.getView().bindElement({
            path: "/Project(" + src.getProjectID() + ")",
            model: "DB"
        });
        this.tableUpdated(projID)

    }
    onAddNewProject(oEvent: any) {
        var oView = this.getView();
        var oStoreProjectCreatorForm = this.byId("projectCreator");

        if (!oStoreProjectCreatorForm) {
            Fragment.load({
                id: oView.getId(),
                name: "com.gavdilabs.finalchallenge.fragments.NewProjectFragment",
                controller: this

            }).then(function(oStoreProjectCreatorForm) {
                sap.ui.getCore()._projectIDnew = crypto.randomUUID();
                oView.addDependent(oStoreProjectCreatorForm);
                oStoreProjectCreatorForm.open();

                const tableAllocations1 = sap.ui.getCore().byId('container-finalchallenge---main--tableAllocations1')
                const filter1 = new Filter("projectID", FilterOperator.EQ, sap.ui.getCore()._projectIDnew);
                tableAllocations1.getBinding("rows").filter(filter1, "Application");

            });
        } else {
            oStoreProjectCreatorForm.open();
        }
    }
    padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
    }

    formatDate(date: Date) {
        return [
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
        ].join('-');
    }
    onCreateProject() {
        const projectID_new = String(sap.ui.getCore()._projectIDnew);
        const nameProject = String(sap.ui.getCore().byId('container-finalchallenge---main--nameProject').getValue());
        const startDatenew = sap.ui.getCore().byId('container-finalchallenge---main--startDateProject').getDateValue() as Date;
        const endDatenew = sap.ui.getCore().byId('container-finalchallenge---main--endDateProject').getDateValue() as Date;
        const customerProject = String(sap.ui.getCore().byId('container-finalchallenge---main--customerProject').getSelectedItem().getBindingContext("DB").getObject().customerID);

        const newStartDate = new Date(startDatenew.getFullYear(), startDatenew.getMonth(), startDatenew.getDay())
        const newEndDate = new Date(endDatenew.getFullYear(), endDatenew.getMonth(), endDatenew.getDay())

        const newProject = {
            projectID: projectID_new,
            customerID: customerProject,
            name: nameProject,
            startDate: this.formatDate(newStartDate),
            endDate: this.formatDate(newEndDate)
        }

        $.post({
            url: "/odata/Project",
            contentType: 'application/json',
            data: JSON.stringify(newProject),
            success: function(data) {
                // NOTE: Handle data retrieval success
            },
            error: function(err) {
                // NOTE: Handle data retrieval error
            }
        });
        sap.ui.getCore().byId('container-finalchallenge---main--projectCreator').destroy();
    }
    checkFormValid() {
        const oView = this.getView()
        const newModel = this.getView().getModel("appView")
        const addAllocButton = this.getView().byId("addAllocButton") as Button
        const createButton = this.getView().byId("onCreateButton") as Button

        const customer = newModel.getProperty("/customer")
        const projectName = newModel.getProperty("/projectName")
        const projectID = sap.ui.getCore()._projectIDnew

        const startDate = sap.ui.getCore().byId('container-finalchallenge---main--startDateProject').getDateValue() as Date;
        const endDate = sap.ui.getCore().byId('container-finalchallenge---main--endDateProject').getDateValue() as Date;


        if (!startDate == false && !endDate == false) {
            addAllocButton.setEnabled(true)
        }
        $.get("/odata/Allocation?$filter=projectID%20eq%20%27" + projectID +
            "%27", function(data) {
                if (!startDate == false && !endDate == false && !customer == false && !projectName == false && data['value'].length > 0) {
                    createButton.setEnabled(true)
                }
            });
    }

    onCancelProjectPress() {
        var oView = this.getView()
        //var customer = String(this.getView().getBindingContext("DB"))
        var projectID = sap.ui.getCore()._projectIDnew
        var sMessage = "Are you sure you want to cancel creating this project? All of the just created allocations will be deleted as well"
        //var associatedProjects: string[] = []
        var associatedAllocations: string[] = []
        //var associatedSkills:  string[]  = []

        MessageBox.confirm(
            sMessage,
            {
                title: "Confirm",
                onClose: function(oAction) {
                    if (oAction === "OK") {
                        $.get("/odata/Allocation?$filter=projectID%20eq%20%27" + projectID +
                            "%27", function(data) {
                                data['value'].forEach(allocation => {
                                    const allocationID = allocation.allocationID;
                                    $.ajax({
                                        url: '/odata/Allocation(' + allocationID + ')',
                                        method: 'DELETE',
                                        dataType: 'json',
                                        success: function(data) {
                                            // NOTE: Handle data retrieval success
                                        }
                                    });
                                });
                            })
                        sap.ui.getCore().byId('container-finalchallenge---main--projectCreator').destroy();
                    }
                }
            }
        )
    }

    checkEmployeeMatches() {

    }
    addAllocationPressed() {
        const oView = this.getView();
        const newModel = this.getView().getModel("appView")
        const oStoreAllocationCreatorForm = this.byId("allocationCreator");

        if (!oStoreAllocationCreatorForm) {
            Fragment.load({
                id: oView.getId(),
                name: "com.gavdilabs.finalchallenge.fragments.NewAllocationFragment",
                controller: new NewAllocation("newAllocationController")

            }).then(function(oStoreAllocationCreatorForm) {

                oView.addDependent(oStoreAllocationCreatorForm);
                oStoreAllocationCreatorForm.open();
                const startDate = newModel.getProperty("/startDate")
                const endDate = newModel.getProperty("/endDate")

                oView.byId("startDateAlloc").setMinDate(new Date(startDate))
                oView.byId("startDateAlloc").setMaxDate(new Date(endDate))

                oView.byId("endDateAlloc").setMinDate(new Date(startDate))
                oView.byId("endDateAlloc").setMaxDate(new Date(endDate))

            });
        } else {
            oStoreAllocationCreatorForm.open();
        }
    }

    checkValid() {
        // NOTE: Handle event
    }

    onAddCustomerPressed() {
        const oView = this.getView();
        const newModel = this.getView().getModel("appView")
        const oStoreCustomerCreatorForm = this.byId("customerCreator");

        if (!oStoreCustomerCreatorForm) {
            Fragment.load({
                id: oView.getId(),
                name: "com.gavdilabs.finalchallenge.fragments.NewCustomerFragment",
                controller: new NewCustomer("newCustomerController")

            }).then(function(oStoreCustomerCreatorForm) {
                oView.addDependent(oStoreCustomerCreatorForm);
                oStoreCustomerCreatorForm.open();
            });
        } else {
            oStoreCustomerCreatorForm.open();
        }
    }
    onSearch(oEvent: any) {
        const aFilters_customer = [];
        const aFilters_projects = [];
        const sQuery = oEvent.getSource().getValue();

        if (sQuery && sQuery.length > 0) {
            const filter1 = new Filter("customerName", FilterOperator.Contains, sQuery);
            aFilters_customer.push(filter1);
        }

        if (sQuery && sQuery.length > 0) {
            const filter2 = new Filter("name", FilterOperator.Contains, sQuery);
            aFilters_projects.push(filter2);
        }

        // update list binding
        const oList = this.byId("customerlist1");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilters_customer, "Application");
    }

    handleAppointmentSelect(oEvent: any) {
        const oAppointment = oEvent.getParameter("appointment");
        const bindEl = String(oAppointment.getBindingContext("DB"))

        const allocationId_1 = (bindEl.split('allocations', 2))[1]
        const allocationId_2 = allocationId_1.split('(', 2)[1]
        const allocationId_3 = allocationId_2.split(')', 2)[0]

        if (oAppointment) {
            this.handleSingleAppointment(oAppointment, allocationId_3);
        }
    }

    goToEmployees(oEvent: any) {
        const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("mainEmployees");

    }
    handleSingleAppointment(oAppointment: any, allocationID: string) {
        var oView = this.getView();
        if (oAppointment === undefined) {
            return;
        }

        if (!oAppointment.getSelected() && this._pDetailsPopover) {
            sap.ui.getCore().byId("detailAllocationFragment--detailsPopover-popover").destroy()
            return;
        }

        if (!this._pDetailsPopover) {
            this._pDetailsPopover = Fragment.load({
                id: "detailAllocationFragment",
                name: "com.gavdilabs.finalchallenge.fragments.Details",
                controller: this
            }).then(function(oDetailsPopover) {
                oDetailsPopover.bindElement({
                    path: "/Allocation(" + allocationID + ")",
                    model: "DB"
                })
                oView.addDependent(oDetailsPopover);
                return oDetailsPopover;
            });
        } else {
            this._pDetailsPopover.then(function(oDetailsPopover) {
                oDetailsPopover.bindElement({
                    path: "/Allocation(" + allocationID + ")",
                    model: "DB"
                })
                oView.addDependent(oDetailsPopover);
                return oDetailsPopover;
            });

        }

        this._pDetailsPopover.then(function(oDetailsPopover) {
            this.setDetailsDialogContent(oAppointment, oDetailsPopover);
        }.bind(this));

    }

    setDetailsDialogContent(oAppointment: any, oDetailsPopover: any) {
        oDetailsPopover.setBindingContext(oAppointment.getBindingContext());
        oDetailsPopover.openBy(oAppointment);
    }

    initSampleProductsModel() {
        const oData = jQuery.sap.sjax({
            url: "/odata",
            dataType: "json"
        }).data;
        oData.Skill
        // prepare and initialize the rank property
        oData.SkillName.forEach(function(skillName) {
            skillName.Rank = this.config.initialRank;
        }, this);

        const oModel = new JSONModel();
        oModel.setData(oData);
        return oModel;
    }

    getSelectedRowContext(sTableId: any, fnCallback: any) {
        const oTable = this.byId(sTableId);
        const iSelectedIndex = oTable.getSelectedIndex();

        if (iSelectedIndex === -1) {
            MessageToast.show("Please select a row!");
            return;
        }

        const oSelectedContext = oTable.getContextByIndex(iSelectedIndex);
        if (oSelectedContext && fnCallback) {
            fnCallback.call(this, oSelectedContext, iSelectedIndex, oTable);
        }

        return oSelectedContext;
    }

    onDragStart(oEvent: any) {
        const oDraggedRow = oEvent.getParameter("target");
        const oDragSession = oEvent.getParameter("dragSession");

        // keep the dragged row context for the drop action
        oDragSession.setComplexData("draggedRowContext", oDraggedRow.getBindingContext());
    }

    onDropTable1(oEvent: any) {
        const oDragSession = oEvent.getParameter("dragSession");
        const oDraggedRowContext = oDragSession.getComplexData("draggedRowContext");
        if (!oDraggedRowContext) {
            return;
        }

        // reset the rank property and update the model to refresh the bindings
        this.oProductsModel.setProperty("Rank", this.config.initialRank, oDraggedRowContext);
        this.oProductsModel.refresh(true);
    }

    moveToTable1() {
        this.getSelectedRowContext("table2", function(oSelectedRowContext, iSelectedRowIndex, oTable2) {
            // reset the rank property and update the model to refresh the bindings
            this.oProductsModel.setProperty("Rank", this.config.initialRank, oSelectedRowContext);
            this.oProductsModel.refresh(true);

            // select the previous row when there is no row to select
            var oNextContext = oTable2.getContextByIndex(iSelectedRowIndex + 1);
            if (!oNextContext) {
                oTable2.setSelectedIndex(iSelectedRowIndex - 1);
            }
        });
    }

    onDropTable2(oEvent: any) {
        var oDragSession = oEvent.getParameter("dragSession");
        var oDraggedRowContext = oDragSession.getComplexData("draggedRowContext");
        if (!oDraggedRowContext) {
            return;
        }

        var oConfig = this.config;
        var iNewRank = oConfig.defaultRank;
        var oDroppedRow = oEvent.getParameter("droppedControl");

        if (oDroppedRow && oDroppedRow instanceof TableRow) {
            // get the dropped row data
            var sDropPosition = oEvent.getParameter("dropPosition");
            var oDroppedRowContext = oDroppedRow.getBindingContext();
            var iDroppedRowRank = oDroppedRowContext.getProperty("Rank");
            var iDroppedRowIndex = oDroppedRow.getIndex();
            var oDroppedTable = oDroppedRow.getParent();

            // find the new index of the dragged row depending on the drop position
            var iNewRowIndex = iDroppedRowIndex + (sDropPosition === "After" ? 1 : -1);
            var oNewRowContext = oDroppedTable.getContextByIndex(iNewRowIndex);
            if (!oNewRowContext) {
                // dropped before the first row or after the last row
                iNewRank = oConfig.rankAlgorithm[sDropPosition](iDroppedRowRank);
            } else {
                // dropped between first and the last row
                iNewRank = oConfig.rankAlgorithm.Between(iDroppedRowRank, oNewRowContext.getProperty("Rank"));
            }
        }

        // set the rank property and update the model to refresh the bindings
        this.oProductsModel.setProperty("Rank", iNewRank, oDraggedRowContext);
        this.oProductsModel.refresh(true);
    }

    moveToTable2() {
        this.getSelectedRowContext("table1", function(oSelectedRowContext) {
            var oTable2 = this.byId("table2");
            var oFirstRowContext = oTable2.getContextByIndex(0);

            // insert always as a first row
            var iNewRank = this.config.defaultRank;
            if (oFirstRowContext) {
                iNewRank = this.config.rankAlgorithm.Before(oFirstRowContext.getProperty("Rank"));
            }

            this.oProductsModel.setProperty("Rank", iNewRank, oSelectedRowContext);
            this.oProductsModel.refresh(true);

            // select the inserted row
            oTable2.setSelectedIndex(0);
        });
    }

    moveSelectedRow(sDirection: any) {
        this.getSelectedRowContext("table2", function(oSelectedRowContext, iSelectedRowIndex, oTable2) {
            var iSiblingRowIndex = iSelectedRowIndex + (sDirection === "Up" ? -1 : 1);
            var oSiblingRowContext = oTable2.getContextByIndex(iSiblingRowIndex);
            if (!oSiblingRowContext) {
                return;
            }

            // swap the selected and the siblings rank
            var iSiblingRowRank = oSiblingRowContext.getProperty("Rank");
            var iSelectedRowRank = oSelectedRowContext.getProperty("Rank");
            this.oProductsModel.setProperty("Rank", iSiblingRowRank, oSelectedRowContext);
            this.oProductsModel.setProperty("Rank", iSelectedRowRank, oSiblingRowContext);
            this.oProductsModel.refresh(true);

            // after move select the sibling
            oTable2.setSelectedIndex(iSiblingRowIndex);
        });
    }

    moveUp() {
        this.moveSelectedRow("Up");
    }

    moveDown() {
        this.moveSelectedRow("Down");
    }

}
