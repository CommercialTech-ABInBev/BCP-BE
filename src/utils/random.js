export const getHectoliters = (volume, stockName, quantity) => {
    const numberPattern = /\d+/g;
    const letterPattern = /[a-zA-Z]+/g;        
    const stockVolume = volume.match(numberPattern)[0];
    const volumeUnit = volume.match(letterPattern)[0];
    const caseNumber = stockName.match(numberPattern).slice(-2)[0];
    const caseQuantity  = Number(caseNumber.slice(caseNumber.length - 3))

    if (volumeUnit.toLowerCase() === "l") {
      return (stockVolume * caseQuantity * quantity) / 100;
    }
    return (stockVolume * caseQuantity * quantity) / 100000;
  };

export const getVolume = (str) => {
    const index = str.search(/[0-9]/);
    const firstNum = str.slice(index, index + 5);
    return firstNum;
};

export const getCasesToPallet = (container, volume, stockName, cases) => {

    const conversionArray = [...conversion];
    for (const row of conversionArray) {
      const sameContainer = row.container === volume.toLowerCase() ;
      const sameVolume = row.volume === container.toLowerCase();
      console.log(row.container , volume.toLowerCase(),container.toLowerCase(),row.volume, '========sameVolume  sameVolume ');
      if (sameVolume && sameContainer && stockName === "all") {
        return cases / row.casesPerPallet;
      } else if (
        sameVolume &&
        sameContainer &&
        stockName.toLowerCase().includes(stockName)
      ) {
        return cases / row.casesPerPallet;
      }
    }
    return 0;
};

let conversion =  [
    {"volume": "330ml", "container": "can", "brand": "all", "casesPerPallet": 132 },
    {"volume": "500ml", "container": "can", "brand": "all", "casesPerPallet": 88 },
    {"volume": "440ml", "container": "can", "brand": "all", "casesPerPallet": 88 },
    {"volume": "250ml", "container": "pet", "brand": "all", "casesPerPallet": 144 },
    {"volume": "330ml", "container": "pet", "brand": "all", "casesPerPallet": 128 },
    {"volume": "600ml", "container": "rgb", "brand": "all", "casesPerPallet": 90 },
    {"volume": "330ml", "container": "rgb", "brand": "betamalt", "casesPerPallet": 90 },
    {"volume": "375ml", "container": "rgb", "brand": "all", "casesPerPallet": 70 },
    {"volume": "330ml", "container": "rgb", "brand": "grand malt", "casesPerPallet": 70 },
    {"volume": "30l", "container": "keg", "brand": "all", "casesPerPallet": 4 }
  ]