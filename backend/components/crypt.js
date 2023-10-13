const crypto = require('crypto')

function crypt(value){
    let hash = crypto
                .createHash('sha256')
                .update(value)
                .digest('hex')
    return hash
}

module.exports = {crypt}