const handleGreeting = (request, response) => {
    const params = request.params
   
    if (!params.name) {
        response.send("Hello World")
    } else {
        let msg = "Hello" + params.name
        response.send(msg)
    }
}

module.exports.handleGreeting = handleGreeting;