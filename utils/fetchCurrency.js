import axios from "axios";

const fetchCurrency = async (currency) => {
    const result = await axios.get(`https://economia.awesomeapi.com.br/json/${currency}`)
    return result.data[0].bid
}

export default fetchCurrency;