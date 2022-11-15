import React from "react";
const _ = require("lodash");
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import {
  compose,
  withProps,
  lifecycle,
  withHandlers,
  withStateHandlers
} from "recompose";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import markerImage from "../../public/store-marker.png";
import personMarkerImage from "../../public/marker.png";
import { Config } from "config/Config";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";

export const ViewMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      "AIzaSyCEO139WyJJWm4Gyy4SQnl5kxLURN-zcHs" +
      "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "calc(100vh - 6em)" }} />,
    containerElement: (
      <div
        style={{
          overflowY: "auto",
          height: "calc(100vh - 5em)",
          marginTop: "-25px",
          width: "100%"
        }}
      />
    ),
    mapElement: <div style={{ height: "inherit" }} />
  }),

  withStateHandlers(
    () => ({
      isOpen: true
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),

  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        bounds: null,
        deliveryAddress: "",
        onMapMounted: ref => {
          refs.map = ref;
        },
        onMarkerChanged: e => {
          this.props.userMarkerChanged(e.latLng.lat(), e.latLng.lng());
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            this.setState({
              location: place.geometry.location
            });
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );
          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          refs.map.fitBounds(bounds);
        },
        onZoomChanged: () => {
          this.setState({
            zoom: refs.map.getZoom()
          });
          saveLocalStorage("currentzoom", refs.map.getZoom());
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultCenter={props.centerPoint}
    defaultZoom={props.zoom ? props.zoom : 10}
    center={props.centerPoint}
    onBoundsChanged={props.onBoundsChanged}
    options={{ gestureHandling: "greedy" }}
    zoom={props.zoom ? props.zoom : 10}
    heatmapLibrary={true}
    onZoomChanged={props.onZoomChanged}
  >
    {props.activePage == "storelocator" &&
      props.markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(marker.Latitude),
            lng: parseFloat(marker.Longitude)
          }}
          icon={{
            url: markerImage,
            labelOrigin: new google.maps.Point(-6.164115, 106.724996)
          }}
          animation={google.maps.Animation.DROP}
          label={
            getLocalStorage("currentzoom") > 12
              ? {
                  text: marker.StoreName,
                  fontWeight: "normal",
                  color: "rgba(0, 0, 0, 0.4)"
                }
              : " "
          }
          onClick={() => props.handleInfoWindow(marker, "markerClicked")}
        >
          {typeof props.userNearestMarker.StoreName !== "undefined" &&
            props.userNearestMarker.StoreName !== "" &&
            props.showNearestStore === true && (
              <InfoWindow onCloseClick={() => props.closeNearestInfo()}>
                <div
                  className="nearest-info-window"
                  style={{
                    color: "black",
                    maxWidth: "150px",
                    textAlign: "left",
                    width: "150px"
                  }}
                >
                  <h6>NEAREST STORE</h6>
                  <p>{props.userNearestMarker.StoreName}</p>
                </div>
              </InfoWindow>
            )}
        </Marker>
      ))}

    {props.activePage == "delivery" && (
      <Marker
        draggable
        position={props.centerPoint}
        onDragEnd={e => props.onMarkerChanged(e)}
        icon={personMarkerImage}
      ></Marker>
    )}
  </GoogleMap>
));

export default ViewMap;
