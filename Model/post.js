const sql = require('msnodesqlv8');
const clsConfig = require('./config');
const { log } = require('console');


function openConnection(){

    return new Promise((resolve, reject)=> {

        sql.open(clsConfig.connString, (err, conn)=>{

            if(err){

                reject('Connection Error: ' + err)
            }else {

                console.log('Connected to sql server ...');
                resolve(conn);
            }
        })
    })
}

function executeQuery(conn, query){

    return new Promise((resolve, reject)=>{

        conn.query(query, (err, rows) =>{

            if(err){

                reject('Query Error: ' + err)
            }else {

                resolve(rows);
            }
        })
    })
}


class clsPost {

    static async getLatestMovies() {
        
        try{
            const conn = await openConnection();
            
            const query = 'SELECT TOP 12 * FROM movies_details ORDER BY id ASC';
            const rows = await executeQuery(conn, query)


            conn.close();

            return rows;
        }catch(err){

            console.error(err);
            return null;
        }
    }

    static async getTop12ImdbMovies(){

        try{
            
            const conn = await openConnection();

            const query = 'SELECT TOP 12 * FROM movies_details ORDER BY imdb_rating DESC';
            const rows = await executeQuery(conn, query);

            conn.close();

            return rows;
        }catch(err){

            return null;
        }
    }

    static async getUpcomingReleases(){

        try{
            
            const conn = await openConnection();
            const query = 'SELECT * FROM upcoming_movies_details';

            const rows = await executeQuery(conn, query);

            conn.close();

            return rows;
        }catch(err){

            console.log('Query Error : ' + err);
            
            return null;
        }
    }

    static async getLatestTvShows(){

        try {
            
            const conn = await openConnection();
            const query = 'SELECT * FROM serieses_details';

            const rows = await executeQuery(conn, query);

            conn.close();

            return rows;
        } catch (err) {
            
            console.log('Query Error : ' + err);
            
            return null;
        }
    }
}


module.exports = clsPost;