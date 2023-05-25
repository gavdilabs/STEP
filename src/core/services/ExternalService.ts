
import { Service } from "@sap/cds/apis/services";
import Logger from "../Logger";

/**
 * Abstract base class for remote/external service connections with CDS.
 */
export default abstract class ExternalService {
    /**
     * Service name as defined in package.json or .cdsrc.json 
     */
    protected serviceName : string;

    /**
     * The established connection to the external service
     */
    protected serviceConnection : any; //NOTE: This is set to any because SAP hasn't updated their Service entity declaration as of yet

    /**
     * Default constructor
     * @param serviceName Service name as defined in package.json or .cdsrc.json
     */
    constructor(serviceName : string){
        Logger.getInstance().Info(`Created new external service class instance for service: ${serviceName}`);
        this.serviceName = serviceName;
    }

    /**
     * Establishes connection to external service. 
     * Should be executed on server startup only.
     */
    public async Connect() : Promise<void> {
        Logger.getInstance().Info(`Attempting connection to external service: ${this.serviceName}`);
        try {
            this.serviceConnection = await cds.connect.to(this.serviceName);
        } catch(e){
            Logger.getInstance().Error(`Failed to connect to external service '${this.serviceName}'`, e);
            throw `Failed to initialize external service connection, aborting...`
        }
    }

    /**
     * Retrieves the active service connection.
     * @returns Established service connection.
     */
    public GetConnection() : Service {
        return this.serviceConnection;
    }
}