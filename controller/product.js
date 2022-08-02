const {pool} = require("../db")

exports.getProducts = async (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const options = ["name", "company", "featured"]
        let searchArray = []

        options.forEach((option) => {
            if(req.query[option]){
                searchArray.push(`${option} = "${req.query[option]}"`)
            }
        })
        let {numericFilter, sort, page} = req.query
        if(numericFilter){
            let regex = /(<|>|>=|<=|=)/
            let filter = numericFilter.replace(regex, (operator) => {
                return `-${operator}-`
            })
            let [option, arOperator, value] = filter.split("-")
            value = Number(value)

            const filterString = `${option} ${arOperator} ${value}`
            searchArray.push(filterString)
            
        }

        var sql
        
        const searchString = searchArray.join(" AND ")
        if(!sort){
            sort = "id"
        }
        
        if(searchArray.length === 0){
            sql = `SELECT * FROM storeapi ORDER BY ${sort}`
        } else {
            sql = `SELECT * FROM storeapi WHERE ${searchString} ORDER BY ${sort}`
        }
        const limit = 3
        let pageStart
        if(page){
            pageStart = ((page-1)*limit)
        } else {
            pageStart = 1
        }
        sql = `${sql} LIMIT ${pageStart}, ${limit}`
        
        
        
        connection.query(sql, (err, rows) => {
            if(err) throw err
            res.status(201).send(rows)
        })
    })
}