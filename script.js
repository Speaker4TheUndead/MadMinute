$(document).ready(function () {
    var problems = ["%qlog(%kx)", "%qsin(%kx)",
        "%qcos(%kx)", "%qtan(%kx)", "%qe<sup>%kx</sup>",
        "%qsinh(%kx)", "%qcosh(%kx)", "%qtanh(%kx)",
        "%qsec(%kx)", "%qcsc(%kx)", "%qcot(%kx)",
        "%qsech(%kx)", "%qcsch(%kx)", "%qcoth(%kx)",
        "%qx<sup>%v</sup>", "%qln(%kx)",
        "%qarcsin(%kx)", "%qarccos(%kx)", "%qarctan(%kx)",
        "%qarcsec(%kx)", "%qarccsc(%kx)", "%qarccot(%kx)",
    ];
    /*
    %q and %k are optional Coefficients whilst
    %v is a mandatory coefficient
    */
    var count = 180;
    var reset = false;
    var counter;
    var timer = function () {
        count -= 1;
        $("#timer").html(Math.floor(count / 60) + ":" + count % 60);
    };
    function allRandom(problems) {
        var output = [];
        var notUsed = problems;
        var used = [];
        for (var i = 0; i < 25; i++) {
            if (notUsed.length > 0) {
                var rando = Math.floor(Math.random() * notUsed.length);
                var problem = notUsed.splice(rando, 1)[0];
                output.push(replaceCoEffs(problem));
                used.push(problem);
            }
            else {
                var rando = Math.floor(Math.random() * used.length);
                output.push(replaceCoEffs(used[rando]));
            }
        }
        return output;
    }
    function replaceCoEffs(problem) {
        var rando = Math.floor(Math.random() * 111);
        if (25 < rando && rando <= 50) {
            var q = Math.floor(Math.random() * 21).toString();
            var k = Math.floor(Math.random() * 21).toString();
        }
        else if (rando <= 25) {
            var q = Math.floor(Math.random() * 21).toString();
            var k = "";
        }
        else if (rando > 75 && rando <= 100) {
            var q = "";
            var k = Math.floor(Math.random() * 21).toString();
        }
        else if (rando > 100) {
            var q = "1/";
            var k = "";
        }
        else {
            var q = "";
            var k = "";
        }
        var v = (Math.floor(Math.random() * 11) + 1).toString();
        problem = problem.replace("%q", q);
        problem = problem.replace("%k", k);
        problem = problem.replace("%v", v);
        return problem;
    }
    $("#btn").click(function () {
        if (reset) {
            resetProblems();
        }
        else {
            generateProblems(problems);
            counter = setInterval(timer, 1000);
        }
    });
    function resetProblems() {
        $("problems").empty();
        count = 180;
        generateProblems(problems);
        var counter = setInterval(timer, 1000);
    }
    function generateProblems(problems) {
        var questions = allRandom(problems);
        for (var i = 0; i < Math.ceil(questions.length / 4); i++) {
            $("#problems").append("<tr id=\"problems" + i + "\"></tr>");
            for (var j = 0; j < 4 && (i * 4) + j < questions.length; j++) {
                $("#problems" + i).append("<td><li>" + questions[(i * 4) + j] + "</li></td>");
            }
        }
    }
    var checker = setInterval(foo, 10);
    function foo() {
        if (count <= 0) {
            clearInterval(counter);
            count = 180;
            alert("Times Up!");
            reset = true;
        }
    }
});
