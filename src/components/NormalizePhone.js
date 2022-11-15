const normalizePhone = (value) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  
  if (onlyNums.length > 13) {
    return onlyNums.slice(0, 13);
  } else {
    return onlyNums;
  }
  
}

export default normalizePhone;