const URL = "https://638c6687eafd555746a597ec.mockapi.io/api/";

class ProducesServices {

    callAPI(uri, method, data) {
        return axios({
            url: `${URL}/${uri}`,
            method,
            data,
        });
    }
}

export default ProducesServices;