import React, { useMemo, useState } from "react";
import axios from "axios";
const CURRENCY_NAME_TO_CODE = {
  "United Arab Emirates Dirham": "AED",
  "Afghan Afghani": "AFN",
  "Albanian Lek": "ALL",
  "Armenian Dram": "AMD",
  "Netherlands Antillean Guilder": "ANG",
  "Angolan Kwanza": "AOA",
  "Argentine Peso": "ARS",
  "Australian Dollar": "AUD",
  "Aruban Florin": "AWG",
  "Azerbaijani Manat": "AZN",
  "Bosnia-Herzegovina Convertible Mark": "BAM",
  "Barbadian Dollar": "BBD",
  "Bangladeshi Taka": "BDT",
  "Bulgarian Lev": "BGN",
  "Bahraini Dinar": "BHD",
  "Burundian Franc": "BIF",
  "Bermudan Dollar": "BMD",
  "Brunei Dollar": "BND",
  "Bolivian Boliviano": "BOB",
  "Brazilian Real": "BRL",
  "Bahamian Dollar": "BSD",
  Bitcoin: "BTC",
  "Bhutanese Ngultrum": "BTN",
  "Botswanan Pula": "BWP",
  "Belarusian Ruble": "BYN",
  "Belize Dollar": "BZD",
  "Canadian Dollar": "CAD",
  "Congolese Franc": "CDF",
  "Swiss Franc": "CHF",
  "Chilean Unit of Account (UF)": "CLF",
  "Chilean Peso": "CLP",
  "Chinese Yuan (Offshore)": "CNH",
  "Chinese Yuan": "CNY",
  "Colombian Peso": "COP",
  "Costa Rican Colón": "CRC",
  "Cuban Convertible Peso": "CUC",
  "Cuban Peso": "CUP",
  "Cape Verdean Escudo": "CVE",
  "Czech Republic Koruna": "CZK",
  "Djiboutian Franc": "DJF",
  "Danish Krone": "DKK",
  "Dominican Peso": "DOP",
  "Algerian Dinar": "DZD",
  "Egyptian Pound": "EGP",
  "Eritrean Nakfa": "ERN",
  "Ethiopian Birr": "ETB",
  Euro: "EUR",
  "Fijian Dollar": "FJD",
  "Falkland Islands Pound": "FKP",
  "British Pound Sterling": "GBP",
  "Georgian Lari": "GEL",
  "Guernsey Pound": "GGP",
  "Ghanaian Cedi": "GHS",
  "Gibraltar Pound": "GIP",
  "Gambian Dalasi": "GMD",
  "Guinean Franc": "GNF",
  "Guatemalan Quetzal": "GTQ",
  "Guyanaese Dollar": "GYD",
  "Hong Kong Dollar": "HKD",
  "Honduran Lempira": "HNL",
  "Croatian Kuna": "HRK",
  "Haitian Gourde": "HTG",
  "Hungarian Forint": "HUF",
  "Indonesian Rupiah": "IDR",
  "Israeli New Sheqel": "ILS",
  "Manx pound": "IMP",
  "Indian Rupee": "INR",
  "Iraqi Dinar": "IQD",
  "Iranian Rial": "IRR",
  "Icelandic Króna": "ISK",
  "Jersey Pound": "JEP",
  "Jamaican Dollar": "JMD",
  "Jordanian Dinar": "JOD",
  "Japanese Yen": "JPY",
  "Kenyan Shilling": "KES",
  "Kyrgystani Som": "KGS",
  "Cambodian Riel": "KHR",
  "Comorian Franc": "KMF",
  "North Korean Won": "KPW",
  "South Korean Won": "KRW",
  "Kuwaiti Dinar": "KWD",
  "Cayman Islands Dollar": "KYD",
  "Kazakhstani Tenge": "KZT",
  "Laotian Kip": "LAK",
  "Lebanese Pound": "LBP",
  "Sri Lankan Rupee": "LKR",
  "Liberian Dollar": "LRD",
  "Lesotho Loti": "LSL",
  "Libyan Dinar": "LYD",
  "Moroccan Dirham": "MAD",
  "Moldovan Leu": "MDL",
  "Malagasy Ariary": "MGA",
  "Macedonian Denar": "MKD",
  "Myanma Kyat": "MMK",
  "Mongolian Tugrik": "MNT",
  "Macanese Pataca": "MOP",
  "Mauritanian Ouguiya": "MRU",
  "Mauritian Rupee": "MUR",
  "Maldivian Rufiyaa": "MVR",
  "Malawian Kwacha": "MWK",
  "Mexican Peso": "MXN",
  "Malaysian Ringgit": "MYR",
  "Mozambican Metical": "MZN",
  "Namibian Dollar": "NAD",
  "Nigerian Naira": "NGN",
  "Nicaraguan Córdoba": "NIO",
  "Norwegian Krone": "NOK",
  "Nepalese Rupee": "NPR",
  "New Zealand Dollar": "NZD",
  "Omani Rial": "OMR",
  "Panamanian Balboa": "PAB",
  "Peruvian Nuevo Sol": "PEN",
  "Papua New Guinean Kina": "PGK",
  "Philippine Peso": "PHP",
  "Pakistani Rupee": "PKR",
  "Polish Zloty": "PLN",
  "Paraguayan Guarani": "PYG",
  "Qatari Rial": "QAR",
  "Romanian Leu": "RON",
  "Serbian Dinar": "RSD",
  "Russian Ruble": "RUB",
  "Rwandan Franc": "RWF",
  "Saudi Riyal": "SAR",
  "Solomon Islands Dollar": "SBD",
  "Seychellois Rupee": "SCR",
  "Sudanese Pound": "SDG",
  "Swedish Krona": "SEK",
  "Singapore Dollar": "SGD",
  "Saint Helena Pound": "SHP",
  "Sierra Leonean Leone": "SLL",
  "Somali Shilling": "SOS",
  "Surinamese Dollar": "SRD",
  "South Sudanese Pound": "SSP",
  "São Tomé and Príncipe Dobra (pre-2018)": "STD",
  "São Tomé and Príncipe Dobra": "STN",
  "Salvadoran Colón": "SVC",
  "Syrian Pound": "SYP",
  "Swazi Lilangeni": "SZL",
  "Thai Baht": "THB",
  "Tajikistani Somoni": "TJS",
  "Turkmenistani Manat": "TMT",
  "Tunisian Dinar": "TND",
  "Tongan Pa'anga": "TOP",
  "Turkish Lira": "TRY",
  "Trinidad and Tobago Dollar": "TTD",
  "New Taiwan Dollar": "TWD",
  "Tanzanian Shilling": "TZS",
  "Ukrainian Hryvnia": "UAH",
  "Ugandan Shilling": "UGX",
  "United States Dollar": "USD",
  "Uruguayan Peso": "UYU",
  "Uzbekistan Som": "UZS",
  "Venezuelan Bolívar Soberano": "VES",
  "Vietnamese Dong": "VND",
  "Vanuatu Vatu": "VUV",
  "Samoan Tala": "WST",
  "CFA Franc BEAC": "XAF",
  "East Caribbean Dollar": "XCD",
  "Special Drawing Rights": "XDR",
  "CFA Franc BCEAO": "XOF",
  "CFP Franc": "XPF",
  "Yemeni Rial": "YER",
  "South African Rand": "ZAR",
  "Zambian Kwacha": "ZMW",
  "Zimbabwean Dollar": "ZWL",
};

