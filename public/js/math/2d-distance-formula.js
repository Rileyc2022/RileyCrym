function getDistance(xA, yA, xB, yB) { 
    // console.log(arguments)
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	if( Math.sqrt(xDiff * xDiff + yDiff * yDiff).toString().length > 5){

        answer.value = "\\sqrt{" + xDiff * xDiff + yDiff * yDiff + "}"
        answer.isMathJax = true
        
    }else{
        answer.value = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        answer.isMathJax = false
    }
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

$(".reset.btn").click(function() {
$('input').val('')
$('span#anw').html('')
nums = []
updateTable([nums[0], nums[2]], [nums[1], nums[3]])
// alert('click')
})

var calcElt = document.getElementById('calculator');

let options = {
    keypad: false,
    expressions: false,
    settingsMenu: false,
}


var calculator = Desmos.GraphingCalculator(calcElt, options);
// var img2x = document.getElementById('screenshot-2x');


// function captureScreenshots() {
//     img2x.src = calculator.screenshot({
//         height: 300,
//         width: 300,
//         targetPixelRatio: 2
//       });

//     // alert("captured")
//   }
//   function setImageSrc(data) {
//     var img2x = document.getElementById('screenshot-2x');
//     img2x.src = data;
//   }
  
  // Show -5 to 5 on the x-axis and preserve the aspect ratio


function updateTable (xvalues, yvalues) {
    calculator.setExpression({
        id: 'table1',
        type: 'table',

        columns: [
            {latex: 'x', values: xvalues, },
            {latex: 'y', values: yvalues, points: true, lines: true, color: '#0099FF'}
        ]
        });

        // screenshot(xvalues, yvalues)

}

$('div#calculator').height($('div.tool').height())

// screenshot()
// let bounds={
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
// }

// how to use ternary operator in javascriptJavascript By Helpless Hamster on Jul 16 2020 Donate
// var age = 26;
// var beverage = (age >= 21) ? "Beer" : "Juice";
// function updateBounds(){
//     if(xvalues[0] < 10 && xvalues[0] < 0 ){
//         bounds.left = 10
//     }else{
//         bounds.left = xvalues[0].toString()[0]
//     }
//     if(xvalues[1] < 10 && xvalues[1] < 0){
//         bounds.left = xvalues[0].toString()[0]
//     }
// }


// javascript find smallest number in an arrayJavascript By Yawning Yak on Feb 15 2020
// const arr = [14, 58, 20, 77, 66, 82, 42, 67, 42, 4]
// const min = Math.min(...arr)
// function screenshot(xvalues, yvalues){
//     // updateBounds()
//     calculator.asyncScreenshot(
//         {
//             mode: 'contain',
//             width: 600,
//             height: 600,
//             mathBounds: { left: Math.min(...xvalues) * 1.2, right: Math.max(...xvalues) * 1.2,},
//             targetPixelRatio: 1
//           },
//         setImageSrc
//       );
      
//       console.log(Math.min(...xvalues) * 1.2, Math.max(...xvalues) * 1.2)
// }


 
