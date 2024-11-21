import { put, takeLatest } from "redux-saga/effects";
import { getData } from "../../utils/api";
import axios from "axios";

import {
  FETCH_TOKEN_LIST_REQUEST,
  fetchTokenListSuccess,
  fetchTokenListFail,
} from "../actions/tokenAction";

const defaultTokens = [
    {
      "id": "0x_MSFT_PLACEHOLDER",
      "name": "Microsoft Corporation",
      "symbol": "MSFT",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/msft.svg",
      "sector": "Technology",
      "industry": "Software",
      "marketCap": "2.5T",
      "derivedETH": "1",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "335.67",
      "isSelected": false
    },
    {
      "id": "0x_AAPL_PLACEHOLDER",
      "name": "Apple Inc.",
      "symbol": "AAPL",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/aapl.svg",
      "sector": "Technology",
      "industry": "Consumer Electronics",
      "marketCap": "3T",
      "derivedETH": "1",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "191.45",
      "isSelected": true
    },
    {
      "id": "0x_INTC_PLACEHOLDER",
      "name": "Intel Corporation",
      "symbol": "INTC",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/intc.svg",
      "sector": "Technology",
      "industry": "Semiconductors",
      "marketCap": "200B",
      "derivedETH": "0.8",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "44.89",
      "isSelected": false
    },
    {
      "id": "0x_AMD_PLACEHOLDER",
      "name": "Advanced Micro Devices",
      "symbol": "AMD",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/amd.svg",
      "sector": "Technology",
      "industry": "Semiconductors",
      "marketCap": "150B",
      "derivedETH": "0.7",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "109.36",
      "isSelected": false
    },
    {
      "id": "0x_IBM_PLACEHOLDER",
      "name": "International Business Machines",
      "symbol": "IBM",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/ibm.svg",
      "sector": "Technology",
      "industry": "Enterprise Software",
      "marketCap": "120B",
      "derivedETH": "0.6",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "161.22",
      "isSelected": false
    },
    {
      "id": "0x_CSCO_PLACEHOLDER",
      "name": "Cisco Systems",
      "symbol": "CSCO",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/csco.svg",
      "sector": "Technology",
      "industry": "Networking Equipment",
      "marketCap": "200B",
      "derivedETH": "0.5",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "52.77",
      "isSelected": false
    },
    {
      "id": "0x_ADBE_PLACEHOLDER",
      "name": "Adobe Inc.",
      "symbol": "ADBE",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/adbe.svg",
      "sector": "Technology",
      "industry": "Software",
      "marketCap": "250B",
      "derivedETH": "0.9",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "453.09",
      "isSelected": false
    },
    {
      "id": "0x_JPM_PLACEHOLDER",
      "name": "JPMorgan Chase",
      "symbol": "JPM",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/jpm.svg",
      "sector": "Finance",
      "industry": "Banking",
      "marketCap": "400B",
      "derivedETH": "0.4",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "168.54",
      "isSelected": false
    },
    {
      "id": "0x_BAC_PLACEHOLDER",
      "name": "Bank of America",
      "symbol": "BAC",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/bac.svg",
      "sector": "Finance",
      "industry": "Banking",
      "marketCap": "250B",
      "derivedETH": "0.3",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "32.45",
      "isSelected": false
    },
    {
      "id": "0x_WFC_PLACEHOLDER",
      "name": "Wells Fargo",
      "symbol": "WFC",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/wfc.svg",
      "sector": "Finance",
      "industry": "Banking",
      "marketCap": "150B",
      "derivedETH": "0.2",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "44.67",
      "isSelected": false
    },
    {
      "id": "0x_T_PLACEHOLDER",
      "name": "AT&T Inc.",
      "symbol": "T",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/t.svg",
      "sector": "Telecommunications",
      "industry": "Wireless Communication",
      "marketCap": "120B",
      "derivedETH": "0.2",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "16.89",
      "isSelected": false
    },
    {
      "id": "0x_VZ_PLACEHOLDER",
      "name": "Verizon Communications",
      "symbol": "VZ",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/vz.svg",
      "sector": "Telecommunications",
      "industry": "Wireless Communication",
      "marketCap": "200B",
      "derivedETH": "0.3",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "37.22",
      "isSelected": false
    },
    {
      "id": "0x_AMZN_PLACEHOLDER",
      "name": "Amazon.com Inc.",
      "symbol": "AMZN",
      "iconUrl": "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.17.0/svg/color/amzn.svg",
      "sector": "Technology",
      "industry": "E-commerce",
      "marketCap": "1.5T",
      "derivedETH": "0.8",
      "tradeVolume": "3301462041.11748861933235212",
      "tradeVolumeETH": "3300311818.52137548806878441737562",
      "untrackedVolumeETH": "3291598686.542792271382161848611582",
      "totalLiquidity": "5828116.442055837959108752",
      "txCount": "536458",
      "volume24HrsETH": 875886.157615662,
      "volume24HrsUSD": 62081.3567512732,
      "tradeVolumeUSD": "233920622.69",
      "totalLiquidityUSD": "413087.22",
      "derivedUSD": "174.63",
      "isSelected": false
    }
]

function* fetchTokenList() {
  try {
    // Make an API request to fetch token data
    const response = yield axios.get(
      "https://swap-api.thetatoken.org/swap/top-tokens"
    );
    const fetchedTokens = response.data.body.tokens.filter(
      (item) => item.totalLiquidityUSD * 1 > 0
    );
    const data = yield axios.get(
      "https://assets.thetatoken.org/wallet-metadata/v1/data.json"
    );

    const tokens = fetchedTokens.map((obj, ind) => {
      const token =
        data.data.mainnet.tokens[
        Object.keys(data.data.mainnet.tokens).find(
          (id) => id.toLocaleLowerCase() === obj.id
        )
        ];
        
      
      if (token) {
        if (defaultTokens[ind]) {
          defaultTokens[ind].logo = token.logo
        }
        return { ...obj, isSelected: false, logo: token.logo };
      }
      return obj;
    });
    defaultTokens[0].logo = defaultTokens[10].logo
    yield put(fetchTokenListSuccess([...defaultTokens]));
  } catch (error) {
    // Dispatch fail action with the error message
    yield put(fetchTokenListFail(error.message));
  }
}

// Watcher saga
function* tokenSaga() {
  yield takeLatest(FETCH_TOKEN_LIST_REQUEST, fetchTokenList);
}

export default tokenSaga;
