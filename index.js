const express = require('express');
const cookieParser = require('cookie-parser');
const newConnection = require('./DBConnection');

const app = express();

app.use(cookieParser("secret"));

// serve static contents
app.use(express.static('static'));

// dynamic handling
// Enable access to the body of the request
app.use(express.urlencoded({
    // Extend access to body
    extended: true
}));

// If username/password combo is that of an admin, then they can proceed
// otherwise, access will be denied
app.post('/login', (request, response) => {
    let conn = newConnection();
    conn.connect();
    let username = request.body.usr;
    let password = request.body.pwd;
    let message = `<body style="background-color:powderblue;"><div style="text-align:center; margin-top:280px;"><a href='/index.html'>Access denied, click here to return to home page.</a></div></body>`;
    if(username == 'admin' && password == '123'){
        // Writing cookies
        response.cookie("usr",username, {expires: new Date(2050,0,1)});
        response.cookie("pwd",password, {signed : true}, {expires: new Date(2050,0,1)});
        response.redirect('/updateAvailability');
    }
    else {
        response.send(message);
    }
    conn.end();
});

// Will remember username/password for next time by using cookies
app.get('/login-form', (request,response) => {
    let conn = newConnection();
    conn.connect();
    let username, password;
    username = request.cookies.usr || '';
    password = request.signedCookies.pwd || '';
    let content = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action='/login-form' method='post'>
            <label for="usr">Username:</label><br>
            <input type="text" id="usr" name="usr" value="${username}'><br>
            <label for="pwd">Password:</label><br>
            <input type="text" id="pwd" name="pwd" value="${password}'><br><br>
            <input type="submit" value="Submit">
        </form>
    </body>
    </html>`;

    response.send(content);
    conn.end();
});

// Allow admin to create/reset tables in DB
app.get('/create-reset-tables', (req,res) => {
    let conn = newConnection();
    conn.connect();
//Drop any previously existing tables called 'Times'
    conn.query(`Drop Table Times`,
                    (err,rows,fields) => {
                        if (err)
                            console.log(err);
                    
                        else 
                            console.log('Times Table Dropped');
                    }
                    
                )

//Drop any previously existing tables called 'Availability'
    conn.query(`Drop Table Availability`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);

                        else 
                        console.log('Availability Table Dropped');
                }
            )

// Create a table for the time values
    conn.query(`CREATE TABLE Times
            (
                Time1 varchar(25),
                Time2 varchar(25),
                Time3 varchar(25),
                Time4 varchar(25),
                Time5 varchar(25),
                Time6 varchar(25),
                Time7 varchar(25),
                Time8 varchar(25),
                Time9 varchar(25),
                Time10 varchar(25)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                    else 
                    console.log('Times Table Created');
            });

// Initialize Availability Table
    conn.query(`CREATE TABLE Availability
            (
                Name varchar(25),
                Available1 varchar(25),
                Available2 varchar(25),
                Available3 varchar(25),
                Available4 varchar(25),
                Available5 varchar(25),
                Available6 varchar(25),
                Available7 varchar(25),
                Available8 varchar(25),
                Available9 varchar(25),
                Available10 varchar(25)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                    else 
                            console.log('Availability Table Created');
            });

    conn.query(`insert into Times values ('9:00-10:00','10:00-11:00','11:00-12:00','12:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00','4:00-5:00','5:00-6:00','6:00-7:00')`
            ,(err,rows,fields) => {
                if(err)
                    console.log(err);
                else
                    // console.log(valueOf(req.query.one));
                    console.log('inserted into Times')
                    res.redirect('/update-availability.html');        
            });

    conn.end();
});

// Will update/set the time [can only be performed by admin]
app.get('/updateAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();

    let query1 = req.query.one;
    let query2 = req.query.two;
    let query3 = req.query.three;
    let query4 = req.query.four;
    let query5 = req.query.five;
    let query6 = req.query.six;
    let query7 = req.query.seven;
    let query8 = req.query.eight;
    let query9 = req.query.nine;
    let query10 = req.query.ten;

    conn.query(`insert into Times values ('${query1}','${query2}','${query3}','${query4}','${query5}','${query6}','${query7}','${query8}','${query9}','${query10}')`
            ,(err,rows,fields) => {
                if(err)
                    console.log(err);
                else
                    // console.log(valueOf(req.query.one));
                    console.log('inserted into Times')
                    res.redirect('/update-availability.html');        
            });
    conn.end();
});

// Will display the list of times set/updated by the admin
app.get('/displayTimes', (req,res) => {
    let conn = newConnection();
    conn.connect();
    let times;
    conn.query(`select * from Times`
            ,(err,rows,fields) => {
                if (err)
                res.send('ERROR: ' +err)
                else
                {
                    times = rows;
        
                    let content ='';
                    for (t of times)
                    {
                        content += '<div>';
                        content += t.Time1 + " , " + t.Time2 + " , " + t.Time3 + " , " + t.Time4 + " , " + t.Time5 + " , " + t.Time6 + " , " + t.Time7 + " , " + t.Time8 + " , " + t.Time9 + " , " + t.Time10
                        content += '</div>'
                        content += '\n';
                    }
                        
                    res.send(content);
                }
            })

    conn.end();
});

// Will add a new guest with their name/availability
app.get('/addGuest', (req,res) => {
    let conn = newConnection();
    conn.connect();

    let name = req.query.name;
    let check1 = req.query.one;
    let check2 = req.query.two;
    let check3 = req.query.three;
    let check4 = req.query.four;
    let check5 = req.query.five;
    let check6 = req.query.six;
    let check7 = req.query.seven;
    let check8 = req.query.eight;
    let check9 = req.query.nine;
    let check10 = req.query.ten;

    if(check1 == 'on'){
        check1 = "available";
    }
    else
        check1 = "not available";

    if(check2 == 'on'){
        check2 = "available";
    }
    else
        check2 = "not available";

    if(check3 == 'on'){
        check3 = "available";
    }
    else
        check3 = "not available";

    if(check4 == 'on'){
        check4 = "available";
    }
    else
        check4 = "not available";

    if(check5 == 'on'){
        check5 = "available";
    }
    else
        check5 = "not available";

    if(check6 == 'on'){
        check6 = "available";
    }
    else
        check6 = "not available";

    if(check7 == 'on'){
        check7 = "available";
    }
    else
        check7 = "not available";

    if(check8 == 'on'){
        check8 = "available";
    }
    else
        check8 = "not available";

    if(check9 == 'on'){
        check9 = "available";
    }
    else
        check9 = "not available";

    if(check10 == 'on'){
        check10 = "available";
    }
    else
        check10 = "not available";

    conn.query(`insert into Availability values ('${name}','${check1}','${check2}','${check3}', '${check4}', '${check5}', '${check6}', '${check7}','${check8}', '${check9}', '${check10}')`
            ,(err,rows,fields) => {
                if(err)
                    console.log(err);
                else
                    console.log('inserted into Availability') 
                    res.redirect('/guest-page.html')
            });

    conn.end();
});

// Will display the availability of guests in a list
app.get('/displayAvailability', (req,res) => {
    let conn = newConnection();
    conn.connect();
    let available;
    conn.query(`select * from Availability`
            ,(err,rows,fields) => {
                if (err)
                res.send('ERROR: ' +err)
                else
                {
                    available = rows;
        
                    let content ='';
                    for (a of available)
                    {
                        content += '<div>';
                        content += a.Name + " : Time Slot 1: " + a.Available1 + " , Time Slot 2: " + a.Available2 + " , Time Slot 3: " + a.Available3 + " , Time Slot 4: " + a.Available4 + " , Time Slot 5: " + a.Available5 + " , Time Slot 6: " + a.Available6 + " , Time Slot 7: " + a.Available7 + " , Time Slot 8: " + a.Available8 + " , Time Slot 9: " + a.Available9 + " , Time Slot 10: " + a.Available10 + "\n"
                        content += '</div>'
                        content += '\n';
                    }
        
                    res.send(content);
                }
            })

    conn.end();
});

app.listen(80);