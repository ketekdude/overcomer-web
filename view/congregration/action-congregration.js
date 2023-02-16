$(document).ready(function(){
    let ajaxCount = 0;
    var obj = {};
    obj.Token = localStorage.getItem('Email');
    let id = $('.modal-dialog').attr('attr-id');
    $('.select2').select2()

    //Date picker
    $('#reservationdate').datetimepicker({
      format: 'L'
    });
    $('.datetimepicker-input').on('click', function(){
      $('.fa-calendar').trigger('click')
    })

    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
    if(id){
      refreshTable(obj);
    }else{
      getFriends(obj);
    }
    
    $("#action").unbind('submit').submit(function(event){
      var ser = $('form').serializeArray();
      var param = {};
      event.preventDefault()
      ser.forEach(function(value,index){
        param[value.name] = value.value;
      })
      param['Token'] = obj.Token;
      param['JemaatID'] = id;
      console.log(param);
      let json = JSON.stringify(param);
      console.log(json);
      $.ajax({
        url: config.serviceUri+'save_jemaat',
        type: "POST",
        processData: false,
        contentType: "application/json; charset=UTF-8",
        data: json, 
        beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
          $('#loader').css('z-index',10000).removeClass('hidden')
          ajaxCount++;
        },
        success: function(data){
          var result = JSON.parse(data);
          if(result.Status == 0){
              location.reload();
            
          }else{
    
          }
        },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
          ajaxCount--;
          console.log(ajaxCount);
          if(ajaxCount == 0)
              $('#loader').addClass('hidden')
        },
        error:function(result){
          // console.log(result.responseText)
            
        }
      });
      
    });
    function refreshTable(obj){
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
            ajaxCount++;
          },
          success: function(data){
            var result = JSON.parse(data);
            if(result.Status == 0){
              let item = result.Data;

              $('#FullName').val(item.FullName);
              $('#Phone').val(item.Phone);
              $('#Email').val(item.Email);
              $('#Address').val(item.Address);
              $.ajax({
                url: config.serviceUri+'get_friends',
                type: "POST",
                processData: false,
                contentType: "application/json; charset=UTF-8",
                data: json, 
                beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
                  $('#loader').css('z-index',10000).removeClass('hidden')
                  ajaxCount++;
                },
                success: function(data){
                  var result = JSON.parse(data);
                  $('#FriendsID').empty();
                  if(result.Status == 0){
                    let data = result.Data;
                    
                    let opt = $('<option></option>').attr('value', "").text('Please Select');
                      $('#FriendsID').append(opt);
                    for(let i = 0;i<data.length;i++){
                      let item = data[i];
                      let opt = $('<option></option>').attr('value', item.FriendsID).text(item.FriendsName);
                      $('#FriendsID').append(opt);
                    }
                    $('#FriendsID').val(item.FriendsID);
                  }else{
            
                  }
                },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                  ajaxCount--;
                  console.log(ajaxCount);
                  if(ajaxCount == 0)
                      $('#loader').addClass('hidden')
                },
                error:function(result){
                  // console.log(result.responseText)
                    
                }
              });
              
            }else{
      
            }
          },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
            ajaxCount--;
            if(ajaxCount == 0)
              $('#loader').addClass('hidden')
          },
          error:function(result){
            // console.log(result.responseText)
              
          }
        });
      }

      function getFriends(obj){
        $.ajax({
          url: config.serviceUri+'segment',
          type: "GET",
          processData: false,
          contentType: "application/json; charset=UTF-8",
          headers:  {"token": localStorage.getItem("Token"), "user_id": localStorage.getItem("UserID")},
          beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
            $('#loader').css('z-index',10000).removeClass('hidden')
            ajaxCount++;
          },
          success: function(data){
            // var result = JSON.parse(data);
            var result = data
            $('#FriendsID').empty();
            if(result.message == "success"){
              let data = result.Data;
              
              let opt = $('<option></option>').attr('value', "").text('Please Select');
                $('#FriendsID').append(opt);
              for(let i = 0;i<data.length;i++){
                let item = data[i];
                let opt = $('<option></option>').attr('value', item.id).text(item.name);
                $('#FriendsID').append(opt);
              }
            }else{
      
            }
          },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
            ajaxCount--;
            console.log(ajaxCount);
            if(ajaxCount == 0)
                $('#loader').addClass('hidden')
          },
          error:function(result){
            // console.log(result.responseText)
              
          }
        });
      }
})