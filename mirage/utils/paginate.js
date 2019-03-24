export default function(collection) {
  let pageSize = request.queryParams["page_size"] || 10,
    pageNumber = request.queryParams["page_number"] || 1,
    sortColumns = ((request || {}).queryParams || {}).sort || '';

  let lastPage = 1;
  let results = [];

  results = db[collection].all();

  // the code that sort results according to `sortColumns`

  // the code to extract `pageSize` number of records for page `pageNumber`

  let json = this.serialize(results);

  json.meta = {
    page: {
      total: lastPage,
      number: pageNumber,
      size: pageSize,
      sort: [{
        field: "id",
        direction: "asc"
      }]
    },
    total_count: totalRecords
  };

  return json;
}
