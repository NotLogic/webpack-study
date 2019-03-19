// 初始化百度地图
function mapInit() {
  var map = new BMap.Map("map-container");
  var point = new BMap.Point(113.947977, 22.531861);
  map.centerAndZoom(point, 17);
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
  map.enableScrollWheelZoom()
}
mapInit()

var sectionSelectors = ['' ,'#production', '#production-introduce', '#about-us', '#conact-us']
// 滚动时计算
function setScrollNav(){
  var scrollTop = $(document).scrollTop()
  var navHeight = $('#my-nav').height()
  var i,selector=null,sectionTop=null
  for(i=0;i<sectionSelectors.length - 1;i++){
    selector = sectionSelectors[i]
    if(selector){
      sectionTop = $(selector).offset().top
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $(".nav-item").removeClass('cur').eq(sectionSelectors.length - 1).addClass('cur')
      }else if(scrollTop + navHeight > sectionTop -1 && scrollTop + navHeight < $(sectionSelectors[i + 1]).offset().top - 1){
        $(".nav-item").removeClass('cur').eq(i).addClass('cur')
      }
    }else{
      $(".nav-item").removeClass('cur').eq(0).addClass('cur')
    }
  }
  if(scrollTop  < navHeight){
    $('#my-nav').removeClass('is-scrolling')
  }else{
    $('#my-nav').addClass('is-scrolling')
  }
}
setScrollNav()
$(window).scroll(function(){
  setScrollNav()
})

// 滚动导航
$('.nav-item').click(function(){
  var selector = $(this).data('selector')
  if(selector){
    var height = $(selector).offset().top
    var navHeight = $('#my-nav').height()
    // 这里只控制滚动效果，增加删除class交给window的滚动事件
    $('#my-nav').stop().animate({top: 0}, 1000)
    $('html,body').stop().animate({scrollTop: height - navHeight}, 1000)
  }else{
    $('html,body').stop().animate({scrollTop: 0}, 1000)
  }
})