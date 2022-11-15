import React from "react";
import personMarkerImage from "../../../../public/marker.png";
import markerImage from "../../../../public/store-marker.png";
import deliveryImage from "../../../../public/dominos_scooter.png";
// import FaAnchor from "react-icons/lib/fa/anchor";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, lifecycle, withStateHandlers } from "recompose";
import { Config } from "config/Config";

const defaultCenterPoint = { lat: -6.3, lng: 107.155 };
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      Config.googleApiKey +
      "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "calc(40vh - 6em)" }} />,
    containerElement: (
      <div
        style={{
          overflowY: "auto",
          height: "calc(40vh - 5em)",
          marginTop: "0",
          width: "100%"
        }}
      />
    ),
    mapElement: <div style={{ height: "inherit" }} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(props) {
      //  this.DisplayDrivingDirections(props);
    },
    componentWillMount() {
      this.setState({ centerPoint: defaultCenterPoint });
      //  const DirectionsService = new google.maps.DirectionsService();
      //  this.DisplayDrivingDirections(this.props);
    },
    DisplayDrivingDirections(props) {
      var directions = {
        TotalDistance: 0,
        Segments: []
      };
      let origin = new google.maps.LatLng(
        props.orderData.lat_store,
        props.orderData.long_store
      );
      let destination =
        props.orderData.driver_name === ""
          ? new google.maps.LatLng(
              props.orderData.lat_destination,
              props.orderData.long_destination
            )
          : new google.maps.LatLng(
              props.orderData.lat_driver === 0
                ? props.orderData.lat_destination
                : props.orderData.lat_driver,
              props.orderData.long_driver === 0
                ? props.orderData.long_destination
                : props.orderData.long_driver
            );
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: [],
          optimizeWaypoints: true,
          provideRouteAlternatives: false,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directions.TotalDistance = 0;
            directions.totalDuration = 0;
            directions.Segments = [];
            var route = result.routes[0];
            let polylinePath = [];
            if (
              props.orderData.status !== "complete" &&
              props.orderData.status !== "void"
            ) {
              route.overview_path.map((item, index) => {
                polylinePath.push({ lat: item.lat(), lng: item.lng() });
              });
            }

            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              var legDistance = route.legs[i].distance.value; // distance in meters need to devide by 1000 for Km
              directions.TotalDistance =
                directions.TotalDistance + legDistance / 1000;
              var legDuration = route.legs[i].duration.value; // travel time in seconds
              var totalDuration = totalDuration + legDuration;
              directions.Segments.push({
                Start: route.legs[i].start_address,
                End: route.legs[i].end_address,
                Travel: route.legs[i].distance.text,
                Duration: route.legs[i].duration.text
              });
            }
            // directions.TotalDuration = secondsToTime(totalDuration);
            const centerLat =
              (props.orderData.lat_store + props.orderData.lat_destination) / 2;
            const centerLong =
              (props.orderData.long_store + props.orderData.long_destination) /
              2;
            this.setState({
              directions: directions,
              centerPoint: { lat: centerLat, lng: centerLong },
              startPoint: {
                lat: props.orderData.lat_store,
                lng: props.orderData.long_store
              },
              endPoint: {
                lat: props.orderData.lat_destination,
                lng: props.orderData.long_destination
              },
              driverPoint: {
                lat: props.orderData.lat_driver,
                lng: props.orderData.long_driver
              },
              polylinePath: polylinePath,
              path: result.routes
            });
          } else {
            console.error("error fetching directions");
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={
      new google.maps.LatLng(
        props.orderData.lat_store,
        props.orderData.long_store
      )
    }
    center={
      new google.maps.LatLng(
        props.orderData.lat_store,
        props.orderData.long_store
      )
    }
    options={{
      gestureHandling: "greedy",
      mapTypeControl: false,
      streetViewControl: false
    }}
  >
    <Marker
      position={
        new google.maps.LatLng(
          props.orderData.lat_driver,
          props.orderData.long_driver
        )
      }
      icon={deliveryImage}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && props.orderData.status !== "complete" && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          {/*<FaAnchor />*/}
          <div style={{ padding: `3px 0`, fontWeight: "bold", color: "red" }}>
            <div style={{ fontSize: `16px`, fontColor: `red` }}>
              {/*props.directions.Segments[0].Duration*/}
            </div>
          </div>
        </InfoWindow>
      )}
    </Marker>
    <Polyline
      path={props.polylinePath}
      geodesic={true}
      options={{
        strokeColor: "#0078ad",
        strokeOpacity: 1,
        strokeWeight: 4,
        clickable: true
      }}
    />
    <Marker
      position={
        new google.maps.LatLng(
          props.orderData.lat_store,
          props.orderData.long_store
        )
      }
      icon={markerImage}
    />
    <Marker
      position={
        new google.maps.LatLng(
          props.orderData.lat_destination,
          props.orderData.long_destination
        )
      }
      icon={personMarkerImage}
    />
  </GoogleMap>
));

export default MapWithADirectionsRenderer;
