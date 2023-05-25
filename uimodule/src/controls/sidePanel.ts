import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import Button from "sap/m/Button";
import Icon from "sap/ui/core/Icon";
import Label from "sap/m/Label";
/**
 * @namespace com.gavdilabs.finalchallenge.control
 */
export default class navigationButtons extends Control{
    static readonly metadata = {
        properties: {
            "mId" : {type: "string", defaultValue: "itemx_"},
        },
        events: {
            "press": {}
        },

    }

    static renderer= function(oRM: RenderManager, oCtrl: navigationButtons){
        var fontsize:number = 30
        /*
        oRM.openStart("div", oCtrl);
        oRM
        .style("width", "100%")
        .style("height", "100%")
        .style("align", "center")
        .style("justify-content", "center")
        .style("display", "flex")

        oRM.openEnd();
        */
        oRM.openStart("div", oCtrl);                                // Open div tag
        oRM.style("position", "relative")                       // Assign CSS Styles to the div
        .style("width", "100%")
        .style("height",  "100%")
        .style("border", "1px solid black")
        oRM.openEnd()  
         oRM.close("div");  
    }

    getHTMLElement(): HTMLElement{
        return document.getElementById(this.getId());
    }
}