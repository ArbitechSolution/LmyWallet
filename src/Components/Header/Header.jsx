import React ,{useState,useEffect} from 'react'
import './Herder.css'
import { loadWeb3 } from "../Api/Api"
import { Link } from 'react-router-dom';

export default function Header() {
    let [btnTxt,setBtntxt]=useState("Connect")
    const getAccount =async()=>{
        let acc= await loadWeb3();
        if(acc=="Wrong Network"){
            setBtntxt("Wrong Network")
        }else if(acc=="No Wallet")
        {
            setBtntxt("No Wallet")
        }else{
            let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
            setBtntxt(myAcc);
        }
    }


    useEffect(() => {
        // creatingSubstrings()

        setInterval(() => {
            getAccount()
          }, 1000);
    }, []);
    return (
        <div>

            <div className="container radius bg-white mt-3 border px-4 mb-3">

                <nav className="navbar navbar-expand-lg navbar-light py-3">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="logo2.png" className="img-fluid logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/token.html">Token</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">NFT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Staking</a>
                                </li>
                                <Link to='/Leader' className='Navtext_d'>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Leaderboard</a>
                                    </li>
                                </Link>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Rewards</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">LMY Wallet</a>
                                </li>
                            </ul>
                            <div className="d-flex d-block-sm">
                                <div id="userWallet" className="my-auto mx-2 w-100-sm"></div>
                                <a href="#" id="loginButton" className="btn w-100 btn-download rounded-pill btn-main btn-md w-100-sm">{btnTxt} </a>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>


        </div>
    )
}
