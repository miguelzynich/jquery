$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 2,
                nav: false,
            },
            1000: {
                items: 3,
                nav: false,
            },
        },
    });

});

    $('.featured-item a').on('blur', function (event) {
        event.preventDefault();
        alert('Produto esgotado');
    });

    $('.featured-item:nth(1)').hide(2000, function () {
        alert($(this).find('h3').text() + ' esgotado');
        $(this).show(2000, function () {
            console.log($(this).find('h3').text() + ' em estoque');
            
            const duracao = 1000;

            $(this)
                .hide(duracao)
                .show(duracao)
                .fadeOut(duracao)
                .fadeIn(duracao)
                .fadeOut(duracao)
                .fadeIn(duracao)
                .fadeOut(duracao)
                .fadeIn(duracao);
        });
    });

$(' .nav-modal-open').on('click', function(e){

    e.preventDefault();

    let elem = $(this).attr('rel')

    $('modal-body').html($('#'+elem).html())

    $('modal-header h5.modal-title').html($('#modalId'))

    myModal.show()

})

$('.form').on('submit', functin(e){

    e.preventDefault()
    
    const name = $('.nome').val() 
    const name = $('.nome').val() 

    })


