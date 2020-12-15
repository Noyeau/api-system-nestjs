

export const environment: any = {
    production: true,
    apiCode:"system",
    bddConfig: {
        type: 'mysql',
        host: '192.168.1.15',
        port: 3306,
        username: "root",
        password: "NoyeauP@ssword",
        database: "noyeau_system",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
    },
    apiKeyCode:'appNoyeau',
};