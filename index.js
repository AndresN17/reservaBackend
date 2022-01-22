'use strict'
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');

//Charging the environment variables
dotenv.config({ path: `.env.${app.get('env')}` });

const PORT = process.env.PORT || 3000;
const ROUTE = process.env.ROUTE;
const VERSION = process.env.VERSION;

const sequelize = require('./utils/database');
const User = require('./models/user');
const Image = require('./models/image');
const News = require('./models/news');
const Business = require('./models/business');
const Category = require('./models/category');
const Schedule = require('./models/localComment');
const Local = require('./models/local');
const LocalComment = require('./models/localComment');
const NewsComment = require('./models/newsComment');

//Setting the filestorage destination and the filename generation
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${new Date().toISOString()}`);
    }
});

//Set the filefilter for only accepting png, jpg and jpeg files.
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})


app.use(ROUTE + VERSION, authRoutes);
app.use(ROUTE + VERSION, userRoutes);

// Error middleware handler
app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message;
    const errorData = err.data;
    res.status(errorStatus).json({ message: errorMessage, data: errorData });
});

//relaciones
User.hasMany(News);
News.belongsTo(User);
User.hasMany(Business);
Business.belongsTo(User);
Business.hasMany(Local);
Local.belongsTo(Business);
Local.hasOne(Schedule);
Schedule.belongsTo(Local);
Local.belongsToMany(Image, { through: 'local_image' });
Image.belongsToMany(Local, { through: 'local_image' });
News.belongsToMany(Image, { through: 'news_image' });
Image.belongsToMany(News, { through: 'news_image' });
News.belongsToMany(Category, { through: 'news_category' });
Category.belongsToMany(News, { through: 'news_category' });
User.hasMany(LocalComment);
LocalComment.belongsTo(User);
Local.hasMany(LocalComment);
LocalComment.belongsTo(Local);
News.hasMany(NewsComment);
NewsComment.belongsTo(News);
User.hasMany(NewsComment);
NewsComment.belongsTo(User);




sequelize.sync(/* { force: true } */)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    }).catch(err => console.log(err));