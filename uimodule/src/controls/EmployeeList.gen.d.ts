import { CSSSize } from "sap/ui/core/library";
import { CSSColor } from "sap/ui/core/library";
import EmployeeListItem from "com/gavdilabs/finalchallenge/control/EmployeeListItem";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EmployeeList" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EmployeeListSettings extends $ControlSettings {
        id?: string | PropertyBindingInfo;
        width?: CSSSize | PropertyBindingInfo | `{${string}}`;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasWidth?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasHeight?: CSSSize | PropertyBindingInfo | `{${string}}`;
        canvasColor?: CSSColor | PropertyBindingInfo | `{${string}}`;
        items?: EmployeeListItem[] | EmployeeListItem | AggregationBindingInfo | `{${string}}`;
    }

    export default interface EmployeeList {

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
        getItems(): EmployeeListItem[];
        addItem(items: EmployeeListItem): this;
        insertItem(items: EmployeeListItem, index: number): this;
        removeItem(items: number | string | EmployeeListItem): this;
        removeAllItems(): EmployeeListItem[];
        indexOfItem(items: EmployeeListItem): number;
        destroyItems(): this;
    }
}
