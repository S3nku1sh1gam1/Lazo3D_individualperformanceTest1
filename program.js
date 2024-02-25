const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const program = express();
const link = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
const dbLink = 'classroom';

program.use(cors());
program.use(express.json());

program.listen(PORT, () => {
    console.log('Listening on http://localhost:${PORT}...');
});

program.get('/program/Classroom',(req, res)=> cream(req, res));
program.get('/program/Classroom/Extracting',(req, res)=> jelly(req, res));
program.get('/program/Classroom/Retrival',(req, res)=> matcha(req, res));

function cream(req, res) {
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const ice = db.collection('course');

        ice.find({})
            .toArray()
            .then((result) => {
                res.json(result);
        })
        .catch((err) => {
            console.error('Error has occured');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database',err);
        res.status(500).send('Internal Server Error');
    });
}

function jelly(req, res) {
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const bean = db.collection('course');

        bean.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                courses.push({
                                    name: course.description,
                                    specialization: course.tags[1] 
                                });
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}

function matcha(req, res) {
    MongoClient.connect(link)
    .then((client) => {
        const db = client.db(dbLink);
        const latte = db.collection('course');

        latte.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                
                                if (course.tags.includes("BSIS") || course.tags.includes("BSIT")) {
                                    courses.push({
                                        name: course.description,
                                        specialization: course.tags.includes("BSIS") ? "BSIS" : "BSIT"
                                    });
                                }
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}
