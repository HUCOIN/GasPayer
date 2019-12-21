$(document).ready(function () {
    $("#modalButton").click(function () {
        $(".ui.modal").modal('show');
    })

    $("#addMachineButton").click(function () {
        var machineName = $("#machineName").val()
        console.log(machineName);
        $.post("/machine/create", { name: machineName }, function (data, status) {
            if (data.success) {
            }
        })
    })

})