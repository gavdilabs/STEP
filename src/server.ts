import "reflect-metadata"
import express from "express"
import { createCombinedHandler } from "cds-routing-handlers"
import cds from "@sap/cds"
import Logger from "./core/Logger"
import ExternalService from "./core/services/ExternalService"
import ServerConfig, { IConnectivityConfig, IDatabaseConfig, IServiceConfig } from "./server-config"
import Environment from "./environment"

/**
 * Entry point for the entire CAP service.
 * All service connections and/or other external dependencies should be resolved here.
 */
export class Server {
    private static extSrvs : Map<string, ExternalService>;

    /**
     * Boots up and runs the CAP server.
     */
    public static async run() : Promise<void> {
        const app = express();
        const srvConfig = ServerConfig();

        Environment.Initialize();
        
        if(srvConfig.DatabaseConfiguration){
            await this.databaseConfiguration(srvConfig.DatabaseConfiguration);
        }

        if(srvConfig.ConnectivityConfiguration){
            await this.connectivityConfiguration(srvConfig.ConnectivityConfiguration);
        }

        await this.serviceConfiguration(app, srvConfig.ServiceConfiguration);
        
        const port = process.env.PORT || 3001;
        app.listen(port, async () => {
            Logger.getInstance().Info(`Server is listening at http://localhost:${port}`);
        });

        Logger.getInstance().Info("Service is ready!");
    }

    /**
     * Retrieves a active running external service connection. 
     * This map will only contain technical user connections. 
     * @param key Name of the external service connection as defined at start-up
     * @returns Abstracted external service connection, type casting needed after retrieval.
     */
    public static getExternalService(key : string) : ExternalService {
        return this.extSrvs.get(key);
    }

    /**
     * Configures the database setup, if any is present
     * Should be run at start-up only!
     */
    private static async databaseConfiguration(config : IDatabaseConfig) : Promise<void> {
        Logger.getInstance().Info("Configuring database setup....");
        for(let i = 0; i < config.databases.length; i++){
            let db = config.databases[i];
            Logger.getInstance().Info(`Connecting to database with id: ${db}`);
            await cds.connect(db);
            Logger.getInstance().Info(`Connection established to database with id: ${db}`);
        }
        Logger.getInstance().Info("Database configuration applied!");
    }

    /**
     * Configures and connects to remote/external services. 
     * Should be run at start-up only!
     */
    private static async connectivityConfiguration(config : IConnectivityConfig) : Promise<void> {
        Logger.getInstance().Info("Configuring external service connections...");

        this.extSrvs = config.techConnections;

        for(let entry of this.extSrvs.values()) {
            await entry.Connect();
        }

        Logger.getInstance().Info("External service connections ready!");
    }

    /**
     * Configures the CAP service to the desired measurements. 
     * MUST ONLY BE RUN AT START-UP!
     * @param app Express app
     */
    private static async serviceConfiguration(app : any, config : IServiceConfig) : Promise<void> {
        Logger.getInstance().Info("Configuring service setup...");

        const hdl = createCombinedHandler({
            handler: [config.handlerDir, config.functionsDir]
        });

        await cds
            .serve("all")
            .at(config.apiRoute ? config.apiRoute : "odata")
            .in(app)
            .with(srv => hdl(srv));

        // Redirection to OData service
        app.get("/", (req, res) => {
            res.redirect(`/${config.apiRoute ? config.apiRoute : "odata"}/$metadata`);
        });

        Logger.getInstance().Info("Service configured and ready");
    }
}

//Entrypoint
Server.run();