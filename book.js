   let db= {
    host: 'localhost',
    user: 'pritam',
    password: 'pritam123',
    database: 'satara',
	port:3306
    };

    const mysql=require("mysql2");
    const con=mysql.createConnection(db);

    const express = require("express");
    const app=express();

    app.listen(82,()=>{

            console.log("server listening...");
    });

    app.use(express.static("abc"));

    app.get("/getBookDetails",(req,res)=>{

            let bookid=req.query.bookid;
            console.log(bookid);
            let output={status:false,bookDetails:{bookid:"",bookname:"",price:""}};

            con.query("select bookid,bookname,price from book where bookid=?",[bookid],
            (err,rows)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    if(rows.length>0)
                    {
                        output.status=true;
                        output.bookDetails.bookid=rows[0].bookid;
                        output.bookDetails.bookname=rows[0].bookname;
                        output.bookDetails.price=rows[0].price;
                        console.log(rows);
                    }
                }
                res.send(output);
            });
    });


    app.get("/updateBookDetails",(req,res)=>{
        let bookdetails={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};

        let output={status:false};

        con.query("update book set price=? where bookid=?",[bookdetails.price,bookdetails.bookid],
        (err,rows)=>{
            if(err)
            {
                console.log(err);
            }
            else{
                if(rows.affectedRows>0)
                {
                    output.status=true;
                    console.log(rows);
                }
            }
            res.send(output);
        });

});