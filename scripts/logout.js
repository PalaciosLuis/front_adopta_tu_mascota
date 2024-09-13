
document.getElementById('logout').addEventListener('click', function () {

    fetch('http://localhost:8080/user/close', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {

                console.log(response.id);

                window.location.href = "index.html";
            } else {
                alert("Error al cerrar sesión. Inténtalo de nuevo.");
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de cierre de sesión:', error);
        });
});