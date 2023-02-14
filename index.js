$(document).ready(function(){
//function to getLocation.
// getLocation();
// var intervalId = setInterval(function(){
//   getLocation();
//   console.log(positionGlobal);
// }, 5000); 
// $('.content-wrapper').load('view/dashboard.html');

// alert('test');
// function untuk redirect, dan load view.
$('.sign-out-button').unbind('click').click(function(){
  localStorage.clear();
})
function initialURLLoad(){
  if(localStorage.getItem('FirstName')){
    $('.UserFullName').text(localStorage.getItem('FirstName') + ' '+localStorage.getItem('LastName'));
  }
  $('.nav-link').removeClass('active');
  var url      = window.location.href;
  var origin   = window.location.origin+window.location.pathname;
  var pageSelected = url.replace(origin+'#','');
  //utk cek current page
  $('.nav-item').removeClass('menu-open').removeClass('menu-is-opening');
  $('.nav-treeview').css('display','none');
  config.currentPage = pageSelected;
  $('#loader').addClass('hidden')
  var pageAttr = pageSelected.replace('view/','',pageSelected);
  if(pageSelected == origin){
    var firstPage = $('.nav-link-page').first();
    firstPage.addClass('active');
    // var test = $('.nav-link-page[page="'+pageAttr);
    // test.addClass('active');
    let pageName = firstPage.attr('parent');
    $('.nav-link-'+pageName).addClass('active');
    
    $('.content-wrapper').load('view/dashboard.html');
  }else{
    
    $('.nav-link').removeClass('active');
    
    var test = $('.nav-link-page[page="'+pageAttr);
    test.addClass('active');
    if(test.parent().parent().hasClass('nav-treeview')){
      test.parent().parent().css('display','none');
    }
    // let pageName = pageAttr.replace('.html','',pageAttr);
    let pageName = test.attr('parent');
    $('.nav-link-'+pageName).addClass('active');
    $('.content-wrapper').empty();
    $('.content-wrapper').load(pageSelected);
    if(pageSelected == 'login')
      $('.content-wrapper').load(pageSelected);

  }
  // $("html, body").animate({ scrollTop: 0 }, "slow");
  
  if(localStorage.getItem('Email') == null){
    window.location.href = config.baseUri+'login.html';
  }
    
}

function checkSession(){
  if(sessionStorage.getItem('email') == null){
    $('.logout-button').css('display','none');
    $('.login-button').css('display',true);
    // $('.mobile-nav-toggle').css('display','none');
  }
  else{
    // alert('test');
    $('.login-button').css('display','none');
    $('.mobile-nav-toggle').css('display',true);
    
  }
}
initialURLLoad();
checkSession();
// if(sessionStorage.getItem('email') == null){
//   $('.logout-button').css('display','none');
//   $('.login-button').css('display',true);
// }
// else{
//   $('.login-button').css('display','none');
// }
  
//detect on changes url, check the session
$(window).on('hashchange', function(e){
  initialURLLoad();
  // if(sessionStorage.getItem('email') == null)
  //   $('.logout-button').css('display','none');
  
  checkSession();
});

$('.login-button').click(function(){
  $('#primarycontent').load('login.html');
});

$('.logout-button').click(function(){
  $.ajax({
    url: config.serviceUri+'logout',
    headers: {
      "token":sessionStorage.getItem("Token"),
      "user_id":sessionStorage.getItem("UserID")
    },
    type: "GET",
    data: JSON.stringify(obj), 
    processData: false,
    contentType: "application/json",
    beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
      $('#loader').removeClass('hidden')
    },
    success: function(data){
      // var result = JSON.parse(data);
      alert(data)
      console.log(data)
      sessionStorage.clear();
      $('#primarycontent').load('login.html');
      console.log(sessionStorage.getItem('email'));
      if(sessionStorage.getItem('email') == null){
        $('.logout-button').css('display','none');
        $('.login-button').css('display','');
      }
      else{
        $('.login-button').css('display','none');
      }
      
    },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
      $('#loader').addClass('hidden')
    },
    error:function(result){
      console.log(result.responseText)
    }
  });
  
});

// $('.nav-link-page').click(function(){
//   $('.nav-link-page').removeClass('active');
//   $('.content-wrapper').empty();
//   var page = $(this).attr('page');
  
//   $(this).addClass('active');
//   $('.nav-item').removeClass('menu-open')
//   $('.content-wrapper').load('view/'+page);
// })
// function untuk redirect, dan load view END.
})
