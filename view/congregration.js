$(document).ready(function(){
  let title = 'JEMAAT';
  $('.pageTitle').text(title);
$('.addBtn').unbind('click').click(function(){
  $('.modal-dialog').load('view/congregration/action-congregration.html');
})
refreshTable();
function refreshTable(){
  var obj = {};
  obj.Token = localStorage.getItem('Email');
  var json = JSON.stringify(obj);
  $.ajax({
    url: config.serviceUri+'get_jemaat',
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
          e.removeClass('rowTemplate').removeClass('looptemplate').addClass('rowData');
          $('.iFullName',e).text(item.FullName);
          $('.iDOB',e).text(item.DOB);
          $('.iPhone',e).text(item.Phone);
          $('.iEmail',e).text(item.Email);
          $('.iFriendsName',e).text(item.FriendsName);
          $('.iPrivilegeCardNo',e).text(item.PrivilegeCardNo);
          $('.iJemaatID',e).text(item.JemaatID);
          e.attr('jemaatid',item.JemaatID);
          
          // $('.iAction',e).text('test');
          body.append(e);
          // $('.edit',e).unbind('click').click(function(){
          //   $('.modal-dialog').load('view/congregration/action-congregration.html');
          //   let id = e.attr('jemaatid');
          //   $('.modal-dialog').attr('JemaatID',id);
          // })
          //for responsive data table, use this for the event listener.
          e.click(function() { 
            // alert('test');
            
            let id = e.attr('jemaatid');
            $('.modal-dialog').attr('JemaatID',id);
            $(this).on("click",".edit",function() {
              var elem = $("tr[jemaatid='" + id +"']");
              var tr = $(this).closest('tr').closest('tbody').find(elem);
              tr.addClass('sampenih');
              $('.modal-dialog').empty();
              $('.modal-dialog').load('view/congregration/action-congregration.html');
            });
          });
        }
        
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