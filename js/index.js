// The object gets passed in the request with &quot; format so we need to do this crap

$(document).ready(function () {
    $(".dropdown-trigger").dropdown();
    $('input.autocomplete').autocomplete({
        data: autocompleteData
    });
    colourRows();
});

$('#date').keyup(function (e) {
    if (e.keyCode === 13) {
        $('#date').val(dateStringParse($('#date').val()))
        newitem();
    }
})

function colourRows() {
    /**
    *   Updates the colours of every row in the table
    */
    const doneColour = "#999";
    $('#assignmentTable tr').each(function(index, tr) {
        // Ignore header row
        if (index == 0) {
            return;
        }
        let row = $(tr)
        let isDone = row.find('input[type=checkbox]').is(':checked');
        if (isDone) {
            row.css("background-color", doneColour);
            return;
        }

        let courseObj = courseList.filter(course => {
            return course.name == row.find(".courseCell").text()
        })[0]
        if(courseObj) {
            row.css("background-color", courseObj.colour);
            return;
        }
        row.css("background-color", "white")
    })

}

function newitem() {
    let empties = 0
    $(':input').each(function () {
        if ($(this).val() == "") {
            empties++;
        }
    })
    if (empties > 0) {
        return
    }
    fetch("/newitem", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objectifyForm($('#newitemform').serializeArray()))
    }).then(res => {
        location.reload()
    });
}

function sendCompleted(self) {
    let done = $(self).is(':checked')
    let item = $(self).closest('tr').find('td:first').text()
    let data = {item, done}
    fetch("/complete", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    colourRows();
}

function deleteAssignment(self) {
    let item = $(self).closest('tr').find('td:first').text();
    fetch("/deleteAssignment", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item: item})
    });
    $(self).closest('tr')[0].remove();
}

function dateStringParse(data) {
    /**
     * Parse a date string in form "mar 13", "jan 12 2022"
     */
    data = data.split(' ')
    let monthAbbrevs = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    let month = monthAbbrevs.indexOf(data[0]) + 1;
    let day = parseInt(data[1]);
    let year = new Date().getFullYear();

    if (data.length > 2 && !isNaN(data[2])) {
        // User specified a year
        year = parseInt(data[2]);
    } else {
        // Check if date already passed in current year
        if (new Date(`${year}-${month}-${day}`) < Date.now()) {
            year += 1;
        }
    }

    return `${year}-${month}-${day}`;
}