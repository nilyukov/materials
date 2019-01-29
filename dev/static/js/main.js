$(document).ready(function () {
    svg4everybody({});

    $(".phone-mask").mask("+7(999) 999-99-99");

    let sandwich = () => {
        $(document).on('click', '.catalog-nav__header', function () {
            let sandwich = $(this).find('.sandwich'),
                catalog = $(this).parent();
            if ($(window).width() < 768) {
                if ($('.mobile-nav__wrapper').hasClass('mobile-nav__wrapper--active')) {
                    $('.mobile-nav__wrapper').removeClass('mobile-nav__wrapper--active');
                    $('.sandwich').removeClass('sandwich--active');
                    catalog.toggleClass('catalog-nav--active');
                } else {
                    $('html').toggleClass('fixed');
                    catalog.toggleClass('catalog-nav--active');
                }
            } else {
                sandwich.toggleClass('sandwich--active');
                catalog.toggleClass('catalog-nav--active')
            }
        });

        if ($(window).width() < 768) {
            $(document).on('click', '.sandwich', function () {
                if ($('.catalog-nav').hasClass('catalog-nav--active')) {
                    $('.catalog-nav').removeClass('catalog-nav--active');
                    $(this).toggleClass('sandwich--active');
                    $('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
                } else {
                    $(this).toggleClass('sandwich--active');
                    $('html').toggleClass('fixed');
                    $('.mobile-nav__wrapper').toggleClass('mobile-nav__wrapper--active');
                }

            });
        }
    };

    let popularCategoriesSlider = () => {
        if ($(window).width() < 768) {
            $('.js-categories-prev').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '.categories-prev__btn--prev',
                nextArrow: '.categories-prev__btn--next',
                adaptiveHeight: true,
                infinite: false,
                dots: true
            })
        }
    };

    let productPrevSlider = () => {

        let sliderCount = $('.product-slider__count'),
            prodSlider = $('.js-product-slider');

        prodSlider.on('init afterChange', function (event, slick, currentSlide, nextSlider) {
            let i = (currentSlide ? currentSlide : 0) + 1;
            sliderCount.text(`Страница ${i} из ${slick.slideCount}`);
        });

        prodSlider.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            prevArrow: '.products-prev-slider__nav--prev',
            nextArrow: '.products-prev-slider__nav--next',
            responsive: [
                {
                    breakpoint: 1239,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        arrows: true,
                        dots: false
                    }
                }
            ]
        })
    };

    let catalogNav = () => {
        if ($(window).width() > 767) {
            $('.catalog-nav__item').hover(
                function () {
                    let catalogBody = $(this).closest('.catalog-nav__body');
                    catalogBody.css('width', 825);
                }, function () {
                    let catalogBody = $(this).closest('.catalog-nav__body');
                    catalogBody.css('width', 'auto');
                });
        } else {
            catalogNavToggle('.catalog-nav__label', 'catalog-nav__item--active');
            catalogNavToggle('.catalog-subnav__header', 'catalog-subnav__block--active');
        }
    };

    let catalogNavToggle = (clickEl, toggledClass) => {
        $(document).on('click', clickEl, function () {
            $(this).parent().toggleClass(toggledClass);
            $(this).parent().siblings().removeClass(toggledClass);
        });
    };

    let catalogMobileNav = () => {
        catalogNavToggle('.catalog-mobile-nav__label', 'catalog-mobile-nav__item--active')

    };

    let locationChoose = () => {
        $(document).on('click', '.location-question__btn', function () {
            let answer = $(this).data('location');
            $(this).closest('.location-question').hide();
            if (answer === 'no') {
                $(this).closest('.location__body').addClass('is-location-choose');
                if ($(window).width() < 768) {
                    $('html').addClass('fixed');
                }

            }
        });

        $(document).on('click', '.location-choose__item, .location-choose__close', function () {
            $(this).closest('.location__body').removeClass('is-location-choose');
            $('html').removeClass('fixed');
        });

        $(document).on('click', '.location__header', function () {
            $(this).siblings('.location__body').addClass('is-location-choose');
            // $('html').addClass('fixed');
        });

        if ($(window).width() > 768) {

            $('body').click(function (e) {
                if ($(e.target).hasClass('location-choose')) {
                    $('.location__body').removeClass('is-location-choose');
                    $('html').removeClass('fixed');
                }
            });
        }


    };

    let popupLink = () => {
        $('.js-popup-link').magnificPopup({
            showCloseBtn: false,
            callbacks: {
                open: function () {
                    $('html').addClass('fixed');
                },
                close: function () {
                    $('html').removeClass('fixed');
                }
            }
        });

        $(document).on('click', '.popup__close', function () {
            $.magnificPopup.close();
        });
    };

    let formValidate = () => {
        $('form').each(function () {
            $(this).on('submit', function () {
                $(this).validate({
                    rules: {
                        name: 'required',
                        phone: 'required',
                        password: 'required',
                        'req-textarea': 'required'
                    },
                    messages: {
                        name: 'Введите корректное имя',
                        phone: 'Введите корректный номер',
                        email: 'Введите корректный email',
                        password: 'Введите корректный пароль',
                        'req-textarea': 'Заполните поле'
                    },
                    errorPlacement: function (error, element) {
                        element.attr("placeholder", error[0].outerText);
                    }
                });

                if ($(this).valid()) {
                    let wrap = $(this)[0].closest('.hide-on-success');
                    if (wrap) {
                        $(wrap).siblings('.show-on-success').show();
                        $(wrap).hide();
                    }
                }
                return false;
            });
        });
    };

    let reviewLine = () => {
        $(document).on('click', '.review-line__number', function () {
            let left = $(this).parent().position().left;
            $(this).parent().siblings().removeClass('review-line__item--active');
            $(this).parent().addClass('review-line__item--active');
            $('.review-line').css('width', left - 1);
        });
    };

    let contactsPopup = () => {
        $(document).on('click', '.contacts-popup__toggle', function () {
            $(this).parent().addClass('contacts-popup--active');
        });

        $(document).on('click', '.contacts-popup__close', function () {
            $(this).closest('.contacts-popup').removeClass('contacts-popup--active');
        });
    };

    let simpleBar = () => {
        if ($(window).width() > 1239) {
            $.each($('.catalog-subnav'), function (i, elem) {
                new SimpleBar(elem);
            });
        }
    };

    let fileUpload = () => {
        $(".file-upload input[type=file]").change(function () {
            let filename = $(this).val().replace(/.*\\/, "");
            $(this).closest('.file-upload').find('.file-upload__text').html(filename);
        });
    };

    let searchMobile = () => {
        if ($(window).width() < 1239) {
            $(document).on('click', '.search__icon-mobile', function () {
                $('.search').toggleClass('search-mobile--active');
            });
        }
    };

    let searchInput = () => {
        $('.search__input').keyup(function () {
            if ($(this).val().length > 2) {
                $(this).closest('.search__form').addClass('search__form--active');
            } else {
                $(this).closest('.search__form').removeClass('search__form--active');
            }
        })
    };

    let breadcrumbsNav = () => {

        $(document).on('click', '.breadcrumbs-nav__toggle', function (elem) {
            if ($(window).width() > 767) {
                elem.preventDefault();
            }
            let self = $(this);
            $(this).parent().toggleClass('breadcrumbs__item--show-nav');
            $('body').click(function (e) {
                if (!$(e.target).closest(self).length) {
                    self.parent().removeClass('breadcrumbs__item--show-nav');
                }
            });
        });
    };

    let counter = () => {
        $(document).on('click', '.counter__btn--minus', function () {
            let number = +$(this).parent().find('.counter__current-text').text(),
                newNumber;

            if (number !== 0) {
                newNumber = number - 1;
            } else {
                return false;
            }

            $(this).parent().find('.counter__current-text').text(newNumber);
        });


        $(document).on('click', '.counter__btn--plus', function () {
            let number = +$(this).parent().find('.counter__current-text').text(),
                newNumber;
            newNumber = number + 1;


            $(this).parent().find('.counter__current-text').text(newNumber);
        });
    };

    let filterItem = () => {
        $(document).on('click', '.filter-item__header', function () {
            $(this).parent().toggleClass('filter-item--active');
        });
    };

    let filterSlider = () => {
        $('.filter-slider__line').each(function () {
            let slider = $(this)[0],
                sliderFrom = $(this).parent().find('.filter-slider__value--from')[0],
                sliderTo = $(this).parent().find('.filter-slider__value--to')[0],
                inputs = [sliderFrom, sliderTo],
                type = $(this).data('range-type');

            if (type === 'price') {
                noUiSlider.create(slider, {
                    start: [2500, 5900],
                    connect: true,
                    range: {
                        min: 0,
                        max: 10000
                    },
                    format: wNumb({
                        decimals: 0,
                        suffix: ' руб.',
                        prefix: 'От ',
                    })
                });
            } else if (type === 'mm') {
                noUiSlider.create(slider, {
                    start: [0.5, 7],
                    connect: true,
                    range: {
                        min: 0,
                        max: 10
                    },
                    format: wNumb({
                        decimals: 2,
                        suffix: ' мм'
                    })
                });
            }

            slider.noUiSlider.on('update', function (values, handle) {
                inputs[handle].value = values[handle];
            });


            inputs.forEach(function (input, handle) {
                input.addEventListener('change', function () {
                    slider.noUiSlider.setHandle(handle, this.value);
                });
            });

        });
    };

    let sortToggle = () => {
        $(document).on('click', '.sort-action__header', function () {
            if ($(this).parent().hasClass('sort-action--active')) {
                $(this).parent().removeClass('sort-action--active');
            } else {
                $('.sort-action').removeClass('sort-action--active');
                $(this).parent().toggleClass('sort-action--active');
            }
        });
    };

    let tagsToggle = () => {
        $(document).on('click', '.tags__toggle', function () {
            let element = $(this).parent();
            if (element.hasClass('tags--active')) {
                element.toggleClass('tags--active');
                $(this).text('Все запросы');
            } else {
                element.addClass('tags--active');
                $(this).text('Скрыть');
            }
        });
    };


    sandwich();
    popularCategoriesSlider();
    productPrevSlider();
    locationChoose();
    popupLink();
    formValidate();
    reviewLine();
    contactsPopup();
    simpleBar();
    fileUpload();
    searchMobile();
    searchInput();
    breadcrumbsNav();
    catalogNav();
    catalogMobileNav();
    counter();
    filterItem();
    filterSlider();
    sortToggle();
    tagsToggle();
});


