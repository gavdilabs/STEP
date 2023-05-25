import { CSSSize } from "sap/ui/core/library";
import { CSSColor } from "sap/ui/core/library";
import OrgChartItem from "com/gavdilabs/finalchallenge/control/OrgChartItem";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./OrgChart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $OrgChartSettings extends $ControlSettings {
        id?: string | PropertyBindingInfo;
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasWidth?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasColor?: CSSColor | PropertyBindingInfo | `{${string}}`;
        items?: OrgChartItem[] | OrgChartItem | AggregationBindingInfo | `{${string}}`;
    }

    export default interface OrgChart {

        // property: id
        getId(): string;
        setId(id: string): this;

        // property: width
        getWidth(): CSSSize;
        setWidth(width: CSSSize): this;

        // property: height
        getHeight(): CSSSize;
        setHeight(height: CSSSize): this;

        // property: canvasWidth
        getCanvasWidth(): CSSSize;
        setCanvasWidth(canvasWidth: CSSSize): this;

        // property: canvasHeight
        getCanvasHeight(): CSSSize;
        setCanvasHeight(canvasHeight: CSSSize): this;

        // property: canvasColor
        getCanvasColor(): CSSColor;
        setCanvasColor(canvasColor: CSSColor): this;

        // aggregation: items
        getItems(): OrgChartItem[];
        addItem(items: OrgChartItem): this;
        insertItem(items: OrgChartItem, index: number): this;
        removeItem(items: number | string | OrgChartItem): this;
        removeAllItems(): OrgChartItem[];
        indexOfItem(items: OrgChartItem): number;
        destroyItems(): this;
    }
}
