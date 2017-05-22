(function() {
    const btnSend = document.getElementById('btnSend');

    btnSend.addEventListener('click', handleClick);

    function handleClick(e) {
        const
            loginField = document.getElementById('loginField'),
            passField = document.getElementById('passField'),
            resultField = document.getElementById('requestResponse'),
            login = loginField.value,
            pass = passField.value;

        if(!login || !pass) return;

        sendRequest(login, pass);

        loginField.value = passField.value = '';
    }

    function sendRequest(login, pass) {
        const url = 'http://localhost:3000/';
        console.log('login', login, 'pass', pass);

        axios.post(url, {
            login: login,
            password:pass
            })
            .then(function (response) {
                parseResponse(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function parseResponse(response) {
        console.log(response.data);
    }
})();
