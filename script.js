var rowCount = 0;
function setUpPage(){
    createTable();
    addRow();
    document.getElementById("container").style.backgroundColor = "pink";
}

function createTable(){
    var firstTable = document.getElementById("tableContainer");
    var table = document.createElement("table");
    table.setAttribute("id","table");
    firstTable.appendChild(table);
    addRow();
}

function addRow(){
    var titles = document.createElement("tr");
    var values = document.createElement("tr");
    var table = document.getElementById("table");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var points = document.createElement("input");
    var weight = document.createElement("input");

    titles.appendChild(td1);
    titles.appendChild(td2);
    values.appendChild(td3);
    values.appendChild(td4);
    table.appendChild(titles);
    table.appendChild(values);
    td3.appendChild(points);
    td4.appendChild(weight);

    points.setAttribute("id","points" + rowCount );
    weight.setAttribute("id","weight" + rowCount );
    points.setAttribute("placeholder","Ex: 90,80,90");
    weight.setAttribute("placeholder","Ex: 20");

    var label = document.getElementById("category").value;
    td1.innerHTML = label + " Points";
    td2.innerHTML = label + " Weight";
    if (label == ""){
        td1.innerHTML="Homework Points";
        td2.innerHTML="Homework Weight";
    }

    rowCount = rowCount + 1;
    if(rowCount % 3 == 1){
        titles.setAttribute("class" , "red");
        values.setAttribute("class","red");
    }
    if(rowCount % 3 == 2){
        titles.setAttribute('class', 'green');
        values.setAttribute('class', 'green');
    }
    if(rowCount % 3 == 0){
        titles.setAttribute('class' , 'gray');
        values.setAttribute('class' , 'gray');
    }
    if(rowCount>5) {
        return document.getElementById("rowBtn").disabled = true;
    }
}

function calculateGrade() {
    var totalWeight = 0;
    var grade = [];
    var w = [];
    var currentGrade = 0;
    for (var i = 0; i < rowCount; i++) {
        grade.push(document.getElementById("points" + i).value);
        grade[i] = convertStringToArray(grade[i]);
        grade[i] = average(grade[i]);
        w.push(document.getElementById("weight" + i).value);
        var totalWeight = totalWeight + parseInt(w[i]);
        var currentGrade = currentGrade + (grade[i] * (w[i] / 100));

    }

    document.getElementById("currentGrade").innerHTML = "Your current grade is " + currentGrade + "%";
    if (totalWeight !== 100) {
        document.getElementById("currentGrade").innerHTML = "Error; weights must add to 100";
    }
    if (isNaN(currentGrade)) {
        document.getElementById("currentGrade").innerHTML = "Error; bad data";
    }
    if (!currentGrade){
        document.getElementById("currentGrade").innerHTML = "Error; bad data";
    }
    if(currentGrade>150){
        document.getElementById("currentGrade").innerHTML = "Error; grade too high";
    }

    console.log(grade);
    return currentGrade;
}

function convertStringToArray(grade) {
    var arr = grade.split(",");
    for(var i=0; i<arr.length; i++){
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

function average(grade){
    var sum = 0;
    for (var i=0; i<grade.length; i++){
        var sum = sum + grade[i];
    }
    var average = sum/grade.length;
    return average;
}

function finalGradeNeeded(){
    var currentGrade = calculateGrade();
    var finalWeight = document.getElementById("finalGradeWeight").value;
    var desiredGrade = document.getElementById("gradeWanted").value;
    if(isNaN(finalWeight)==false && finalWeight!=="" && desiredGrade!=="" && isNaN(desiredGrade)==false){
        var a = currentGrade*(1-finalWeight/100);
        var b = desiredGrade-a;
        var gradeNeeded = 100 * b/finalWeight;
    } else {
        document.getElementById("gradeNeeded").innerHTML = "Error; please put data"
    }


    document.getElementById("gradeNeeded").innerHTML = "You need a " + gradeNeeded + "% to get a " + desiredGrade;
    if(isNaN(gradeNeeded)){
        document.getElementById("gradeNeeded").innerHTML = "Error; Bad data"
    }
}
