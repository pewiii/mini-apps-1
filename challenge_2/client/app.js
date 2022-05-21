$(document).ready(function() {


  $('#form').submit(function(e) {
    e.preventDefault();
    var fileReader = new FileReader();
    var file = document.getElementById('upload_file').files[0];
    fileReader.readAsText(file);

    fileReader.addEventListener('load', (e) => {
      var data = { data: fileReader.result }

      $.post('/generate', data, (res) => {
        console.log('success');
        console.log(res);
        setResult(res);
      })
    });
  });
  var setResult = function(data) {
    var $result = $('#result');
    $result.empty();
    $result.append(data);
  }
});

