const bcrypt = require('bcrypt');

async function generateHashed(name, size = 10) {
    const salt = await bcrypt.genSalt(size)
    return hashed = await bcrypt.hash(name, salt)
}
module.exports = generateHashed;
