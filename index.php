<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Buddy | Home </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Travel Buddy</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Trips</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">My trips</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-6 text-right p-5" style="align-self: center">
                        <h3>Travel Buddy</h3>
                        <p>A travel buddy website is an online platform designed to connect individuals who share a common interest in traveling and are seeking companions for their journeys. Users can create profiles, specify their travel preferences, destinations, and dates, and then search for compatible travel partners based on shared interests and compatibility criteria. </p>
                        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#new_trip_modal">Search weather</button>
                    </div>
                    <div class="col-6">
                        <img src="assets/img/background.png" />
                    </div>
                </div>
            </div>
        </div>


        <div class="row p-5">
            <div class="col-12">
                <div class="row g-3 text-center" id="selected_trips_data">
                    <div class="alert alert-info" role="alert">
                        No trip found for this data <a style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#new_trip_modal" class="alert-link">Search weather </a>. You can manage this in your profile.
                    </div>
                </div>
            </div>
        </div>


    </div>

    <!-- Modal -->
    <div class="modal fade" id="new_trip_modal" tabindex="-1" aria-labelledby="new_trip_modal_label" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="new_trip_modal_label">Search weather</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputCity" class="form-label">Name for the travel (Optional)</label>
                                    <input type="text" class="form-control" id="trip_visit_name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Select the location <span class="text-danger">*</span></label><br />
                                    <select class="selectpicker col-12" data-live-search="true" id="citySelect2">
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Country</label>
                                    <input type="text" class="form-control" disabled id="trip_visit_country">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Latitude</label>
                                    <input type="text" class="form-control" disabled id="trip_visit_latitude">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Longitude</label>
                                    <input type="text" class="form-control" disabled id="trip_visit_longitude">
                                </div>

                                <div class="col-3">
                                    <button class="btn btn-outline-info" style="position: relative;bottom: -30px" onclick="searchWeather();"><i class="fa fa-search"></i> Search weather</button>
                                </div>

                                <div class="col-3">
                                    <label class="form-label">Plan to visit on</label>
                                    <input type="date" class="form-control" disabled id="trip_visit_date">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Plan to visit at</label>
                                    <input type="time" class="form-control" disabled id="trip_visit_time">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Weather</label>
                                    <input type="text" class="form-control" disabled id="trip_visit_weather">
                                </div>
                                <div class="col-3">
                                    <label class="form-label">Temperature</label>
                                    <input type="text" class="form-control" disabled id="trip_visit_temp">
                                </div>

                                <div class="col-12 mt-4">
                                    <table class="table table-sm table-bordered table-hover" id="forecastTable">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Temperature (°C)</th>
                                                <th>Weather</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="save_new_trip(<?php echo $user['id'] ?>);">Save new trip</button> -->
                </div>
            </div>
        </div>
    </div>

    <!-- View more modal -->
    <div class="modal fade" id="view_more_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.js"></script>
    <script src="assets/js/script.js"></script>
    <script>
        $(document).ready(function() {
            $('#req_table').DataTable();
            $('#other_req_table').DataTable();
        });
    </script>

</body>

</html>