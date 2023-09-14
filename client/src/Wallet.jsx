import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1-compat"
import toHex from "ethereum-cryptography/utils"

function Wallet({ address, setAddress, balance, setBalance , privateKey, setPrivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = secp.publicKeyCreate(privateKey);
    setAddress(toHex(address))

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type Your Private Key" value={privateKey} onChange={onChange}></input>
      </label>
        <div>
        Address : {address}
        </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
