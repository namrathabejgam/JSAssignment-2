function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchTableInput");
  filter = input.value.toUpperCase();
  var tableItems = document.getElementsByClassName("table");
  console.log(tableItems.length);
  for (i = 0; i < tableItems.length; i++) {
    td = tableItems[i].getElementsByTagName("font")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tableItems[i].style.display = "";
      } else {
        tableItems[i].style.display = "none";
      }
    }
  }
}
function searchMenu() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchMenuInput");
  filter = input.value.toUpperCase();
  var menuItems = document.getElementsByClassName("item");
  console.log(menuItems.length);
  /*tr = table.getElementsByTagName("tr");*/
  for (i = 0; i < menuItems.length; i++) {
    td = menuItems[i].getElementsByTagName("h1")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        menuItems[i].style.display = "";
      } else {
        menuItems[i].style.display = "none";
      }
    }
  }
}
var xobj = new XMLHttpRequest();
xobj.open("GET", "tables.json", false);
xobj.send(null);
var tableJsonObject = JSON.parse(xobj.responseText);
displayTables(tableJsonObject);
function displayTables(array) {
  var out = "";
  var i;
  console.log("array.tables.length" + array.tables.length);
  for (i = 0; i < array.tables.length; i++) {
    console.log("array.tables[" + i + "].items" + array.tables[i].items);
    out +=
      '<div class="table" id="' +
      i +
      '" ondrop="drop(event)"  style="margin-bottom:10px; padding:15px; padding-top:7px;"  ondragover="allowDrop(event)" onclick="renderModal(' +
      i +
      ')"><font size="6px">' +
      array.tables[i].name +
      "</font><br/><br/>Totalcost: Rs." +
      computeCost(array.tables[i].items) +
      "| Totalitems:" +
      (array.tables[i].items.length - 1) +
      "</div>";
  }
  document.getElementById("tables").innerHTML = out;
}
function renderModal(i) {
  document.getElementById(i).style.backgroundColor = "#FDB241";
  console.log("modal" + i);
  window.tableToGenerate = i;
  var editModal = document.getElementById("myModal");
  editModal.style.display = "block";
  var editSpan = document.getElementsByClassName("close")[0];
  editSpan.onclick = function() {
    editModal.style.display = "none";
    document.getElementById(i).style.backgroundColor = "transparent";
  };
  window.onclick = function(event) {
    if (event.target == editModal) {
      document.getElementById(i).style.backgroundColor = "transparent";
      editModal.style.display = "none";
    }
  };
  var tableTitle = tableJsonObject.tables[i].name + "| Order Details";
  document.getElementById("tableName").value = tableTitle;
  tableJsonObject.tables[i].name;
  var out = "";
  out +=
    "<tr>" + "<th >S.No.</th>" + "<th>Item</th>" + "<th>Price</th>" + "</tr>";
  for (j = 1; j < tableJsonObject.tables[i].items.length; j++) {
    out +=
      "<tr>" +
      "<td>" +
      j +
      "</td>" +
      "<td>" +
      tableJsonObject.tables[i].items[j].name +
      "</td>" +
      "<td>" +
      tableJsonObject.tables[i].items[j].cost +
      "</td>" +
      "<td>" +
      ' <label for="number">Number of servings</label><input id="inputQuantity_' +
      i +
      "_" +
      j +
      '" type="number" min="1" value="' +
      tableJsonObject.tables[i].items[j].count +
      '" style="border:none; border-color:transparent; border-bottom: 2px solid #bcb1b1;" onchange="changeCost(' +
      i +
      "," +
      j +
      ')">' +
      "</input></td>" +
      '<td><button class="delete" onclick="deleteItem(' +
      i +
      "," +
      j +
      ')"><i class="fa fa-trash"></i></button></td></tr>';
  }
  out +=
    "<tr><td></td><td></td><td>Totalcost<br/>" +
    computeCost(tableJsonObject.tables[i].items) +
    "</td></tr>";
  document.getElementById("tableContents").innerHTML = out;
}
function generateBill() {
  console.log(window.tableToGenerate);
  tableJsonObject.tables[window.tableToGenerate].items.splice(1);
  renderModal(window.tableToGenerate);
  displayTables(tableJsonObject);
}
function deleteItem(i, j) {
  console.log("i,j" + i + " " + j);
  tableJsonObject.tables[i].items.splice(j, 1);
  renderModal(i);
  displayTables(tableJsonObject);
}
function changeCost(i, j) {
  var sid = "inputQuantity_" + i + "_" + j;
  console.log(document.getElementById(sid).value + " " + i + " " + j);
  console.log(
    "tableJsonObject" +
      tableJsonObject.tables[i].items[j].name +
      " " +
      tableJsonObject.tables[i].items[j].count
  );
  tableJsonObject.tables[i].items[j].count = document.getElementById(sid).value;
  console.log(computeCost(tableJsonObject.tables[i].items));
  displayTables(tableJsonObject);
}
function computeCost(tableItems) {
  console.log("In computeCost tableItems.length" + tableItems.length);
  var tableCost = 0;
  for (var i = 0; i < tableItems.length; i++) {
    console.log(
      "tableItems[i].cost" +
        tableItems[i].cost +
        "tableItems[i].count" +
        tableItems[i].count
    );
    tableCost += tableItems[i].cost * tableItems[i].count;
  }
  return tableCost;
}
xobj.open("GET", "menu.json", false);
xobj.send(null);
var menuJsonObject = {
  items: [
    {
      itemNo: 0,
      name: "Crusty Garlic Focaccia with Melted Cheese",
      cost: 105.0,
      count: 0
    },
    {
      itemNo: 1,
      name: "French Fries",
      cost: 105.0,
      count: 0
    },
    {
      itemNo: 2,
      name: "Home Country Fries with Herbs & Chilli Flakes",
      cost: 105.0,
      count: 0
    },
    {
      itemNo: 4,
      name: "French Fries with Cheese & Jalapenos",
      cost: 105.0,
      count: 0
    }
  ]
};
displayItems(menuJsonObject);
function displayItems(array) {
  var out = "";
  var i;
  for (i = 0; i < array.items.length; i++) {
    out +=
      '<div id="' +
      i +
      '" class="item" draggable="true" ondragstart="drag(event)" ><h1>' +
      array.items[i].name +
      "</h1>";
    out += "<p>" + array.items[i].cost + "</p></div>";
  }
  document.getElementById("items").innerHTML = out;
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  for (var prop in menuJsonObject.items[data])
    console.log("menu" + menuJsonObject.items[data][prop]);
  var found = false,
    i = 0;
  for (i = 0; i < tableJsonObject.tables[ev.target.id].items.length; i++) {
    if (
      tableJsonObject.tables[ev.target.id].items[i].name ==
      menuJsonObject.items[data].name
    ) {
      found = true;
      break;
    }
  }
  console.log("found" + found);
  for (var p = 0; p < menuJsonObject.items.length; p++)
    console.log(menuJsonObject.items[p]);
  if (!found) {
    var pushData = {
      name: menuJsonObject.items[data].name,
      count: 1,
      cost: menuJsonObject.items[data].cost
    };
    tableJsonObject.tables[ev.target.id].items.push(pushData);
  } else {
    tableJsonObject.tables[ev.target.id].items[i].count++;
    console.log(ev.target.id + " " + i);
    for (var s = 0; s < tableJsonObject.tables.length; s++)
      console.log(tableJsonObject.tables[s]);
  }
  console.log(
    "tableJsonObject.tables[ev.target.id].items[i].count" +
      tableJsonObject.tables[ev.target.id].items[i].count
  );
  displayTables(tableJsonObject);
  displayItems(menuJsonObject);
}
