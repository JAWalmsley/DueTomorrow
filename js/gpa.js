$(document).ready(function () {
    $(".grade").on('input', function(e) {
        // Input box underline colour to red
        $(e.target).addClass("invalid")

        let assigRow = $(e.target).closest('tr');
        let assigID = assigRow.find('td:first').text();
        let assigGrade = $(e.target).val();
        if(!isNaN(assigGrade) && !isNaN(parseFloat(assigGrade)))
        {
            fetch("/setGrade", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: assigID, grade: parseFloat(assigGrade)})
            })
            .then(function(res) {
                // Back to normal colour if all is good and we have sent the request
                $(e.target).removeClass("invalid");
            })
        }
        
    });
});