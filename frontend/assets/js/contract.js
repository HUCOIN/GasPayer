$(document).ready(function () {
  $("#addContractButton").click(function () {
    location.href = "/contract/add";
  });
});

function deleteButton(name) {
  console.log(name);
  $.post("/contract/deleteContract", { name: name }, function (data, status) {
    if (data.success) {
      location.href = "/contract";
    }
  });

}


function payButton(address,index) {

  console.log("here");
  console.log("address is ", address);
  var val = $('#funcDropdown'+index).val();
  
  /*
  $.post(
    "/contract/callFunction",
    {
      address: address,
    },
    function (data, status) {
      if (data.success) {
        location.href = "/contract";
      }
    }
  );
  */
}

