import React from "react";
import Slider from "react-slick";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Card
} from "reactstrap";
import { Link } from "react-router";
import {
  getLocalStorage
} from "components/Helpers";
import { Url } from "config/Config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewDashboard.scss";
 
export default class SimpleSlider extends React.Component {
  render() {
    var settings = {
      arrows: false,
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    let bannerList =  getLocalStorage("bannerList");
    return (
      <Slider className="slick-slider-wrapper" {...settings}>
        {bannerList !== undefined &&
          bannerList.map((item,index) => {
            let pathname = "";
            (item.sku === undefined || item.sku === null)
              ? (pathname = Url.MENU_PAGE)
              : (pathname = `${Url.NEW_PROMOTION_DETAIL}/${item.url_key}`);
                return (
                  <Link
                    key={item.sku+"_"+index}
                    className="col-12"
                    to={{
                      pathname: pathname,
                      state: {
                        sku: item.sku,
                        page: Url.DASHBOARD
                      }
                    }}
                  >
                  <div className="imgWraper">
                    <Card>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="img-fluid"
                      />
                      <label className="slick-slide-label">{item.label}</label>
                    </Card>
                  </div>
                </Link>
              )
            }
          )
        }
      </Slider>
    );
  }
}