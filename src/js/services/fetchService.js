import { Loader } from "../../components/loader/loader.js";
import { showFetchErrorMessage } from "../shared/shared.js";
export async function fetchData(url) {
  let response;
  const options = {
    url: url,
  };
  try {
    Loader.display();
    response = await axios.request(options);
  } catch (error) {
    console.error(error);
    showFetchErrorMessage();
  }
  Loader.hide();
  return response.data;
}
