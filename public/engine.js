function getCheckedElement(){
  var allChecks = document.querySelectorAll('input[name="checkbox"]');
  for(var i = 0; i < allChecks.length; i++){
    if(allChecks[i].checked){
      allChecks[i].checked = false;
      return allChecks[i].parentNode;
    }
  }
};

function deleteTask(butt){
  //the item has trailing white spaces at the start and end, so need to trim(). Also need to ascape ?
  var item = $(butt).prev('label').text().trim() //.replace(/ /g, '-').replace(/\?/g, '%3F');
  $.ajax({
    type : 'DELETE',
    url : '/home/' + encodeURIComponent(item),
    success : (data) => {
      location.reload();
    }
  });
};

function moveTask(){
  var taskToMove = getCheckedElement();
  var item = taskToMove.innerText.trim() //.replace(/ /g, '-') //.replace(/\?/g, '%3F'); //needed to encode ? in order for the controller to interprete it correctly, and not as a query parameter
  console.log(encodeURIComponent(item))
  $.ajax({
    type : 'POST',
    url : '/home/' + encodeURIComponent(item),
    success : (data) => {
      location.reload();
    }
  });
};

$('#input-form').on('submit', () => {
  var item = $('form input');
  var todo = {item : item.val()};
  $.ajax({
    type : 'POST',
    url : '/home',
    data : todo,
    success : (data) => {
      location.reload();
    }
  });
});
