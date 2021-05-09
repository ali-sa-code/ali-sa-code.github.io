'use strict';

let slider = tns({
    container: '.carousel__slider',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    autoHeight: true,
    responsive: {
        425: {
            
            nav: false,
        },
        768: {
            nav: true,
            prev: false,
            next: false,
        },
        1040: {
            nav: false,
        }
    }
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

const carousel = document.querySelector('.carousel');

function showFun() {
    if (window.screen.width >= 768) {
        carousel.style.display = 'block';
    } 
    else {
        carousel.parentNode.removeChild(carousel);
    }
}
showFun();

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on ('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });
}
toggleSlide ('.catalog-item__link');
toggleSlide ('.catalog-item__back');


// Modal

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thx4order, #order').fadeOut('slow');
});
$('.button_pay').each(function(i) {
    $(this).on('click', function () {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    });
});

function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2,
            },
            phone: {
                required: true,
                phone: true,
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите своё имя",
                minlength: jQuery.validator.format("Введите от {0} символов!")
            },
            phone: {
                required: "Введите свой номер телефона",
                phone: "Пожалуйста, введите свой номер телефона в формате 8 xxx-ххххххх",
            },
            email: {
                email: "Пожалуйста, введите вашу почту"
            }
        }
    });
}
validateForms('#consultation-form');
validateForms('#consultation');
validateForms('#order');

$('input[name=phone]').mask("+375 (99) 999-99-99");

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
    }).done(function () {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thx4order').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

//smooth scroll and up 
$(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
        }   else {
        $('.pageup').fadeOut();
    }
});

$(function() {
    $("a[href^='#']").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });
});

new WOW().init();