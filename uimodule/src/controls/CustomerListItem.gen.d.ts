import { CSSSize } from "sap/ui/core/library";
import ProjectListItem from "com/gavdilabs/finalchallenge/control/ProjectListItem";
import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./CustomerListItem" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $CustomerListItemSettings extends $ControlSettings {
        mId?: string | PropertyBindingInfo;
        name?: string | PropertyBindingInfo;
        img?: string | PropertyBindingInfo;
        customerID?: string | PropertyBindingInfo;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        items?: ProjectListItem[] | ProjectListItem | AggregationBindingInfo | `{${string}}`;
        press?: (event: Event) => void;
    }

    export default interface CustomerListItem {

        // property: mId
        getMId(): string;
        setMId(mId: string): this;

        // property: name
        getName(): string;
        setName(name: string): this;

        // property: img
        getImg(): string;
        setImg(img: string): this;

        // property: customerID
        getCustomerID(): string;
        setCustomerID(customerID: string): this;

        // property: height
        getHeight(): CSSSize;
        setHeight(height: CSSSize): this;

        // aggregation: items
        getItems(): ProjectListItem[];
        addItem(items: ProjectListItem): this;
        insertItem(items: ProjectListItem, index: number): this;
        removeItem(items: number | string | ProjectListItem): this;
        removeAllItems(): ProjectListItem[];
        indexOfItem(items: ProjectListItem): number;
        destroyItems(): this;

        // event: press
        attachPress(fn: (event: Event) => void, listener?: object): this;
        attachPress<CustomDataType extends object>(data: CustomDataType, fn: (event: Event, data: CustomDataType) => void, listener?: object): this;
        detachPress(fn: (event: Event) => void, listener?: object): this;
        firePress(parameters?: object): this;
    }
}
