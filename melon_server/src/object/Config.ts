export interface ServerConfig {

    port: number;

}

export interface Config {

    ip: string;
    port: number;
    logging: boolean;
    secure: boolean;
    servers: {
        [key: string]: ServerConfig;
    };

}