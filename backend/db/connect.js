const mongoose = require('mongoose')

async function main(){
    try{
        mongoose.set('strictQuery', true)

        await mongoose.connect('mongodb+srv://Vinnie:vinnietest@testcluster.pckiajh.mongodb.net/?retryWrites=true&w=majority')
        
        console.log('Database connected')
    }catch(e){
        console.log('Failed to connect to database')
    }
}

module.exports = main