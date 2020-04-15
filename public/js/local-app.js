console.log("Client side js")

formselector = document.querySelector('form')
inputselector = document.querySelector('input')
message1 = document.querySelector('#message-1')
message2 = document.querySelector('#message-2')
errormessage = document.querySelector('#error-message')
formselector.addEventListener('submit', (e) => {
    e.preventDefault()
    inputval = inputselector.value
    fetch("/weather?address=" + inputval).then((response) => {
        response.json().then((data) => {
            errormessage.textContent = ""
            message1.textContent = ""
            message2.textContent = ""
            if (data.error) {
                errormessage.textContent = data.error
            } else {
                message1.textContent = data.description
                message2.textContent = data.statement
            }
        })
    })
})