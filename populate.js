const { pool } = require("./db");
const products = require("./products.json")

const populate = async () => {
    

    products.forEach( async (prod) => {
        
        var propertyArray = [`name`, `company`, `price`, `rating`]
        await propertyArray.forEach((ppt) => {
            if(!(prod[ppt]))  {
                prod[ppt] = null
            }
        
        })


        if(!(prod.featured)) {
            prod.featured = false
        }

        let sql = `INSERT INTO storeapi(name, company, price, rating, featured) VALUES("${prod.name}", "${prod.company}", ${prod.price}, ${prod.rating}, "${prod.featured}")`

        await pool.getConnection ( async (err, connection) => {
            if (err) throw err
            await connection.query(sql, (err, rows) => {
                if(err) throw err
            })
            

        })
        
    })
    prods()
      
}

const prods = async () => {
    pool.getConnection( async (err, connection) => {
        if(err) throw err
        await connection.query("SELECT * FROM new.storeapi", (err, rows) => {
            if(err) throw err
            console.log(rows)
        })
    })
}

populate()

