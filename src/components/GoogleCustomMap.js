import React from "react";
import { Config } from "config/Config";
import personMarkerImage from "../../public/marker.png";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";
import "./Form.scss";
import { convertColorToString } from "material-ui/utils/colorManipulator";

const style = {
  searchInput: {
    boxSizing: `border-box`,
    //border: `1px solid gray`,
    height: `32px`,
    //marginTop: '-2%',
    padding: `0 12px`,
    borderRadius: `3px`,
    //boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    //fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    pointerEvents: `all`
  }
};

export default class GoogleCustomMap extends React.Component {
  infowindow;
  infowindowContent;
  geocoder;
  map;
  marker;
  autoComplete;
  markerFormattedAddress;

  constructor() {
    super();
    this.state = {
      zoom: 15,
      maptype: "roadmap",
      place_formatted: "",
      place_id: "",
      place_location: "",
      position: {},
      selected: false,
      value: ""
    };
  }

  componentDidMount() {
    this.mapInit();
  }

  mapInit() {
    let defaultBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(-10.3599874813, 95.2930261576),
      new window.google.maps.LatLng(5.47982086834, 141.03385176)
    );
    console.log("INIT map=======" )

    // let latLng = {
    //   lat: this.props.centerPoint.lat,
    //   lng: this.props.centerPoint.lng,
    // };

    let mapOptions = {
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      zoom: 18
      // center: latLng,
    };

    let sessionToken = new google.maps.places.AutocompleteSessionToken();

    let autocompleteOptions = {
      bounds: defaultBounds,
      componentRestrictions: {
        country: "id"
      },
      types: ["address"],
      sessionToken: sessionToken,

      fields: [
        "name",
        "geometry.location",
        "place_id",
        "formatted_address",
        "adr_address",
        "icon",
        "address_components",
        "id"
      ]
    };

    this.infowindowContent = document.getElementById("infowindow-content");

    this.infowindow = new window.google.maps.InfoWindow();
    this.infowindow.setContent(this.infowindowContent);

    this.geocoder = new window.google.maps.Geocoder();

