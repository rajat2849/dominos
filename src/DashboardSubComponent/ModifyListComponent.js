import ReactPixel from "react-facebook-pixel";
import Urlencode from "urlencode";
import $ from "cheerio";

import { translations } from "../translations";

/*
  method to filter value deals having the status hidden.
*/
export const modifyValueDealsList = list => {
  let valueDealsList = [];
  list.map((item, index) => {
    let device = item.value_device_detect.split(",");
    if (
      list[index].hidden == "0" &&
      (device.indexOf("pwa") >= 0 || device.indexOf(" pwa") >= 0)
    ) {
      valueDealsList.push(list[index]);
    }
  });
  return valueDealsList;
};
