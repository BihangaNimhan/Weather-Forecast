function goto_signup() {
  var sign_in_box = document.getElementById("sign_in_box");
  var sign_up_box = document.getElementById("sign_up_box");

  sign_up_box.className = "col-6 p-3 d-block";
  sign_in_box.className = "d-none";
}

function goto_signin() {
  var sign_in_box = document.getElementById("sign_in_box");
  var sign_up_box = document.getElementById("sign_up_box");

  sign_in_box.className = "col-6 p-3 d-block";
  sign_up_box.className = "d-none";
}

function sign_in() {
  var username = $("#email").val();
  var password = $("#password").val();

  if (username === "" && password === "") {
    alert("All fields must filled.");
  } else {
    var formData = new FormData();
    formData.append("action", "login_process");
    formData.append("username", username);
    formData.append("password", password);
    fetch("./process/process_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          window.location = "./index.php";
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}

function sign_up() {
  var email = $("#reg_email").val();
  var username = $("#reg_username").val();
  var password = $("#reg_password").val();

  if (email === "" && username === "" && password === "") {
    alert("All fields must filled.");
  } else {
    var formData = new FormData();
    formData.append("action", "register_process");
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    fetch("./process/process_register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          goto_signin();
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}
//city search one
$(document).ready(function () {
  $("#citySelect").selectpicker({
    liveSearch: true,
  });

  var timeout;

  $("#citySelect").on("shown.bs.select", function () {
    $(".bs-searchbox input").on("keyup", function () {
      clearTimeout(timeout);
      var userInput = $(this).val();
      timeout = setTimeout(function () {
        fetchCities(userInput);
      }, 500);
    });
  });
});

function fetchCities(userInput) {
  var geoNamesUsername = "bihanga";
  var apiUrl =
    "http://api.geonames.org/searchJSON?name_startsWith=" +
    userInput +
    "&maxRows=10&username=" +
    geoNamesUsername;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      populateDropdown(data.geonames);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function populateDropdown(cities) {
  var select = $("#citySelect");
  select.empty();

  cities.forEach(function (city) {
    var option = $("<option>")
      .attr("data-tokens", city.name)
      .attr("data-lat", city.lat)
      .attr("data-lng", city.lng)
      .attr("data-country", city.countryName)
      .text(city.name + ", " + city.countryName);

    select.append(option);
  });

  select.selectpicker("refresh");
}

$("#citySelect").on(
  "changed.bs.select",
  function (e, clickedIndex, isSelected, previousValue) {
    var selectedOption = $(this).find("option").eq(clickedIndex);
    var cityName = selectedOption.text();
    var latitude = selectedOption.attr("data-lat");
    var longitude = selectedOption.attr("data-lng");
    var countryName = selectedOption.attr("data-country");

    console.log("City Name:", cityName);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Country Name:", countryName);
  }
);
//city search two
$(document).ready(function () {
  $("#citySelect2").selectpicker({
    liveSearch: true,
  });

  var timeout;

  $("#citySelect2").on("shown.bs.select", function () {
    $(".bs-searchbox input").on("keyup", function () {
      clearTimeout(timeout);
      var userInput = $(this).val();
      timeout = setTimeout(function () {
        fetchCities2(userInput);
      }, 500);
    });
  });
});

function fetchCities2(userInput) {
  var geoNamesUsername = "bihanga";
  var apiUrl =
    "http://api.geonames.org/searchJSON?name_startsWith=" +
    userInput +
    "&maxRows=10&username=" +
    geoNamesUsername;

  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      populateDropdown2(data.geonames);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function populateDropdown2(cities) {
  var select = $("#citySelect2");
  select.empty();

  cities.forEach(function (city) {
    var option = $("<option>")
      .attr("data-tokens", city.name)
      .attr("data-lat", city.lat)
      .attr("data-lng", city.lng)
      .attr("data-country", city.countryName)
      .text(city.name + ", " + city.countryName);

    select.append(option);
  });

  select.selectpicker("refresh");
}

$("#citySelect2").on(
  "changed.bs.select",
  function (e, clickedIndex, isSelected, previousValue) {
    var selectedOption = $(this).find("option").eq(clickedIndex);
    var cityName = selectedOption.text();
    var latitude = selectedOption.attr("data-lat");
    var longitude = selectedOption.attr("data-lng");
    var countryName = selectedOption.attr("data-country");

    $("#trip_visit_country").val(countryName);
    $("#trip_visit_latitude").val(latitude);
    $("#trip_visit_longitude").val(longitude);

    console.log("City Name:", cityName);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Country Name:", countryName);
  }
);
function search_trips() {
  var citySelect = $("#citySelect").val();
  var travel_date = $("#travelDate").val();
  var travel_time = $("#traveltime").val();
  alert(travel_time);
  if (citySelect === "" || travel_date === "" || travel_time === "") {
    swal("Alert!", "Please fill all the fields !", "error");
  } else {
    var formData = new FormData();
    formData.append("action", "search_trips");
    formData.append("citySelect", citySelect);
    formData.append("travel_date", travel_date);
    formData.append("travel_time", travel_time);
    fetch("./process/process_manage_trips.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == 200) {
          const travelsArray = data.travelsArray;

          // Assuming there is a div with the id "tripContainer" to append the cards
          const tripContainer = document.getElementById("selected_trips_data");
          tripContainer.innerHTML = "";
          // Iterate over each travel object in travelsArray
          travelsArray.forEach((travel) => {
            // Create a new div element for the card
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-3 card ms-2"; // Adjust the class as needed

            // Populate the card with data from the JSON
            cardDiv.innerHTML = `
                <div class="card-header">
                   Organized by ${travel.organized_by} | Trip to ${travel.city} | ${travel.country}
                </div>
                <div class="card-body">
                    <h5 class="card-title">Date: ${travel.date_time}</h5>
                    <span class="card-text">Weather:${travel.weather}</span><br/>
                    <span class="card-text">Temperature:<span class="badge text-bg-warning"> ${travel.temperature} °C</span></span><br/><br/>
                    <!-- User Interactions -->
                    <div class="user-interactions">
                        <button type="button" class="btn btn-outline-danger" onclick="like_trip(\`${travel.trip_number}\`)">
                            <i class="fa fa-heart"></i> <span class="badge text-bg-secondary">${travel.travelInterests}</span>
                        </button>    
                        <button type="button" class="btn btn-outline-primary" onclick="req_to_join(\`${travel.trip_number}\`)">
                            <i class="fa fa-user"></i> <span class="badge text-bg-secondary">${travel.travelRecquests}</span>
                        </button>  
                    </div>
                </div>
            `;

            // Append the card to the tripContainer
            tripContainer.appendChild(cardDiv);
          });
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log(error);

        console.error("Fetch error:", error);
      });
  }
}

function searchWeather() {
  if ($("#citySelect2").val() === null) {
    alert("You must select a location first !");
  } else {
    const apiKey = "c30d9faef3f9bac87e8c89a5bee1c9c3";

    const countryInput = document.getElementById("trip_visit_country");
    const latitudeInput = document.getElementById("trip_visit_latitude");
    const longitudeInput = document.getElementById("trip_visit_longitude");

    const country = countryInput.value;
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const forecastData = data.list;
        const tableBody = document.querySelector("#forecastTable tbody");
        tableBody.innerHTML = "";

        forecastData.forEach((entry) => {
          const dateTime = new Date(entry.dt * 1000); // Convert timestamp to date
          const temperature = entry.main.temp;
          const weatherDescription = entry.weather[0].description;

          // Format date and time
          const formattedDate = dateTime.toDateString();
          const formattedTime = dateTime.toLocaleTimeString();

          const row = tableBody.insertRow();
          const dateCell = row.insertCell(0);
          const timeCell = row.insertCell(1);
          const temperatureCell = row.insertCell(2);
          const weatherCell = row.insertCell(3);
          const actionCell = row.insertCell(4);

          dateCell.textContent = formattedDate;
          timeCell.textContent = formattedTime;
          temperatureCell.textContent = temperature;
          weatherCell.textContent = weatherDescription;

          // Add button to each row
          const viewButton = document.createElement("button");
          viewButton.textContent = "Select this date";
          viewButton.className = "btn btn-info";
          viewButton.addEventListener("click", function () {
            // Auto-fill date and time when the button is clicked
            const formattedDate = dateTime.toISOString().split("T")[0];
            const formattedTime = formatTime(dateTime);
            document.getElementById("trip_visit_date").value = formattedDate;
            document.getElementById("trip_visit_time").value = formattedTime;
            document.getElementById("trip_visit_weather").value =
              weatherDescription;
            document.getElementById("trip_visit_temp").value = temperature;
          });

          actionCell.appendChild(viewButton);
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
}
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function save_new_trip(userId) {
  //    alert(userId);
  var trip_visit_name = $("#trip_visit_name").val();
  var city = $("#citySelect2").val();
  var trip_visit_country = $("#trip_visit_country").val();
  var trip_visit_latitude = $("#trip_visit_latitude").val();
  var trip_visit_longitude = $("#trip_visit_longitude").val();
  var trip_visit_date = $("#trip_visit_date").val();
  var trip_visit_time = $("#trip_visit_time").val();
  var trip_visit_weather = $("#trip_visit_weather").val();
  var trip_visit_temp = $("#trip_visit_temp").val();

  if (city === "" || trip_visit_weather === "" || trip_visit_temp === "") {
    swal("Alert!", "Please fill recquired fields !", "error");
  } else {
    var formData = new FormData();
    formData.append("action", "add_trip");
    formData.append("userId", userId);
    formData.append("trip_visit_name", trip_visit_name);
    formData.append("city", city);
    formData.append("trip_visit_country", trip_visit_country);
    formData.append("trip_visit_latitude", trip_visit_latitude);
    formData.append("trip_visit_longitude", trip_visit_longitude);
    formData.append("trip_visit_date", trip_visit_date);
    formData.append("trip_visit_time", trip_visit_time);
    formData.append("trip_visit_weather", trip_visit_weather);
    formData.append("trip_visit_temp", trip_visit_temp);

    fetch("./process/process_manage_trips.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          swal("Success!", data.message, "success").then((result) => {
            // Your code to be executed after the user clicks "OK" in the SweetAlert dialog
            if (result) {
              location.reload();
            }
          });
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}

function like_trip(trip_number) {
  if (trip_number != "") {
    var formData = new FormData();
    formData.append("action", "like_trip");
    formData.append("trip_number", trip_number);

    fetch("./ManageTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          swal("Success!", data.message, "success").then((result) => {
            // Your code to be executed after the user clicks "OK" in the SweetAlert dialog
            search_trips();
          });
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}

function req_to_join(trip_number) {
  if (trip_number != "") {
    var formData = new FormData();
    formData.append("action", "req_to_join");
    formData.append("trip_number", trip_number);

    fetch("./ManageTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          swal("Success!", data.message, "success").then((result) => {
            // Your code to be executed after the user clicks "OK" in the SweetAlert dialog
            search_trips();
          });
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}
function approved_req(status_id, req_id) {
  var otherReqTable = $("#other_req_table").DataTable();

  if (req_id != "") {
    var formData = new FormData();
    formData.append("action", "req_status_change");
    formData.append("status_id", status_id);
    formData.append("req_id", req_id);

    fetch("./ManageTrips", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the received JSON data here
        console.log(data);
        if (data.status == "200") {
          swal("Success!", data.message, "success").then((result) => {
            location.reload();
          });
        } else {
          swal("Alert!", data.message, "error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }
}
