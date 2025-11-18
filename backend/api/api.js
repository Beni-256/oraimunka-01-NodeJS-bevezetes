const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
//?/api/names => Visszaad egy név listát
let names = ['Badó M. János', 'Pető G. Pici', 'Kakas Z. Kaki']; //?Top-Level Code => Az alkalmazás elindításánál már létrejön a tömb és az egész futás alatt létezik.
router.get('/names', (request, response) => {
    response.status(200).json({
        success: 'true',
        results: names
    }); //?Adunk egy választ a kérésre, 200-as státuszkóddal (OK) => JSON lesz a válasz, ami tartalmaz két kulcsot, amiből az egyik kulcs adja vissza értékként a tömb tartalmát.
});
//?/api/names => POST => Frissíti a listát egy újonnan érkező értékkel
router.post('/names', (request, response) => {
    //? console.log(request); //? => A szerver irányába érkező teljes kérés. Számunkra elsősorban ebből kettő lesz a fontos: head, body
    const body = request.body;
    //? Egy json object-et várunk, ami rendelkezik egy name kulccsal
    const name = body.name;
    names.push(name);
    console.log(names);
    response.status(200).json({
        success: 'true',
        results: names
    });
});
//?PARAMÉTER MEGADÁSA
router.get('/derekszoge/:a/:b/:c', (request, response) => {
    const a = parseFloat(request.params.a); //?Paraméter meghatározás :valami => request.params.valami
    const b = parseFloat(request.params.b);
    const c = parseFloat(request.params.c);

    if (a * a + b * b === c * c) {
        response.status(200).json({
            message: 'A háromszög derékszögű!'
        });
    } else {
        response.status(200).json({
            message: 'A háromszög nem derékszögű!'
        });
    }
});
module.exports = router;
