const compareDates = function (latest, deadline) {
    return new Date(latest) >= new Date(deadline);
};

const filterByGpa = function (universities, gpa) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            if (university.average_high_school_gpa <= gpa) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterBySatReading = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            if (university.sat_critical_reading_average <= parseInt(score)) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterBySatMath = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            if (university.sat_math_average <= parseInt(score)) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterBySatWriting = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            if (university.sat_writing_average <= parseInt(score)) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByActComposite = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            if (university.act_composite_average <= parseInt(score)) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByActEnglish = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {

            const range = university.act_english__percentile;
            if (range.indexOf("N/A") == -1) {
                const peaks = range.split("-");
                const firstNum = parseInt(peaks[0]);
                const secondNum = parseInt(peaks[1]);

                const avg = (firstNum + secondNum) / 2;

                if (avg <= parseInt(score)) {
                    result.push(university);
                }
            }

        });
    }

    return result;
};

const filterByActMath = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {

            const range = university.act_math__percentile;
            if (range.indexOf("N/A") == -1) {
                const peaks = range.split("-");
                const firstNum = parseInt(peaks[0]);
                const secondNum = parseInt(peaks[1]);

                const avg = (firstNum + secondNum) / 2;
                if (avg <= parseInt(score)) {
                    result.push(university);
                }
            }

        });
    }

    return result;
};

const filterByActReading = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {

            const range = university.act_reading__percentile;
            if (range.indexOf("N/A") == -1) {
                const peaks = range.split("-");
                const firstNum = parseInt(peaks[0]);
                const secondNum = parseInt(peaks[1]);

                const avg = (firstNum + secondNum) / 2;
                if (avg <= parseInt(score)) {
                    result.push(university);
                }
            }
        });
    }

    return result;
};

const filterByActScience = function (universities, score) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {

            const range = university.act_science__percentile;
            if (range.indexOf("N/A") == -1) {
                const peaks = range.split("-");
                const firstNum = parseInt(peaks[0]);
                const secondNum = parseInt(peaks[1]);

                const avg = (firstNum + secondNum) / 2;
                if (avg <= parseInt(score)) {
                    result.push(university);
                }
            }
        });
    }

    return result;
};

const filterByFinances = function (universities, capacity) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            const tuitionFee = university.tuition_fee;
            const roomsFee = university.room_and_boards;
            const totalFee = tuitionFee + roomsFee;

            if (totalFee <= capacity) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByTuitionFee = function (universities, max) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            const tuitionFee = university.tuition_fee;

            if (tuitionFee <= max) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByRoomsFee = function (universities, max) {
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            const roomsFee = university.room_and_boards;

            if (roomsFee <= max) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByTotalEnrollement = function (universities, info) {
    const result = [];

    const parts = info.split("-");
    var min = parseInt(parts[0]);
    var max = parseInt(parts[1]);

    if (universities != undefined) {
        universities.forEach(function (university) {
            const totalEnrollement = university.total_enrollement;

            if (min <= totalEnrollement && totalEnrollement <= max) {
                result.push(university);
            }
        });
    }

    return result;
};

const filterByApplicationFee=function(universities, min, max)
{
    const result = [];

    if (universities != undefined) {
        universities.forEach(function (university) {
            const appFee = university.application_fee;
            if (appFee >= min && appFee <= max)
                result.push(university);

        });
    }

    return result
};

const filterByAcceptanceRate= function(universities, info)
{
    const result=[];

    const parts = info.split("-");
    const min = parseInt(parts[0]);
    const max = parseInt(parts[1]);

    if (universities != undefined) {
        universities.forEach(function (university) {
            const uni_acc_rate = university.acceptance_rate;

            if (uni_acc_rate <= max && uni_acc_rate >= min)
                result.push(university);
        });
    }

    return result;
};

const filterByApplicationDeadline = function (universities, latest) {
    const result=[];

    if (universities != undefined) {
        universities.forEach(function (university) {
            const universityDeadline = university.application_deadline;

            const isLate = compareDates(latest, universityDeadline);

            if (isLate) {
                result.push(university);
            }
        });
    }

    return result;
};

exports.filterByGpa = filterByGpa;
exports.filterBySatReading = filterBySatReading;
exports.filterBySatMath = filterBySatMath;
exports.filterBySatWriting = filterBySatWriting;
exports.filterByActComposite = filterByActComposite;
exports.filterByActEnglish = filterByActEnglish;
exports.filterByActMath = filterByActMath;
exports.filterByActReading = filterByActReading;
exports.filterByActScience = filterByActScience;
exports.filterByFinances = filterByFinances;
exports.filterByTuitionFee = filterByTuitionFee;
exports.filterByRoomsFee = filterByRoomsFee;
exports.filterByTotalEnrollement = filterByTotalEnrollement;

exports.filterByApplicationFee = filterByApplicationFee;
exports.filterByAcceptanceRate = filterByAcceptanceRate;
exports.filterByApplicationDeadline = filterByApplicationDeadline;

//deadline
//ranking
//sport
