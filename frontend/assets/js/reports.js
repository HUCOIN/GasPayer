$(document).ready(function () {
    $(".ui.button").click(function (e) {
        var i = e.target.id
        location.href = "/report/report?no=" + i
    })
})