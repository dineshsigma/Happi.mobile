let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let app = express();
let port = 8031
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.options("*", cors());
//TESTING API
app.get('/', async (req, res) => {
    return res.send('SERVER IS WORKING.............')
})

//routers 
let stores = require('./stores.js');
let axp_products = require('./apx_products.js');
app.use('/api/store', stores);
app.use('/api/apx_products', axp_products);



app.listen(port, function (err) {
    console.log(`server is running on ${port}`);
})