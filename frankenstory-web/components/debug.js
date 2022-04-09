const user = {
    username: "MrNOPatineto",
    password: "12345"
}

const localhost = 'http://localhost:3000/api'
const userInfoUrl = localhost + '/home'
const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {}
}