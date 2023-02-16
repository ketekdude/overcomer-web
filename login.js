$(document).ready(function(){
    console.log(localStorage.getItem('Email'));
    $("#action").unbind('submit').submit(function(event){
      var ser = $('form').serializeArray();
      var obj = {};
      
      ser.forEach(function(value,index){
        obj[value.name] = value.value;
      })
      event.preventDefault()
      console.log(JSON.stringify(obj))
      $.ajax({
        url: config.serviceUri+'login',
        type: "POST",
        data: JSON.stringify(obj), 
        processData: false,
        contentType: "application/json",
        beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
          $('#loader').removeClass('hidden')
        },
        success: function(data){
          // var result = JSON.parse(data);
          console.log(data)
          if(data.message != "success"){
            $('#loader').addClass('hidden')
              $(document).Toasts('create', {
                class: 'bg-danger custom-toast',
                title: "Error",
                body: data.message
              })
            
          }else{
            var item = data.Data
            localStorage.setItem("Email", item.email);
            localStorage.setItem("UserID", item.id);
            localStorage.setItem("FirstName", item.first_name);
            localStorage.setItem("LastName", item.last_name);
            localStorage.setItem("Token", item.authenticator_token);
            localStorage.setItem("DOB", item.dob);
            
            window.location.href = config.baseUri;
            
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
