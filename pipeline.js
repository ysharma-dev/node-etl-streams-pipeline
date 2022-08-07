const fs = require('fs')
const { pipeline } = require('stream')

// Import ETL functions
const { extractFunction } = require('./extract')
const { transformStream } = require('./transform')

// Set up the ETL pipeline
const startEtlPipeline = async () => {
    try {
        // Extract step
        await extractFunction()

        // Transform step
        const extractStream = fs.createReadStream('./initialData.json')
                
        // Load step
        const outputStream = fs.createWriteStream('./output.json')
        
        // Execute the ETL pipeline
        pipeline(extractStream, transformStream, outputStream, err => {
            if(err) {
                console.log("Pipeline failed with an error: ", err)
            } else {
                console.log("Pipeline ended succesfully")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

startEtlPipeline()