
/**
 * Converts Date object to Epoch string
 * @param date Given Date
 * @returns Epoch String
 */
export function ConvertIsoToEpochString(date : Date) : string {
    return `/Date(${date.getTime()})/`;
}

/**
 * Converts ISO date string to Epoch date string 
 * @param iso ISO Date String
 * @returns Epoch String
 */
export function ConvertIsoStringToEpoch(iso : string) : string {
    return `/Date(${new Date(iso).getTime()})/`
}

/**
 * Converts Epoch date string to Date object
 * @param epoch Epoch date string
 * @returns Date object
 */
export function ConvertEpochToIsoDate(epoch : string) : Date {
    return new Date(eval(epoch.replace(/\//g, "")));
}

/**
 * Converts Epoch date string to ISO JSON string
 * @param epoch Epoch date string 
 * @returns ISO Date as JSON string
 */
export function ConvertEpochToIsoJson(epoch : string) : string {
    return ConvertEpochToIsoDate(epoch).toJSON();
}