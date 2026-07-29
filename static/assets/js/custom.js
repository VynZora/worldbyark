/* =====================================
All JavaScript fuctions Start
======================================*/
(function ($) {
	
    'use strict';
	/*--------------------------------------------------------------------------------------------
	document.ready ALL FUNCTION START
	---------------------------------------------------------------------------------------------*/	

	// > Video responsive function by = custom.js ========================= //	
	function video_responsive(){	
		jQuery('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
		jQuery('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');	
	}  

	// Category function by = owl.js **********//
	function twm_category_carousal(){    
		jQuery('.twm-category-carousal-slider').owlCarousel({
		loop:true,
		margin:30,
		center:false,
		nav:false,
		dots: false,
		autoWidth:true,
		autoplay: true,
		slideTransition: 'linear',
		autoplayTimeout:5000,
		autoplaySpeed: 5000,
		navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>']
	});
	}

	// Category function by = owl.js **********//
	function twm_category_carousal_2(){    
		jQuery('.twm-category-carousal-slider2').owlCarousel({
		loop:true,
		margin:30,
		center:false,
		nav:false,
		rtl:true,
		dots: false,
		autoWidth:true,
		autoplay: true,
		slideTransition: 'linear',
		autoplayTimeout:5000,
		autoplaySpeed: 5000,
		navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>']
	});
	}

	// Category function by = owl.js **********//
	function trv_holi_theme_carousel(){    
		jQuery('.trv-holi-theme-carousel').owlCarousel({
		loop:true,
		margin:30,
		center:false,
		nav:false,
		rtl:false,
		dots: false,
		autoWidth:true,
		autoplay: true,
		slideTransition: 'linear',
		autoplayTimeout:5000,
		autoplaySpeed: 5000,
		navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
		responsive:{
			0:{
				items:2,
			},
			575:{
				items:3,
			},
			1024:{
				items:4
			}					
		},
	});
	}

	//  Blog List function by = swiper-bundle.min.js ========================== //
	function twm_blog_list_carousal(){
		var swiper = new Swiper(".twm-blog-list-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 1,
		  spaceBetween: 10,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },

		});
	}

	//  Detail Slider function by = swiper-bundle.min.js ========================== //
	function trv_d_slider(){
		var swiper = new Swiper(".trv_d-slider", {
		  	freeMode: false,
			pagination: '.swiper-pagination',
			slidesPerView: 1,
			centeredSlides: false,
			paginationClickable: true,
			loop: true,
			spaceBetween: 10,
			slideToClickedSlide: true,


			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true,
			},
	
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
	
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	
		});
	}
	
 	// > LIGHTBOX Gallery Popup function	by = lc_lightbox.lite.js =========================== //      
 	function lightbox_popup(){
        lc_lightbox('.elem', {
            wrap_class: 'lcl_fade_oc',
            gallery : true,
            thumb_attr: 'data-lcl-thumb', 
            
            skin: 'minimal',
            radius: 0,
            padding	: 0,
            border_w: 0,
        });
	}			

	// > magnificPopup for video function	by = magnific-popup.js ===================== //	
	function magnific_video(){	
		jQuery('.mfp-video').magnificPopup({
			type: 'iframe',
		});
	}

	// Vertically center Bootstrap modal popup function by = custom.js ==============//
	function popup_vertical_center(){	
		jQuery(function() {
			function reposition() {
				var modal = jQuery(this),
				dialog = modal.find('.modal-dialog');
				modal.css('display', 'block');
				
				// Dividing by two centers the modal exactly, but dividing by three 
				// or four works better for larger screens.
				dialog.css("margin-top", Math.max(0, (jQuery(window).height() - dialog.height()) / 2));
			}
			// Reposition when a modal is shown
			jQuery('.modal').on('show.bs.modal', reposition);
			// Reposition when the window is resized
			jQuery(window).on('resize', function() {
				jQuery('.modal:visible').each(reposition);
			});
		});
	}

	// > Main menu sticky on top  when scroll down function by = custom.js ========== //		
	$(window).scroll(function(){
		if ($(this).scrollTop() > 50) {
			$('.sticky-header').addClass('is-fixed');
		} else {
			$('.sticky-header').removeClass('is-fixed');
		}
  	});


	// > Sidebar sticky  when scroll down function by = theia-sticky-sidebar.js ========== //		
	function sticky_sidebar(){		
		$('.rightSidebar')
			.theiaStickySidebar({
				additionalMarginTop: 100
		});		
	}

	// > page scroll top on button click function by = custom.js ===================== //	
	function scroll_top(){
		jQuery("button.scroltop").on('click', function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		});

		jQuery(window).on("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery("button.scroltop").fadeIn(1000);
			} else {
				jQuery("button.scroltop").fadeOut(1000);
			}
		});
	}

	//  Home Banner Slider function by = swiper-bundle.min.js ========================== //
	function trv_hp4_slider(){
		var swiper = new Swiper(".trv_hp4-slider", {
		  	freeMode: false,
			pagination: '.swiper-pagination',
			slidesPerView: 1,
			centeredSlides: false,
			paginationClickable: true,
			loop: true,
			spaceBetween: 0,
			slideToClickedSlide: true,
			speed: 1000,
			parallax: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
	
		});
	}

	//  Home Banner Slider function by = swiper-bundle.min.js ========================== //
	function trv_hp5_slider(){
		var swiper = new Swiper(".trv_hp5-slider", {
		  	freeMode: false,
			pagination: '.swiper-pagination',
			slidesPerView: 1,
			centeredSlides: false,
			paginationClickable: true,
			loop: true,
			spaceBetween: 0,
			slideToClickedSlide: true,
			speed: 1000,
			parallax: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
	
		});
	}
	

	//  Home Ad Slider function by = swiper-bundle.min.js ========================== //
	function trv_ad_slider(){
		var swiper = new Swiper(".trv_ad-slider", {
		  	freeMode: false,
			pagination: '.swiper-pagination .trv_ad-slider',
			slidesPerView: 1,
			centeredSlides: false,
			paginationClickable: true,
			loop: true,
			spaceBetween: 10,
			slideToClickedSlide: true,
			
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			
			pagination: {
				el: '.trv-ad-paging.swiper-pagination',
				clickable: true,
				dynamicBullets: false,
			},
	
		});
	}
	
	// > input type file function by = custom.js ========================== //	 	 
	function input_type_file_form(){
		jQuery(document).on('change', '.btn-file :file', function() {
			var input = jQuery(this),
				numFiles = input.get(0).files ? input.get(0).files.length : 1,
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});

		jQuery('.btn-file :file').on('fileselect', function(event, numFiles, label) {
			var input = jQuery(this).parents('.input-group').find(':text'),
				log = numFiles > 10 ? numFiles + ' files selected' : label;
			if (input.length) {
				input.val(log);
			} else {
				if (log) alert(log);
			}
		});	
	}

	// > input Placeholder in IE9 function by = custom.js ======================== //	
	function placeholderSupport(){
	/* input placeholder for ie9 & ie8 & ie7 */
		jQuery.support.placeholder = ('placeholder' in document.createElement('input'));
		/* input placeholder for ie9 & ie8 & ie7 end*/
		/*fix for IE7 and IE8  */
		if (!jQuery.support.placeholder) {
			jQuery("[placeholder]").on('focus', function () {
				if (jQuery(this).val() === jQuery(this).attr("placeholder")) jQuery(this).val("");
			}).blur(function () {
				if (jQuery(this).val() === "") jQuery(this).val(jQuery(this).attr("placeholder"));
			}).blur();

			jQuery("[placeholder]").parents("form").on('submit', function () {
				jQuery(this).find('[placeholder]').each(function() {
					if (jQuery(this).val() === jQuery(this).attr("placeholder")) {
						 jQuery(this).val("");
					}
				});
			});
		}
		/*fix for IE7 and IE8 end */
	}	
	
	// > accordion active calss function by = custom.js ========================= //	
	function accordion_active() {
		$('.acod-head a').on('click', function() {
			$('.acod-head').removeClass('acc-actives');
			$(this).parents('.acod-head').addClass('acc-actives');
			$('.acod-title').removeClass('acc-actives'); //just to make a visual sense
			$(this).parent().addClass('acc-actives'); //just to make a visual sense
			($(this).parents('.acod-head').attr('class'));
		});
	}	

	// > Nav submenu show hide on mobile by = custom.js
	function mobile_nav(){
		jQuery(".sub-menu").parent('li').addClass('has-child');
		jQuery("<div class='fa fa-angle-right submenu-toogle'></div>").insertAfter(".has-child > a");

		jQuery('.has-child a+.submenu-toogle').on('click',function(ev) {

			jQuery(this).parent().siblings(".has-child ").children(".sub-menu").slideUp(500, function(){
				jQuery(this).parent().removeClass('nav-active');
			});

			jQuery(this).next(jQuery('.sub-menu')).slideToggle(500, function(){
				jQuery(this).parent().toggleClass('nav-active');
			});

			ev.stopPropagation();
		});
	}
	 
	// Mobile side drawer function by = custom.js
	function mobile_side_drawer(){
		jQuery('#mobile-side-drawer').on('click', function () { 
			jQuery('.mobile-sider-drawer-menu').toggleClass('active');
		});
	}	
	
	//  > Top Search bar Show Hide function by = custom.js =================== //	
	function site_search(){
		jQuery('a[href="#search"]').on('click', function(event) {                    
		jQuery('#search').addClass('open');
		jQuery('#search > form > input[type="search"]').focus();
	});
				
	jQuery('#search, #search .close-btn').on('click keyup', function(event) {
		if (event.target === this || event.target.className === 'close-btn') {
			jQuery(this).removeClass('open');
		}
	});  
	}	

	// > TouchSpin box function by  = jquery.bootstrap-touchspin.js =============== // 
	function input_number_vertical_form(){	
		jQuery("input[name='demo_vertical2']").TouchSpin({
		verticalbuttons: true,
		verticalupclass: 'bi bi-plus-lg',
		verticaldownclass: 'bi bi-dash-lg'
		});	
	}		

	//  Counter Section function by = counterup.min.js
	function counter_section(){
		jQuery('.counter').counterUp({
			delay: 10,
			time: 3000
		});	
	}	

	//  Client logo Carousel function by = owl.carousel.js ========================== //
	function home_client_carousel(){    
		jQuery('.home-client-carousel').owlCarousel({
		loop:true,
		margin:30,
		center:false,
		nav:false,
		dots: false,
		autoWidth:false,
		autoplay: true,
		slideTransition: 'linear',
		autoplayTimeout:5000,
		autoplaySpeed: 5000,
		responsiveClass: true,
		responsive:{
			0:{
				items:2
			},
			640:{
				items:3
			},
			991:{
				items:4
     		},
			1024:{
				items:4
     		},
			1366:{
				items:5
     		},
			1400:{
				items:5
     		}					
		},
		navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>']
	});
	}

	//  Popular search list function by = owl.carousel.js ========================== //
	function tvr_pop_search_carousel(){    
		jQuery('.tvr-pop-search-carousel').owlCarousel({
		loop:true,
		margin:30,
		center:false,
		nav:false,
		dots: false,
		autoWidth:false,
		autoplay: true,
		slideTransition: 'linear',
		autoplayTimeout:5000,
		autoplaySpeed: 5000,
		responsiveClass: true,
		responsive:{
			0:{
				items:1,
			},
			420:{
				items:2,
			},
			640:{
				items:3,
			},
			991:{
				items:3
     		},
			1024:{
				items:3
     		},
			1366:{
				items:4
     		},
			1400:{
				items:6
     		}					
		},
		navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>']
	});
	}	

	//  Popular Destination style 1 Carousel function by = swiper-bundle.min.js ========================== //
	function trv_pop_des_st1_carousal(){
		var swiper = new Swiper(".trv-pop-des-st1-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			575: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
			1200:{
			  slidesPerView: 4,
			},
		  },
		});
	}

	//  Testimonial Carousel function by = swiper-bundle.min.js ========================== //
	function trv_tsmo_banner_carousal(){
		var swiper = new Swiper(".trv-tsmo-banner-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			575: {
			  slidesPerView: 1,
			},
			1024: {
			  slidesPerView: 1,
			},
			1200:{
			  slidesPerView: 1,
			},
		  },
		});
	}

	//  Rate Review function by = swiper-bundle.min.js ========================== //
	function trv_rate_review_carousal(){
		var swiper = new Swiper(".trv-rate-review-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			575: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 4,
			},
			1200:{
			  slidesPerView: 5,
			},
		  },
		});
	}

	//  Latest Blog Style 21 Carousel function by = swiper-bundle.min.js ========================== //
	function trv_lat_blog_st2_carousal(){
		var swiper = new Swiper(".trv-lat-blog-st2-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			480: {
			  slidesPerView: 1,
			},
			768: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
		  },
		});
	}

	//  Explore Tours Guide Carousel function by = swiper-bundle.min.js ========================== //
	function trv_tour_guide_carousal(){
		var swiper = new Swiper(".trv-tour-guide-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 0,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			480: {
			  slidesPerView: 1,
			},
			640: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
			1366: {
			  slidesPerView: 4,
			},
			1600: {
			  slidesPerView: 5,
			},
		  },
		});
	}

	//  Explore Tours style 1 Carousel function by = swiper-bundle.min.js ========================== //
	function trv_tours_st1_carousal(){
		var swiper = new Swiper(".trv-tours-st1-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 0,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			480: {
			  slidesPerView: 1,
			},
			991: {
			  slidesPerView: 2,
			},
			1199: {
			  slidesPerView: 3,
			},
			1366: {
			  slidesPerView: 3,
			},
			1440: {
			  slidesPerView: 3,
			},
			1600: {
			  slidesPerView: 4,
			},
		  },
		});
	}

	//  Explore Tours style 2 Carousel function by = swiper-bundle.min.js ========================== //
	function trv_tours_st2_carousal(){
		var swiper = new Swiper(".trv-tours-st2-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			480: {
			  slidesPerView: 1,
			},
			991: {
			  slidesPerView: 2,
			},
			1199: {
			  slidesPerView: 3,
			},
			1366: {
			  slidesPerView: 3,
			},
			1440: {
			  slidesPerView: 4,
			},
		  },
		});
	}

	//  Explore Tours style 3 Carousel function by = swiper-bundle.min.js ========================== //
	function trv_tours_st3_carousal(){
		var swiper = new Swiper(".trv-tours-st3-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		   breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			480: {
			  slidesPerView: 1,
			},
			768: {
			  slidesPerView: 2,
			},
			991: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
			1366: {
			  slidesPerView: 4,
			},
		  },
		});
	}

	//  Most Favorite Tour function by = swiper-bundle.min.js ========================== //
	function trv_mf_tour_carousal(){
		var swiper = new Swiper(".trv-mf-tour-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			640: {
			  slidesPerView: 2,
			},
			768: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 3,
			},
			1200: {
			  slidesPerView: 4,
			},
			1366: {
			  slidesPerView: 4,
			},
			1440: {
			  slidesPerView: 5,
			},
		  },
		});
	}

	//------ Tour Category Slider Start ------------//
	// function trv_tour_cat_carousal(){
	// 	const featureTitle = document.querySelector(".trv-feature h2");
	// 	const featureDescription = document.querySelector(".trv-feature p");
	// 	const featureUrl = document.querySelector(".trv-feature a");
	// 	var swiper = new Swiper(".trv-tr-cat-carousal", {
    //   slidesPerView: 2,
    //   spaceBetween: 30,
    //   autoplay: {
    //     delay: 4500,
    //     disableOnInteraction: false,
    //   },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   breakpoints: {
    //     0: {
    //       slidesPerView: 1,
    //     },
    //     540: {
    //       slidesPerView: 2,
    //     },
    //     1024: {
    //       slidesPerView: 2,
    //     },
    //   },
    //   on: {
    //     init: function () {
    //       let activeSlide = document.querySelector(
    //         ".trv-cat-sld.swiper-slide-active",
	// 	  );
	// 	  if (!activeSlide) return;
    //       featureTitle.textContent = activeSlide.getAttribute("data-title");
    //       featureDescription.textContent =
    //         activeSlide.getAttribute("data-description");
    //       featureTitle.classList.add("animate-title");
    //       featureDescription.classList.add("animate-description");
    //       featureUrl.classList.add("animate-url");
    //     },
	// 	  slideChangeTransitionStart: function () {
	// 		if (!featureTitle) return;
    //       featureTitle.classList.remove("animate-title");
    //       featureDescription.classList.remove("animate-description");
    //       featureUrl.classList.remove("animate-url");
    //       featureTitle.classList.add("animate-away");
    //       featureDescription.classList.add("animate-away");
    //       featureUrl.classList.add("animate-away");
    //       setTimeout(() => {
    //         featureTitle.classList.remove("animate-away");
    //         featureDescription.classList.remove("animate-away");
    //         featureUrl.classList.remove("animate-away");
    //       }, 500);
    //     },
    //     slideChangeTransitionEnd: function () {
    //       let activeSlide = document.querySelector(
    //         ".trv-cat-sld.swiper-slide-active",
    //       );
    //       if (!activeSlide) return; // ← ADD THIS ONE LINE
    //       featureTitle.textContent = activeSlide.getAttribute("data-title");
    //       featureDescription.textContent =
    //         activeSlide.getAttribute("data-description");
    //       featureTitle.classList.add("animate-title");
    //       featureDescription.classList.add("animate-description");
    //       featureUrl.classList.add("animate-url");
    //     },
    //   },
    // });
	// }
	function trv_tour_cat_carousal() {
    // ── Guard: exit if required elements don't exist on this page ──
    
	const container = document.querySelector(".trv-tr-cat-carousal");
    if (!container) return;	
	const featureTitle = document.querySelector(".trv-feature h2");
    const featureDescription = document.querySelector(".trv-feature p");
    const featureUrl = document.querySelector(".trv-feature a");

    var swiper = new Swiper(".trv-tr-cat-carousal", {
      slidesPerView: 2,
      spaceBetween: 30,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //   breakpoints: {
      //     0: { slidesPerView: 1 },
      //     540: { slidesPerView: 2 },
      //     1024: { slidesPerView: 2 },
      //   },
      breakpoints: {
        /* Mobile - keep existing */
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
        },

        /* Tablet - keep existing */
        540: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: false,
        },

        /* Laptop - keep 2 cards */
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: false,
        },

        /* DESKTOP ONLY - 3 cards */
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
          centeredSlides: true,
        },
      },

      //   on: {
      //     init: function () {
      //       let activeSlide = document.querySelector(
      //         ".trv-cat-sld.swiper-slide-active",
      //       );
      //       if (!activeSlide) return;
      //       featureTitle.textContent = activeSlide.getAttribute("data-title");
      //       featureDescription.textContent =
      //         activeSlide.getAttribute("data-description");
      //       featureTitle.classList.add("animate-title");
      //       featureDescription.classList.add("animate-description");
      //       featureUrl.classList.add("animate-url");
      //     },
      //     slideChangeTransitionStart: function () {
      //       featureTitle.classList.remove("animate-title");
      //       featureDescription.classList.remove("animate-description");
      //       featureUrl.classList.remove("animate-away");
      //       featureTitle.classList.add("animate-away");
      //       featureDescription.classList.add("animate-away");
      //       featureUrl.classList.add("animate-away");
      //       setTimeout(() => {
      //         featureTitle.classList.remove("animate-away");
      //         featureDescription.classList.remove("animate-away");
      //         featureUrl.classList.remove("animate-away");
      //       }, 500);
      //     },
      //     slideChangeTransitionEnd: function () {
      //       let activeSlide = document.querySelector(
      //         ".trv-cat-sld.swiper-slide-active",
      //       );
      //       if (!activeSlide) return;
      //       featureTitle.textContent = activeSlide.getAttribute("data-title");
      //       featureDescription.textContent =
      //         activeSlide.getAttribute("data-description");
      //       featureTitle.classList.add("animate-title");
      //       featureDescription.classList.add("animate-description");
      //       featureUrl.classList.add("animate-url");
      //     },
      //   },
      on: {
        init: function () {
          try {
            let activeSlide = document.querySelector(
              ".trv-cat-sld.swiper-slide-active",
            );
            if (!activeSlide) return;
            if (featureTitle)
              featureTitle.textContent = activeSlide.getAttribute("data-title");
            if (featureDescription)
              featureDescription.textContent =
                activeSlide.getAttribute("data-description");
            if (featureTitle) featureTitle.classList.add("animate-title");
            if (featureDescription)
              featureDescription.classList.add("animate-description");
            if (featureUrl) featureUrl.classList.add("animate-url");
          } catch (e) {}
        },
        slideChangeTransitionStart: function () {
          try {
            if (featureTitle) {
              featureTitle.classList.remove("animate-title");
              featureTitle.classList.add("animate-away");
            }
            if (featureDescription) {
              featureDescription.classList.remove("animate-description");
              featureDescription.classList.add("animate-away");
            }
            if (featureUrl) {
              featureUrl.classList.remove("animate-url");
              featureUrl.classList.add("animate-away");
            }
            setTimeout(() => {
              if (featureTitle) featureTitle.classList.remove("animate-away");
              if (featureDescription)
                featureDescription.classList.remove("animate-away");
              if (featureUrl) featureUrl.classList.remove("animate-away");
            }, 500);
          } catch (e) {}
        },
        slideChangeTransitionEnd: function () {
          try {
            let activeSlide = document.querySelector(
              ".trv-cat-sld.swiper-slide-active",
            );
            if (!activeSlide) return;
            if (featureTitle)
              featureTitle.textContent = activeSlide.getAttribute("data-title");
            if (featureDescription)
              featureDescription.textContent =
                activeSlide.getAttribute("data-description");
            if (featureTitle) featureTitle.classList.add("animate-title");
            if (featureDescription)
              featureDescription.classList.add("animate-description");
            if (featureUrl) featureUrl.classList.add("animate-url");
          } catch (e) {}
        },
      },
    });
  }

	//  Selectpicker function = bootstrap-select.min.js________//
	if(jQuery('select').length){
		jQuery('select').selectpicker();
	}

	//  date time function = bootstrap-datetimepicker.min.js________//
	function date_time_input(){
		if (/Mobi/.test(navigator.userAgent)) {
		// if mobile device, use native pickers
		$(".date input").attr("type", "date");
		$(".time input").attr("type", "time");
		} else {
		// if desktop device, use DateTimePicker
		$(".datepicker").datetimepicker({
			useCurrent: false,
			format: "DD-MMM-YYYY",
			showTodayButton: true,
			icons: {
			next: "fa fa-chevron-right",
			previous: "fa fa-chevron-left",
			today: "fa fa-clock",
			}
		});
		$(".timepicker").datetimepicker({
			format: "LT",
			icons: {
			up: "fa fa-chevron-up",
			down: "fa fa-chevron-down"
			}
		});
		}
	
	}

	//  Price Range Slider function by = bootstrap-slider.min.js ========================== //
	function shop_product_price(){
		jQuery("#ex2").slider();
		jQuery("#ex2").on("slide", function(slideEvt) {
			$("#ex6SliderVal").text(slideEvt.value);
		});
	}

	//  Testimonial Carousel function by = swiper-bundle.min.js ========================== //
	function trv_t_monial_carousal(){
		var swiper = new Swiper(".trv-t-monial-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 1,
			}, 
			768: {
			  slidesPerView: 2,
			},
			991: {
			  slidesPerView: 2,
			},
			1024: {
			  slidesPerView: 2,
			},
		  },
		});
	}

	//  Tour Detail Gallery Carousel function by = swiper-bundle.min.js ========================== //
	function trv_inr_gallery_carousal(){
		var swiper = new Swiper(".trv-inr-gallery-carousal", {
		  slidesPerView: 1,
		  spaceBetween: 10,
		  loop:true,
		  autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		  },
		  pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		  },
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  breakpoints: {
			0: {
				slidesPerView: 2,
			}, 
			360: {
			  slidesPerView: 2,
			},
			480: {
			  slidesPerView: 3,
			},
			991: {
			  slidesPerView: 4,
			},
			1024: {
			  slidesPerView: 4,
			},
		  },
		});
	}	

	// > Testimonial Thumb SLider Full Screen with no margin function by = swiper-bundle.min.js ========================== //
	function trv_testi_slider(){
		
		var swiper = new Swiper(".testimonial-thum-sld", {
			centeredSlides: true,
			centeredSlidesBounds: true,
			slidesPerView: 3,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			loop:true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			 breakpoints: {
				0: {
				direction: 'horizontal',
				},
				1200: {
				direction: 'vertical',
				}
			},


		});
		var swiper2 = new Swiper(".testimonial-content-sld", {
				loop:true,
			  	watchOverflow: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				preventInteractionOnTransition: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				effect: 'fade',
					fadeEffect: {
					crossFade: true
				},
				thumbs: {
					swiper: swiper
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				
		});
	}	

	//  Cursor Section Start function by = gsap.min.js **********//
	function Cursor_section(){
		let cursor = document.querySelector(".cursor");
		let cursor2 = document.querySelector(".cursor2");
		if (!cursor || !cursor2) return;
		let cursorScale = document.querySelectorAll(".cursor-scale");
		let mouseX = 0;
		let mouseY = 0;
		
		gsap.to({}, 0.016, {
		repeat: -1,
		onRepeat: function () {
			gsap.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY,
			},
			});
			gsap.set(cursor2, {
			css: {
				left: mouseX,
				top: mouseY,
			},
			});
		},
	});
		
		// Mouse Pointer
		
		window.addEventListener("mousemove", (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		});
		
		cursorScale.forEach((link) => {
		link.addEventListener("mousemove", () => {
			cursor.classList.add("grow");
			if (link.classList.contains("small")) {
			cursor.classList.remove("grow");
			cursor.classList.add("grow-small");
			}
		});
		
		link.addEventListener("mouseleave", () => {
			cursor.classList.remove("grow");
			cursor.classList.remove("grow-small");
		});
		});
	}

	// > Start projects Filter with Slider function by = swiper-bundle.min.js ========================== //
	if(jQuery('.pro-filtr-cate-bx').length){
	const config = {
	pagination: ".swiper-pagination",
	slidesPerView: 1,
	slidesPerColumn: 1,
	paginationClickable: true,
	spaceBetween: 0,
	autoHeight: false,
	centerInsufficientSlides: true,
	centeredSlidesBounds: true,
	cssMode: false,
	mousewheel: false,
	keyboard: false,
	speed: 3000,
	parallax: true,
	freeMode: true,
	loop:true,
	grabCursor: true,
	autoplay: {
		delay: 1500,
		disableOnInteraction: false,
		},
	breakpoints: {
		0: {
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerColumn: 1,
		spaceBetween: 10
		},
		768:{
		slidesPerView: 2,
		slidesPerGroup: 1,
		slidesPerColumn: 1,
		spaceBetween: 10
		},
		991: {
		slidesPerView: 3,
		slidesPerGroup: 1,
		slidesPerColumn: 1,
		spaceBetween: 0
		},
		1366: {
		slidesPerView: 3,
		slidesPerGroup: 1,
		slidesPerColumn: 1,
		spaceBetween: 0
		}
	},
	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
		type: "fraction"
	},
	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},

	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	};
	var swiper = new Swiper(".pro-filtr-cate-bx", config);
	const filters = document.querySelectorAll(".pro-filtr-cate-carousal span");
	function updateFilter(activeFilter) {
	const filters = document.querySelectorAll(".pro-filtr-cate-carousal span");
	if (!activeFilter) {
		filters[0].classList.add("active");
		activeFilter = filters[0];
	}
	const filter = activeFilter.innerText.toLowerCase();
	Array.prototype.forEach.call(filters, function (el) {
		if (el === activeFilter) {
		el.classList.add("active");
		} else {
		el.classList.remove("active");
		}
	});
	}
	Array.prototype.forEach.call(filters, function (_filter) {
	_filter.addEventListener("click", function (e) {
		const self = e.target;
		const filter = self.getAttribute("data-filter").toLowerCase();
		updateFilter(self);
		console.log("filter:", filter);
		if (filter == "all") {
		Array.prototype.forEach.call(
			document.querySelectorAll(".pro-filtr-cate-bx [data-filter]"),
			function (_item) {
			_item.classList.remove("non-swiper-slide");
			_item.classList.add("swiper-slide");
			}
		);
		swiper.destroy();
		swiper = new Swiper(".pro-filtr-cate-bx", config);
		} else {
		Array.prototype.forEach.call(
			document.querySelectorAll(
			".pro-filtr-cate-bx [data-filter]:not([data-filter='" + filter + "'])"
			),
			(el) => {
			el.classList.add("non-swiper-slide");
			el.classList.remove("swiper-slide");
			el.removeAttribute("style");
			}
		);
		Array.prototype.forEach.call(
			document.querySelectorAll(
			".pro-filtr-cate-bx [data-filter='" + filter + "']"
			),
			(el) => {
			el.classList.remove("non-swiper-slide");
			el.classList.add("swiper-slide");
			el.removeAttribute("style");
			}
		);
		swiper.destroy();
		swiper = new Swiper(".pro-filtr-cate-bx", config);
		}
	});
	});
	updateFilter(null);
	}

	// > End projects Filter with Slider function by = swiper-bundle.min.js ========================== //


	// > Sidebar Popup function **********//
	jQuery(document).ready(function (o) {
		0 < o(".offset-side-bar").length &&
			o(".offset-side-bar").on("click", function (e) {
				e.preventDefault(), e.stopPropagation(), o(".cart-group").addClass("isActive");
			}),
			0 < o(".close-side-widget").length &&
				o(".close-side-widget").on("click", function (e) {
					e.preventDefault(), o(".cart-group").removeClass("isActive");
				}),
			0 < o(".navSidebar-button").length &&
				o(".navSidebar-button").on("click", function (e) {
					e.preventDefault(), e.stopPropagation(), o(".info-group").addClass("isActive");
				}),
			0 < o(".close-side-widget").length &&
				o(".close-side-widget").on("click", function (e) {
					e.preventDefault(), o(".info-group").removeClass("isActive");
				}),
			o("body").on("click", function (e) {
				o(".info-group").removeClass("isActive"), o(".cart-group").removeClass("isActive");
			}),
			o(".xs-sidebar-widget").on("click", function (e) {
				e.stopPropagation();
			}),
			0 < o(".xs-modal-popup").length &&
				o(".xs-modal-popup").magnificPopup({
					type: "inline",
					fixedContentPos: !2,
					fixedBgPos: !0,
					overflowY: "auto",
					closeBtnInside: !2,
					callbacks: {
						beforeOpen: function () {
							this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
						},
					},
				});
	});


	/** ====================================================================END */	


	/*--------------------------------------------------------------------------------------------
	Window on load ALL FUNCTION START
	---------------------------------------------------------------------------------------------*/

	// > masonry function function by = isotope.pkgd.min.js ========================= //	
	function masonryBox() {
		if ( jQuery().isotope ) {      
				var $container = jQuery('.masonry-wrap');
				
				$container.isotope({
					itemSelector: '.masonry-item',
					transitionDuration: '1s',
					originLeft: true,
					stamp: '.stamp',
					percentPosition: true,
					layoutMode: 'masonry',
				});
			
				$container.imagesLoaded().progress( function() {
					$container.isotope('layout');
				});
				
				jQuery('.masonry-filter li').on('click',function() {                           
					var selector = jQuery(this).find("a").attr('data-filter');
					jQuery('.masonry-filter li').removeClass('active');
					jQuery(this).addClass('active');
					$container.isotope({ filter: selector });
					return false;
				});
		};
	}

	// > page loader function by = custom.js ========================= //		
	function page_loader() {
		$('.loading-area').fadeOut(1500);
	}


	/*--------------------------------------------------------------------------------------------
	Window on scroll ALL FUNCTION START
	---------------------------------------------------------------------------------------------*/

    function color_fill_header() {
        var scroll = $(window).scrollTop();
        if(scroll >= 100) {
            $(".is-fixed").addClass("color-fill");
        } else {
            $(".is-fixed").removeClass("color-fill");
        }
    }
	

	/*--------------------------------------------------------------------------------------------
	document.ready ALL FUNCTION START
	---------------------------------------------------------------------------------------------*/
	jQuery(document).ready(function() {
		// > Top Search bar Show Hide function by = custom.js  		
		site_search(),
		// > Video responsive function by = custom.js 
		video_responsive(),
		// Category function by = owl.js **********//
		twm_category_carousal(),
		//  Blog List function by = swiper-bundle.min.js ========================== //
		twm_blog_list_carousal(),
		//  Detail Slider function by = swiper-bundle.min.js ========================== //
		trv_d_slider(),
		// Category function by = owl.js **********//
	    twm_category_carousal_2(),
		// Category function by = owl.js **********//
		trv_holi_theme_carousel(),
		 // > LIGHTBOX Gallery Popup function	by = lc_lightbox.lite.js =========================== //      
		lightbox_popup(),
		// > magnificPopup for video function	by = magnific-popup.js
		magnific_video(),
		// > Vertically center Bootstrap modal popup function by = custom.js
		popup_vertical_center();
	    // > Sidebar sticky  when scroll down function by = theia-sticky-sidebar.js ========== //		
		sticky_sidebar(),
		// > page scroll top on button click function by = custom.js	
		scroll_top(),
		//  Home Banner Slider function by = swiper-bundle.min.js ========================== //
		trv_hp4_slider(),
		//  Home Banner Slider function by = swiper-bundle.min.js ========================== //
		trv_hp5_slider(),
		//  Home Ad Slider function by = swiper-bundle.min.js ========================== //
		trv_ad_slider(),
		// > input type file function by = custom.js	 	
		input_type_file_form(),
		// > input Placeholder in IE9 function by = custom.js		
		placeholderSupport(),
		// > accordion active calss function by = custom.js ========================= //			
		accordion_active(),
		// > Nav submenu on off function by = custome.js ===================//
		mobile_nav(),
		// Mobile side drawer function by = custom.js
		mobile_side_drawer(),
		//  Client logo Carousel function by = owl.carousel.js ========================== //
		home_client_carousel(),
		//  Popular search list function by = owl.carousel.js ========================== //
		tvr_pop_search_carousel(),   
		//  Popular Destination style 1 Carousel function by = swiper-bundle.min.js ========================== //
		trv_pop_des_st1_carousal(),
		//  Testimonial Carousel function by = swiper-bundle.min.js ========================== //
		trv_tsmo_banner_carousal(),
		//  Rate Review function by = swiper-bundle.min.js ========================== //
		trv_rate_review_carousal(),
		//  Latest Blog Style 21 Carousel function by = swiper-bundle.min.js ========================== //
		trv_lat_blog_st2_carousal(),
		//  Explore Tours Guide Carousel function by = swiper-bundle.min.js ========================== //
		trv_tour_guide_carousal(),
		//  Explore Tours style 1 Carousel function by = swiper-bundle.min.js ========================== //
		trv_tours_st1_carousal(),
		//  Explore Tours style 2 Carousel function by = swiper-bundle.min.js ========================== //
		trv_tours_st2_carousal(),
		//  Explore Tours style 3 Carousel function by = swiper-bundle.min.js ========================== //
	    trv_tours_st3_carousal(),
		//  Most Favorite Tour function by = swiper-bundle.min.js ========================== //
		trv_mf_tour_carousal(),
		//------ Tour Category Slider Start ------------//
		trv_tour_cat_carousal(),
		//  date time function = bootstrap-datetimepicker.min.js________//
		date_time_input(),
		//  Price Range Slider function by = bootstrap-slider.min.js ========================== //
		shop_product_price(),
		//  Testimonial Carousel function by = swiper-bundle.min.js ========================== //
		trv_t_monial_carousal(),
		//  Tour Detail Gallery Carousel function by = swiper-bundle.min.js ========================== //
		trv_inr_gallery_carousal(),
		// > TouchSpin box function by  = jquery.bootstrap-touchspin.js =============== // 
		input_number_vertical_form(),
		//  Counter Section function by = counterup.min.js ========================== //
		counter_section(),
		// > Testimonial Thumb SLider Full Screen with no margin function by = swiper-bundle.min.js ========================== //
		trv_testi_slider(),
		//-------- ACDion Function ------------//
		//  Cursor Section Start function by = gsap.min.js **********//
		Cursor_section(),
		/*Banner Home 1 Rain Effect Function Start*/
		tvr_rain_effetct_function()

	}); 	

	/*--------------------------------------------------------------------------------------------
	Window Load START
	---------------------------------------------------------------------------------------------*/
	jQuery(window).on('load', function () {
		// > masonry function function by = isotope.pkgd.min.js		
		masonryBox(),
		// > page loader function by = custom.js		
		page_loader();

	});

	/*==================================
	Window Scroll ALL FUNCTION START
	==================================*/

	jQuery(window).on('scroll', function () {
	// > Window on scroll header color fill 
		color_fill_header();
	});
	
	/*====================================
	Document on  Submit FUNCTION START
	======================================*/

	// > Contact form function by = custom.js	
	// jQuery(document).on('submit', 'form.trv-cons-contact-form', function(e){
	// 	e.preventDefault();
	// 	var form = jQuery(this);
	// 	/* sending message */
	// 	jQuery.ajax({
	// 		url: 'https://thewebmax.org/travlla/phpmailer/mail.php',
			
	// 		data: form.serialize() + "&action=contactform",
	// 		type: 'POST',
	// 		dataType: 'JSON',
	// 		beforeSend: function() {
	// 			jQuery('.loading-area').show();
	// 		},
	// 		success:function(data){
	// 			jQuery('.loading-area').hide();
	// 			if(data['success']){
	// 			jQuery("<div class='alert alert-success'>"+data['message']+"</div>").insertBefore('form.trv-cons-contact-form');
	// 			}else{
	// 			jQuery("<div class='alert alert-danger'>"+data['message']+"</div>").insertBefore('form.trv-cons-contact-form');	
	// 			}
	// 		}
	// 	});
	// 	jQuery('.trv-cons-contact-form').trigger("reset");
	// 	return false;
	// });

	/*==================================
	Document on  Submit FUNCTION END
	===================================*/

	/*360 Degree Text Function Start*/	
	if(jQuery('.emblem').length){
		var Emblem = {
			init: function(el, str) {
			var element = document.querySelector(el);
			var text = str ? str : element.innerHTML;
			element.innerHTML = '';
			for (var i = 0; i < text.length; i++) {
				var letter = text[i];
				var span = document.createElement('span');
				var node = document.createTextNode(letter);
				var r = (360/text.length)*(i);
				var x = (Math.PI/text.length).toFixed(0) * (i);
				var y = (Math.PI/text.length).toFixed(0) * (i);
				span.appendChild(node);
				span.style.webkitTransform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
				span.style.transform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
				element.appendChild(span);
			}
			}
		};
		
		Emblem.init('.emblem');
	}
	/*360 Degree Text Function End*/

	/*Banner Home 1 Rain Effect Function Start*/
	function tvr_rain_effetct_function(){ 
	var makeItRain = function() {
	//clear out everything
	$('.rain').empty();

	var increment = 0;
	var drops = "";
	var backDrops = "";

	while (increment < 100) {
		//couple random numbers to use for various randomizations
		//random number between 98 and 1
		var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
		//random number between 5 and 2
		var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
		//increment
		increment += randoFiver;
		//add in a new raindrop with various randomizations to certain CSS properties
		drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
		backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
	}

	$('.rain.front-row').append(drops);
	$('.rain.back-row').append(backDrops);
	}
	makeItRain();
	}
	/*Banner Home 1 Rain Effect Function End*/


	// Thumbnail carousel function by = swiper-bundle.min.js__//
	function gallerySlider(topId , thumbsId) {
		
		var galleryThumbs = new Swiper(thumbsId, {
			centeredSlides: false,
			centeredSlidesBounds: true, 
			loop: true,
			spaceBetween: 30,
			slidesPerView: 4,
			freeMode: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			 autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			breakpoints: {
				0: {slidesPerView: 2,spaceBetween: 10,},
				480: {slidesPerView: 3,spaceBetween: 10,},
				768: {slidesPerView: 4,spaceBetween: 10,},
				1024: {slidesPerView: 4,spaceBetween: 10,},
				1365: {slidesPerView: 4,}
			},
		});
		var galleryTop = new Swiper(topId , {
			direction: "horizontal",
			spaceBetween: 0,
			loop: true,
			 autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
			},
			thumbs: {swiper: galleryThumbs}
		});
		galleryTop.on("slideChangeTransitionStart", function () {galleryThumbs.slideTo(galleryTop.activeIndex);
		});
		galleryThumbs.on("transitionStart", function () {galleryTop.slideTo(galleryThumbs.activeIndex);
		});
	}

	gallerySlider(".twm-gallery-top1", ".twm-gallery-thumbs1");
	gallerySlider(".twm-gallery-top2", ".twm-gallery-thumbs2");
	gallerySlider(".twm-gallery-top3", ".twm-gallery-thumbs3");
	gallerySlider(".twm-gallery-top4", ".twm-gallery-thumbs4");


	
	// Table Drag to scroll Start
	document.addEventListener("DOMContentLoaded", () => {
		const slider = document.querySelector('.table-wrapper');
		if (!slider) return;

		let isDown = false;
		let startX;
		let scrollLeft;

		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});

		slider.addEventListener('mouseleave', () => {
			isDown = false;
		});

		slider.addEventListener('mouseup', () => {
			isDown = false;
		});

		slider.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1;
			slider.scrollLeft = scrollLeft - walk;
		});
	});
	// Table Drag to scroll End



    // Show/hide dropdown divs on button click Function Start
		const buttons = document.querySelectorAll('.trv-filter-btn');
		const contents = document.querySelectorAll('.trv-filter-content');

		buttons.forEach(btn => {
		btn.addEventListener('click', e => {
			const target = btn.getAttribute('data-target');
			const content = document.getElementById(target);

			// Close others
			contents.forEach(c => {
			if (c !== content) c.classList.remove('active');
			});

			// Toggle current
			content.classList.toggle('active');
		});
		});

		// Close dropdowns when clicking outside
		document.addEventListener('click', e => {
		if (!e.target.closest('.trv-filter-bar-section')) {
			contents.forEach(c => c.classList.remove('active'));
		}
		});
	// Show/hide dropdown divs on button click Function End




	
	// home page 4 Quick Visa Getaways filter section Function Start
	if(jQuery('.trv-visa-filter').length){
	const config = {
		slidesPerView: 3,
		slidesPerColumn: 1,
		paginationClickable: true,
		spaceBetween: 30,
		autoHeight: true,
		loop:true,
		grabCursor: true,
		autoplay: {
		delay: 2500,
		disableOnInteraction: false,
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
			spaceBetween: 10
		},
		768:{
			slidesPerView: 2,
			spaceBetween: 20
		},
		991: {
			slidesPerView: 3,
			spaceBetween: 30
		}
		},
		navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
		},
		scrollbar: {
		el: '.swiper-scrollbar',
		},
	};
	var swiper = new Swiper(".trv-visa-filter-bx", config);
	const filters = document.querySelectorAll(".trv-visa-filter span");
	function updateFilter(activeFilter) {
		const filters = document.querySelectorAll(".trv-visa-filter span");
		if (!activeFilter) {
		filters[0].classList.add("active");
		activeFilter = filters[0];
		}
		const filter = activeFilter.getAttribute("data-filter").toLowerCase();
		Array.prototype.forEach.call(filters, function (el) {
		if (el === activeFilter) {
			el.classList.add("active");
		} else {
			el.classList.remove("active");
		}
		});
	}
	Array.prototype.forEach.call(filters, function (_filter) {
		_filter.addEventListener("click", function (e) {
		const self = e.target;
		const filter = self.getAttribute("data-filter").toLowerCase();
		updateFilter(self);
		if (filter == "visa-free" || filter == "visa-on-arrival") {
			Array.prototype.forEach.call(
			document.querySelectorAll(
				".trv-visa-filter-bx [data-filter]:not([data-filter='" + filter + "'])"
			),
			(el) => {
				el.classList.add("non-swiper-slide");
				el.classList.remove("swiper-slide");
				el.removeAttribute("style");
			}
			);
			Array.prototype.forEach.call(
			document.querySelectorAll(
				".trv-visa-filter-bx [data-filter='" + filter + "']"
			),
			(el) => {
				el.classList.remove("non-swiper-slide");
				el.classList.add("swiper-slide");
				el.removeAttribute("style");
			}
			);
			swiper.destroy();
			swiper = new Swiper(".trv-visa-filter-bx", config);
		}
		});
	});
	updateFilter(null);
	}
	// home page 4 Quick Visa Getaways filter section Function End


	// custom smooth scroll function Start
	document.querySelectorAll('.navbar-one a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetID = this.getAttribute('href');
			const target = document.querySelector(targetID);

			if (!target) return;

			const navbar = document.querySelector('.navbar-one');
			const offset = navbar ? navbar.offsetHeight : 0;

			const top = target.offsetTop - offset;

			window.scrollTo({
			top: top,
			behavior: 'smooth'
			});
		});
	});
	// custom smooth scroll function Start


})(window.jQuery);
