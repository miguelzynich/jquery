$(document).ready(function () {
    const myModal = new bootstrap.Modal(document.getElementById('modalId'));
    const nomeInput = document.getElementById("nome");
    const helpNome = document.getElementById("helpNome");

    const emailInput = document.getElementById("email");
    const helpEmail = document.getElementById("helpEmail");

    nomeInput.addEventListener("input", function () {
        if (nomeInput.value.trim() === "") {
            helpNome.textContent = "Digite um nome válido";
        } else {
            helpNome.textContent = "";
        }
    });
});


$('.featured-item a').addClass('btn btn-dark stretch-link');
    $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>');

    $('.featured-item h4').dblclick(function () {
        $(this).css({
            'color': '#f00',
            'background': '#ff0',
            'font-weight': '100'
        });
    });


    