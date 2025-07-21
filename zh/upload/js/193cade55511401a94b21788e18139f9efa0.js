$(function(){

  	$(".pro_ejcate .p_c_title1 .s1").each(function(){
  		$(this).parents(".p_c_t").next(".deep-2").prepend("<p class='s'>" + $(this).text() + "</p>");
  	});
   $(".pro_ejcate .p_c_title1 .t1").each(function(){
  		$(this).parents(".p_c_t").next(".deep-2").prepend("<p class='t'>" + $(this).text() + "</p>");
  	});
  
   $(".pro_ejcate .p_c_title1").each(function(){
  	   $(this).parents(".p_c_t").next(".deep-2").append("<a class='cate_btn' href=''><span class='text'>View Products</span><span class='jt'></span></a>");
     $(this).parents(".p_c_t").next(".deep-2").children(".cate_btn").children(".jt").append('<svg t="1663324750515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9496" width="200" height="200"><path d="M918.6 489.3L646.1 216.8c-12.3-12.3-32.5-12.3-44.8 0l-0.7 0.7c-12.3 12.3-12.3 32.4 0 44.7l218.7 218.7H257.6c-17.3 0-31.5 14.2-31.5 31.5s14.2 31.5 31.5 31.5h560.1L601.2 760.5c-12.5 12.5-12.5 32.9 0 45.4s32.9 12.5 45.4 0l271.1-271.1s0.1-0.1 0.2-0.1l0.7-0.7c12.3-12.3 12.3-32.4 0-44.7z" p-id="9497"></path><path d="M97.6 512.6a31.8 31.7 0 1 0 63.6 0 31.8 31.7 0 1 0-63.6 0Z" p-id="9498"></path></svg>')
      var urlHref = $(this).attr('href');
      $(this).parents(".p_c_t").next(".deep-2").children(".cate_btn").attr("href",urlHref);
      $(this).parents(".p_c_t").next(".deep-2").children(".p_c_item").wrapAll("<div class='ejlist'></div>");
  	});
  

  	$(".pro_ejcate .p_c_title2 .t1").append('<svg t="1655256681626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1220" width="500" height="500"><path d="M329.6 969.6l416-428.8c6.4-9.6 9.6-19.2 9.6-28.8 0-9.6-3.2-22.4-9.6-28.8l-416-428.8c-12.8-16-35.2-16-48 0s-16 41.6 0 54.4L668.8 512 281.6 915.2c-12.8 16-12.8 41.6 0 54.4 12.8 16 35.2 16 48 0z" p-id="1221"></path></svg>');

  $(".pro_ejcate .deep-2 > .p_c_item").wrap("<div class='ejlist'></div>");

   //solution
    var SoluL = new Swiper('.ind_solu > .swiper-container', {
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        loop: true,
        loopAdditionalSlides: 2,
        speed: 800,
        slideActiveClass: 'active',
        slidesPerView: 1.75,
        spaceBetween: 40,
        centeredSlides: true,
        breakpoints: {
            768: {
                slidesPerView: 1.05,
                spaceBetween: 10
            },
            1024: {
                slidesPerView: 1.75,
                spaceBetween: 20
            }
        },
        scrollbar: {
            el: '.ind_solu_p .swiper-scrollbar',
            draggable: true,
        },
        pagination: {
            el: '.ind_solu_p .swiper-pagination',
            clickable: true,
        },
        observer: true,
        observeParents: true,
    });
  
  $('.swiper-slide').mouseenter(function() {SoluL.autoplay.stop();
})
// 鼠标移出开始自动滚动
$('.swiper-slide').mouseleave(function() {SoluL.autoplay.start();
})

});