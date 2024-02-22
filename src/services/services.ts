import config from "../config/config";
import axios from "axios";

class Services {
  async getProvincias() {
    const { data } = await axios.get(config.api.url + "/provincias");
    return data;
  }

  async getProvinciaByName(name: string) {
    const { data } = await axios.get(config.api.url + "/provincias?nombre=" + name);
    return data;
  }

  async getDepartaments() {
    const { data } = await axios.get(config.api.url + "/departamentos");
    return data;
  }

  async getDepartamentByPronvince(province: string) {
    const { data } = await axios.get(config.api.url + "/departamentos?max=1000&provincia=" + province);
    return data;
  }
}

export default new Services();
