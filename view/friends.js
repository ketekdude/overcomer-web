$(document).ready(function(){
let title = 'FRIENDS';
$('.pageTitle').text(title);
$('.addBtn').unbind('click').click(function(){
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
          e.attr('FriendsID',item.FriendsID);
          
          // $('.iAction',e).text('test');
          body.append(e);
          // $('.edit',e).unbind('click').click(function(){
          //   $('.modal-dialog').load('view/friends/action-friends.html');
          //   let id = e.attr('friendsid');
          //   $('.modal-dialog').attr('FriendsID',id);
          // })
          e.click(function() { 
            // alert('test');
            
            let id = e.attr('friendsid');
            $('.modal-dialog').attr('friendsid',id);
            $(document).on("click",".edit",function() {
              var elem = $("tr[friendsid='" + id +"']");
              var tr = $(this).closest('tr').closest('tbody').find(elem);
              tr.addClass('sampenih');
              $('.modal-dialog').empty();
              $('.modal-dialog').load('view/friends/action-friends.html');
            });
          });
        
        }
        
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