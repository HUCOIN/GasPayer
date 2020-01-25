$(document).ready(function() {
  $("#addContract").click(function() {
    var name = $("#name").val();
    var address = $("#address").val();

    console.log(
      name,
      address,
    );
    $.post(
      "/contract/add",
      {
        name: name,
        address: address,
      },
      function(data, status) {
        if (data.success) {
          location.href = "/contract";
        }
      }
    );
  });
});
