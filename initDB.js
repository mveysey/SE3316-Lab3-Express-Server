const newConnection = require('./DBConnection');

// function dropTimes() {
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

    // conn.end();
// }
//; dropAvailability(); createTimes();createAvailability()

// function dropAvailability(){
//     let conn = newConnection();
//     conn.connect();
//Drop any previously existing tables called 'Availability'
    conn.query(`Drop Table Availability`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);

                        else 
                        console.log('Availability Table Dropped');
                }
            )

            // conn.end();
// }

// function createTimes(){
//     let conn = newConnection();
//     conn.connect();
// Create a table for the time values
    conn.query(`CREATE TABLE Times
            (
                Time1 varchar(10),
                Time2 varchar(10),
                Time3 varchar(10),
                Time4 varchar(10),
                Time5 varchar(10),
                Time6 varchar(10),
                Time7 varchar(10),
                Time8 varchar(10),
                Time9 varchar(10),
                Time10 varchar(10)
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                    else 
                    console.log('Times Table Created');
            });

//             conn.end();
// }

// function createAvailability(){
//     let conn = newConnection();
//     conn.connect();
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

    conn.end();
// }   