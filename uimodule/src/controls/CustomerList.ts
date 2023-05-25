import SelectedRelationship from "sap/gantt/shape/ext/rls/SelectedRelationship";
import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import CustomerListItem from "./CustomerListItem";
import Title from "sap/m/Title";
//import OrgChartObject from "./OrgChartObject";

/**
 * @namespace com.gavdilabs.finalchallenge.control
 */

export default class CustomerList extends Control{
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
                type: "com.gavdilabs.finalchallenge.control.CustomerListItem",
                multiple: true,
                singularName: "item"
            }
        },
        events: {},
    };

    onBeforeRendering(){

    }

    static renderer = function(oRM: RenderManager, oCtrl: CustomerList){
        // Write div opening tag
        oRM.openStart("div", oCtrl);
            oRM.attr("id", oCtrl.getId());
            oRM.style("width", oCtrl.getWidth())
                .style("height", oCtrl.getHeight())
                .style("display", "flex")
                .style("overflow-x", "hidden")
                .style("overflow-y", "scroll")
        oRM.openEnd();

                /* Anything inside the div goes here */


            oRM.openStart("div", oCtrl); // Div to contain the list on the left side
                oRM.attr("id", oCtrl.getId()+"List");
                oRM.style("width", "100%")
                    .style("height", "100%")
                    .style("display", "flex")
                    .style("justify-content", "center");
            oRM.openEnd();

                /* Anything inside the list div goes here */
                oRM.openStart("ul"); // Write List opening tag
                    oRM.style("list-style-type", "none")
                        .style("padding", "0px 5px 5px 5px")
                        .style("width", "100%");
                    oRM.attr("id", oCtrl.getId() + "_ul");
                oRM.openEnd();
                /* List items goes here */



          /*       oRM.close("ul"); */ // Write list closing tag
                $.each(oCtrl.getItems(), function(key, value){
                    oRM.renderControl(value);
                    oRM.openStart("div", oCtrl);
                    oRM.attr("id", oCtrl.getId());
                    oRM.style("width", "90%")
                        .style("margin-left", "10px")
                        .style("border-bottom", "1px solid #BFBFBF")
                oRM.openEnd();
                oRM.close("div");
                });
            oRM.close("div");

            oRM.close("div");         // Write div closing tag


    }
}
