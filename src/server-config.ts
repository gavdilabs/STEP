import ExternalService from "./core/services/ExternalService";

export default function ServerConfig() : IServerConfig {
    return {
        ServiceConfiguration: {
            handlerDir: __dirname + "/api/handlers/**/*.js",
            functionsDir: __dirname + "/api/functions/**/*.js",
            apiRoute: "odata"
        },
        DatabaseConfiguration: {
            databases: ['db']
        },
        ConnectivityConfiguration: {
            techConnections: new Map<string, ExternalService>([
                
            ])
        }
    }
}

export interface IServerConfig {
    ServiceConfiguration : IServiceConfig;
    DatabaseConfiguration? : IDatabaseConfig;
    ConnectivityConfiguration? : IConnectivityConfig;
}

export interface IDatabaseConfig {
    databases? : string[];
}

export interface IServiceConfig {
    handlerDir : string;
    functionsDir : string;
    apiRoute? : string;
}

export interface IConnectivityConfig {
    techConnections? : Map<string, ExternalService>;
}   