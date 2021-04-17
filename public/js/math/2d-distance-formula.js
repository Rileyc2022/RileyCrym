function getDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	if( Math.sqrt(xDiff * xDiff + yDiff * yDiff).toString().length > 5){
        let temp = xDiff * xDiff + yDiff * yDiff;
        if(simplify(temp).simplifies){
            answer.value = simplify(temp).outside + "\\sqrt{" + simplify(temp).inside + "}"
        }else{
            answer.value = "\\sqrt{" + temp + "}"
        }
        answer.isMathJax = true
        
    }else{
        answer.value = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        answer.isMathJax = false
    }
}
function simplify(num){
    let outside = null;
    let inside = null;
    let simplifies = false;
    for(let i = num - 1; i > 0; i--){
    let maybeOutside = Math.sqrt(num / i)
    if( maybeOutside.toString().length < 10){
    outside = maybeOutside
    inside = i
    simplifies = true;
    }
    }
    
    return {outside: outside, inside: inside, simplifies: simplifies}
}

// var math = MathJax.Hub.getAllJax("anw")[0];
    
// MathJax.Hub.Queue(["Text",math,"x+1"]);
var answer = {
    value: null,
    isMathJax: null,
};
$("input").on('change textInput input', function(){ 
    // captureScreenshots()
    

 
    var nums = [];
    $("input").each(function() {
        nums.push($(this).val());
    });

    let oneEmpty = false;


    
    for(element of nums){
        if(element == ''){
            oneEmpty = true
        }
    }
    if(oneEmpty == false){
        getDistance(
            $("#left-x").val(), 
            $("#left-y").val(),
            $("#right-x").val(),
            $("#right-y").val(),)
        if(answer.isMathJax){
            var output = document.getElementById('anw');
            output.innerHTML = '';
            MathJax.texReset();
            var options = MathJax.getMetricsFor(output);
            MathJax.tex2svgPromise(answer.value, options).then(function (node) {
    
              output.appendChild(node);
              MathJax.startup.document.clear();
              MathJax.startup.document.updateDocument();
            }).catch(function (err) {
    
              console.log(err)
            })
        }else{
            $('span#anw').html(answer.value)
        }
        
        updateTable([nums[0], nums[2]], [nums[1], nums[3]])

    }
    if(oneEmpty){
        $('span#anw').html('')


    }

    
});

$("div#reset").click(function() {
$('input').val('')
$('span#anw').html('')
nums = []
updateTable([nums[0], nums[2]], [nums[1], nums[3]])

})

var calcElt = document.getElementById('calculator');

let options = {
    keypad: false,
    expressions: false,
    settingsMenu: false,
}


var calculator = Desmos.GraphingCalculator(calcElt, options);

function updateTable (xvalues, yvalues) {
    calculator.setExpression({
        id: 'table1',
        type: 'table',

        columns: [
            {latex: 'x', values: xvalues, },
            {latex: 'y', values: yvalues, points: true, lines: true, color: '#0099FF'}
        ]
        });

}

$('div#calculator').height($('div.tool').height())



 
