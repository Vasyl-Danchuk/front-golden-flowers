const ShopifyFunctions = {
	getCartIconPos() {
		const cartIcon = $('.js-cart-icon');

		let cartPosX = cartIcon.offset().left;
		let cartPosY = cartIcon.offset().top;

		return {cart_position_y: cartPosY, cart_position_x: cartPosX};
	},
	animImageToCart(productImage) {
		let productImageClone = productImage.clone();
		const cartPosObj = this.getCartIconPos();

		const cartPosX = cartPosObj.cart_position_x;
		const cartPosY = cartPosObj.cart_position_y;

		const picPosX = productImage.offset().left;
		const picPosY = productImage.offset().top;

		productImageClone.css({
			'position': 'absolute',
			'top': picPosY + 'px',
			'left': picPosX + 'px',
			'width': productImage.outerWidth(),
			'height': productImage.outerHeight(),
			'object-fit': 'contain',
			'z-index': '10000'
		}).appendTo('body');

		setTimeout(function() {
			productImageClone.addClass('added-to-cart');
			productImageClone.css({
				'top': cartPosY + 'px',
				'left': cartPosX + 'px',
			});
		},1);

		setTimeout(function() {
			productImageClone.remove();
		}, 800);
	},
	searchResultShow() {
		const $header = Header.getHeader();
		const headerHeight = Header.getHeaderHeight();
		const announcementBarHeight = Header.getAnnouncementBarHeight();

		const searchResult = $('.search-result');
		const innerHeight = $header.hasClass('sticky-header') ? headerHeight - announcementBarHeight : headerHeight;
		searchResult.css({
			'top' : innerHeight,
			'max-height': 'calc(100% - ' + headerHeight + 'px)'
		});
		searchResult.fadeIn(400);
	},
	searchResultHide() {
		const searchResult = $('.js-search-result');
		searchResult.fadeOut(function() {200,
			searchResult.removeAttr('style');
			$('.wrapper').removeAttr('style');
		});
	},
	search(){
		const $header = Header.getHeader();
		const searchBtn = $('.js-search-btn');
		const searchLine = $('.js-search-line');
		const searchClose = $('.js-search-close');
		const searchInput = $('.js-search-input');
		const searchBox = $('.js-search-box');
		const searchOverlay = $('.search-overlay');

		searchBtn.click(function(  ) {
			if (!$header.hasClass('shopify-section-header-sticky')) {
				$('.wrapper').css({
					'height': window.innerHeight + 'px',
					'overflow': "hidden"
				});
			}
			$('body, html').addClass('overflow');
			searchOverlay.addClass('active');
			$header.addClass('active search-opened');
			$('.navigation').removeClass('active').removeAttr('style');
			$('.popup-overlay').removeClass('active');
			$('.header-nav-opener button').removeClass('nav-open');
			$('.header-dropdown__menu').removeClass('active');
			$('.header-line').css('max-width','0');
			searchBox.addClass('active');
			searchLine.addClass('active');
			searchInput.focus();

			$header.addClass('shopify-header-locked');

		});

		function closeSearch(){
			searchLine.removeClass('active');
			searchInput.val('');
			searchBox.removeClass('active');
			searchOverlay.removeClass('active');
			$('.wrapper').removeAttr('style');

			$header.removeClass('active').removeClass('search-opened').removeClass('shopify-header-locked');
			$('body, html').removeClass('overflow');

			ShopifyFunctions.searchResultHide();
		}

		searchClose.click(function(  ) {
			closeSearch();
		});

		searchOverlay.click(function(  ) {
			closeSearch();
		});
	}
};
const Sliders = {
	mainSlider() {
		const swiper = new Swiper('.main-banner-slider', {
			loop: true,
			autoplay: true,
			delay: 5000,
			effect: 'fade',
			crossFade: true,

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}
		});
	},

	testimonialsSlider() {
		const swiper = new Swiper('.main-testimonials-slider', {
			effect: "coverflow",
			grabCursor: true,
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 0,
				modifier: 3,
				slideShadows: false
			},
			keyboard: {
				enabled: true
			},
			breakpoints: {
				320: {
					loop: true,
					slidesPerView: 1.3,
					slidesPerGroup: 1,
					spaceBetween: 17,
					centeredSlides: true,
					initialSlide: 1,
					autoplay: {
						delay: 2000
					},
				},
				992: {
					loop: false,
					slidesPerView: 2,
					spaceBetween: 30,
					centeredSlides: false,
				},
				1160: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			}
		});
	},

	productSliders() {
		let productSliders = document.querySelectorAll('.product-slider-js');
		let prevArrow = document.querySelectorAll('.product-slider-nav-button-prev');
		let nextArrow = document.querySelectorAll('.product-slider-nav-button-next');
		let sliderPagination = document.querySelectorAll('.product-slider-pagination');

		productSliders.forEach((slider, index) => {
			let sliderLength = slider.children[0].children.length
			const swiper = new Swiper(slider, {
				navigation: {
					nextEl: nextArrow[index],
					prevEl: prevArrow[index],
				},
				pagination: {
					el: sliderPagination[index],
					clickable: true,
				},
				breakpoints: {
					375: {
						slidesPerView: 1,
						spaceBetween: 16,
						slideToClickedSlide: true,
					},
					577: {
						slidesPerView: 2,
						spaceBetween: 18,
						slideToClickedSlide: true,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
						slideToClickedSlide: true,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 22,
						slideToClickedSlide: true,
					}
				}
			});
		});
	}
}
const PDP = {
	quantityInput() {
		const qtInput = $('.quantity-input');

		$(document).on('click', '.quantity-input-btn', function (evt) {
			evt.preventDefault();
			const input = $(this).siblings('input');
			const minusBtn = $(this).siblings('.quantity-input-minus');
			const minValue = +input.attr('min');
			const btn = $(this);
			if ( $(this).hasClass('quantity-input-plus') ) {
				input.val(function(i, val) {
					minusBtn.removeClass('disabled');
					return +val + 1;
				});
			}
			if ( $(this).hasClass('quantity-input-minus') ) {
				input.val(function(i, val) {
					if (+val === minValue + 1) {
						btn.addClass('disabled');
						return minValue;
					}
					minusBtn.removeClass('disabled');
					return +val - 1;
				});
			}
			let form = input.closest('product-form');
			if ( !form.length ) {
				form = $('.product-info product-form');
			}
			const quantityFormInput = form.find('input[name="quantity"]');
			quantityFormInput.val(function () {
				return +input.val();
			});
		});
		$(document).on('change keyup', '.quantity-input input', function (evt) {
			const input = $(this);
			let form = input.closest('product-form');
			if ( !form.length ) {
				form = $('.product-info product-form');
			}
			const quantityFormInput = form.find('input[name="quantity"]');
			quantityFormInput.val(function () {
				return +input.val();
			});
		});
	},
	productDesc() {
		const $readMoreWrapper = $('.read-more-wrapper');
		const $btn = $readMoreWrapper.find('button');
		$btn.on('click', function (evt) {
			$readMoreWrapper.toggleClass('active');
			const btnText = $readMoreWrapper.hasClass('active') ? $btn.attr('data-toggle-active-text') : $btn.attr('data-toggle-text');
			$btn.text(btnText);
		});

	},
	productMediaSlider() {
		const mainMedia = $('.js-product-gallery');
		const thumbnails = $('.js-product-thumbnails');
		const thumbnailChilds = mainMedia.find('div').length;
		const mediaChilds = mainMedia.find('.product-featured-image').length;

		const sliderConfigDefault = {
			dots: true,
			arrows: true,
			fade: true,
			infinite: false,
			speed: 300,
			accessibility: false,
			slidesToShow: 1,
			draggable: false,
			swipe: false,
			edgeFriction: 0.5,
			// asNavFor: '.js-product-thumbnails',
			appendDots: mainMedia.parent().find('.product-gallery-dots'),
			prevArrow: '<button class="product-prev-arrow flex-center slider-arrow slick-arrow" aria-disabled="false" style="">\n' +
				'\t\t\t\t\t\t<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'\t\t\t\t\t\t<g clip-path="url(#clip0_204_3063)">\n' +
				'\t\t\t\t\t\t<path d="M11.4585 4.27075L5.72933 9.99992L11.4585 15.7291" stroke="white" stroke-width="4" stroke-linecap="square"></path>\n' +
				'\t\t\t\t\t\t</g>\n' +
				'\t\t\t\t\t\t<defs>\n' +
				'\t\t\t\t\t\t<clipPath id="clip0_204_3063">\n' +
				'\t\t\t\t\t\t<rect width="18.3333" height="18.3333" fill="white" transform="matrix(-1 0 0 1 18.3335 0.833252)"></rect>\n' +
				'\t\t\t\t\t\t</clipPath>\n' +
				'\t\t\t\t\t\t</defs>\n' +
				'\t\t\t\t\t\t</svg>\n' +
				'\t\t\t\t\t\t</button>',
			nextArrow: '<button class="product-next-arrow flex-center slider-arrow slick-arrow" aria-disabled="false" style="">\n' +
				'\t\t\t\t\t\t<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'\t\t\t\t\t\t<g clip-path="url(#clip0_204_3068)">\n' +
				'\t\t\t\t\t\t<path d="M7.5415 4.27075L13.2707 9.99992L7.5415 15.7291" stroke="white" stroke-width="4" stroke-linecap="square"></path>\n' +
				'\t\t\t\t\t\t</g>\n' +
				'\t\t\t\t\t\t<defs>\n' +
				'\t\t\t\t\t\t<clipPath id="clip0_204_3068">\n' +
				'\t\t\t\t\t\t<rect width="18.3333" height="18.3333" fill="white" transform="translate(0.666504 0.833252)"></rect>\n' +
				'\t\t\t\t\t\t</clipPath>\n' +
				'\t\t\t\t\t\t</defs>\n' +
				'\t\t\t\t\t\t</svg>\n' +
				'\t\t\t\t\t\t</button>'
		};
		const sliderConfigTablet = {
			dots: true,
			arrows: true,
			fade: true,
			infinite: false,
			speed: 300,
			accessibility: false,
			slidesToShow: 1,
			draggable: false,
			edgeFriction: 0.5,
			appendDots: mainMedia.parent().find('.product-gallery-dots'),
			prevArrow: '<button class="product-prev-arrow flex-center slider-arrow slick-arrow" aria-disabled="false" style="">\n' +
				'\t\t\t\t\t\t<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'\t\t\t\t\t\t<g clip-path="url(#clip0_204_3063)">\n' +
				'\t\t\t\t\t\t<path d="M11.4585 4.27075L5.72933 9.99992L11.4585 15.7291" stroke="white" stroke-width="4" stroke-linecap="square"></path>\n' +
				'\t\t\t\t\t\t</g>\n' +
				'\t\t\t\t\t\t<defs>\n' +
				'\t\t\t\t\t\t<clipPath id="clip0_204_3063">\n' +
				'\t\t\t\t\t\t<rect width="18.3333" height="18.3333" fill="white" transform="matrix(-1 0 0 1 18.3335 0.833252)"></rect>\n' +
				'\t\t\t\t\t\t</clipPath>\n' +
				'\t\t\t\t\t\t</defs>\n' +
				'\t\t\t\t\t\t</svg>\n' +
				'\t\t\t\t\t\t</button>',
			nextArrow: '<button class="product-next-arrow flex-center slider-arrow slick-arrow" aria-disabled="false" style="">\n' +
				'\t\t\t\t\t\t<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'\t\t\t\t\t\t<g clip-path="url(#clip0_204_3068)">\n' +
				'\t\t\t\t\t\t<path d="M7.5415 4.27075L13.2707 9.99992L7.5415 15.7291" stroke="white" stroke-width="4" stroke-linecap="square"></path>\n' +
				'\t\t\t\t\t\t</g>\n' +
				'\t\t\t\t\t\t<defs>\n' +
				'\t\t\t\t\t\t<clipPath id="clip0_204_3068">\n' +
				'\t\t\t\t\t\t<rect width="18.3333" height="18.3333" fill="white" transform="translate(0.666504 0.833252)"></rect>\n' +
				'\t\t\t\t\t\t</clipPath>\n' +
				'\t\t\t\t\t\t</defs>\n' +
				'\t\t\t\t\t\t</svg>\n' +
				'\t\t\t\t\t\t</button>'
		};
		const thumbnailConfig = {
			dots: false,
			arrows: false,
			infinite: false,
			speed: 300,
			slidesToShow: (window.innerWidth > 1366) ? 7 : 6,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: '.js-product-gallery',
		};


			if (window.innerWidth > 1024) {
				if ( thumbnailChilds > 1 ) {
					mainMedia.slick(sliderConfigDefault);

					thumbnails.slick(thumbnailConfig);

					// Remove active class from all thumbnail slides
					thumbnails.find('.slick-slide').removeClass('slick-current');

					// Set active class to first thumbnail slides
					thumbnails.find('.slick-slide').eq(0).addClass('slick-current');

					// On before slide change match active thumbnail to current slide
					mainMedia.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
						var mySlideNumber = nextSlide;
						thumbnails.find('.slick-slide').removeClass('slick-current');
						thumbnails.find('.slick-slide').eq(mySlideNumber).click().addClass('slick-current');

					});

				}
			} else {
				if ( thumbnailChilds > 1 ) {
					mainMedia.slick(sliderConfigTablet);
				}
				thumbnails.hide();
			}




	},
	productModel() {
		$(document).on('click', '.model-viewer-btn' , function () {
			if ( $('.product-gallery-model').hasClass('hidden') ) {
				$('model-viewer').attr('src', $('model-viewer').attr('data-src'));
			}
			$('.product-gallery-model').toggleClass('hidden');
		});
	},
	productVariantsSlider() {
		$('.product-options-images').each(function () {
			const $slider = $(this);
			const sliderChildLength = $slider.find('.product-options-image').length;
			let slides = 6;
			if ( window.innerWidth < 768 ) {
				slides = 5;
			}
			if ( window.innerWidth < 480 ) {
				slides = 4;
			}

			$slider.slick({
					infinite: false,
					slidesToShow: slides,
					slidesToScroll: 1,
					autoplay: false,
					dots: false,
					fade: false,
					appendArrows: $slider.parent().find('.product-option-arrows'),
					prevArrow: `<button class="product-options-prev-arrow flex-center slider-arrow">
						<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_204_3063)">
						<path d="M11.4585 4.27075L5.72933 9.99992L11.4585 15.7291" stroke="#2B2D2F" stroke-width="4" stroke-linecap="square"/>
						</g>
						<defs>
						<clipPath id="clip0_204_3063">
						<rect width="18.3333" height="18.3333" fill="white" transform="matrix(-1 0 0 1 18.3335 0.833252)"/>
						</clipPath>
						</defs>
						</svg>
						</button>`,
					nextArrow: `<button class="product-options-next-arrow flex-center slider-arrow">
						<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_204_3068)">
						<path d="M7.5415 4.27075L13.2707 9.99992L7.5415 15.7291" stroke="#2B2D2F" stroke-width="4" stroke-linecap="square"/>
						</g>
						<defs>
						<clipPath id="clip0_204_3068">
						<rect width="18.3333" height="18.3333" fill="white" transform="translate(0.666504 0.833252)"/>
						</clipPath>
						</defs>
						</svg>
						</button>`,
				});



		});

	},
	fixedProductForm() {
		const formToggler = $('.fixed-form-variant-img');
		const form = $('.fixed-form-form');
		const formWrapper = $('.fixed-form--mobile');
		formToggler.on('click', function () {
			form.toggleClass('active');
		});
		$(document).on('click', '.fixed-form-close-btn', function (evt) {
			formWrapper.removeClass('added');
		});
	},
	fixedProductFormOpenResult() {
		const form = $('.fixed-form-form');
		const formWrapper = $('.fixed-form--mobile');
		formWrapper.addClass('added');
		form.toggleClass('active');
	},
	productTabs() {

		$(document).on('click', '.product-tab-heading button', function (evt) {
			const $button = $(this);
			const $tabs = $button.closest('.product-tabs').find('.product-tab-content');
			const buttonAttr = $button.attr('data-tab');
			const eachButtons = $button.siblings('button');

			eachButtons.removeClass('active');
			$button.addClass('active');

			$tabs.each(function () {
				const $tab = $(this);
				const tabAttr = $tab.attr('data-tab');

				if (buttonAttr === tabAttr) {
					$tab.slideDown(400);
				} else {
					$tab.slideUp(400);
				}
			});
		});
	}
};
const Header = {
	getHeader() {
		let $header = $('#shopify-section-ogo-header');

		return $header;
	},
	getAnnouncementBarHeight() {
		const $announcementBar = $('.announcement-bar');
		const announcementBarHeight = $announcementBar.length ? $announcementBar.outerHeight() : 0;

		return announcementBarHeight;
	},
	getHeaderHeight() {
		const $header = this.getHeader();
		const announcementBarHeight = this.getAnnouncementBarHeight();
		let headerHeight;
		if ( $header.hasClass('shopify-section-header-sticky') ) {
			headerHeight = $header.height();
		} else {
			const distanceFromTop = $header.offset().top;

			const elementHeight = $header.outerHeight();

			const scrollTop = $(window).scrollTop();

			headerHeight = distanceFromTop + elementHeight - scrollTop;
		}
		if ( announcementBarHeight ) {
			$('body').addClass('has-announcement');
		}
		return headerHeight;
	},
	setNavTop() {
		const self = this;
		const headerHeight = self.getHeaderHeight();
		$('.header-dropdown__menu').css('top', headerHeight + 'px');
		$(window).scroll(function () {
			const headerHeight = self.getHeaderHeight();
			$('.header-dropdown__menu').css('top', headerHeight + 'px');
		});
	},
	dropdownItems() {
		const dropdownLinkWrapper = $('.dropdown-item');
		const headerLine = $('.header-line');
		$('.header-list-item.dropdown-item').hover(
			function () {
				$(this).find('.header-dropdown__menu').css({
					"z-index": "2",
					"pointer-events": "auto"
				}).fadeIn(100);
			},
			function () {
				$(this).find('.header-dropdown__menu').css({
					"z-index": "-1",
					"pointer-events": "none"
				}).fadeOut(100);
			}
		);
		if ( dropdownLinkWrapper.length ) {
				dropdownLinkWrapper.each(function (index, node) {
					const wrapper = $(this);

					//init
					if ( index === 0 ) {
						var firstDropdownItemLeftPos = wrapper.offset().left;
						headerLine.css('transform', `translateX(${firstDropdownItemLeftPos}px)`).css('max-width', '0' + 'px');
					}
					const dropdownItem = wrapper.find('.header-dropdown__menu');

					wrapper.mouseenter(function (e) {
						const dropdownItemWidth = wrapper.outerWidth();
						const dropdownItemLeftPos = wrapper.offset().left;
						headerLine.css('transform', `translateX(${dropdownItemLeftPos}px)`).css('max-width', dropdownItemWidth + 'px');
					});
					dropdownItem.mouseleave(function (e) {
						headerLine.css('transform', `translateX(${firstDropdownItemLeftPos}px)`).css('max-width', '0px');
					});

				});
		}
	},
	headerMobile() {
		const self =  this;

		const $header = self.getHeader();
		const headerButton = $('.header-nav-opener-btn');
		const navigation = $('.navigation');

		headerButton.on('click', function (evt) {

			if ($('#shopify-section-ogo-header').hasClass('search-opened')) {
				setTimeout(function(  ) {
					$('#shopify-section-ogo-header').removeClass('active search-opened');
					$('body').removeClass('overflow');
					$('.search-overlay').removeClass('active');
					$('.search-result').removeAttr('style');
				},10)
			}

			if ( navigation.hasClass('active') ) {
				$header.removeClass('shopify-header-locked');
				$(this).removeClass('nav-open');
				$('body').removeClass('overflow');
				$('.wrapper').removeAttr('style');
				navigation.removeClass('active').removeAttr('style');
				$('.popup-overlay').removeClass('active');
				$('.search-overlay').removeClass('active');
				$('.header').removeClass('search-opened');


			} else {
				if (!$header.hasClass('shopify-section-header-sticky')) {
					$('.wrapper').css({
						'height': window.innerHeight + 'px',
						'overflow': "hidden"
					});
				}
				const headerHeight = self.getHeaderHeight();

				$header.addClass('shopify-header-locked');
				$(this).addClass('nav-open');
				$('body').addClass('overflow');

				// default header
				$('.header').removeClass('search-opened');
				$('.search-overlay').removeClass('active');
				$('.js-search-line').removeClass('active');
				navigation.addClass('active').css({
					// can be shopify section header
					'top': headerHeight + 'px',
					'max-height' : 'calc(100% - ' + (headerHeight) + 'px)'
				});
				$('.popup-overlay').addClass('active');
			}
		});
		$('.popup-overlay').on('click', function () {
			$header.removeClass('shopify-header-locked');
			$('.popup').removeClass('active');
			$('.popup-overlay').removeClass('active');
			$('.search-overlay').removeClass('active');
			headerButton.removeClass('nav-open');
			$('body').removeClass('overflow');
			$('.wrapper').removeAttr('style');

		});

		//dropdowns
		const dropdownLinks = $('.navigation-menu [data-mobile-dropdown]');
		const dropdownMenus = $('.navigation .navigation-dropdown-menu');

		dropdownLinks.on('click', function (evt) {
			const link = $(this);
			const linkAttr = link.attr('data-mobile-dropdown');

			dropdownMenus.each(function () {
				const menu = $(this);
				const menuAttr = menu.attr('data-mobile-dropdown');

				if ( linkAttr === menuAttr ) {
					menu.addClass('active');
				}
			});
		});

		const prevBtn = $('.navigation-dropdown-prev');
		prevBtn.on('click', function (evt) {
			const menu = $(this).closest('.navigation-dropdown-menu');
			menu.removeClass('active');
		});



	}
};

class StickyHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.header = document.getElementById('shopify-section-ogo-header');
		this.headerBounds = {};
		this.currentScrollTop = 0;
		this.preventReveal = false;
		this.predictiveSearch = this.querySelector('predictive-search');

		this.onScrollHandler = this.onScroll.bind(this);
		this.hideHeaderOnScrollUp = () => this.preventReveal = true;

		this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
		window.addEventListener('scroll', this.onScrollHandler, false);

		this.createObserver();
	}

	disconnectedCallback() {
		this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
		window.removeEventListener('scroll', this.onScrollHandler);
	}

	createObserver() {
		let observer = new IntersectionObserver((entries, observer) => {
			this.headerBounds = entries[0].intersectionRect;
			observer.disconnect();
		});

		observer.observe(this.header);
	}

	onScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

		if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
			requestAnimationFrame(this.hide.bind(this));
		} else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
			if (!this.preventReveal) {
				requestAnimationFrame(this.reveal.bind(this));
			} else {
				window.clearTimeout(this.isScrolling);

				this.isScrolling = setTimeout(() => {
					this.preventReveal = false;
				}, 66);

				requestAnimationFrame(this.hide.bind(this));
			}
		} else if (scrollTop <= this.headerBounds.top) {
			requestAnimationFrame(this.reset.bind(this));
		}


		this.currentScrollTop = scrollTop;
	}

	hide() {
		if ( !this.header.classList.contains('shopify-header-locked') ) {
			this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
			this.closeMenuDisclosure();
			$('.header-dropdown__menu').css('top', '85px');
		}


	}

	reveal() {
		this.header.classList.add('shopify-section-header-sticky', 'animate');
		this.header.classList.remove('shopify-section-header-hidden');

	}

	reset() {
		this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
	}

	closeMenuDisclosure() {
		this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
		this.disclosures.forEach(disclosure => disclosure.close());
	}

}


