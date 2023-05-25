import UI5Element from "sap/ui/core/Element";

export default class GraphComponent {

    public GetOffset(element: Element): any{
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
        };
    }

    public ConnectElements(element1: Element, element2: Element, color: string, thickness: int){
        const off1 = this.GetOffset(element1);
        const off2 = this.GetOffset(element2);

        const x1 = off1.left + (off1.width/2);
        const y1 = off1.top + off1.height;

        const x2 = off2.left + (off2.width/2);
        const y2 = off2.top;

        const len = Math.sqrt(((x2 - x1) * (x2 - x1)) + (y2 - y1) * (y2 - y1));

        const cx = ((x1 + x2) / 2) - (len / 2);
        const cy = ((y1 + y2) / 2) - (thickness / 2);

        const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

        const htmlText = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + len + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
        
        document.body.innerHTML += htmlText;
    }
}