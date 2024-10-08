export interface ServerConfig {

    port: number;

}

export interface Config {

    port: number;
    logging: boolean;
    servers: {
        [key: string]: ServerConfig;
    };

}