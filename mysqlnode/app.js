const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '654333',
    database: 'msoweb',
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'UTF8_GENERAL_CI',
    port: 3306,
    timezone: '+03:00',
});

connection.connect((err)=>{
    if(err){
        console.log('hata', err);
    }
    console.log('baglanti kuruldu');
});