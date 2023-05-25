import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";

/**
 * @namespace com.gavdilabs.finalchallenge.control
 */
export default class ProjectListItem extends Control{
    static readonly metadata = {
        properties: {
            "mId" : {type: "string", defaultValue: "itemx_"},
            "name" : {type: "string", defaultValue: ""},
            "projectID": {type: "string", defaultValue: ""},
            "customerID": {type: "string", defaultValue: ""},
            "projectcustomerID": {type: "string", defaultValue: ""},

            "height" : {type: "sap.ui.core.CSSSize", defaultValue: "auto"},
        },
        events: {
            "press": {}
        },

    }

    static renderer= function(oRM: RenderManager, oCtrl: ProjectListItem){
        if (oCtrl.getProjectcustomerID() ===  oCtrl.getCustomerID()){
        oRM.openStart("li", oCtrl);
        oRM.style("width", "100%")
            .style("height", oCtrl.getHeight())
            .style("cursor", "pointer");
        oRM.openEnd();

        oRM.openStart("div", oCtrl);
        oRM.style("border", "none")
            .style("display", "flex")
            .style("padding", "10px")
            .style("padding-left", "0px")

            .style("margin", "0px 0px 0px 0px")
            .style("justify-content", "start")
            .style("align-items", "center")
            .style("margin", "0px 0px 0px 0px")
            .style("height", "15px");
            oRM.attr("id", oCtrl.getMId());
        oRM.openEnd();

        oRM.openStart("div", oCtrl);
        oRM.style("position", "relative")
            .style("width", "5rem !important")
            .style("height", "5rem !important")
            .style("max-width", "100% !important")
            .style("max-height", "100% !important")
            .style("overflow", "hidden")
            .style("border-radius", "50%")
            .style("z-index", "0")
            .style("border", "1px solid whitesmoke")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center")
            .style("margin", "0 0 0 0");
        oRM.openEnd()
        oRM.close("div");

        oRM.openStart("p", oCtrl);
        oRM.style("font-size", "12px")
        .style("font-family", "Arial, Helvetica, sans-serif");
        oRM.openEnd()
        oRM.text(oCtrl.getName());
        oRM.close("p");

        oRM.close("div");
        oRM.close("li");
        }
    }

    getHTMLElement(): HTMLElement{
        return document.getElementById(this.getId());
    }
    onclick(){
        this.firePress();
    }

}