const CurrencyConverter = () => {
  const [initial, setInitial] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("United States Dollar");
  const [toCurrency, setToCurrency] = useState("United States Dollar");
  const [converted, setConverted] = useState();

  const convertCurrency = async () => {
    if (initial === 0 || fromCurrency === toCurrency) setConverted(initial);
    else {
      try {
        const res = await axios.get(
          "https://api.exchangerate.host/latest?base=USD"
        );
        const ratesDictionary = res.data.rates;

        setConverted(
          (initial * ratesDictionary[CURRENCY_NAME_TO_CODE[toCurrency]]) /
            ratesDictionary[CURRENCY_NAME_TO_CODE[fromCurrency]]
        );
        console.log(initial);
        console.log(fromCurrency);
        console.log(toCurrency);
        console.log(ratesDictionary);
      } catch {
        console.error("Filed to ocnvert between currencies..");
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    convertCurrency();
  };
  const conversionLine = useMemo(
    () => (
      <h4 style={{ textAlign: "center", margin: 30 }}>
        {initial +
          " " +
          CURRENCY_NAME_TO_CODE[fromCurrency] +
          " = " +
          converted +
          " " +
          CURRENCY_NAME_TO_CODE[toCurrency]}
      </h4>
    ),
    [converted]
  );

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
      >
        <p>Convert</p>
        <input
          type={"number"}
          value={initial}
          step={0.01}
          min={0}
          onChange={(e) => setInitial(e.target.value)}
          style={{ textAlign: "center", marginLeft: 20 }}
        />
        <p style={{ marginLeft: 20, marginRight: 20 }}>from</p>
        <select
          required
          value={fromCurrency}
          style={{ textAlign: "center" }}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(CURRENCY_NAME_TO_CODE).map((currencyName, index) => (
            <option key={index}>{currencyName}</option>
          ))}
        </select>
        <p style={{ marginRight: 20, marginLeft: 20 }}>to</p>
        <select
          required
          value={toCurrency}
          style={{ textAlign: "center" }}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(CURRENCY_NAME_TO_CODE).map((currencyName, index) => (
            <option key={index}>{currencyName}</option>
          ))}
        </select>
      </form>
      {converted && conversionLine}
    </div>
  );
};

export default CurrencyConverter;
