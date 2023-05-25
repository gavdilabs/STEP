import * as cflog from "cf-nodejs-logging-support"

/**
 * Logger Abstraction Class.
 * Provides an abstracted API for easy logging on CF
 */
export default class Logger{
    private static _instance : Logger 

    //Privat constructor, rely on singleton
    private constructor(){
        cflog.registerCustomFields(["CONTEXT"]);
    }

    /**
     * Gets the current active singleton instance or instantiates new one if none exists
     * @returns Singleton instance
     */
    public static getInstance() : Logger {
        return this._instance === undefined ? new Logger() : this._instance;
    }

    /**
     * Logs a message with an optional context at the Info level
     * @param msg Logging message
     * @param ctx Object that has context to the given log message
     */
    public Info(msg : string, ctx? : any) : void {
        this.log(msg, LogLevel.Info, ctx);
    }

    /**
     * Logs a message with an optional context at the Warning level
     * @param msg Logging message
     * @param ctx Object that has context to the given log message
     */
    public Warning(msg :string, ctx? : any) : void {
        this.log(msg, LogLevel.Warning, ctx);
    }

    /**
     * Logs an error message with optional context
     * @param msg Logging message
     * @param ctx Object that has context to the given log message
     */
    public Error(msg : string, ctx? : any) : void {
        this.log(msg, LogLevel.Error, ctx);
    }

    /**
     * Logs a message with an optional context at the Debug level
     * @param msg Logging message
     * @param ctx Object that has context to the given log message
     */
    public Debug(msg : string, ctx? : any) : void {
        this.log(msg, LogLevel.Debug, ctx);
    }

    /**
     * Logs a Verbose message with optional context object
     * @param msg Logging message
     * @param ctx Object that has context to the given log message
     */
    public Verbose(msg : string, ctx? : any) : void {
        this.log(msg, LogLevel.Verbose, ctx);
    }

    /**
     * Logs a message with an optional context object at the desired level.
     * @param msg Message to be logged
     * @param lvl Level at which the message should be logged
     * @param ctx Optional context
     */
    private log(msg : string, lvl : LogLevel, ctx? : any) : void {
        let customFields = ctx !== undefined ? this.convertToLogCtx(ctx) : undefined;
        cflog.logMessage(lvl.toString(), msg, customFields); 
    }

    /**
     * Formats the given context to the supported LogCtx format
     * @param ctx Given context at the time of logging
     * @returns Formatted context object
     */
    private convertToLogCtx(ctx : any) : LogCtx {
        return {
            "CONTEXT": JSON.stringify(ctx)
        }
    }
}

/**
 * Log levels supported by abstracted Logger class
 */
export enum LogLevel {
    Info = "info",
    Error = "error",
    Warning = "warn",
    Debug = "debug",
    Verbose = "verbose"
}

/**
 * Logging context object
 */
export interface LogCtx {
    "CONTEXT" : string 
}