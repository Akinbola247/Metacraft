import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [owner, setOwner] = useState(undefined);

  const contractAddress = "0x5e747BDe5bA807d938304aEb36db8416a934504e";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/TQWSoU70ZZaxxHyjFF9ywDNU1TZPZRsn');
      const Contract = new ethers.Contract(contractAddress, atmABI, provider);
     setBalance((await Contract.getMycount()).toNumber());
    }
  }
  const getOwner = async() => {
    if (atm) {
      const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/TQWSoU70ZZaxxHyjFF9ywDNU1TZPZRsn');
      const Contract = new ethers.Contract(contractAddress, atmABI, provider);
     setOwner((await Contract.getOwner()));
    }
  }

  const update = async() => {
    if (atm) {
      console.log(atm)
      let tx = await atm.updatecount();
      await tx.wait()
      getBalance();
    }
  }

  const unpause = async() => {
    if (atm) {
      let tx = await atm.activateContract();
      await tx.wait()
    }
  }

  const pause = async() => {
    if (atm) {
      let tx = await atm.deactivateContract();
      await tx.wait()
    }
  }

  const downgrade = async() => {
    if (atm) {
      let tx = await atm.downgradeCount();
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
      getOwner();
    }

    console.log(balance)

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={update}>Update count</button>
        <button onClick={downgrade}> downgrade count</button>
        <p>Contract Owner: {owner}</p>
        <button onClick={pause}>Pause contract</button>
        <button onClick={unpause}> Unpause contract</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
