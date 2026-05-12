const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Notes = db.define('notes', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Sinkronisasi database
(async () => {
    try {
        await db.sync();
        console.log("Tabel notes telah di sinkronisasi.");
    } catch (error) {
        console.error("Gagal melakukan sinkronisasi database:", error);
    }
})();

module.exports = Notes;