const DefaultFunctions = {
	anchors() {
		const anchorLinks = $('a[data-href]');
		const anchorSections = $('[data-anchor]');

		anchorLinks.on('click', function (evt) {
			evt.preventDefault();

			const headerHeight = Header.getHeaderHeight();
			const announcementBarHeight = Header.getAnnouncementBarHeight();

			const link = $(this);
			anchorSections.each(function () {
				const section = $(this);
				if ( link.attr('data-href') === section.attr('data-anchor') ) {
					const sectionOffsetTop = section.offset().top - (headerHeight);

					$("html, body").animate({ scrollTop: sectionOffsetTop }, 500, 'swing', function () {
						console.log('Done');
					});
				}
			});
		});
	}
};

function select(){
	$( 'select:not([hidden])' ).select2({
		language: 'en',
		width: '100%',
		minimumResultsForSearch: -1,
	});
}

function setInput() {
	$( 'input:not(.btn):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="reset"]), textarea')
		.each(function() {
			$(this).on('keyup keypress', function(e) {
				if ($(this).hasClass('input-sms')) {
					if ($(this).val().length > 3) {
						$(this).parents('.form-group').addClass('filled');
					}
				}
			});
			if ($(this).val() !== '') {
				if ($(this).hasClass('input-sms')) {
					$(this).val().replace(/\s/g, "");
					if ($(this).val().length > 3) {
						$(this).parents('.form-group').addClass('filled');
					}
				} else {
					$(this).parents('.form-group').addClass('filled');
				}
			}
		})
		.on('focus',function() {
			$(this).parents('.form-group').removeClass('filled');
		})
		.on('blur',function() {
			if ($(this).val() !== '') {
				if ($(this).hasClass('input-sms')) {
					$(this).val().replace(/\s/g, "");
					if ($(this).val().length > 3) {
						$(this).parents('.form-group').addClass('filled');
					}
				} else {
					$(this).parents('.form-group').addClass('filled');
				}
			} else {
				$(this).parents('.form-group').removeClass('filled');
			}
		});
}

