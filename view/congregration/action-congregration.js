$(document).ready(function(){


    let id = $('.modal-dialog').attr('JemaatID');
    if(id){
        refreshTable();
    }
    
    function refreshTable(){
        var obj = {};
        obj.Token = localStorage.getItem('Email');
        obj.JemaatID = id;
        var json = JSON.stringify(obj);
        $.ajax({
          url: config.serviceUri+'get_jemaat',
          type: "POST",
          processData: false,
          contentType: "application/json; charset=UTF-8",
          data: json, 
          beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
            $('#loader').css('z-index',10000).removeClass('hidden')
          },
          success: function(data){
            var result = JSON.parse(data);
            if(result.Status == 0){
              let item = result.Data;

              $('#FullName').val(item.FullName);
              $('#Phone').val(item.Phone);
              $('#Email').val(item.Email);
              $('#Address').val(item.Address);
              
            }else{
      
            }
          },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
            $('#loader').addClass('hidden')
          },
          error:function(result){
            // console.log(result.responseText)
              
          }
        });
      }
})