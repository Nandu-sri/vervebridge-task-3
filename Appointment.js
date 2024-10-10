
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/book', (req, res) => {
    res.render('book');
});

router.post('/book', async (req, res) => {
    const { name, email, phone, date, time, doctor } = req.body;

    const appointment = new Appointment({
        name,
        email,
        phone,
        date,
        time,
        doctor
    });

    try {
        await appointment.save();
        res.render('success', { message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(400).send('Error booking appointment');
    }
});

router.get('/list', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.render('list', { appointments });
    } catch (error) {
        res.status(400).send('Error fetching appointments');
    }
});

module.exports = router;
