

export const environment: any = {
    production: true,
    apiCode: "system",
    bddConfig: {
        type: process.env.dbType || "mysql",
        host: process.env.dbHost || "",
        port: +process.env.dbPort || 3306,
        username: process.env.dbUsername || "root",
        password: process.env.dbPassword || "",
        database: process.env.dbDatabase || "noyeau_user",
        entities: [
            process.env.dbEntities || "src/entity/**/*.ts"
        ],
        synchronize: (process.env.dbSynchronize == 'true' ? true : false) || false
    },
    apiKeyCode: process.env.apiKeyCode || 'appNoyeau',
};