const axios = require('axios')
const fs = require('fs')
const { pipeline } = require('stream')

// Query the data source
const EXO_API_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"
const initialDataStream = fs.createWriteStream('./initialData.json')

const extractFunction = async () => {
    const response = await axios.get(EXO_API_URL, {
        params: {
            query: "SELECT * FROM ps",
            format: "json"
        },
        responseType: "stream"
    })
    pipeline(response.data, initialDataStream, err => {
        if(err) {
            console.log("Unable to fetch data and write to initialData.json: ", err)
        } else {
            console.log("Stream data from the API")
        }
    })
}

// Export
module.exports = { extractFunction }