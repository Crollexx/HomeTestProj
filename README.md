CLIENT

    - npm create vite@latest .
    - npm i axios
    - npm react-router-dom

SERVER

    - npm init -y
    - npm i express sequelize pg pg-hstore cookie-parser bcrypt dotenv jsonwebtoken
    // установка зависимостей в devDependencies
    - npm i -D nodemon sequelize-cli

    // в корневую npx gitignore node

DB supabase //создать облачную DB

// Добавляем посты + пользователь

    - sequelizerc //создаем файл инфа с сайта

    // .sequelizerc

require('dotenv').config();
const path = require('path');

module.exports = {
  config: path.resolve('db', 'config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations'),
};

    -npx sequelize init

    //меняем конфиг в db
    "use_env_variable": 'DATABASE_URL'


    - npx sequelize model:create --name User --attributes name: string, email:string,password:string

    - npx sequelize model:create --name Post --attributes title: string, description:string,user_id:integer

    -migration user =>  allowNull: false(везде), уникальный email unique: true, createdAt/updatedAt => defaultValue: Sequelize.fn('NOW')/ defaultValue: new Date() //разные форматы написания, можно выбрать любой но чтобы они были одинаковые

    -migration post => allowNull: false(везде),  // зависимость постов от юзера  user_id => references: { model: 'Users', key: 'id'}, onDelete: 'CASCADE', defaultValue: Sequelize.fn('NOW')/ defaultValue: new Date() //разные форматы написания, можно выбрать любой но чтобы они были одинаковые

-npx sequelize migrate:undo:all

-models Users -- this.hasMany(models.Post, { foreignKey: 'user_id'})
-Post -- this.belongsTo(models.User, {foreignKey: 'user_id'})

-npx sequelize seed: create --name usersSeed
-npx sequelize seed: create --name postsSeed
//проверка последовательности сидов сначала юзеры, потом посты
//заполняем сиды, подключаем bcrypt
Users // создадим 3 юзера
const bcrypt = require('bcrypt')
password: await bcrypt.hash('123', 10)

Posts // создадим 3 поста с разным фйди
title: 'Hi'
description: 'string kakoito'
user_id: 1
title: 'Text 1'
description: 'eche string kakoito'
user_id: 2

    -npx sequelize db:seed:all

    bd готово

/////////////////////////////////////////////////////////////

                            SERVER

/////////////////////////////////////////////////////////////

// создаем папки
routes, utils, middleware файл app.js

// меняем скрипты
script
start: node app.js
dev: nodemon app.js --ext js,jsx,json

//app.js

// конфигурация должна быть до маршрутизации(важно)
-Конфигурация
serverConfig(app)

- подключаем express
  app = express
- подключаем dotenv
  apiRouter()
- PORT = process.env.PORT ?? 3000
- включаем слушатель порта
- app.use('/api' api)

//api.routes.js

-Маршрутизация

- подключаем express router
- подключаем authRouter(фалй)
- подключаем tokensRouter(файл)
- router.use('/auth', ..)
- router.use('/tokens', ..)

//tokens.routes.js

- подключаем express router
  // нужно для интерцептора, сюда заходит и обновляет токен
- router.get('/', refresh, (req, res) => {

})

//auth.routes.js

- подключаем express
  //добавляем пользователь
- router.post('registration', (req, res) => {

})
//авторизируем пользователя

- router.post('authorization', (req, res) => {

})
//делаем logout

- router.delete('logout', (req, res) => {

})

//config

- serverConfig.js
- подключаем express
- cookieParser ('cookie-parser')

const serverConfig = (app) => {
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
}

//middleware
//здесь токены еще нигде не появились, тут мы задаем как они должны работать, создание токенов происходит в папке utils

- verifyAccessToken.js //копируем

require('dotenv').config();
const jwt = require('jsonwebtoken');

// req -обрабатывает запрос
function verifyAccessToken(req, res, next) {
try {
const accessToken = req.headers.authorization.split(' ')[1]; //req.headers.authorization есть заголовки, в заголовках есть заголовок authorization, в authorization есть строка bearer и название токена из этой строки делаем массив, в массиве есть индексы, bearer не нужен, токен нужен //забирает из заголовка(headers) сплитит по пустой строке, тоесть возвращает массив, и забирает accessToken по первому индексу ([1])
const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//res наполняет хранилище для дальнейшего продолжения ответа
res.locals.user = user;

      next(); //next чтобы идти дальше
    } catch (error) {
      console.log('Invalid access token');
      //res формирает ответ в виде невалидного аксес токена
      res.status(403).send('Invalid access token');
    }

}

module.exports = verifyAccessToken;

- verifyRefreshToken.js //копируем

require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
try {
const { refreshToken } = req.cookies; //рефрешь токен мы забираем из куки и деструктуризируем из объекта кук ,забирает токен из cookie
const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      res.locals.user = user;

      next();
    } catch (error) {
      console.log('Invalid refresh token');
      res
        .clearCookie('refreshToken')
        .sendStatus(401);
    }

}