function textareaHeight() {
	$("textarea").each(function () {
		this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
	}).on("input", function () {
		this.style.height = "auto";
		this.style.height = (this.scrollHeight) + "px";
	});
}

function catalogCurrency(){
	const btn = $('.catalog-currency-item');
	btn.click(function() {
		$(this).closest('.catalog-currency').find('.catalog-currency-item').removeClass('active');
		$(this).closest('.catalog-currency').find('input').val($(this).data('val'));
		$(this).addClass('active');
	});
}

function customSelect() {
	const select = $(document).find('.js-select');

	$(document).on('click', '.select-val' ,function() {
		if ($(this).closest('.select').hasClass('active')) {
			if ($(window).outerWidth() < 992) {
				$(this).closest('.select').removeClass('active').find('.select-dropdown').fadeOut(100);
			} else {
				$(this).closest('.select').removeClass('active').find('.select-dropdown').slideUp(300);
			}
		} else {
			if ($(window).outerWidth() < 992) {
				$('.select').removeClass('active').find('.select-dropdown').fadeOut(100);
			} else {
				$('.select').removeClass('active').find('.select-dropdown').slideUp(300);
			}
			$(this).closest('.select').find('.select-item').removeClass('active');
			var checkedVal = $(this).closest('.select').find('input').val();
			if (checkedVal !== '') {
				$(this).closest('.select').find('.select-item[data-val='+ checkedVal +']').addClass('active');
			}
			if ($(window).outerWidth() < 992) {
				$(this).closest('.select').toggleClass('active').find('.select-dropdown').fadeToggle(300);
			} else {
				$(this).closest('.select').toggleClass('active').find('.select-dropdown').slideToggle(300);
			}
		}
	});

	$(document).on('click', '.select-item', function() {
		$(this).closest('.select').find('.select-item').removeClass('active');
		$(this).addClass('active');
	});

	$(document).on('click', '.js-select-button', function() {
		var checkedVal = $(this).closest('.select').find('.select-item.active').data('val');
		$(this).closest('.select').find('input').val(checkedVal);
		if ($(window).outerWidth() < 992) {
			$(this).closest('.select').removeClass('active').find('.select-dropdown').fadeOut(100);
		} else {
			$(this).closest('.select').removeClass('active').find('.select-dropdown').slideUp(300);
		}
	});


	$(document).mouseup(function (e){
		if (!select.is(e.target) && select.has(e.target).length === 0) {
			if ($(window).outerWidth() < 992) {
				select.removeClass('active').find('.select-dropdown').fadeOut(300);
			} else {
				select.removeClass('active').find('.select-dropdown').slideUp(300);
			}
		}
	});
}

