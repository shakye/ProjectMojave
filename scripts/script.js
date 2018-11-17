var entries = [];

var config = {
    apiKey: "AIzaSyB7wo51xy2h4_WGXJ_K7SPN4In5R6tb_-A",
    authDomain: "projecthamidasif-83639.firebaseapp.com",
    databaseURL: "https://projecthamidasif-83639.firebaseio.com",
    projectId: "projecthamidasif-83639",
    storageBucket: "projecthamidasif-83639.appspot.com",
    messagingSenderId: "146110704053"
};
firebase.initializeApp(config);

function webLoad(){
    var date = document.getElementById('dateLable');
    date.innerText = " "+ getCurrentDate();
}
function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd
    }
  
    if (mm < 10) {
      mm = '0' + mm
    }
  
    today = dd + "/" + mm + "/" +yyyy;
    return today;
}

function getEntries(isEntries) {

    entries = [];

    var dbRef = firebase.database().ref('consentFormData');
    dbRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            entries.push(childSnapshot.val());
        });
        console.log("SIZE: " + entries.length);

        if (isEntries) {
            populateTable();
        } else {
            readData();
        }

    });

    dbRef.on('child_changed', function(snapshot) {
        console.log("Data changed");
        entries = [];
        readData();
    });
}

function populateTable() {
    var table = document.getElementById("usertable");

    $("#usertable").empty();

    table.classList.add("table");
    table.classList.add("table-hover");

    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<b>Name</b>";
    cell2.innerHTML = "<b>Email</b>";
    cell3.innerHTML = "<b>Date</b>";
    cell4.innerHTML = "<b>Document</b>";
    row.id = "headerid";

    for (i = 0; i < entries.length; i++) {

        var childData = entries[i];

        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = childData.name;
        cell2.innerHTML = childData.email;
        cell3.innerHTML = childData.date;
        cell4.innerHTML = "<a onclick='onClick()'>View</a>";
    }

    // onClickListener();
}

function onClick() {
    console.log("Clicked");
}
