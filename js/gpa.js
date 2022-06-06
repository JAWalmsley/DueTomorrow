function weightedAverage(items, weights) {
    let weightSum = weights.reduce((partialSum, a) => partialSum + a, 0);
    let weightedTotal = 0
    for(let i = 0; i < weights.length; i++) {
        weightedTotal += weights[i] * items[i];
    }
    return weightedTotal / weightSum;
}

function GPAScale(grade, scale) {
    let GPA = 0;
    for (let [percent, number] of Object.entries(scale)) {
        if(grade >= percent) {
            GPA = number;
        }
    };
    return GPA;
}

function fillGrades() {
    const twelvePointScale = {
        0:0,
        50:1,
        53:2,
        57:3,
        60:4,
        63:5,
        67:6,
        70:7,
        73:8,
        77:9,
        80:10,
        85:11,
        90:12
    }
    const fourPointScale = {
        0:0,
        50:0.7,
        53:1,
        57:1.3,
        60:1.7,
        63:2,
        67:2.3,
        70:2.7,
        73:3,
        77:3.3,
        80:3.7,
        85:4,
        90:4.3
    }
    let grades = [];
    let credits = [];
    $(".average").each(function() {
        let id = $(this).closest("tr").find(':first').text();
        let course = courseList.find((c) => c.id == id);
        let assignments = assignmentList.filter(elem => {
            return elem.courseid == course.id;
        });
        let avg = weightedAverage(assignments.map(a => a.grade), assignments.map(a => a.weight));
        grades.push(avg);
        credits.push(course.credits);
        $(this).closest("tr").find(".average").text(avg.toPrecision(4) + "%");
    });
    let gpaPercent = weightedAverage(grades, credits).toPrecision(4)
    $("#total").text(gpaPercent + "%");
    $("#12pt").text(GPAScale(gpaPercent, twelvePointScale));
    $("#4pt").text(GPAScale(gpaPercent, fourPointScale));
}

$(document).ready(function () {
    fillGrades();

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
                let index = assignmentList.findIndex(elem => {
                    return elem.id == assigID
                });
                assignmentList[index].grade = assigGrade;
                fillGrades();
            })
        }
    });
});