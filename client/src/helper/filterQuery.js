const filterQuery = (queryFields) => {
  let resQuery = Object.entries(queryFields).map((field) => field.join("="));
  resQuery = resQuery.join("&");
  return resQuery;
};

export default filterQuery;
