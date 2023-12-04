function mostrarContrasena() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function validarFormulario() {
    var fechaNacimiento = document.getElementById("fecha_nacimiento").value;

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fechaNacimiento)) {
        alert("Formato de fecha no válido. Debe ser dd/mm/aaaa.");
        return false;
    }

    var password = document.getElementById("password").value;

    if (password.length < 6 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        alert("La contraseña debe tener al menos 6 caracteres y contener letras y números.");
        return false;
    }


    return true;
}