let popularCategoriesSlider = () => {
    let sliderElement = $('.js-categories-prev');
    if ($(window).width() < 768 && !(sliderElement.hasClass('slick-initialized'))) {
        sliderElement.slick({
            slidesToShow: 2,
            slidesToScroll: 1
        });
    } else if (($(window).width() > 768) && (sliderElement.hasClass('slick-initialized'))) {
        sliderElement.slick('unslick');
    }
};

$(window).on('resize', function () {
    popularCategoriesSlider();
});

if ($('div').is('.contacts-popup__map')) {
    ymaps.ready(function () {
        let myMapOffice = new ymaps.Map('popup-contacts-office', {
                center: [55.748858, 37.683033],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),


            myPlacemark = new ymaps.Placemark(myMapOffice.getCenter(), {}, {
                iconLayout: 'default#image',
                iconImageHref: 'static/images/general/pin.png',
                iconImageSize: [23, 30]
            });

        myMapOffice.geoObjects.add(myPlacemark);
        myMapOffice.behaviors.disable('scrollZoom');
        myMapOffice.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullscreenControl').remove('rulerControl');

        let myMapStock = new ymaps.Map('popup-contacts-stock', {
                center: [55.748858, 37.683033],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),


            myPlacemark2 = new ymaps.Placemark(myMapStock.getCenter(), {}, {
                iconLayout: 'default#image',
                iconImageHref: 'static/images/general/pin.png',
                iconImageSize: [23, 30]
            });

        myMapStock.geoObjects.add(myPlacemark2);
        myMapStock.behaviors.disable('scrollZoom');
        myMapStock.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullscreenControl').remove('rulerControl');


    });


}