const getRequestObject = function () {
    var values = [];
    var obj = {};

    //gpa
    var gpaInput = $("#gpaInput").val();
    values.push(["gpa", gpaInput]);

    //exams
    var actCompositeInput = $("#actCompositeInput").val();
    var actEnglishInput = $("#actEnglishInput").val();
    var actMathInput = $("#actMathInput").val();
    var actReadingInput = $("#actReadingInput").val();
    var actScienceInput = $("#actScienceInput").val();
    var satReadingInput = $("#satReadingInput").val();
    var satMathInput = $("#satMathInput").val();
    var satWritingInput = $("#satWritingInput").val();
    values.push(["act_composite", actCompositeInput]);
    values.push(["act_english", actEnglishInput]);
    values.push(["act_math", actMathInput]);
    values.push(["act_reading", actReadingInput]);
    values.push(["act_science", actScienceInput]);
    values.push(["sat_reading", satReadingInput]);
    values.push(["sat_math", satMathInput]);
    values.push(["sat_writing", satWritingInput]);

    //acceptance rate
    var acceptanceRateMaxInput = $("#rateMax").val();
    var acceptanceRateMinInput = $("#rateMin").val();
    values.push(["acceptance_rate", acceptanceRateMinInput + "-" + acceptanceRateMaxInput]);

    //total enrollment
    var totalEnrollmentMinInput = $("#studentsNumberMin").val();
    var totalEnrollmentMaxInput = $("#studentsNumberMax").val();
    values.push(["total_enrollement", totalEnrollmentMinInput + "-" + totalEnrollmentMaxInput]);

    //finances and fees
    var financesInput = $("#financesInput").val();
    var tuitionFeeInput = $("#tuitionFeeInput").val();
    var roomsFeeInput = $("#roomsFeeInput").val();
    values.push(["finances", financesInput]);
    values.push(["tuition_fee", tuitionFeeInput]);
    values.push(["rooms_fee", roomsFeeInput]);

    //application fee
    var appFeeInput = $("#appFeeInput").val();
    values.push(["applications_fee", appFeeInput]);

    //application deadline
    var appDeadlineInput = $("#appDeadlineInput").val();
    values.push(["application_deadline", appDeadlineInput]);

    values.forEach(function (value) {
        if (value[0] == "acceptance_rate") {
            if (value[1].length > 1) {
                obj.acceptance_rate = value[1];
            }
        } else if (value[0] == "total_enrollement") {
            if (value[1].length > 1) {
                obj.total_enrollement = value[1];
            }
        } else if (value[1].length >= 1) {
            var key = value[0];
            obj[key] = value[1];
        }
    });

    return obj;
};

$("#go").click(function () {
    const requestObject = getRequestObject();

    alert(JSON.stringify(getRequestObject()));

    $.ajax({
        url: "/app",
        type: 'get',
        data: requestObject,
        contentType : "application/json; charset=utf-8",


        success: function(data) {

            $("#container").html("");

            for (var index = 0; index < data.length; index++) {
                if (index % 3 == 0) {
                    $("#container").append('<div class="row">' +
                        '<div class="unis col-md-12 col-xs-12 col-sm-12 col-lg-12"> <h3>'+data[index].name+'</h3>' +
                        ' <p>Acceptance Rate:'+data[index].acceptance_rate+'</p> ' +
                        ' <p>Tuition Fee:'+data[index].tuition_fee+'</p> ' +
                        ' <p>UGRAD enrollment:'+data[index].total_enrollement+'</p> ' +
                        '</div>  ');
                }

                if (index % 3 == 1) {
                    $("#container").append('<div class="unis col-md-12 col-xs-12 col-sm-12 col-lg-12"> <h3>'+data[index].name+'</h3>' +
                        ' <p>Acceptance Rate:'+data[index].acceptance_rate+'</p> ' +
                        ' <p>Tuition Fee:'+data[index].tuition_fee+'</p> ' +
                        ' <p>UGRAD enrollment:'+data[index].total_enrollement+'</p> ' +
                        '</div>');
                }

                if (index % 3 == 2) {
                    $("#container").append('<div class="unis col-md-12 col-xs-12 col-sm-12 col-lg-12"> <h3>'+data[index].name+'</h3>' +
                        ' <p>Acceptance Rate:'+data[index].acceptance_rate+'</p> ' +
                        ' <p>Tuition Fee:'+data[index].tuition_fee+'</p> ' +
                        ' <p>UGRAD enrollment:'+data[index].total_enrollement+'</p> ' +
                        '</div></div>');
                }
            }
        },

        error: function(data) {
            alert('Error searching');
        }
    });
});