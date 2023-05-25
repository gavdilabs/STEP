import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";

/**
 * @namespace com.gavdilabs.finalchallenge.control
 */
export default class OrgChartItem extends Control{
    static readonly metadata = {
        properties: {
            "mId" : {type: "string", defaultValue: "itemx_"},
            "name" : {type: "string", defaultValue: ""},
            "lastname": {type: "string", defaultValue: ""},
            "img" : {type: "string", defaultValue: ""},
            "role" : {type: "string", defaultValue: ""},
            "height" : {type: "sap.ui.core.CSSSize", defaultValue: "auto"},
        },
        events: {
            "press": {}
        },

    }

    static renderer= function(oRM: RenderManager, oCtrl: OrgChartItem){
        oRM.openStart("li", oCtrl);
        oRM.style("width", "100%")
            .style("height", oCtrl.getHeight())
            .style("cursor", "pointer");
        oRM.openEnd();

        oRM.openStart("div", oCtrl);
        oRM.style("border", "1px solid whitesmoke")
            .style("display", "flex")
            .style("padding", "10px")
            .style("margin", "0px 0px 0px 0px")
            .style("justify-content", "start")
            .style("align-items", "center")
            .style("background-color", "white")
            .style("border", "1px solid #89919a")
            .style("margin", "5px 0px 5px 0px")
            .style("height", "5rem");
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
            .style("margin", "0 10px 0 0");
        oRM.openEnd()
        oRM.openStart("img", oCtrl);
        oRM.attr("src", oCtrl.getImg());
        oRM.style("width", "5rem")
            .style("object-fit", "contain");
        oRM.openEnd();
        oRM.close("img");
        oRM.close("div");
       
        oRM.openStart("p", oCtrl);
        oRM.style("font-size", "18px");
        oRM.openEnd()
        oRM.text(oCtrl.getName());
        oRM.close("p");

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