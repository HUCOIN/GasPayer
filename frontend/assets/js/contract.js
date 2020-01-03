$(document).ready(function() {
  $("#addContractButton").click(function() {
    location.href = "/contract/add";
  });
});

$(document).ready(function() {
  $("#callFunction").click(function() {
   
    var address = $("#contract.address").val();
    console.log(
      address,
    );

    $.post(
      "/contract/callFunction",
      {
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

