
  var entriesContainer = document.getElementById("dynamicEntries")
 
 var record = entriesContainer.children[0];

 if(localStorage.hasOwnProperty('recently-used')){
    let retrievedObject = localStorage.getItem('recently-used');
    let entries = JSON.parse(retrievedObject);

    for(element of entries){
        var newRecord = record.cloneNode(true);
        entriesContainer.appendChild(newRecord);
        newRecord.children[0].innerHTML = element.tool;
        newRecord.children[1].innerHTML = element.timestamp;
    }
}

record.style.display = 'none'
