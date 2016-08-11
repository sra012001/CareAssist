/* Javascript for site specific functions */
var clickcounter = 0;
var slot1 = 0;
var slot2 = 0;
var slot3 = 0;
var slot1obj = "";
var slot2obj = "";
var slot3obj = "";
var slotcounter = 0;

function addOpenTime(obj) {	
	var min = 1,
	    max = 12,
	    select = document.getElementById(obj);
	    
	if(select.length < 2){     
		for (var i = min; i<max; i++){
		    var opt = document.createElement('option');
		    opt.value = i + " AM";
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
		    opt1.value = "12" + " PM";
		    opt1.innerHTML = "12" + " PM";
		    select.appendChild(opt1);
		for (var i = min; i<max; i++){
		    var opt = document.createElement('option');
		    opt.value = i + " PM";
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
	txtbox.name = chkID.id;
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


// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete, userlocation;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
	addrLat: "long_name",
	addrLng: "long_name"
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('address')),
        {types: ['geocode']});

	userlocation = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('pcode')),
		{types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
	userlocation.addListener('place_changed', getUserLocation);
}

function getUserLocation(){
	var place = getPlacefromMaps(this);
	var lt = place.geometry.location.lat();
	var ln = place.geometry.location.lng();
	document.getElementById("usrLat").value = lt;
	document.getElementById("usrLng").value = ln;
}

function getPlacefromMaps(obj){
	return obj.getPlace();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    //var place = autocomplete.getPlace();
	var place = getPlacefromMaps(this);
	var lt = place.geometry.location.lat();
	var ln = place.geometry.location.lng();
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
	document.getElementById("addrLat").value = lt;
	document.getElementById("addrLng").value = ln;
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}


function createDateTable(num){
	//alert(clicks);
	var tbl = document.getElementById("appointmenttable");
	tbl.innerHTML = "";
	if (num == -1 ){
		clickcounter = clickcounter - 5;
		addDateHeader(tbl, clickcounter);
		//console.log(clickcounter);
	}
	else if (num == 1) {
		clickcounter = clickcounter + 5;
		addDateHeader(tbl, clickcounter);
		//console.log(clickcounter);
	}
	else {
		addDateHeader(tbl, clickcounter);
	}
	for (var i=1; i<=4; i++){
		var row = tbl.insertRow(i);
		row.insertCell(0);
	}
	tbl.rows[1].outerHTML = '<td>Morning</td>';
	tbl.rows[2].outerHTML = '<td>AfterNoon</td>';
	tbl.rows[3].outerHTML = '<td>Evening</td>';
	tbl.rows[4].outerHTML = '<td>24 Hours</td>';
	//tbl.rows[5].outerHTML = '<td>After 6PM</td>';
	//tbl.rows[6].outerHTML = '<td>24 Hours</td>';

	for (var i=1; i<=4; i++){
		for (var j=1;j<=5; j++){
			var cell = tbl.rows[i].insertCell(j);
			cell.outerHTML='<td><input class=\"apptcheckbox\" type=\"checkbox\" id=\"r'+i+'c'+j+'\" name=\"r'+i+'c'+j+'\" ' +
				'onclick=\"setAppointmentValue(this)\"><label for=\"r'+i+'c'+j+'\" ' +
				'style=\"padding: inherit\"></label></td>';
		}

	}
}

function addDateHeader(tbl, clicks) {
	var headerrow = tbl.insertRow();
	var headercell=headerrow.insertCell();
	headercell.outerHTML='<th style=\"cursor: pointer; cursor: hand\" onclick=\"createDateTable(-1);\"> << </th>';
	for (var i= (clicks + 1); i<= (clicks + 5); i++){
		headercell = headerrow.insertCell();
		headercell.outerHTML = '<th>' +new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toDateString().slice(0, 3)+
			'<br>'+new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toDateString().slice(4, 10)+'</th>';
	}
	headercell = headerrow.insertCell();

	headercell.outerHTML='<th style=\"cursor: pointer; cursor: hand\" onclick=\"createDateTable(1);\"> >> </th>';
}

function setAppointmentValue(obj){
	if (obj.checked) {

	var cell = obj.parentNode;
	var row = cell.parentNode;
	var tbl = row.parentNode;
    var time = row.cells[0].innerText;
	var date = tbl.rows[0].cells[cell.cellIndex].innerText;
	obj.value = time +','+date;
	if (slot1 == 0){
		document.getElementById("slot1").innerHTML = date +"<br>" + time;
		document.getElementById("img1").style.opacity = "1";
		document.getElementsByName("slot1")[0].value = date +';'+time;
		obj.disabled = true;
		slot1 = 1;
		slot1obj = obj;
		slotcounter = slotcounter + 1;
	}
	else if (slot2 == 0) {
		document.getElementById("slot2").innerHTML = date +"<br>" + time;
		document.getElementById("img2").style.opacity = "1";
		document.getElementsByName("slot2")[0].value = date +';'+time;
		obj.disabled = true;
		slot2 = 1;
		slot2obj = obj;
		slotcounter = slotcounter + 1;
	}

	else if (slot3 == 0 ) {
		document.getElementById("slot3").innerHTML = date +"<br>" + time;
		document.getElementById("img3").style.opacity = "1";
		document.getElementsByName("slot3")[0].value = date +';'+time;
		obj.disabled = true;
		slot3 = 1;
		slot3obj = obj;
		slotcounter = slotcounter + 1;
	}

	if (slotcounter == 3){
		var chkbox = document.getElementsByClassName("apptcheckbox");
		for (var i =0; i< chkbox.length; i++) {
			chkbox[i].disabled = true;
		}
	}
	}
}


function deleteSlot(obj) {
	obj.style.opacity = "0";
	if (obj.id == "img1") {
		document.getElementById("slot1").innerText = "Slot 1";
		document.getElementsByName("slot1")[0].value = "";
		slot1 = 0;
		slot1obj.checked = false;
		slotcounter = slotcounter - 1;

	}
	else if (obj.id == "img2") {
		document.getElementById("slot2").innerText = "Slot 2";
		document.getElementsByName("slot2")[0].value = "";
		slot2 = 0;
		slot2obj.checked = false;
		slotcounter = slotcounter - 1;

	}
	else if (obj.id == "img3") {
		document.getElementById("slot3").innerText = "Slot 3";
		document.getElementsByName("slot3")[0].value = "";
		slot3 = 0;
		slot3obj.checked = false;
		slotcounter = slotcounter - 1;

	}
	var chkbox = document.getElementsByClassName("apptcheckbox");
	for (var i =0; i< chkbox.length; i++) {
		if (!chkbox[i].checked)
		chkbox[i].disabled = false;
	}

}