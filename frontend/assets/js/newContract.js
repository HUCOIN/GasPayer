$(document).ready(function() {
  $("#addContract").click(function() {
    var name = $("#name").val();
    var address = $("#address").val();
    var functionName = $("#functionName").val();
    var isPayable = $("#payable").val();
    //TODO: Fix this always sends true
    isPayable = isPayable == "on" ? true : false;
    var paymentAmount = $("#amount").val();
    paymentAmount = paymentAmount ? paymentAmount : 0;
    var parameters = $("#parameters").val();

    console.log(
      name,
      address,
      functionName,
      isPayable,
      paymentAmount,
      parameters
    );
    $.post(
      "/contract/add",
      {
        name: name,
        address: address,
        functionName: functionName,
        isFunctionPayable: isPayable,
        paymentAmount: paymentAmount,
        parameters: parameters
      },
      function(data, status) {
        if (data.success) {
          location.href = "/contract";
        }
      }
    );
  });
});
