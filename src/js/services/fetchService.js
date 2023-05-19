
export async function fetchData(searchObj) {
    let response;
    const options = {
     url : searchObj.url,
    //   data: { search: searchKey }
    };
  
    try {
       response = await axios.request(options);
    } catch (error) {
      console.error(error);
    }
    return response.data
  }