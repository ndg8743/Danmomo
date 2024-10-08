export interface ServerConfig {
    port: number;
}

export interface Config {
    port: number;
    servers: {
        [key: string]: ServerConfig;
    };
}