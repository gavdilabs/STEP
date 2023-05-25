import SelectedRelationship from "sap/gantt/shape/ext/rls/SelectedRelationship";
import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import OrgChartItem from "./OrgChartItem";
import OrgChartObject from "./OrgChartObject";

/**
 * @namespace com.gavdilabs.finalchallenge.control
 */

export default class OrgChart extends Control{
    static readonly metadata = {
        properties: {
            "id" : {type: "string", defaultValue: ""},
            "width" : {type: "sap.ui.core.CSSSize", defaultValue: "100%"},
            "height" : {type: "sap.ui.core.CSSSize", defaultValue: "100%"},
            "canvasWidth" : {type: "sap.ui.core.CSSSize", defaultValue: "100rem"},
            "canvasHeight" : {type: "sap.ui.core.CSSSize", defaultValue: "100rem"},
            "canvasColor" : {type: "sap.ui.core.CSSColor", defaultValue: "white"}
        },
        aggregations: {
            items: {
                type: "com.gavdilabs.finalchallenge.control.OrgChartItem",
                multiple: true,
                singularName: "item"
            }
        },
        events: {},
    };
    
    onBeforeRendering(){
        
    }

    static renderer = function(oRM: RenderManager, oCtrl: OrgChart){
        // Write div opening tag
        oRM.openStart("div", oCtrl);
            oRM.attr("id", oCtrl.getId());
            oRM.style("width", oCtrl.getWidth())
                .style("height", oCtrl.getHeight())
                .style("display", "flex")
                .style("background-color","#edeff0")
                .style("border", "1px solid #89919a")
                .style("overflow", "hidden")
        oRM.openEnd();
                /* Anything inside the div goes here */

       
            oRM.openStart("div", oCtrl); // Div to contain the list on the left side
                oRM.attr("id", oCtrl.getId()+"List");
                oRM.style("width", "20rem")
                    .style("height", "100%")
                    .style("background-color", "#edeff0")
                    .style("display", "flex")
                    .style("justify-content", "center")
                    .style("overflow", "auto")
                    .style("box-shadow", "0px 0px 15px #888888")
                    .style("border", "1px solid #89919a");
            oRM.openEnd();
        
                /* Anything inside the list div goes here */
                oRM.openStart("ul"); // Write List opening tag
                    oRM.style("list-style-type", "none")
                        .style("padding", "5px 5px 5px 5px")
                        .style("width", "100%");
                    oRM.attr("id", oCtrl.getId() + "_ul");
                oRM.openEnd();  
                /* List items goes here */



          /*       oRM.close("ul"); */ // Write list closing tag
                $.each(oCtrl.getItems(), function(key, value){
                    oRM.renderControl(value);
                });
            oRM.close("div");

            oRM.openStart("div", oCtrl);
                oRM.attr("id", oCtrl.getId()+"CanvasContainer");
                oRM.style("height", "100%")
                    .style("width", "100%")
                    .style("background-color", "#89919a")
                    .style("overflow", "scroll")
                    .style("justify-content", "center")
                    .style("border", "1px solid #89919a")
                    .class(oCtrl.getId() + "canvasContainer");
            oRM.openEnd();
                oRM.openStart("div", oCtrl);
                oRM.attr("id", oCtrl.getId()+"Canvas");
                oRM.class(oCtrl.getId() + "canvas");
                oRM.style("height", oCtrl.getCanvasHeight())
                    .style("width", oCtrl.getCanvasWidth())
                    .style("background-color", oCtrl.getCanvasColor())
                    .style("overflow", "hidden")
                    .style("position", "relative")
                    .style("padding", "0px");
                oRM.openEnd();
                
                oRM.close("div");
            oRM.close("div");
        oRM.close("div");         // Write div closing tag
    

    }

    onAfterRendering(){
        

    }

    addObject(obj: OrgChartObject){    
/*         const rm = sap.ui.getCore().createRenderManager();
        const canvas = document.getElementsByClassName(this.getId() + "canvas").item(0) as Element;
        rm.render(obj, canvas);
        rm.destroy() */
        obj.canvasId = this.getId()+"canvas";
        //this.addAggregation("objects", obj);
    }
}