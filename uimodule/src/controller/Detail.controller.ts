import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import GraphComponent from "../internal/GraphComponent";
import BaseController from "./BaseController";

/**
 * @namespace com.gavdilabs.finalchallenge.controller
 */
export default class Detail extends BaseController {

	graphComponent = new GraphComponent();
    _oRouter: any;
    _oModel:any;
    _customer:any;

	onInit(): void {
		const oOwnerComponent = this.getOwnerComponent();

        this._oRouter = oOwnerComponent.getRouter();
        this._oModel = oOwnerComponent.getModel();

        this._oRouter.getRoute("main").attachPatternMatched(this.onProductMatched, this);
        this._oRouter.getRoute("detail").attachPatternMatched(this.onProductMatched, this);
	}


    onProductMatched(oEvent: any) {
        this._customer = oEvent.getParameter("arguments").customer || this._customer || "0";
        this.getView().bindElement({
            path: "/Customer(" + this._customer + ")",
            model: "DB"
        });
    }

    onEditToggleButtonPress() {
        const oObjectPage = this.getView().byId("ObjectPageLayout") as ObjectPageLayout;
        const bCurrentShowFooterState = oObjectPage.getShowFooter();

        oObjectPage.setShowFooter(!bCurrentShowFooterState);
    }

    onExit() {
        this._oRouter.getRoute("master").detachPatternMatched(this.onProductMatched, this);
        this._oRouter.getRoute("detail").detachPatternMatched(this.onProductMatched, this);
    }

}
