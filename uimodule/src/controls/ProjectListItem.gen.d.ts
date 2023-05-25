import { CSSSize } from "sap/ui/core/library";
import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./ProjectListItem" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ProjectListItemSettings extends $ControlSettings {
        mId?: string | PropertyBindingInfo;
        name?: string | PropertyBindingInfo;
        projectID?: string | PropertyBindingInfo;
        customerID?: string | PropertyBindingInfo;
        projectcustomerID?: string | PropertyBindingInfo;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        press?: (event: Event) => void;
    }

    export default interface ProjectListItem {

        // property: mId
        getMId(): string;
        setMId(mId: string): this;

        // property: name
        getName(): string;
        setName(name: string): this;

        // property: projectID
        getProjectID(): string;
        setProjectID(projectID: string): this;

        // property: customerID
        getCustomerID(): string;
        setCustomerID(customerID: string): this;

        // property: projectcustomerID
        getProjectcustomerID(): string;
        setProjectcustomerID(projectcustomerID: string): this;

        // property: height
        getHeight(): CSSSize;
        setHeight(height: CSSSize): this;

        // event: press
        attachPress(fn: (event: Event) => void, listener?: object): this;
        attachPress<CustomDataType extends object>(data: CustomDataType, fn: (event: Event, data: CustomDataType) => void, listener?: object): this;
        detachPress(fn: (event: Event) => void, listener?: object): this;
        firePress(parameters?: object): this;
    }
}
