$(document).ready(function(){


    let id = $('.modal-dialog').attr('attr-id');
    let ajaxCount = 0;
    var obj = {};
    obj.Token = localStorage.getItem('Email');
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
    if(id){
        refreshTable(obj);
    }else{
        getFriendsLeader(obj);
    }
    $("#action").unbind('submit').submit(function(event){
      var ser = $('form').serializeArray();
      var param = {};
      event.preventDefault()
      ser.forEach(function(value,index){
        param[value.name] = value.value;
      })
      param['Token'] = obj.Token;
      param['FriendsID'] = id;
      console.log(param);
      let json = JSON.stringify(param);
      $.ajax({
        url: config.serviceUri+'save_friends',
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
        
        obj.FriendsID = id;
        var json = JSON.stringify(obj);
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
            if(result.Status == 0){
              let item = result.Data;

              $('#FullName').val(item.FriendsName);
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
                  $('#FriendsLeaderID').empty();
                  if(result.Status == 0){
                    let data = result.Data;
                    
                    let opt = $('<option></option>').attr('value', "").text('Please Select');
                      $('#FriendsLeaderID').append(opt);
                    for(let i = 0;i<data.length;i++){
                      let item = data[i];
                      let opt = $('<option></option>').attr('value', item.JemaatID).text(item.FullName);
                      $('#FriendsLeaderID').append(opt);
                    }
                    $('#FriendsLeaderID').val(item.FriendsLeaderID);
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
              $('#Phone').val(item.Phone);
              $('#Email').val(item.Email);
              $('#Address').val(item.Address);
              
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

      function getFriendsLeader(obj){
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
            $('#FriendsLeaderID').empty();
            if(result.Status == 0){
              let data = result.Data;
              
              let opt = $('<option></option>').attr('value', "").text('Please Select');
                $('#FriendsLeaderID').append(opt);
              for(let i = 0;i<data.length;i++){
                let item = data[i];
                let opt = $('<option></option>').attr('value', item.JemaatID).text(item.FullName);
                $('#FriendsLeaderID').append(opt);
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