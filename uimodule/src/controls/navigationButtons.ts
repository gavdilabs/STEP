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
            "width" : {type: "string", defaultValue: "auto"},
            "icon" : {type: "URL"},
            "label": {type: "string", defaultValue: "auto"},
        },
        events: {
            "press": {}
        },

    }

    static renderer= function(oRM: RenderManager, oCtrl: navigationButtons){
        var _buttonTop = new Button({
            icon : "sap-icon://company-view"
            
        })

        var _icon = new Icon({
            src : oCtrl.getIcon()
        })
        var _label = new Label({
            text: oCtrl.getLabel()
        })

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
        .style("width", Number(oCtrl.getWidth()) + 30 + "px")
        .style("height",  Number(oCtrl.getWidth()) + 30 + "px")
            .style("overflow", "hidden")
            .style("text-align", "center")
            .style("justify-content", "center")
            .style("z-index", "0")
            .style("border", "1px solid whitesmoke")
            .style("display", "flex")
            .style("margin-top", "10px")
            .style("margin-bottom", "10px")

        oRM.openEnd()     
        
        // Close div opening tag
        oRM.openStart("button", oCtrl)
        //oRM.attr("onClick", oCtrl.onclick);
        oRM.style("width", oCtrl.getWidth() + "px")
        .style("height",  oCtrl.getWidth() + "px")
        .style("text-align", "center")
        .style("position", "absolute")
        .style("justify-content", "center")
        .style("border-radius", "10px")
        .style("border", "1px solid #BFBFBF")
        .style("background-color", "rgb(247,247,247)")
        .style("cursor", "pointer")
        .style("display", "flex")
        oRM.openEnd();  
        oRM.close("button");
        /* Content inside div */
        oRM.openStart("div", oCtrl)
        oRM
        .style("font-size", fontsize + "px")
        .style("color", " #427CAC") 
        .style("padding-top", 10 + "px")
        .style("justify-content", "center")
        oRM.openEnd()  
        oRM.renderControl(_icon); 
        
        oRM.openStart("div", oCtrl)
        oRM.style("font-size", "5px !important" )
        .style("padding-top", 10 + "px")
        oRM.openEnd()  
        oRM.renderControl(_label);
         oRM.close("div");  
         
         
        /*
        oRM.openStart("div", oCtrl);
        oRM.style("align", "center")
        .style("justify-content", "center")
        .style("width", oCtrl.getWidth() + "px")
        .style("height",  oCtrl.getWidth() + "px")
        .style("margin-top", "20px")
        .style("margin-left", "10px")
        .style("margin-bottom", "20px")
        oRM.openEnd()
        oRM.openStart("button", oCtrl)
        //oRM.attr("onClick", oCtrl.onclick);
        oRM.style("width", oCtrl.getWidth() + "px")
        .style("height",  oCtrl.getWidth() + "px")
        .style("text-align", "center")
        .style("position", "absolute")
        .style("justify-content", "center")
        .style("border-radius", "10px")
        .style("border", "1px solid #BFBFBF")
        .style("background-color", "rgb(247,247,247)")
        .style("cursor", "pointer")
        .style("display", "flex")
        oRM.openEnd();  
        oRM.close("button");
         var fontsize:number = 30
        oRM.openStart("div", oCtrl)
        oRM
        .style("font-size", fontsize + "px")
        .style("color", " #427CAC") 
        .style("padding-left",  Number(oCtrl.getWidth())/2  - fontsize/2 + "px")
        .style("padding-top", Number(oCtrl.getWidth())/2 - fontsize/2 + "px")
        .style("justify-content", "center")
        oRM.openEnd()  
        oRM.renderControl(_icon); 
        
        //oRM.close("div"); 
        oRM.close("div"); 
        
        oRM.close("div"); 
        */
    }

    getHTMLElement(): HTMLElement{
        return document.getElementById(this.getId());
    }
    onclick(){
        this.firePress();
    }

}