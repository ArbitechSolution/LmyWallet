import React, { useState,useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
// import classes from "../Login/login.module.css";
import {ethers} from "ethers"
// import {useSearchParams} from "react-router-dom"

//export default web3;

function Register() {
  let contractAddress = "0xBF4e4308f18292ba527FcEF840C6d97795a2792b";

  // let [searchParams, setSearchParams] = useSearchParams();
  // const referalLink = searchParams.get("referrallink") || 1;
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [metaMaskId, setMetaMaskId] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isMetaMask, setIsMetaMask] = useState(false);
  const ethereum = window.ethereum

   const connectWalletHandler = () => {
    if (ethereum && ethereum?.isMetaMask) {
      setIsMetaMask(true);
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log("result", result);
          setMetaMaskId('309');
          accountChangedHandler(result[0]);
          //setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setMetaMaskId("");
      setIsMetaMask(false);
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  }; 

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    console.log("new account",newAccount);
    setMetaMaskId(newAccount || '')
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }; 

   const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  ethereum?.on("accountsChanged", accountChangedHandler);
  ethereum?.on("chainChanged", chainChangedHandler);

  const [txs, setTxs] = useState([]);



  let abi = [
    {
      inputs: [
        { internalType: "address", name: "_owner", type: "address" },
        { internalType: "address", name: "_charity", type: "address" },
        { internalType: "address", name: "_burner", type: "address" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "caller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newLimit",
          type: "uint256",
        },
      ],
      name: "SetLoopLimit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "UserAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "Levelno",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "Time",
          type: "uint256",
        },
      ],
      name: "buyLevelEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "UserAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "UserId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "ReferrerAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ReferrerId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "Levelno",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "LevelPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "Time",
          type: "uint256",
        },
      ],
      name: "getMoneyForLevelEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "UserAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "ReferrerAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "Time",
          type: "uint256",
        },
      ],
      name: "regLevelEvent",
      type: "event",
    },
    { payable: true, stateMutability: "payable", type: "fallback" },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "EarnedEth",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "LEVEL_PRICE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "burner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "_level", type: "uint256" }],
      name: "buyLevel",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "charity",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "bool", name: "_lockStatus", type: "bool" }],
      name: "contractLock",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "createdDate",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "currentId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address payable", name: "_toUser", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "failSafe",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" },
      ],
      name: "findFreeReferrer",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getTotalEarnedEther",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "lockStatus",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "loopLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "lostEth",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "profitPcent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "referrerLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "_referrerID", type: "uint256" }],
      name: "regUser",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "_newLimit", type: "uint256" }],
      name: "setLoopLimit",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "userList",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "users",
      outputs: [
        { internalType: "bool", name: "isExist", type: "bool" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "uint256", name: "referrerID", type: "uint256" },
        { internalType: "uint256", name: "currentLevel", type: "uint256" },
        { internalType: "uint256", name: "totalEarningEth", type: "uint256" },
        { internalType: "uint256", name: "directReferral", type: "uint256" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" },
      ],
      name: "viewUpline",
      outputs: [
        { internalType: "address", name: "directRefer", type: "address" },
        { internalType: "address", name: "upline1", type: "address" },
        { internalType: "address", name: "upline2", type: "address" },
        { internalType: "address", name: "upline3", type: "address" },
        { internalType: "address", name: "upline4", type: "address" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "_userAddress", type: "address" },
      ],
      name: "viewUserReferral",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

   const startPayment = async ( setErrorMessage, setTxs, ether, addr ) => {
    try {
      if (!ethereum){
        alert("No crypto wallet found. Please install it.");
        return
      }
      await ethereum.request({ method: 'eth_requestAccounts' }) 
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      
      //  const tx = await signer.sendTransaction({
      //   to: contractAddress,
      //   from:'309',
      //   value: ethers.utils.parseUnits("10",'ether')
      // }); 
      console.log({ ether, addr });
      console.log("tx", metaMaskId);
      //setTxs([tx]);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
  

  

  const handleSubmit = async () => {
   
    setErrorMessage('');
    await startPayment({
    
      setTxs,
      ether: 10,
      addr: '0xBF4e4308f18292ba527FcEF840C6d97795a2792b'
    }); 
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmClose = () => setShow(false);
  const handleConfirmShow = () => setShow(true);

  useEffect(()=>{
    connectWalletHandler()
  },[])
 
  return (
    <div
      // className={classes.mainContainer}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%, 100%",
        width: "100%",
        height: "100vh",
      }}
    > <Modal
  className="text-light"
    show={show} onHide={handleClose}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header style={{backgroundColor:"#0F2F52",border:0}} closeButton>
    
    </Modal.Header>
    <Modal.Body style={{justifyContent:"center",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#0F2F52"}}>
     {/* <h5>your referal id is</h5><h5> {referalLink}</h5> */}
     <button onClick={handleSubmit} style={{backgroundColor:"#42B0E2",borderRadius:"5px",width:"12rem",padding:"0.3rem"}} className='mt-4'>Confirm</button>
     <button onClick={handleConfirmClose} style={{backgroundColor:"#42B0E2",borderRadius:"5px",width:"12rem",padding:"0.3rem"}} className='mt-4'>Cancel</button>

    </Modal.Body>
    
  </Modal>
      {" "}
      <Modal className="border-0" show={showConfirm} onHide={handleConfirmClose}>
        <Modal.Header className="bg-dark text-danger text-center border-0">
          <i
            onClick={handleClose}
            style={{ position: "absolute", right: "10px" }}
            className="fas fa-times"
          ></i>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light " style={{justifyContent:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h3 className="text-center">Disclaimer!</h3>
          <p className="text-right">
            You expressly understand that d-app.network website is only the
            interface to interact with smart contracts on the blockchain namely
            "WYchain" and agree that your use of d-app.network website(s) is at
            your sole risk and that the services are provided "As is" and "As
            available" without warranty of any kind, either expressed or
            implied, that is not expressly stated in the official documentation.
            Additionally no advice or information, whether oral or written,
            obtained by you from members/participants of the d-app community
            shall create any warranty that is not expressly stated in the
            official documentation. In no event shall d-app.network be held
            liable to you or any third party for any damages including, but not
            limited to, indirect, special, incidental or consequential damages
            or other losses (including damages for loss of business, loss of
            profits, lost savings, business interruption or the like), arising
            from the use of website(s), customer products or external links and
            affiliate websites. You, your partners and any third parties, agree
            to indemnify and hold harmless d-app from any damages claimed as a
            result of services, products, information and resources obtained
            from d-app and/or in any event including, but not limited to, spam,
            account hacking, identity theft, virus attack, fraudulent or
            criminal activities (including real, perceived, probable or
            suspected fraud/crime). Dapp shall not be held liable based on any
            theory of liability including breach of contract, breach of
            warranty, tort (including negligence), product liability or
            otherwise, even if members of the d-app community or its
            representatives have been advised of the possibility of such damages
            and even if a remedy set forth by d-app is found to have failed of
            its essential purpose.
          </p>
          <Form style={{alignSelf:"flex-start"}}>
            <Form.Check type={"checkbox"} label={`I agree and accept`} />
          </Form>{" "}
          <Button
            className="border-3 text-center mt-2 mb-3 border-light"
            size="lg"
            style={{
              width: "90%",
              borderRadius: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
            type="button"
          >
            Accept
          </Button>
        </Modal.Body>
      </Modal>
      <Container className="pt-3">
        <Row
          className=" shadow rounded shadow-sm"
          style={{
            marginLeft: "4rem",
            marginRight: "4rem",
            backgroundColor: "#1c01489c",
          }}
        >
          <Col
            className=" text-light text-center border-right"
            style={{ justifyContent: "center", borderRight: "1px solid #fff" }}
          >
            <div
              className="mt-5"
              style={{ justifyContent: "center", display: "inline-block" }}
            >
              <h3>SIGNUP</h3>
              <h6 className="mt-5">
                Automatic login if you have WYlink wallet:
              </h6>
              <Image
                width={60}
                fluid
                // src={require("../../assets/img/wyz_login_icon.png")}
              />
              <p
                className="mt-2 "
                style={{ width: "20rem", textAlign: "center" }}
              >
                Or you can enter manually, enter the number of your WYZ purse
              </p>
            </div>
            <Col>
              <Col>
                {" "}
                <Button
                  className="border-3  border-light"
                  size="lg"
                  style={{
                    width: "90%",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                  type="button"
                  onClick={()=> handleConfirmShow()}
                >
                  Automatic Signup
                </Button>
                <input
                  className="border-3 border-light mt-3"
                  style={{
                    padding: "0.6rem",
                    textAlign: "center",
                    width: "90%",
                    borderRadius: "10px",
                    backgroundImage: "linear-gradient(#a000fe, #aa4de1)",
                    borderColor: "#a000fe",
                    color: "#ffffff",
                  }}
                  type="text"
                  defaultValue={metaMaskId || id
                  }
                  placeholder="Enter WYchain address or systemID"
                />
                <Button
                  className="border-3 mt-3 border-light"
                  size="lg"
                  style={{
                    width: "90%",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                  type="button"
                >
                  To Enter Manually
                </Button>
                <Button
                  onClick={handleShow}
                  className="border-2 mt-3 border-light"
                  size="lg"
                  style={{ width: "40%", borderRadius: "10px" }}
                  type="button"
                >
                  Register
                </Button>
              </Col>
              {/* <input className="mt-4" disabled={true} type={"text"} defaultValue={`Your sponser ID is ${referalLink}`} /> */}

            </Col>
          </Col>
          <Col
            className=" text-light text-center border-left"
            style={{ justifyContent: "center" }}
          >
            <Image
              width={200}
              fluid
              // src={require("../../userAssets/images/logo.png")}
            />
            <h6 className="">Follow us on Telegram</h6>
            <Image
              className="mt-3"
              width={20}
              fluid
              // src={require("../../userAssets/images/telegram.png")}
            />{" "}
            <h6 className="mt-4">Any query you can get support:</h6>
            <Col>
              <Col>
                {" "}
                <Button
                  className="border-1  border-light"
                  size="lg"
                  style={{
                    width: "80%",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    background: "transparent",
                    fontSize: "0.9rem",
                  }}
                  type="button"
                >
                  Support Telegram EN
                </Button>
                <Button
                  className="border-2 mt-3 border-light"
                  size="lg"
                  style={{ width: "40%", borderRadius: "10px" }}
                  type="button"
                >
                  Go To Home
                </Button>
                {ethereum ? (
                  <h6 className="mt-2 text-light"><span className="text-success">{metaMaskId.length > 0 ?'Wallet Connected':'Please connect your wallet'}</span><br />{metaMaskId}</h6>
                ) : (
                  <h6 className="mt-2 text-danger">Please install Metamask!</h6>
                )}
              </Col>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
