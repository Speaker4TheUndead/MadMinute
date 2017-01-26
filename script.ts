$(document).ready(function(){
    var problems = ["log<sub>%v</sub>(%kx)", "sin(%kx)", 
    "cos(%kx)", "tan(%kx)", "e<sup>%kx</sup>",
    "sinh(%kx)", "cosh(%kx)", "tanh(%kx)",
    "sec(%kx)", "csc(%kx)", "cot(%kx)",
    "sech(%kx)", "csch(%kx)", "coth(%kx)",
    "x<sup>%v</sup>", "ln(%kx)",
    "arcsin(%kx)", "arccos(%kx)", "arctan(%kx)",
    "arcsec(%kx)", "arccsc(%kx)", "arccot(%kx)",
    "<sup>1</sup>&frasl;<sub>x<sup>%v</sup></sub>" 
    ]
    /*
     and %k are optional Coefficients whilst
    %v is a mandatory coefficient
    */
    var count = 180;
    var reset = false;
    var counter;
    var timer = function(){
        count-=1
        $("#timer").html(Math.floor(count / 60) + ":" + count % 60);
    }

    function allRandom(problems: Array<String>): Array<String>{
        var output = []
        var notUsed = problems
        var used = []
        for(var i = 0; i < 25; i++){
            if (notUsed.length > 0){
                var rando = Math.floor(Math.random() * notUsed.length)
                var problem = notUsed.splice(rando,1)[0]
                output.push(replaceCoEffs(problem))
                used.push(problem)
            }else{
                var rando = Math.floor(Math.random() * used.length)
                output.push(replaceCoEffs(used[rando]))
            }
        }
        return output
    }

    function replaceCoEffs(problem: String): String{
        var rando = Math.floor(Math.random() * 111)
        if(25 < rando && rando <= 50){
            var k = Math.floor(Math.random() * 21).toString();
        }else if(rando <= 25){
            var k = Math.floor(Math.random() * 41).toString();
        }else if(rando > 75 && rando <= 100){
            var k = Math.floor(Math.random() * 61).toString();
        }else if(rando > 100){
            var k = Math.floor(Math.random() * 81).toString();
        }else{
            var k = ""
        }
        var v = (Math.floor(Math.random() * 11) + 1).toString()
        problem = problem.replace("%k", k);
        problem = problem.replace("%v", v);
        return problem
    }
    
    $("#btn").click(function(){
        if(reset){
            resetProblems()
        }else{
            generateProblems(problems)
            counter = setInterval(timer, 1000);
        }
    })

    function resetProblems(){
        $("problems").empty();
        count = 180;
        generateProblems(problems)
        var counter = setInterval(timer, 1000);
    }

    function generateProblems(problems: Array<String>){
        var questions = allRandom(problems)
        for(var i = 0; i < Math.ceil(questions.length / 4); i++){
            $("#problems").append("<tr id=\"problems"  + i + "\"></tr>")
            for(var j = 0; j < 4 && (i*4) + j < questions.length; j++){
                $("#problems" + i).append("<td><li>" + questions[(i*4)+j]+ "</li></td>")
            }
        }
    }
    var checker = setInterval(foo, 10)
    function foo(){
        if(count <= 0){
            clearInterval(counter)
            count = 180
            alert("Times Up!")
            reset = true;
        }
    }
   
})