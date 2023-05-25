import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import ProjectListItem from "./ProjectListItem";
import Icon from "sap/ui/core/Icon";
import OrgChartItem from "./OrgChartItem";

/**
 * @namespace com.gavdilabs.finalchallenge.control
 */
export default class EmployeeListItem extends Control{
    static readonly metadata = {
        properties: {
            "mId" : {type: "string", defaultValue: "itemx_"},
            "name" : {type: "string", defaultValue: ""},
            "img" : {type: "string", defaultValue: ""},
            "employeeID": {type: "string", defaultValue: ""},
            "height" : {type: "sap.ui.core.CSSSize", defaultValue: "auto"},
        },
        events: {
            "press": {}
        },

    }

    static renderer= function(oRM: RenderManager, oCtrl: EmployeeListItem){

        var _iconUp = new Icon({
            src : "sap-icon://dropdown"
        })


        oRM.openStart("li", oCtrl);
        oRM.style("width", "100%")
            .style("height", oCtrl.getHeight())
            .style("cursor", "pointer")
            .style("margin-top","10px" );
        oRM.openEnd();

        oRM.openStart("div", oCtrl);
        oRM.style("border", "none")
            .style("display", "flex")
            .style("padding", "0px")
            .style("margin", "0px 0px 0px 0px")
            .style("justify-content", "start")
            .style("align-items", "center")
            .style("margin", "0px 0px 0px 0px")
            .style("height", "50px");
            oRM.attr("id", oCtrl.getMId());
        oRM.openEnd();

        oRM.openStart("div", oCtrl);
        oRM.style("position", "relative")
            .style("width", "5rem !important")
            .style("height", "5rem !important")
            .style("max-width", "100% !important")
            .style("max-height", "100% !important")
            .style("overflow", "hidden")
            .style("z-index", "0")
            .style("border", "1px solid whitesmoke")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("align-items", "center")
            .style("margin", "0 0 0 0");
        oRM.openEnd()

        oRM.openStart("img", oCtrl);
        oRM.attr("src", oCtrl.getImg());
        oRM.style("width", "3rem")
            .style("object-fit", "contain");
        oRM.openEnd();
        oRM.close("img");


        oRM.close("div");
       
        oRM.openStart("p", oCtrl);
        oRM.style("font-size", "15px")
        .style("font-family", "Arial, Helvetica, sans-serif");
        oRM.openEnd()
        oRM.text(oCtrl.getName());
        oRM.close("p");

        oRM.openStart("button", oCtrl)
        oRM.attr("onClick", oCtrl.onClick);
        oRM.style("width", "15px")
        .style("height", "15px")
        .style("margin-left", "auto")
        .style("margin-right", "30px")
        .style("border", "1px solid black")
        .style("color", "rgb(247,247,247)")
        .style("background-color", "rgb(247,247,247)")
        .style("cursor", "pointer")
        
        .attr("id", oCtrl.getId() + "_parentButton")

        oRM.openEnd();
        oRM.close("button");


        oRM.close("div");
        oRM.close("li");
    }

    getHTMLElement(): HTMLElement{
        return document.getElementById(this.getId());
    }

    onclick(){
        this.firePress();
    }

}