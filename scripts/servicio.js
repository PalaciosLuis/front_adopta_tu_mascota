document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const tipo = document.getElementById('tipo').value;
    const valor = document.getElementById('valor').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;
    let message = 'Credenciales incorrectas';

    // Validación del número de documento
    if (tipo === 'dni') {
        if (valor.length !== 8 || !/^\d+$/.test(valor)) {
            isValid = false;
            message = 'Debe completar correctamente sus credenciales';
        }
    } else if (tipo === 'cex') {
        if (valor.length !== 10 || !/^[a-zA-Z0-9]+$/.test(valor)) {
            isValid = false;
            message = 'Debe completar correctamente sus credenciales';
        }
    } else if (tipo === 'pas') {
        if (valor.length !== 12 || !/^\d+$/.test(valor)) {
            isValid = false;
            message = 'Debe completar correctamente sus credenciales';
        }
    }

    // Validación de la contraseña
    if (isValid && (password.length < 10 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password))) {
        isValid = false;
        message;
    }

    if (!isValid) {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">' + message + '</div>';
    } else {

        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, valor, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id == 200) {
                    document.getElementById('result').innerHTML = '<div class="alert alert-success">Inicio de sesión exitoso</div>';
                    window.location.href = "login.html";
                } else {
                    document.getElementById('result').innerHTML = '<div class="alert alert-danger">' + data.message + '</div>';
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = '<div class="alert alert-danger">Ocurrió un problema en la autenticación' + '</div>';
            });
    }
});