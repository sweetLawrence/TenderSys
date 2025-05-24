const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
const db = require("./Database/models");

const tenderRoutes = require('./routes/uploads_route');

// app.use(cors())
const corsOptions = {
    origin: '*',
    // credentials: true,
};



// ROUTERS

app.get('/',(req,res)=>{
    res.json("Tender System is Active")
})

app.use(express.json())
app.use(cors());
// app.options('*', cors(corsOptions));

app.use('/uploads', express.static('uploads')); // To serve uploaded files
app.use('/api/tenders', tenderRoutes);



db.sequelize.sync().then(() => {
    console.log(" ")
    console.log("Database is synced")
    app.listen(PORT, () => {
        
        console.log("Tenders Server Is Online");
    })
})

