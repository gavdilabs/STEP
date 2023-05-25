import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./sidePanel" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $navigationButtonsSettings extends $ControlSettings {
        mId?: string | PropertyBindingInfo;
        press?: (event: Event) => void;
    }

    export default interface navigationButtons {

        // property: mId
        getMId(): string;
        setMId(mId: string): this;

        // event: press
        attachPress(fn: (event: Event) => void, listener?: object): this;
        attachPress<CustomDataType extends object>(data: CustomDataType, fn: (event: Event, data: CustomDataType) => void, listener?: object): this;
        detachPress(fn: (event: Event) => void, listener?: object): this;
        firePress(parameters?: object): this;
    }
}