function inputTel(){
	$('[type="tel"]').inputmask( '+380 99 99 99 999' );
	$('.input-date').inputmask('99-99-9999',{ 'placeholder': "дд-мм-рррр" });
}

function customFilter() {
	const filterWindow = $('.js-filter');
	const filterBtn = $('.js-filter-btn');
	const filterCloseBtn = $('.js-filter-close');
	const filterCloseLvl = $('.js-filter-lvl-close');
	const filterOverlay = $('.js-filter-overlay');
	const select = $('.js-filter .js-select');

	function closeFilter() {
		filterWindow.removeClass('active');
		filterOverlay.fadeOut(400);
		$('body, html').removeClass('overflow');
		select.removeClass('active');
		select.find('.select-dropdown').fadeOut(200);
	}

	filterBtn.click(() => {
		$('body, html').addClass('overflow');
		filterOverlay.fadeIn(300, () => filterWindow.addClass('active'));
	});

	filterCloseBtn.click(() => closeFilter());

	filterOverlay.click(() => closeFilter());

	filterCloseLvl.click(() => {
		select.removeClass('active');
		select.find('.select-dropdown').fadeOut(200);
	});
}


function inputPass() {
	const btn = $('.js-password');
	btn.click(function( ) {
		if ($(this).closest('.form-group').hasClass('active')) {
			$(this).closest('.form-group').removeClass('active').find('input').attr('type','password');
		} else {
			$(this).closest('.form-group').addClass('active').find('input').attr('type','text');
		}
	});
}

