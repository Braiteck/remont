$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Форма заказа
	if ($('#area_range').length) {
		areaRange = $('#area_range').ionRangeSlider({
			min: 10,
			max: 200,
			from: 60,
			step: 1,
			postfix: ' м²',
			onChange: data => {
				if ($('#area_range').closest('.area').length) {
					$('#area_range').closest('.area').find('.input').val(data.from)
				}
			}
		}).data("ionRangeSlider")
	}

	$('.quiz .data .area .input').keyup(function () {
		areaRange.update({
			from: parseFloat($(this).val())
		})
	})


	if ($('#calc_area_range').length) {
		$('#calc_area_range').ionRangeSlider({
			min: 10,
			max: 200,
			from: 60,
			step: 1,
			postfix: ' м²'
		})
	}


	// Тарифы
	$('.tariffs .tariff .work').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Портфолио
	const portfolioSliders = [],
		portfolioThumbsSliders = []

	if ($('.portfolio').length) {
		$('.portfolio_item .slider .thumbs .swiper-container').each(function (i) {
			$(this).addClass('portfolio_thumbs_s' + i)

			let options = {
				loop: false,
				speed: 500,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				breakpoints: {
					0: {
						spaceBetween: 12,
						slidesPerView: 4
					},
					768: {
						spaceBetween: 16,
						slidesPerView: 4
					},
					1218: {
						spaceBetween: 19,
						slidesPerView: 4
					}
				}
			}

			portfolioThumbsSliders.push(new Swiper('.portfolio_thumbs_s' + i, options))
		})


		$('.portfolio_item .slider .big .swiper-container').each(function (i) {
			$(this).addClass('portfolio_big_s' + i)

			let options = {
				loop: false,
				speed: 500,
				slidesPerView: 1,
				spaceBetween: 19,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				thumbs: {
					swiper: portfolioThumbsSliders[i]
				}
			}

			portfolioSliders.push(new Swiper('.portfolio_big_s' + i, options))
		})
	}


	// Бонусы
	if ($('.bonuses .swiper-container').length) {
		new Swiper('.bonuses .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 20
				},
				1024: {
					spaceBetween: 24
				},
				1280: {
					spaceBetween: 30
				}
			}
		})
	}


	// Сейчас мы работаем
	if ($('.objects .cont > .swiper-container').length) {
		new Swiper('.objects .cont > .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 'auto',
					spaceBetween: 24
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 24
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 24
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			}
		})
	}


	// Запишитесь на просмотр объекта
	if ($('.objects .order .swiper-container').length) {
		new Swiper('.objects .order .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Квиз
	var currentStep = 1

	$('.quiz .data .next_btn').click(function (e) {
		e.preventDefault()

		let step = $(this).closest('.data').find('.step' + currentStep),
			newDiscount = step.next().data('discount'),
			newProgress = step.next().data('progress')

		step.hide().next().fadeIn(300)
		$('.quiz .discount .val').text(newDiscount)
		$('.quiz .data .progress .val').text(newProgress)
		$('.quiz .data .progress .bar div').css('width', newProgress)

		currentStep++

		if (currentStep > 1) { $('.quiz .data .back_btn').removeClass('disabled') }

		if (step.next().hasClass('finish')) {
			$('.quiz .data .back_btn, .quiz .data .next_btn, .quiz .manager .message').hide()
			$('.quiz .data .finish_btn, .quiz .manager .message.finish').fadeIn(300)
		} else {
			$('.quiz .data .finish_btn').hide()
			$('.quiz .data .back_btn, .quiz .data .next_btn').fadeIn(300)
		}
	})

	$('.quiz .data .back_btn').click(function (e) {
		e.preventDefault()

		let step = $(this).closest('.data').find('.step' + currentStep),
			newDiscount = step.prev().data('discount'),
			newProgress = step.prev().data('progress')

		step.hide().prev().fadeIn(300)
		$('.quiz .discount .val').text(newDiscount)
		$('.quiz .data .progress .val').text(newProgress)
		$('.quiz .data .progress .bar div').css('width', newProgress)

		currentStep = currentStep - 1

		if (currentStep < 2) { $('.quiz .data .back_btn').addClass('disabled') }
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.tariffs .row').each(function () {
		tariffHeight($(this), parseInt($(this).css('--tariffs_count')))
	})


	// Всплывашки
	setTimeout(() => {
		$('#free_measurement_modal').fadeIn(300)
	}, 10000)

	$('#free_measurement_modal .close_btn').click((e) => {
		e.preventDefault()

		$('#free_measurement_modal').hide()
	})


	setTimeout(() => {
		Fancybox.show([{
			src: '#calc_modal',
			type: 'inline'
		}])
	}, 40000)
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 480) $('meta[name=viewport]').attr('content', 'width=480, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Выравнивание элементов в сетке
		$('.tariffs .row').each(function () {
			tariffHeight($(this), parseInt($(this).css('--tariffs_count')))
		})


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



// Выравнивание тарифов
function tariffHeight(context, step) {
	let start = 0,
		finish = step,
		$tariffs = context.find('.tariff')

	$tariffs.find('.desc, .items').height('auto')

	$tariffs.each(function () {
		setHeight($tariffs.slice(start, finish).find('.desc'))
		setHeight($tariffs.slice(start, finish).find('.items'))

		start = start + step
		finish = finish + step
	})
}


// Карта
const initMap = () => {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.685219, 37.628163],
			zoom: 16,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.685219, 37.628163], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/ic_map_marker.png',
			iconImageSize: [48, 64],
			iconImageOffset: [-24, -32]
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.controls.add('zoomControl', {
			position: {
				right: '20px',
				top: '20px'
			}
		})

		myMap.behaviors.disable('scrollZoom')
	})
}