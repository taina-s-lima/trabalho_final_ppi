import mysql from 'mysql2/promise';
export default async function conexao(){

    if(globalThis.poolConexao){
        return await globalThis.poolConexao.getConnection();
    } else {
        global.poolConexao = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'imobiliaria',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            maxIdle: 10,
            idleTimeout: 60000,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        return await globalThis.poolConexao.getConnection();
    }
}