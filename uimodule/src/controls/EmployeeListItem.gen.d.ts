import { CSSSize } from "sap/ui/core/library";
import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EmployeeListItem" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EmployeeListItemSettings extends $ControlSettings {
        mId?: string | PropertyBindingInfo;
        name?: string | PropertyBindingInfo;
        img?: string | PropertyBindingInfo;
        employeeID?: string | PropertyBindingInfo;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        press?: (event: Event) => void;
    }

    export default interface EmployeeListItem {

        // property: mId
        getMId(): string;
        setMId(mId: string): this;

        // property: name
        getName(): string;
        setName(name: string): this;

        // property: img
        getImg(): string;
        setImg(img: string): this;

        // property: employeeID
        getEmployeeID(): string;
        setEmployeeID(employeeID: string): this;

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
