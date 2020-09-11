


const BnbApiClient = require('../lib/index');

const api = 'https://dex.binance.org'; /// api string


//let privKey = WALLET_BNB_MASTER_PRIVATE; // privkey hexstring (keep this safe)
//log.info(tag,"privKey: ",privKey)

const bnbClient = new BnbApiClient(api);


let addressTo = "bnb1v7wds8atg9pxss86vq5qjuz38wqsadq7e5m2rr"
let amount = 0.0023
let asset = "BNB"
let message = ""

let build_tx = async function(){
  let tag = " | build_tx | "
  try{
    console.log(tag,"checkpoint 1 ")
    await bnbClient.chooseNetwork("mainnet"); // or this can be "testnet"
    console.log(tag,"checkpoint 2 ")

    await bnbClient.setPrivateKey("7df076a806f0a3ea4724d3191ea88009403dcc5020eb71d9daba339766622688");
    console.log(tag,"checkpoint 3 ")

    await bnbClient.initChain();
    const addressFrom = bnbClient.getClientKeyAddress(); // sender address string (e.g. bnb1...)

    console.log(tag,"pre-client: ",{addressFrom, addressTo, amount, asset, message})

    let result = await bnbClient.transfer(addressFrom, addressTo, amount, asset, message, null)
    console.log("signedTxHex: ",result)
    console.log("expected   : ","c201f0625dee0a4a2a2c87fa0a210a1441a3320611caffc31d0148880077f71cfb6509fd12090a03424e4210f8df5012210a147df3840550a997c5e264402642b761958169470f12090a03424e4210f8df5012700a26eb5ae987210290916077c387b262a940380d250fd8151c42abf9d8072397797844fab14924c11240f0f56a86565666c7178b0e10dec501fac1bc5386e71a767437846c37b7c952d9796d30df8144014abecd718acde09699dfe1b92244060a2f5445270b6d59e27418eda1112037")
  }catch(e){
    console.error(e)
  }
}

build_tx()
