"use strict";

/* ----------------- callbacks ----------------- */

function getPortsCallback(data)
{
	for (let port of data.ports)
	{
		port.source = 'ENG1003 API';
		portsGeoJson.features.push(toGeoJsonObj(port, "Point"));
		ports.push(new Port(port));
	}
	loadRouteOptions();

	tempStorage.displayPorts = userPorts.concat(ports);
	nextPage('ports-list', tempStorage.displayPorts);
}

function getShipsCallback(data)
{
	for (let ship of data.ships)
	{
		ship.source = 'ENG1003 API';
		ships.push(new Ship(ship));
	}

	tempStorage.displayShips = userShips.concat(ships);
	nextPage('ships-list', tempStorage.displayShips);
}

/* ----------------- requests ----------------- */

jsonpRequest("https://eng1003.monash/api/v1/ports/", {
	callback: "getPortsCallback"
});

jsonpRequest("https://eng1003.monash/api/v1/ships/", {
	callback: "getShipsCallback"
});

function jsonpRequest(url, data)
/*
    jsonpRequest function
    This function is used to generate a querystring for a web service url based on a data payload.
    It will add a script tag to the bottom of the body tag on the HTML page.
 */
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += `${encodedKey}=${encodedValue}`;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}
