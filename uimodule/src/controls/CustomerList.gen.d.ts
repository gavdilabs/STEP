import { CSSSize } from "sap/ui/core/library";
import { CSSColor } from "sap/ui/core/library";
import CustomerListItem from "com/gavdilabs/finalchallenge/control/CustomerListItem";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./CustomerList" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $CustomerListSettings extends $ControlSettings {
        id?: string | PropertyBindingInfo;
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasWidth?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasColor?: CSSColor | PropertyBindingInfo | `{${string}}`;
        items?: CustomerListItem[] | CustomerListItem | AggregationBindingInfo | `{${string}}`;
    }

    export default interface CustomerList {

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
        getItems(): CustomerListItem[];
        addItem(items: CustomerListItem): this;
        insertItem(items: CustomerListItem, index: number): this;
        removeItem(items: number | string | CustomerListItem): this;
        removeAllItems(): CustomerListItem[];
        indexOfItem(items: CustomerListItem): number;
        destroyItems(): this;
    }
}