function someOptionSelect() {
	const selectWrapper = $(document);

	function toggleDropdown(parent) {
		const dropdown = parent.find('.someOption-dropdown');
		const input = parent.find('input');
		const checkedVal = input.val();

		parent.toggleClass('active').siblings().removeClass('active').find('.someOption-dropdown').slideUp(300);
		dropdown.slideToggle(300);

		if (checkedVal !== '') {
			const activeDropdownItem = parent.find(`.someOption-dropdown-item[data-val='${checkedVal}']`);
			activeDropdownItem.addClass('active');
		}
	}

	function handleSelectBtnClick() {
		const parent = $(this).closest('.someOption');
		toggleDropdown(parent);
	}

	function handleSelectItemClick() {
		const parent = $(this).closest('.someOption');
		const input = parent.find('input');

		selectWrapper.find('.someOption-dropdown-item').removeClass('active');
		$(this).addClass('active');

		const checkedVal = parent.find('.someOption-dropdown-item.active').data('val');
		input.val(checkedVal);

		const textVal = parent.find('.someOption-dropdown-item.active span').text();
		parent.find('.someOption-val').text(textVal);
		parent.find('.someOption-dropdown-head span').text(textVal);

		if ($(this).find('i').length > 0) {
			const colorVal = $(this).find('i').attr('style');
			parent.find('.someOption-box i').attr('style', colorVal);
		}
		toggleDropdown(parent);
	}

	function handleSelectCloseClick() {
		const parent = $(this).closest('.someOption');
		parent.removeClass('active').find('.someOption-dropdown').slideUp(300);
	}

	function handleDocumentClick(e) {
		const target = $(e.target);

		if (!target.closest('.js-someOption').length && !target.hasClass('someOption-dropdown')) {
			selectWrapper.find('.js-someOption').removeClass('active').find('.someOption-dropdown').slideUp(300);
		}
	}

	selectWrapper.on('click', '.someOption-box', handleSelectBtnClick);
	selectWrapper.on('click', '.someOption-dropdown-item', handleSelectItemClick);
	selectWrapper.on('click', '.js-someOption-close', handleSelectCloseClick);
	$(document).on('mouseup', handleDocumentClick);
}

