/* Javascript for site specific functions */

function init(){
	//Initiatilization function
	/*addOpenTime();
	addCloseTime();*/
}

function addOpenTime(obj) {	
	var min = 1,
	    max = 12,
	    select = document.getElementById(obj);
	    
	if(select.length < 2){     
		for (var i = min; i<max; i++){
		    var opt = document.createElement('option');
		    opt.value = i;
		    opt.innerHTML = i + " AM";
		    select.appendChild(opt);
		}
	}
}

function addCloseTime(obj) {	
	var min = 1,
	    max = 12,
	    select = document.getElementById(obj);
	    
	if (select.length < 2){    
		var opt1 = document.createElement('option');
		    opt1.value = "12";
		    opt1.innerHTML = "12" + " PM";
		    select.appendChild(opt1);
		for (var i = min; i<max; i++){
		    var opt = document.createElement('option');
		    opt.value = i;
		    opt.innerHTML = i + " PM";
		    select.appendChild(opt);
		}
	}	
}

function showRateTableforServices(divId, chkID, tblID){

	var table = document.getElementById(tblID);
	var row = table.insertRow(0);
	row.setAttribute('name', chkID.id);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = chkID.value;
	var cell2 = row.insertCell(1);
	var txtbox = document.createElement("input");
	txtbox.type="numeric";
	txtbox.placeholder="$0.00";
	//txtbox.id= chkID.id;
	cell2.appendChild(txtbox);
	var cell3 = row.insertCell(2);
	var delImg = document.createElement("img");
	delImg.src="././images/delete.jpg";
	delImg.setAttribute("onclick", "deleteRateRow(this);");
	cell3.appendChild(delImg);
	cell3.align = "center";
	chkID.disabled=true;
	document.getElementById(divId).style.display = "block";
	var checkboxes = document.getElementsByName(chkID.name);	
	var dispRateTable = false;
	
	for (var i=0; i<checkboxes.length; i++){
		if(checkboxes[i].checked)
		{	
			dispRateTable = true;
			break;
		}
	}	
	if (!dispRateTable){
		document.getElementById(divId).style.display = "none";
	}
}


function deleteRateRow(obj){	
	var trow = obj.parentNode.parentNode;
	var tbl = trow.parentNode;
	name= trow.getAttribute("name");
	tbl.removeChild(trow);
	document.getElementById(name).disabled=false;
	document.getElementById(name).checked=false;
	if (tbl.rows.length == 0){
		tbl.parentNode.parentNode.style.display = "none";
	}
}

