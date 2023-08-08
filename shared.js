function makeHttpRequest(page = "default") {
    var xhr = new XMLHttpRequest();
    let callback = true
    const url = `https://us-east-1.aws.data.mongodb-api.com/app/analytics-wsxfv/endpoint/PetUs?page=page`
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Request was successful
          console.log("successfull call")
        //  callback(null, xhr.responseText);
        } else {
          // Request failed
          console.log("unsuccessfull call")
         // callback(new Error('Request failed'));
        }
      }
    };
    let data = {}

    
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Set the appropriate content type if you're sending JSON data
    xhr.send(data ? JSON.stringify(data) : null);
    }
    
