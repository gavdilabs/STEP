
import Button from "sap/m/Button";
import ComboBox from "sap/m/ComboBox";
import List from "sap/m/List";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/ui/table/Table";
import BaseController from "./BaseController";

/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class NewAllocation extends BaseController {
    readonly arr: any = []
    _oSelectedRows: any[] = []
    _oSelectedRows_combobox: any[] = []
    _selectedEmployeeID: any = ""
    _selectedSkillsID: any = []

    onInit(): void {
        const oViewModel = new JSONModel({
            name: "",
            employee: "",
            percentage: "",
            startDate: "",
            endDate: "",
            skillLevel: [],
            skillName: []
        });
        this.getView().setModel(oViewModel, "appViewAllocation");
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

    onCancelAllocation() {
        this.checkCreateButton()
        sap.ui.getCore().byId('container-finalchallenge---main--allocationCreator').destroy();
    }

    checkCreateButton() {
        const nameProject = String(sap.ui.getCore().byId('container-finalchallenge---main--nameProject').getValue());
        const startDatenew = sap.ui.getCore().byId('container-finalchallenge---main--startDateProject').getDateValue() as Date;
        const endDatenew = sap.ui.getCore().byId('container-finalchallenge---main--endDateProject').getDateValue() as Date;
        let customerProject = sap.ui.getCore().byId('container-finalchallenge---main--customerProject').getSelectedItem();

        const projectID = sap.ui.getCore()._projectIDnew
        const createButton = sap.ui.getCore().byId('container-finalchallenge---main--onCreateButton') as Button

        if (customerProject != null) {
            customerProject = String(sap.ui.getCore().byId('container-finalchallenge---main--customerProject').getSelectedItem().getBindingContext("DB").getObject().customerID);
            $.get("/odata/Allocation?$filter=projectID%20eq%20%27" + projectID +
                "%27", function(data) {
                    if (!startDatenew == false && !endDatenew == false && !customerProject == false && !nameProject == false && data['value'].length > 0) {
                        createButton.setEnabled(true)
                    }
                })
        }
    }

    onCreateAllocation() {
        const projectIDnew = sap.ui.getCore()._projectIDnew;
        const allocationIDnew = crypto.randomUUID();
        const phaseIDnew = crypto.randomUUID();

        const allocName = String(sap.ui.getCore().byId('container-finalchallenge---main--allocName').getValue());
        const startDatenew = sap.ui.getCore().byId('container-finalchallenge---main--startDateAlloc').getDateValue() as Date;
        const endDatenew = sap.ui.getCore().byId('container-finalchallenge---main--endDateAlloc').getDateValue() as Date;
        const percentageInput = String(sap.ui.getCore().byId('container-finalchallenge---main--percentageInput').getValue());
        const onsiteBool = sap.ui.getCore().byId('container-finalchallenge---main--onsiteSwitch').getState();
        const firmBool = sap.ui.getCore().byId('container-finalchallenge---main--firmSwitch').getState();
        const skills = this._selectedSkillsID;
        const employeeIDnew = this._selectedEmployeeID

        const newStartDate = new Date(startDatenew.getFullYear(), startDatenew.getMonth(), startDatenew.getDate())
        const newEndDate = new Date(endDatenew.getFullYear(), endDatenew.getMonth(), endDatenew.getDate())
        const oNewAllocation = {
            allocationID: allocationIDnew,
            projectID: String(projectIDnew),
            phaseID: String(phaseIDnew),
            employeeID: String(employeeIDnew),
            allocationName: String(allocName),
            allocationPercentage: parseInt(percentageInput),
            startDate: this.formatDate(newStartDate),
            endDate: this.formatDate(newEndDate),
            firm: Boolean(firmBool),
            onsite: Boolean(onsiteBool)
        }

        $.post({
            url: "/odata/Allocation",
            contentType: 'application/json',
            data: JSON.stringify(oNewAllocation),
            success: function(data) {
                // NOTE: Handle data creation success
            },
            error: function(err) {
                // NOTE: Handle data creation error
            }
        });

        skills.forEach(skill => {
            const oNewSkill = {
                allocationSkillID: crypto.randomUUID(),
                allocationID: allocationIDnew,
                skillID: skill
            }

            $.post({
                url: "/odata/AllocationSkill",
                contentType: 'application/json',
                data: JSON.stringify(oNewSkill),
                success: function(data) {
                    // NOTE: Handle data creation success
                },
                error: function(err) {
                    // NOTE: Hanlde data creation error
                }
            });
        });

        const tableAllocations1 = sap.ui.getCore().byId('container-finalchallenge---main--tableAllocations1')
        tableAllocations1.getBinding("rows").refresh();

        this.onCancelAllocation()


    }
    checkValid() {
        const allocName = String(sap.ui.getCore().byId('container-finalchallenge---main--allocName').getValue());
        const startDate = sap.ui.getCore().byId('container-finalchallenge---main--startDateAlloc').getDateValue();
        const endDate = sap.ui.getCore().byId('container-finalchallenge---main--endDateAlloc').getDateValue();
        const percentageInput = String(sap.ui.getCore().byId('container-finalchallenge---main--percentageInput').getValue());
        const findEmployeeButton = sap.ui.getCore().byId('container-finalchallenge---main--findemployeeButton');

        if (allocName.length > 0 && startDate != null && !endDate != null && percentageInput.length > 0 && this._oSelectedRows.length > 0) {
            findEmployeeButton.setProperty("enabled", true);
        } else {
            findEmployeeButton.setProperty("enabled", false);

        }

        if (sap.ui.getCore().getModel("appViewAllocation") === undefined) {
            const oViewModel = new JSONModel({
                name: "",
                employee: "",
                percentage: "lol",
                startDate: "",
                endDate: "",
                skillLevel: [],
                skillName: []
            });
            sap.ui.getCore().setModel(oViewModel, "appViewAllocation");
        }


    }

    onInputChange() {
        // NOTE: Handle input change event
    }

    onSearchSkill(oEvent: any) {
        const aFilters_skills = [];
        const aFilters_projects = [];
        const sQuery = oEvent.getSource().getValue();

        if (sQuery && sQuery.length > 0) {
            const filter1 = new Filter("skillName", FilterOperator.Contains, sQuery);
            aFilters_skills.push(filter1);
        }

        // update list binding
        const oList = this.byId("customerlist1");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilters_skills, "Application");

    }

    findEmployees_matchTime() {
        // NOTE: Handle
    }

    findEmployees_matchSkills() {
        const tab = sap.ui.getCore().byId('container-finalchallenge---main--idSkillTable');
        const employeesList = sap.ui.getCore().byId('container-finalchallenge---main--matchedEmployees')
        const selectedRows = tab.getSelectedItems();
        const skillItems = []
        const skillItemsID = []

        for (let i = 0; i < selectedRows.length; i++) {
            skillItems.push([])
            skillItemsID.push([])

            var skillNameTableID_elID = String(selectedRows[i])
            var elID_arr = skillNameTableID_elID.split("-", 10)
            var elID = elID_arr[elID_arr.length - 1]
            var ctxSkillName = selectedRows[i].getBindingContext("DB").getObject();
            var comboboxID = 'container-finalchallenge---main--ComboBoxList2-container-finalchallenge---main--idSkillTable-' + elID
            var comboboxLevel = sap.ui.getCore().byId(comboboxID)
            var ctxSkillLevel = comboboxLevel.getSelectedItem().getBindingContext("DB").getObject();

            for (var minLevel = Number(ctxSkillLevel.skillLevelID); minLevel <= 4; minLevel++) {
                const aData = jQuery.ajax({
                    type: "GET",
                    url: "/odata/Skill?$filter=skillNameID%20eq%20%27" + ctxSkillName.skillNameID
                        + "%27%20and%20skillLevelID%20eq%20%27" + String(minLevel) + "%27",
                    async: false,
                    dataType: 'json',
                    success: function(data, textStatus, jqXHR) {
                        skillItems[i].push(data['value'][0])
                        skillItemsID[i].push(data['value'][0].skillID)
                    }
                });
            }
        }

        const matchedEmployee = []
        const skillMatches = []
        const skillsOfEmployee = []

        if (skillItems.length == 1) {
            for (var skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                skillMatches.push([skillItems[0][skillZero], skillItems[1][skillOne]])
            }
        } else if (skillItems.length == 2) {
            for (var skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                for (var skillOne = 0; skillOne < skillItems[1].length; skillOne++) {
                    skillMatches.push([skillItems[0][skillZero], skillItems[1][skillOne]])
                }
            }
        } else if (skillItems.length == 3) {
            for (var skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                for (var skillOne = 0; skillOne < skillItems[1].length; skillOne++) {
                    for (var skillTwo = 0; skillTwo < skillItems[2].length; skillTwo++) {
                        skillMatches.push([skillItems[0][skillZero], skillItems[1][skillOne], skillItems[2][skillTwo]])
                    }
                }
            }
        }

        const aFilters_matchedEmployees = []
        const employeesID: string[] = []
        jQuery.ajax({
            type: "GET",
            url: "/odata/Employee",
            async: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                data["value"].forEach(element => {
                    employeesID.push(element.employeeID);
                });
            }
        }).done(function() {
            employeesID.forEach(employeeID => {
                skillMatches.forEach(skillMatch => {
                    if (skillMatch.length < 3) {
                        var urladdress = "/odata/EmployeeSkill?$filter=employeeID%20eq%20%27" + employeeID +
                            "%27%20and%20skillID%20eq%20%27" + skillMatch[0].skillID +
                            "%27%20or%20employeeID%20eq%20%27" + employeeID +
                            "%27%20and%20skillID%20eq%20%27" + skillMatch[1].skillID + "%27"
                    } else {
                        var urladdress = "/odata/EmployeeSkill?$filter=employeeID%20eq%20%27" + employeeID +
                            "%27%20and%20skillID%20eq%20%27" + skillMatch[0].skillID +
                            "%27%20or%20employeeID%20eq%20%27" + employeeID +
                            "%27%20and%20skillID%20eq%20%27" + skillMatch[1].skillID
                            + "%27%20or%20employeeID%20eq%20%27" + employeeID +
                            "%27%20and%20skillID%20eq%20%27" + skillMatch[2].skillID + "%27"
                    }
                    jQuery.ajax({
                        type: "GET",
                        url: urladdress,
                        async: false,
                        dataType: 'json',
                        success: function(data, textStatus, jqXHR) {
                            if (data['value'].length > 1) {
                                var filter1 = new Filter("employeeID", FilterOperator.EQ, employeeID);
                                aFilters_matchedEmployees.push(filter1);
                            }
                        }
                    }).done(function() {
                        employeesList.getBinding("items").filter(aFilters_matchedEmployees, "Application");

                    });
                })

            })

        });
        this.findEmployees_matchTime()
    }

    findEmployees_matchSkills_tabletable() {
        const msg = 'Looking for the matching employees, please wait...';
        MessageToast.show(msg);

        const tab = sap.ui.getCore().byId('container-finalchallenge---main--idSkillTable');
        const employeesList = sap.ui.getCore().byId('container-finalchallenge---main--matchedEmployees') as List
        const skillItems = []
        const skillItemsID = []
        const skillItemsID_required = []

        this._selectedSkillsID = []
        const aFilters_matchedEmployees = []

        for (let i = 0; i < this._oSelectedRows.length; i++) {
            skillItems.push([])
            skillItemsID.push([])
            skillItemsID_required.push([])

            const skillNameTableID_elID = String(this._oSelectedRows[i])
            const elID_arr = skillNameTableID_elID.split("-", 10)
            const elID = elID_arr[elID_arr.length - 1]
            const ctxSkillName = this._oSelectedRows[i];
            const comboboxID = this._oSelectedRows_combobox[i]
            const comboboxLevel = sap.ui.getCore().byId(comboboxID)
            const ctxSkillLevel = comboboxLevel.getSelectedItem().getBindingContext("DB").getObject();

            for (let minLevel = Number(ctxSkillLevel.skillLevelID); minLevel <= 4; minLevel++) {
                const aData = jQuery.ajax({
                    type: "GET",
                    url: "/odata/Skill?$filter=skillNameID%20eq%20%27" + ctxSkillName.skillNameID
                        + "%27%20and%20skillLevelID%20eq%20%27" + String(minLevel) + "%27",
                    async: false,
                    dataType: 'json',
                    success: function(data, textStatus, jqXHR) {
                        skillItems[i].push(data['value'][0])
                        skillItemsID[i].push(data['value'][0].skillID)
                        if (minLevel == Number(ctxSkillLevel.skillLevelID)) {
                            skillItemsID_required[0].push(data['value'][0].skillID)
                        }
                    }
                });
            }
        }

        this._selectedSkillsID = skillItemsID_required[0]

        const matchedEmployee = []
        const skillMatches = []
        const skillsOfEmployee = []

        if (skillItems.length == 1) {
            for (let skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                skillMatches.push([skillItems[0][skillZero]])
            }
        } else if (skillItems.length == 2) {
            for (let skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                for (let skillOne = 0; skillOne < skillItems[1].length; skillOne++) {
                    if (skillItems[0].length < skillItems[1].length) {
                        skillMatches.push([skillItems[0][skillZero], skillItems[1][skillOne]])
                    } else {
                        skillMatches.push([skillItems[1][skillOne], skillItems[0][skillZero]])
                    }
                }
            }
        } else if (skillItems.length == 3) {
            for (let skillZero = 0; skillZero < skillItems[0].length; skillZero++) {
                for (let skillOne = 0; skillOne < skillItems[1].length; skillOne++) {
                    for (let skillTwo = 0; skillTwo < skillItems[2].length; skillTwo++) {
                        skillMatches.push([skillItems[0][skillZero], skillItems[1][skillOne], skillItems[2][skillTwo]])
                    }
                }
            }
        }


        skillMatches.forEach(skillMatch => {
            const urladdress = "/odata/EmployeeSkill?$filter=skillID%20eq%20%27" + skillMatch[0].skillID + "%27"
            jQuery.ajax({
                type: "GET",
                url: urladdress,
                async: false,
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    if (data['value'].length > 0) {
                        for (var matchEmp = 0; matchEmp < data['value'].length; matchEmp++) {
                            var employeeID = data['value'][matchEmp].employeeID

                            if (skillItems.length == 1) {
                                var filter1 = new Filter("employeeID", FilterOperator.EQ, employeeID);
                                aFilters_matchedEmployees.push(filter1);
                            } else {
                                if (skillItems.length == 2) {
                                    var urladdress2 = "/odata/EmployeeSkill?$filter=employeeID%20eq%20%27" + employeeID +
                                        "%27%20and%20skillID%20eq%20%27" + skillMatch[1].skillID +
                                        "%27"
                                } else {
                                    var urladdress2 = "/odata/EmployeeSkill?$filter=employeeID%20eq%20%27" + employeeID +
                                        "%27%20and%20skillID%20eq%20%27" + skillMatch[1].skillID +
                                        "%27%20or%20employeeID%20eq%20%27" + employeeID +
                                        "%27%20and%20skillID%20eq%20%27" + skillMatch[2].skillID + "%27"
                                }

                                jQuery.ajax({
                                    type: "GET",
                                    url: urladdress2,
                                    async: false,
                                    dataType: 'json',
                                    success: function(data2, textStatus, jqXHR) {
                                        if (data2['value'].length == (skillItems.length - 1)) {
                                            var filter1 = new Filter("employeeID", FilterOperator.EQ, employeeID);
                                            aFilters_matchedEmployees.push(filter1);
                                        }
                                    }
                                })
                            }
                        }

                    }
                }
            })
        })

        const activebool = true
        if (aFilters_matchedEmployees.length > 0) {
            employeesList.getBinding("items").filter(aFilters_matchedEmployees, "Application");

            const msg = 'Employees found!';
            MessageToast.show(msg);

            const findEmployeeButton = sap.ui.getCore().byId('container-finalchallenge---main--findemployeeButton');
            findEmployeeButton.setEnabled(false)
            activebool = false
        } else {
            aFilters_matchedEmployees = null
            employeesList.getBinding("items").filter(aFilters_matchedEmployees, "Application");

            const msg = 'Sorry, there is no employees matching your required skills';
            MessageToast.show(msg);
        }

        const items = employeesList.getItems()
        items.forEach(item => {
            item.setBlocked(activebool)
        });

        this.findEmployees_matchTime()

    }

    onSeletionChangeEmployee(oEvent: any) {
        this._selectedEmployeeID = oEvent.getSource().getSelectedItem().getBindingContext("DB").getObject().employeeID

        var createButton = sap.ui.getCore().byId('container-finalchallenge---main--addAlloc');
        createButton.setEnabled(true)
    }

    onSelectionChange(oEvent: any) {
        const createButton = sap.ui.getCore().byId('container-finalchallenge---main--addAlloc');

        if (createButton.getEnabled() == true) {
            createButton.setEnabled(false)

            const findEmployeeButton = sap.ui.getCore().byId('container-finalchallenge---main--findemployeeButton');
            findEmployeeButton.setEnabled(true)

            const employeesList = sap.ui.getCore().byId('container-finalchallenge---main--matchedEmployees')
            const items = employeesList.getItems()
            items.forEach(item => {
                item.setBlocked(true)
            });
        }

        const oTable = sap.ui.getCore().byId('container-finalchallenge---main--idSkillTable');
        const oPlugin = oEvent.getSource();
        const iIndices = oPlugin.getSelectedIndices();
        const objArray = []

        this._oSelectedRows = []
        this._oSelectedRows_combobox = []

        for (var i = 0; i < oTable.getRows().length; i++) {
            if (iIndices.includes(i)) {
                const obj = oTable.getContextByIndex(i).getObject()
                const comboboxId = oTable.getRows()[i].getCells()[1].getId();
                const oComboBox = sap.ui.getCore().byId(comboboxId) as ComboBox;

                //var oComboBox = oTable.getRows()[i].getCells()[1] as ComboBox;
                oComboBox.setEnabled(true);
                objArray.push(obj)

                this._oSelectedRows.push(obj)
                this._oSelectedRows_combobox.push(comboboxId)

            } else {
                const comboboxId = oTable.getRows()[i].getCells()[1].getId();
                const oComboBox = sap.ui.getCore().byId(comboboxId) as ComboBox;
                oComboBox.setValue(null)

                oComboBox.setEnabled(false);
            }

        }
        this.checkValid()

    }

}
