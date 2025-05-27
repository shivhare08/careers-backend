const express = require('express');
const { adminModel, applyModel, careersModel, contactModel, userModel } = require('../database');
const adminRouter = express.Router();
const jwt_key_admin = "admin"
const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminAuth = require('../middleman/adminAuth');

adminRouter.post('/signup', async (req, res) => {
    const name = req.body.name;
    const department = req.body.department;
    const password = req.body.password;
    try {

        const deptexist = await adminModel.findOne({ department: department });
        if (deptexist) {
            res.json({
                status: "department is already exist"
            })
            return;
        }

        const zodAuthentication = zod.object({
            name: zod.string().min(2),
            department: zod.string().min(2),
            password: zod.string().min(3)
        })

        const parseData = zodAuthentication.safeParse(req.body);
        if (!parseData.success) {
            res.json({
                msg: "Sorry",
                reason: parseData.error
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const createData = await adminModel.create({
            name,
            department,
            password: hashPassword

        })
        res.json({
            status: `${name}, your account is created as a admin`
        })
    } catch (e) {
        console.log(e);
    }
})

adminRouter.post('/signin', async (req, res) => {
    try {
        const department = req.body.department;
        const password = req.body.password;

        const finddepartment = await adminModel.findOne({ department: department });
        if (!finddepartment) {
            res.json({
                status: "sorry , this number is not exist"
            })
            return;
        }

        const passwordChecking = await bcrypt.compare(password, finddepartment.password);
        if (passwordChecking) {
            const token = await jwt.sign({
                _id: finddepartment._id
            }, jwt_key_admin)

            res.json({
                status: "login done successfully",
                your_token: token,
            })
        } else {
            res.json({
                status: "invalid user"
            })
        }
    } catch (e) {
        console.log(e);
    }
})

adminRouter.post('/addjob', adminAuth, async (req, res) => {
    try {
        const title = req.body.title;
        const experience = req.body.experience;
        const courses = req.body.courses;
        const batch = req.body.batch;
        const description = req.body.description;
        const salary = req.body.salary;
        const location = req.body.location;
        const aggrement = req.body.aggrement;

        const details = await adminModel.findById(req.id);
        const createJob = await careersModel.create({
            title,
            experience,
            courses,
            batch,
            description,
            salary,
            location,
            aggrement,
            jobAddedBy: {
                name: details.name,
                department: details.department
            }
        })

        res.json({
            status: "job is added"
        })

    } catch (e) {
        console.log(e);
    }
})

adminRouter.get('/allapplications', adminAuth, async (req, res) => {
    try {
        const data = await applyModel.find();
        res.json({
            applications: data
        })
    } catch (e) {
        console.log(e);
    }
})

// adminRouter.get('/allusers', adminAuth, async (req, res) => {
//     try {
//         const data = await userModel.find();
//         res.json({
//             data: data
//         })
//     } catch (e) {
//         console.log(e);
//     }
// })


module.exports = adminRouter