function popups() {
	const popup = $('.js-pop');

	function closePop(){
		popup.fadeOut(300);
		$('.pop-item').hide().removeClass('active');
		$('body, html').removeClass('overflow');
	}

	$(document).on('click','.js-popup',function() {
		$('body, html').addClass('overflow');
		const popItem = $(this).data('popup');
		$('#' + popItem).show().addClass('active');
		popup.fadeIn(500);
	});

	$(document).on('click','.js-pop-overlay',function() {
		closePop();
	});

	$(document).on('click','.js-pop-close',function() {
		closePop();
	});
}

function popupAbout() {
	const popup = $('.js-pop-about');

	function closePopAbout(){
		popup.fadeOut(300);
		$('.pop-item').hide().removeClass('active').find('.pop-content').html('');
		$('body, html').removeClass('overflow');
	}

	$(document).on('click','.js-popup-about',function() {
		$('body, html').addClass('overflow');
		const popItem = $(this).data('popup'),
			  popupTemplate = $(this).find('[data-popup-template="popup-template"]').html();
		$('#' + popItem).show().addClass('active').find('.pop-content').append(popupTemplate);
		popup.fadeIn(500);
	});

	$(document).on('click','.js-pop-about-overlay',function() {
		closePopAbout();
	});

	$(document).on('click','.js-pop-about-close',function() {
		closePopAbout();
	});
}

function textTable() {
	if (document.querySelectorAll('table').length > 0) {
		var tables = document.querySelectorAll('table');
		if (tables.length > 0) {
			tables.forEach(function(table) {
				var wrapper = document.createElement('div');
				wrapper.classList.add('table-wrapper');
				table.parentNode.insertBefore(wrapper, table);
				wrapper.appendChild(table);
			});
		}
	}
}

function tabs() {
	const tabs = $('.js-tabs');
	const tabBtn = tabs.find('.tab-item');
	const tabContent = tabs.find('.tab-content-item');

	tabBtn.click(function () {
		tabBtn.removeClass('active');
		$(this).addClass('active');
		tabContent.removeClass('active');
		tabContent.eq($(this).index()).addClass('active');
	});
}

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
		//...options
	};
	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}
	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}
	document.cookie = updatedCookie;
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function FAQ(){
	const faq = $('.js-faq');
	if (faq) {
		const btn = faq.find('.faq-item-title');
		const btnMob = $('.js-faq-mobnav-btn');
		const faqOverlay = $('.js-faq-overlay');
		faq.find('.faq-item').each(function(){
			if ($(this).hasClass('active')) {
				$(this).find('.faq-item-text').slideDown();
			}
		});
		btn.on('click',function(){
			const item = $(this).closest('.faq-item');
			item.toggleClass('active');
			item.find('.faq-item-text').slideToggle();
		});
		btnMob.on('click',function(){
			$(this).addClass('active');
			faqOverlay.fadeIn(500);
			$('.faq-nav').fadeIn(500);
		});
		faqOverlay.on('click',function(){
			btnMob.removeClass('active');
			faqOverlay.fadeOut(300);
			$('.faq-nav').fadeOut(300);
		});
		$('.faq-title').each(function() {
			let link = $(this).text();
			let id = encodeURIComponent(link);
			$(this).attr('data-id', id);
			$('.faq-nav').append('<a href="#' + id + '">' + link + '</a>');
		});
		$(document).on('click', '.faq-nav a', function(e) {
			e.preventDefault();
			const $that = $(this);
			if ($(window).outerWidth() < 992) {
				btnMob.removeClass('active');
				faqOverlay.fadeOut(300);
				$('.faq-nav').fadeOut(300, function(  ) {
					$('.faq-nav').removeAttr('style');
				});
				var elementClick = $that.attr('href').replace('#', '');
				var destination = $('[data-id="' + elementClick + '"]').offset().top - 120;
				$('html, body').animate({ scrollTop: destination }, 800);
			} else {
				var elementClick = $that.attr('href').replace('#', '');
				var destination = $('[data-id="' + elementClick + '"]').offset().top - 120;
				$('html, body').animate({ scrollTop: destination }, 800);
			}
		});
	}
}

function checkVisibility() {
	var windowHeight = $(window).height();
	var scrollTop = $(window).scrollTop();
	var closestDistance = null;
	var closestElement = null;

	$('.faq-title').each(function() {
		var elementTop = $(this).offset().top;
		var distance = Math.abs(scrollTop - elementTop);

		if (closestDistance === null || distance < closestDistance) {
			closestDistance = distance;
			closestElement = $(this);
		}
	});

	$('.faq-nav a').removeClass('active');

	if (closestElement) {
		var id = closestElement.attr('data-id');
		$('.faq-nav a[href="#' + id + '"]').addClass('active');
	}
}

function moveToNextInput(event, input, nextInputIndex) {
	if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
	if (input.value.length === input.maxLength) {
		event.preventDefault();
		var inputs = input.parentElement.getElementsByTagName("input");
		if (nextInputIndex < inputs.length) {
			inputs[nextInputIndex].focus();
		}
		checkComplete(inputs);
	}
}

function handleKeydown(event) {
	if (event.key === "Backspace" || event.key === "Delete") {
		event.preventDefault();
		var input = event.target;
		if (input.value.length === 0) {
			var inputs = input.parentElement.getElementsByTagName("input");
			var previousInputIndex = Array.prototype.indexOf.call(inputs, input) - 1;
			if (previousInputIndex >= 0) {
				inputs[previousInputIndex].focus();
			}
		} else {
			input.value = "";
		}
		checkComplete(inputs);
	} else if (!/^[0-9]$/.test(event.key)) {
		event.preventDefault();
	}
}