module.exports = verifyRefreshToken

//utils копипастим
generateTikens.js

require('dotenv').config()
const jwt = require('jsonwebtoken'); //метод для подписания токенов sign, (verify для сравнения)
const jwtConfig = require('../config/jwtConfig');

//функция принимает в себя полезныю нагрузку(payload),
и возвращает объект, в объекте есть ключи которые будем генерировать

function generateTokens(payload) {
return {
//jwt sign подписываем полезную нагрузку(payload), с помощью секретного ключа(лежит в переменной окружения .env) далее прописываем опции этого токена, как долго он живет(параметры задаются в файле jwtConfig)expiresIn это ключ опции метода sign
refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: jwtConfig.refresh.expiresIn}),
accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: jwtConfig.access.expiresIn})
}
}

module.exports = generateTokens;

///////////////////////////////////////////////////////

                  Делаем регистрацию

//////////////////////////////////////////////////////

//auth.routes
bcrypt
generateTokens
jwtConfig
подключаем модель Users, деструктуризируем

- router.post('registration', async (req, res) => {
  try {
  // забираем и деструктуризуруем поля юзера
  const {name, email, password} = req.body

if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
return res.status(400).json({message: 'Empty'})
} 

const userInDb = await User.findOne({where: {email}})

if(userInDb){
    return res.status(400).json({message: 'User is already exist'})
}else {
    const user = (await User.create({name, email, password: await bcrypt.hash(password, 10)})).get()
//payload user
    const {accessToken, refreshToken} = generateTokens({user}) 
}

console.log(user)

// формируем первый ответ, который формирует сервер на клиента
res.status(201).cookie(jwtConfig.refresh.type, refreshToken, {httpOnly: true, maxAge: jwtConfig.refresh.expiresIn}).json({accessToken, user})

}catch (error) {
//если падаем, говорим что проблема сервера, отдаем json
res.status(500).json({error: error.message})

}
})



/////////////////////////////////////////////////

                 Делаем вторизацию

////////////////////////////////////////////////


- router.post('authorization', (req, res) => {
   try {
const {email, password} = req.body

if(email.trim() === '' || password.trim() === ''){
return res.status(400).json({message: 'Empty'})
} 

const user = (await User.findOne({where: {email}}).get())

const isMatch = await bcrypt.compare(password, userpassword)

if(user && isMatch) {
const {accessToken, refreshToken} = generateTokens({user})

res
.cookie(jwtConfig.refresh.type, refreshToken, {httpOnly: true, maxAge: jwtConfig.refresh.expiresIn})
.json({accessToken, user})

} else {
    return res.status(400).json({message: 'In correct'})
}

   } catch {
res.status(500).json({error: error.message})

   }
})


////////////////////////////////////////////////////

                 Logout

///////////////////////////////////////////////////

 router.delete('/logout', (req, res) => {
  res
  //отправляем с сервера на клиент HTTP заголовок с нулевым временем (set-cookie где maxAge = 0 )
  .clearCookie(jwtConfig.refresh.type)
  .json({accessToken: ''})

})


///////////////////////////////////////////////

//tokens.routes
используется перехватчиками, нужна для них
подключаем из мидлварки рефрешь токен
подключаем генерэйттокенс
jwtConfig
//обработчик возобновления цикла жизни рефрешь токена
в ответе res содержит юзера (res.locals.user)

router.get('/refresh', verifyRefreshToken, (req, res) => {

const {user} = res.locals

const {accessToken, refreshToken} = generateTokens(user)

res
.cookie(jwtConfig.refresh.type, refreshToken, {httpOnly: true, maxAge: jwtConfig.refresh.expireIn})
.json({user, accessToken})



})


/////////////////////////////////////////////

                 CLIENT

/////////////////////////////////////////////


//создаем 
components-> Nav -> Nav.jsx
pages - HomePage, RegistrationPage, AuthorizationPAge, ErrorPage
services - axiosInstance

//Nav.jsx
Клиентская маршрутизация
//NavLink
 '/' Home
 '/auth/authorisation' Authorization
 '/auth/registration' Registration


 //App.jsx
 BrowserRouter(главная обертка) Route(конкретные роуты) Routes(тоже обертка)
 добавляем состоянние юзера


//axiosInstance

import axios from 'axios';

const apiAxiosInstance = axios.create({
    baseURL: '/api',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,  
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

// В каждый запрос добавляет HTTP заголовок Authorization
apiAxiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      if (error.response.status === 403 && !prevRequest.sent) {
        const response = await axios.get('/api/tokens/refresh');
        accessToken = response.data.accessToken;
        prevRequest.sent = true;
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiAxiosInstance(prevRequest);
      }
      return Promise.reject(error);
    },
);
  

  
export default apiAxiosInstance;