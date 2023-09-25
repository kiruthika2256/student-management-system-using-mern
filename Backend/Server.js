const express=require('express');
const cors=require('cors');
const mysql = require('mysql2');
const app=express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'Kir@2002',
 database:'crud'
});

app.get("/",(req,res)=>{
    const sql="SELECT * FROM student";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    }
    )
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)"; // Two placeholders for name and email
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, values, (err,data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data);
    });
});


app.put('/update/:id', (req, res) => {
    const sql="UPDATE student SET `name`=?, `email`=? WHERE ID=?"; // Two placeholders for name and email
    const values = [
        req.body.name,
        req.body.email
       
    ]
    const id = req.params.id
 
    db.query(sql,[...values,id], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data);
    });
});

app.delete('/student/:id', (req, res) => {
    const sql="DELETE FROM student  WHERE ID=?"; // Two placeholders for name and email

    const id=req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data);
    });
});

app.listen(8081,() =>{
    console.log("Listening");
});