$(document).ready(function(){
let title = 'FRIENDS';
$('.pageTitle').text(title);
$('.addBtn').unbind('click').click(function(){
  $('.modal-dialog').empty();
  $('.modal-dialog').removeAttr('attr-id');
  $('.modal-dialog').load('view/friends/action-friends.html');
})
refreshTable();
function refreshTable(){
  var obj = {};
  obj.Token = localStorage.getItem('Email');
  var json = JSON.stringify(obj);
  $.ajax({
    url: config.serviceUri+'get_friends',
    type: "POST",
    processData: false,
    contentType: "application/json; charset=UTF-8",
    data: json, 
    beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
      $('#loader').removeClass('hidden')
    },
    success: function(data){
      var result = JSON.parse(data);
      $('#example').DataTable().destroy();
      var a = "TEST";
      if(result.Status == 0){
        let data = result.Data;
        var body = $('.bodyData');
        var temp = $('.rowtemplate');
        for(let i = 0; i<data.length;i++){
          let e = temp.clone();
          let item = data[i];
          e.removeClass('rowtemplate').removeClass('looptemplate').addClass('rowData');
          $('.iFullName',e).text(item.FullName);
          $('.iFriendsName',e).text(item.FriendsName);
          $('.iAddress',e).text(item.Address);
          $('.iFriendsID',e).text(item.FriendsID);
          e.attr('attr-id',item.FriendsID);
          $('.edit',e).attr('attr-id',item.FriendsID);
          
          // $('.iAction',e).text('test');
          body.append(e);
          //edit on web size
          $('.edit',e).unbind('click').click(function(){
            $('.modal-dialog').empty();
            let id = e.attr('attr-id');
            console.log(id);
            $('.modal-dialog').attr('attr-id',id);
            $('.modal-dialog').load('view/friends/action-friends.html');
          })

          $('.delete',e).unbind('click').click(function(){
            if (confirm('Are you sure you want to delete this data ?')) {
              // Save it!
              var param = {};
              param.FriendsID = $('.iFriendsID',e).text();
              param.Token = obj.Token;
              let json = JSON.stringify(param);
              alert(param.FriendsID)
              $.ajax({
                url: config.serviceUri+'delete_friends',
                type: "POST",
                processData: false,
                contentType: "application/json; charset=UTF-8",
                data: json, 
                beforeSend: function(){
                  $('#loader').removeClass('hidden')
                },
                success: function(){
                  alert("Data Deleted")
                },
                complete: function(){
                  $('#loader').addClass('hidden')
                  location.reload();
                },
                error: function (){
                  alert('something is error, contact ko Marshel');
                  $('#example').DataTable().destroy();
                  $('.looptemplate').remove();
                    var table = $('#example').DataTable( {
                      "scrollX": true,
                      responsive: true
                    } );
                }
              })
              
              
            } else {
              // Do nothing!
              // console.log('Thing was not saved to the database.');
            }
          })
        
        }
        //edit on responsive datatable size
        $(document).on("click", ".dtr-control", function(){
          let id = $(this).parent().attr('attr-id');
          $(document).on("click",".edit[attr-id="+id+"]",function() {
            var elem = $("tr[attr-id='" + id +"']");
            var tr = $(this).closest('tr').closest('tbody').find(elem);
            tr.addClass('sampenih');
            $('.modal-dialog').empty();
            $('.modal-dialog').attr('attr-id',id);
            $('.modal-dialog').load('view/friends/action-friends.html');
          });
        })
        
        temp.remove();
        var table = $('#example').DataTable( {
          responsive: true,
        } );
        
      }else{

      }
    },complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
      $('#loader').addClass('hidden')
    },
    error:function(result){
      // console.log(result.responseText)
      alert('something is error, contact ko Marshel');
      $('#example').DataTable().destroy();
      $('.looptemplate').remove();
        var table = $('#example').DataTable( {
          "scrollX": true,
          responsive: true
        } );
    }
  });
}




})