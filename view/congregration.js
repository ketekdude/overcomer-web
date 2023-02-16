$(document).ready(function(){
  let title = 'JEMAAT';
  $('.pageTitle').text(title);
$('.addBtn').unbind('click').click(function(){
  $('.modal-dialog').empty();
  $('.modal-dialog').removeAttr('attr-id');
  $('.modal-dialog').load('view/congregration/action-congregration.html');
})
refreshTable();
function refreshTable(){
  var obj = {};
  obj.Token = localStorage.getItem('Email');
  var json = JSON.stringify(obj);
  $.ajax({
    url: config.serviceUri+'member',
    type: "GET",
    processData: false,
    headers:  {"token": localStorage.getItem("Token"), "user_id": localStorage.getItem("UserID")},
    contentType: "application/json",
    beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
      $('#loader').removeClass('hidden')
    },
    success: function(data){
      var result = data
      
      $('#example').DataTable().destroy();
      var a = "TEST";
      if(result.message == "success"){
        let data = result.Data
        var body = $('.bodyData');
        var temp = $('.rowtemplate');
        for(let i = 0; i<data.length;i++){
          let e = temp.clone();
          let item = data[i];
          e.removeClass('rowTemplate').removeClass('looptemplate').addClass('rowData');
          $('.iFullName',e).text(item.first_name+' '+item.last_name);
          var DOB = (new Date()).toISOString().split('T')[0];
          $('.iDOB',e).text(DOB);
          $('.iPhone',e).text(item.mobile_phone);
          // $('.iEmail',e).text(item.Email);
          // $('.iFriendsName',e).text(item.FriendsName);
          // $('.iPrivilegeCardNo',e).text(item.PrivilegeCardNo);
          $('.iJemaatID',e).text(item.id);
          e.attr('attr-id',item.id);
          $('.edit',e).attr('attr-id',item.id);
          
          // $('.iAction',e).text('test');
          body.append(e);
          $('.edit',e).unbind('click').click(function(){
            let id = e.attr('attr-id');
            $('.modal-dialog').attr('attr-id',id);
            $('.modal-dialog').load('view/congregration/action-congregration.html');
          })
          
        }
        //for responsive data table, use this for the event listener.
        $(document).on("click", ".dtr-control", function(){
          let id = $(this).parent().attr('attr-id');
          $(document).on("click",".edit[attr-id="+id+"]",function() {
            var elem = $("tr[attr-id='" + id +"']");
            var tr = $(this).closest('tr').closest('tbody').find(elem);
            tr.addClass('sampenih');
            $('.modal-dialog').empty();
            $('.modal-dialog').attr('attr-id',id);
            $('.modal-dialog').load('view/congregration/action-congregration.html');
          });
        })
        temp.remove();
        var table = $('#example').DataTable( {
          responsive: true,
        } )
        .on( 'draw', function () {
          // your code here
          
      });;
        
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