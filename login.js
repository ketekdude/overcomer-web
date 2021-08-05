$(document).ready(function(){
    console.log(localStorage.getItem('Email'));
    $("#action").unbind('submit').submit(function(event){
      var ser = $('form').serializeArray();
      var obj = {};
      
      ser.forEach(function(value,index){
        obj[value.name] = value.value;
      })
      event.preventDefault()

      $.ajax({
        url: config.serviceUri+'login',
        type: "POST",
        data: JSON.stringify(obj), 
        processData: false,
        contentType: "application/json; charset=UTF-8",
        beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
          $('#loader').removeClass('hidden')
        },
        success: function(data){
          var result = JSON.parse(data);
          if(result.Status == 0){
            let item = result.Data;
            
            localStorage.setItem("Email", item.Email);
            localStorage.setItem("UserID", item.UserID);
            localStorage.setItem("FullName", item.FullName);
            
            window.location.href = config.baseUri;
          }else{
            $('#loader').addClass('hidden')
            console.log(result.Errors);
            let error = result.Errors;
            error.forEach(function(val){
              $(document).Toasts('create', {
                class: 'bg-danger custom-toast',
                title: val.ID,
                body: val.Message
              })
            });
            
          }
        },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
          $('#loader').addClass('hidden')
        },
        error:function(result){
          console.log(result.responseText)
        }
      });
       
  })
    
    
  
})
