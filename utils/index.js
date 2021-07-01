module.exports.logMessage = (message='log') =>{
    const dateTime = new Date();
    console.log(`${dateTime.toISOString()} :: ${message}`);
}

module.exports.getRandomIndex = (length) =>{
    const index = Math.floor( Math.random() * length );
    this.logMessage(`getting random index ${index}`)
    return index
}
