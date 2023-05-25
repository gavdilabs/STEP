import { Constructible } from "../TConstructible";
import ExternalService from "./ExternalService";

/**
 * External Service Factory.
 * To be used for user authenticated service connections.
 */
export default class ExternalServiceFactory {

    /**
     * Creates an instance of the desired service for user authenticated usage.
     * NOTE: Might not work with current setup.
     * @returns User authenticated service instance
     */
    public static async createInstance<T extends ExternalService>(c : new() => T) : Promise<T> {
        const srv = this.create(c);
        await srv.Connect();
        return srv;
    }

    /**
     * Creates a instance of a service connection.
     * @param srv Typeof service instance
     * @returns Service instance
     */
    public static create<T extends Constructible>(srv : T) : InstanceType<T> {
        return new srv();
    }
}