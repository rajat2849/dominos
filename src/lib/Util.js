export const formatPrice = (price) => {
  const floatPrice = parseFloat(price);
  return Math.round(floatPrice).toFixed(2);
};

export const getPrice = (first, second, operation='add') => {
  const firstPrice = parseFloat(first);
  let totalPrice = 0.00;
  let secondPrice = 0.00;
  let quantity = 1;
  switch(operation) {
  case 'add':
    secondPrice = parseFloat(second);
    totalPrice = firstPrice + secondPrice;
    break;
  case 'multiply':
    // here second param will be quantity
    totalPrice = firstPrice * parseInt(second);
    break;
  case 'divide':
    // here second param will be quantity
    quantity = parseInt(second);
    if (quantity > 0) {
      totalPrice = firstPrice / quantity;
    }
    break;
  }
  return Math.round(totalPrice).toFixed(2);
};

export const slugify = (text) => {
  if (typeof text !== 'undefined' && text !== '') {
    return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
  }
  return text;
}

export const calculateDistance = (address) => {
  // console.log('address', address);
  const toRadian = n => (n * Math.PI) / 180
  const {start, destination} = address;
  let R = 6371  // km
  let x1 = destination.lat - start.lat;
  let dLat = toRadian(x1)
  let x2 = destination.lng -start.lng;
  let dLon = toRadian(x2)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(destination.lat)) * Math.cos(toRadian(start.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
    if((Math.round(d * 100) / 100).toFixed(1) !== 'NaN' && destination.lat !== 0){
      return (Math.round(d * 100) / 100).toFixed(1)
    }else{
      return 0;
    }
  
}
