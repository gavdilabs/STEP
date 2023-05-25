
const ignore = "VCAP_SERVICES";

export default class Environment {
    static variables : Map<string, string>;

    /**
     * Initializes the environment variable storage.
     * Must be run at server startup!
     */
    public static Initialize() {
        const envVars = process.env;
        this.variables = new Map<string, string>();

        for(const [key, value] of Object.entries(envVars)){
            if(key === ignore) continue;
            this.variables.set(key, value);
        }
    }

    /**
     * Retrieves a loaded environment variable value
     * @param key Key of the environment variable
     * @returns Environment variable value as a string
     */
    public static GetValue(key : string) {
        return this.variables.get(key);
    }
}