function checkComplete(inputs) {
	var isComplete = Array.prototype.every.call(inputs, function(input) {
		return input.value.length === input.maxLength;
	});

	var inputContainer = inputs[0].parentElement;
	if (isComplete) {
		inputContainer.classList.add("complete");
	} else {
		inputContainer.classList.remove("complete");
	}
}

function addFocusClass() {
	var inputContainer = document.querySelector('.input-container');
	inputContainer.classList.add('focused');
}

function removeFocusClass() {
	var inputContainer = document.querySelector('.input-container');
	inputContainer.classList.remove('focused');
}

$(document).on("click", ".js-header-menu-btn", function (e) {
	$(this).next().toggleClass('active');
});
$(document).on("click", ".js-mobile-menu-close", function (e) {
	$(this).closest('.header-mobile-menu').toggleClass('active');
});
$(document).on("click", ".js-open-child", function (e) {
	if($(this).hasClass('active')){
		$(this).toggleClass('active');
		$(this).closest('.has-child').find('.child').fadeOut(300);
	} else {
		$(this).toggleClass('active');
		$(this).closest('.has-child').find('.child').fadeIn(300);
	}
});

$(document).on("click", ".js-cookies-close", function (e) {
	setCookie('set_cookie', '1', {secure: true, 'max-age': 63072000});
	$('.js-cookies').fadeOut();
});

$(document).ready(function() {
	var cookie = getCookie('set_cookie');
	if(cookie === undefined) {
		$('.js-cookies').fadeIn();
	}
});






$( document ).ready( function() {
	$('.wrapper').animate({opacity: 1}, 500, function() {
		$('.wrapper').addClass('ready');
	});


	$(window).on('pageshow', function(event) {
		if (event.originalEvent.persisted) {
			$('.wrapper').animate({opacity: 1}, 500, function() {
				$('.wrapper').addClass('ready');
			});

			if ( $('.navigation').hasClass('active') ) {
				$('.header-nav-opener-btn').click();
			}
		}
	});

	$('a').click(function(e) {
		var attr = $(this).attr('target');
		if (typeof attr !== typeof undefined && attr !== false) {
			return true
		} else {
			e.preventDefault();
			const href = $(this).attr('href');

			if (href.startsWith('/')) {
				$('.wrapper').animate({opacity: 0}, 500, function() {
					window.location.href = href;
				});
			} else {
				window.location.href = href;
			}
		}
	});

	Header.dropdownItems();
	Header.headerMobile();
	Header.setNavTop();

	if ( $('.js-news-slider').length ) {
		Sliders.newsSlider();
	}

	ShopifyFunctions.search();
	select();
	setInput();
	textareaHeight();
	// catalogCurrency();
	customSelect();
	inputTel();
	customFilter();
	inputPass();
	someOptionSelect();
	popups();
	popupAbout();
	textTable();
	tabs();
	FAQ();
	checkVisibility();

	if ( $('.main-banner-slider').length ) {
		Sliders.mainSlider();
	}

	if ( $('.main-testimonials-slider').length ) {
		Sliders.testimonialsSlider();
	}

	if ( $('.product-slider-js').length ) {
		Sliders.productSliders();
	}

	//pdp

	// if ( $('.quantity-input').length ) {
	// 	PDP.quantityInput();
	// }

	if ( $('.read-more-wrapper > p').length > 1 ) {
		PDP.productDesc();
	}

	if ( $('.product-template').length ) {
		PDP.productMediaSlider();
	}

	if ( $('[data-href]').length && $('[data-anchor]').length ) {
		DefaultFunctions.anchors();
	}

	if ( $('.product-options-images').length ) {
		PDP.productVariantsSlider();
	}

	if ( $('model-viewer').length ) {
		PDP.productModel();
	}

	if ( $('.product-tabs').length ) {
		PDP.productTabs();
	}

	if ( $('.fixed-form--mobile').length ) {
		PDP.fixedProductForm();
	}

	if ( $('#rs-range-line').length ) {
		reviewRangeSlider();
	}

});

$(window).on('scroll', function() {
	checkVisibility();
});

function reviewRangeSlider(){
	var rangeSlider = document.getElementById("rs-range-line");
	var rangeBullet = document.getElementById("rs-bullet");

	rangeSlider.addEventListener("input", showSliderValue, false);

	function showSliderValue() {
		rangeBullet.innerHTML = rangeSlider.value;
		var bulletPosition = (rangeSlider.value / 11),
			percent = (bulletPosition * 100),
			prop1 = "--percent";
		rangeBullet.style.left = percent + "%";
		rangeSlider?.style.setProperty(prop1,percent+'%');
	}
}

function positionRight(){
	let headerContainer = $('header > .container');
		let bannerContainer = $('.landing-talent__banner--content').closest('.container'),
			posLeft = headerContainer.offset().left;
		bannerContainer.css('right', posLeft+'px');
}
$(document).ready(function (){ positionRight(); });
$(window).on('resize', function () { if (window.innerWidth > 767){ positionRight(); } });

function positionLeftImpression(){
	if (window.innerWidth>1023) {
		let headerContainer = $('header > .container');
		let bannerContainer = $('.landing-impression__banner--content').closest('.container'),
			posLeft = headerContainer.offset().left;
		bannerContainer.css('left', posLeft + 'px');
	}
}
$(document).ready(function (){ positionLeftImpression(); });
$(window).on('resize', function () { if (window.innerWidth > 1023){ positionLeftImpression(); } });
