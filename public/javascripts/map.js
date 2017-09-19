function initService() {
    var ironhackBCN = {
        lat: 41.3977381,
        lng: 2.190471916
    };
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15,
            center: ironhackBCN
        }
    );

    var input = document.getElementById("search");


    var autocomplete = new google.maps.places.Autocomplete(input)

    autocomplete.addListener("", onPlaceChanged)
}