    this.map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    // initialize the autoComplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");

    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      inputNode
    );
    this.autoComplete = new window.google.maps.places.Autocomplete(
      inputNode,
      autocompleteOptions
    );

    navigator.geolocation.getCurrentPosition(
      position => {
        var latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setMarker(latLng);
        this.setState({
          position: latLng
        });
      },
      error => {
        console.log("error in google map=======" , error)
        this.setMarker(this.props.centerPoint);
        this.setState({
          position: this.props.centerPoint
        });
      }
    );

    this.setupClickListener("changetype-address", ["address"]);
    this.setupClickListener("changetype-establishment", ["establishment"]);
    this.autoComplete.addListener("place_changed", this.onPlaceChanged);
  }

  setupClickListener = (id, types) => {
    let radioButton = document.getElementById(id);
    radioButton.addEventListener("click", () =>
      this.setAutocompleteTypes(types)
    );
  };

  setAutocompleteTypes = types => {
    this.autoComplete.setTypes(types);
  };

  mapCustomize() {
    let {
      checkStoreAvaliability,
      userMarkerChanged,
      handleInitialize
    } = this.props;
    let infowindow, infowindowContent, geocoder, map, marker, autoComplete;
    let options = {
      mybaseurl: "https://migrationdev.dominos.id/",
      currentplace:
        "https://migrationdev.dominos.id/media/dominos/store/Map-People-40.png",
      pin: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
    };

    this.map.addListener("zoom_changed", () => {
      this.setState({
        zoom: this.map.getZoom()
      });
    });

    this.map.addListener("maptypeid_changed", () => {
      this.setState({
        maptype: this.map.getMapTypeId()
      });
    });

    this.marker = new window.google.maps.Marker({
      icon: personMarkerImage,
      map: this.map,
      position: this.props.centerPoint,
      draggable: false
    });

    this.setupClickListener("changetype-address", ["address"]);
    this.setupClickListener("changetype-establishment", ["establishment"]);
  }

  onPlaceChanged = async () => {
    let {
      checkStoreAvaliability,
      setUserAddressFromSelectedAddress
    } = this.props;

    this.infowindow.close();

    await this.setState({ selected: true });
    let place = this.autoComplete.getPlace();

    if (
      typeof place !== "undefined" &&
      typeof place.address_components !== "undefined"
    ) {
      const latLng = place.geometry.location;
      //checkStoreAvaliability({lat: latLng.lat(), lng: latLng.lng(), result: place}, handleInitialize);
      setUserAddressFromSelectedAddress(place);
    }

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      console.log("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    // if (place.geometry.viewport) {
    //   this.map.fitBounds(place.geometry.viewport);
    // }
    document.getElementById("pac-input").value = "";
    this.setMarker(place.geometry.location, false, place);
  };

  setMarker = (latLng, drag = true, place = false) => {
    let { userMarkerChanged, handleInitialize } = this.props;
    if (typeof this.marker === "undefined") {
      this.marker = new window.google.maps.Marker({
        icon: personMarkerImage,
        map: this.map,
        position: latLng,
        draggable: false
      });
      window.google.maps.event.addListener(
        this.marker,
        "dragend",
        this.onMarkerChanged
      );
    }

    if (drag) {
      //for drag n drop
      this.markerInfo(this.marker.getPosition());
    } else {
      //for selected autoComplete
      this.markerInfo(place, true);
    }

    this.marker.setPosition(latLng);

    this.map.setZoom(18);
    this.map.setCenter(this.marker.getPosition());
    saveLocalStorage("currentzoom", 18);
  };

  onMarkerChanged = () => {
    const { userMarkerChanged, handleInitialize } = this.props;

    //this.setMarker(this.marker.getPosition());
    let latLng = {
      lat: this.marker.getPosition().lat(),
      lng: this.marker.getPosition().lng()
    };

    //userMarkerChanged(latLng.lat, latLng.lng);
    document.getElementById("pac-input").value = "";
  };

  markerInfoError = msg => {
    this.markerFormattedAddress = msg;

    this.infowindowContent.children["place-icon"].src = options.pin;
    this.infowindowContent.children["place-name"].textContent = "Sorry";
    this.infowindowContent.children[
      "place-address"
    ].textContent = this.markerFormattedAddress;
    this.infowindow.open(this.map, this.marker);
  };

  markerInfo = (param, isPlace = false) => {
    let geoOptions = function(param) {
      return {
        location: param,
        componentRestrictions: {}
      };
    };

    if (isPlace) {
      var address = "";
      if (param.address_components) {
        address = [
          (param.address_components[0] &&
            param.address_components[0].short_name) ||
            "",
          (param.address_components[1] &&
            param.address_components[1].short_name) ||
            "",
          (param.address_components[2] &&
            param.address_components[2].short_name) ||
            ""
        ].join(" ");
      }

      this.markerFormattedAddress = param.formatted_address;

      this.infowindowContent.children["place-icon"].src = param.icon;
      this.infowindowContent.children[
        "place-address"
      ].textContent = this.markerFormattedAddress;
      this.infowindowContent.children["place-name"].textContent = param.name;
      this.infowindow.open(this.map, this.marker);
    } else {
      this.geocoder.geocode(geoOptions(param), responses => {
        if (responses && responses.length > 0) {
          this.markerFormattedAddress = responses[0].formatted_address;
          this.props.setUserAddressFromSelectedAddress(responses[0]);
        } else {
          this.markerFormattedAddress =
            "Cannot determine address at this location.";
        }
        this.infowindowContent.children["place-icon"].style.display = "none";
        this.infowindowContent.children["place-name"].textContent = "";
        this.infowindowContent.children[
          "place-address"
        ].textContent = this.markerFormattedAddress;
        this.infowindow.open(this.map, this.marker);
      });
    }
  };

  changeValue = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <div id="app" style={{ overflowY: "auto", height: "100%" }}>
        <div id="pac-container">
          <input
            id="pac-input"
            className={this.props.showMap ? "invisible" : "visible"}
            style={style.searchInput}
            type="text"
            placeholder="Where in Indonesia?"
            value={this.state.value}
            onChange={this.changeValue}
          />
        </div>
        {this.props.showMap && (
          <button
            className="map-order-btn theme-btn btn align-items-center justify-content-center"
            onClick={() => {
              this.props.checkUserNearestStore(this.state.position);
              this.props.handleInitialize();
            }}
          >
            ORDER TO THIS ADDRESS
          </button>
        )}
        <div
          id="map"
          style={
            !this.props.showMap
              ? { visibility: "hidden" }
              : {
                  height: "89%",
                  width: "100%",
                  pointerEvents: "none",
                  marginTop: "67px"
                }
          }
        />
        {/* <div
          id="infowindow-content"
          style={{ display: "inline", pointerEvents: "all" }}
        >
          <img src="" width="13" height="13" id="place-icon" />
          <span id="place-name" style={{ fontWeight: "bold" }}></span>
          <br></br>
          <span id="place-address"></span>
        </div> */}
      </div>
    );
  }
}
