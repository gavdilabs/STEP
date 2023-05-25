import { CSSSize } from "sap/ui/core/library";
import Event from "sap/ui/base/Event";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./OrgChartItem" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $OrgChartItemSettings extends $ControlSettings {
        mId?: string | PropertyBindingInfo;
        name?: string | PropertyBindingInfo;
        lastname?: string | PropertyBindingInfo;
        img?: string | PropertyBindingInfo;
        role?: string | PropertyBindingInfo;
        height?: CSSSize | PropertyBindingInfo | `{${string}}`;
        press?: (event: Event) => void;
    }

    export default interface OrgChartItem {

        // property: mId
        getMId(): string;
        setMId(mId: string): this;

        // property: name
        getName(): string;
        setName(name: string): this;

        // property: lastname
        getLastname(): string;
        setLastname(lastname: string): this;

        // property: img
        getImg(): string;
        setImg(img: string): this;

        // property: role
        getRole(): string;
        setRole(role: string): this;

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
