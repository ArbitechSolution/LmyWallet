import React, { useEffect, useState, useRef } from 'react';
import './mystyle.css'
import Modal from 'react-bootstrap/Modal';
import { loadWeb3 } from "../Api/Api"
import { contractAddress, contractAbi } from "../Constants/constant"
import { toast } from 'react-toastify';

export default function LmyWallet() {
    let recieverAdd = useRef();
    let sendAmount = useRef();
    let refAdd = useRef();
    let textAreaRef = useRef();
    let [userBalance, setUserBalance] = useState();

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);


    let [apperentic, setApperentic] = useState(false);
    let [journey, setJourney] = useState(false);
    let [master, setMaster] = useState(false);
    let [whale, setWhale] = useState(false);
    let [white, setWhite] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = async () => {
        let acc = await loadWeb3();
        refAdd.current.value = acc;
        console.log("itny", acc.length);
        // setShow2(true);
    }

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [copySuccess, setCopySuccess] = useState('');


    function copyToClipboard(e) {

        refAdd.current.select();
        document.execCommand('copy');

        e.target.focus();
        setCopySuccess('Copied!');
    };
    const sendTokens = async () => {
        console.log("CAlled send tokns");
        let acc = await loadWeb3();
        if (acc == "No Wallet" || acc == "Wrong Network") {
            toString.error("Not Connected to right network")
        } else {
            try {

                const web3 = window.web3;
                let userEnteredAdd = recieverAdd.current.value;
                let sendingAmount = sendAmount.current.value;
                let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
                let myBal = await contractOf.methods.balanceOf(acc).call();
                myBal = web3.utils.fromWei(myBal)
                if (userEnteredAdd.length > 10) {
                    if (parseFloat(sendingAmount) > 0) {
                        if (parseFloat(myBal) > parseFloat(sendingAmount)) {
                            await contractOf.methods.transfer(userEnteredAdd, web3.utils.toWei(sendingAmount)).send({
                                from: acc
                            })
                        } else {
                            toast.error("Insufficient balance please recharge")
                        }
                    } else {
                        toast.error("Looks like you forgot to enter sending amount")
                    }
                } else {
                    toast.error("Looks like You Forgot to enter reciever's address")
                }
                setUserBalance(myBal);
                console.log("MyBal =", myBal)
            }
            catch (e) {
                console.log("error in gettting balance data", e)
            }

        }
    }
    const getData = async () => {
        let acc = await loadWeb3();
        if (acc == "No Wallet" || acc == "Wrong Network") {
            console.log("No Wallet Connected Or Wrong Network");
        } else {
            try {
                const web3 = window.web3;
                // ownerAdd.current.value=acc;
                let contractOf = new web3.eth.Contract(contractAbi, contractAddress);
                let myBal = await contractOf.methods.balanceOf(acc).call();
                myBal = web3.utils.fromWei(myBal)
                setUserBalance(myBal);
                if (myBal > 0 && myBal <= 200000) {
                    setApperentic(true)
                    setWhite(false)
                    setMaster(false)
                    setWhale(false)
                    setJourney(false)

                }
                else if (myBal > 200000 && myBal <= 500000) {
                    setJourney(true)
                    setApperentic(false)
                    setWhite(false)
                    setMaster(false)
                    setWhale(false)
                } else if (myBal > 500000 && myBal <= 2000000) {
                    setMaster(true)
                    setJourney(false)
                    setApperentic(false)
                    setWhite(false)
                    setWhale(false)
                } else if (myBal > 2000000 && myBal <= 5000000) {
                    setWhale(true)
                    setMaster(false)
                    setJourney(false)
                    setApperentic(false)
                    setWhite(false)
                } else if (myBal > 5000000) {
                    setWhite(true)
                }
                console.log("MyBal =", myBal)
            }
            catch (e) {
                console.log("error in gettting balance data", e)
            }

        }
    }

    useEffect(() => {
        setInterval(() => {
            getData();
        }, 1000);
    }, []);


    return <div>

        <div class="container px-0 my-4">
            <div class="bg-white bg-gray-gradient radius p-3">
                <div class="row">
                    <div class="col-md-6">
                        <p class="h4 fw-bold">Wallet Balance</p>
                        <p class="h1 fw-bold">{userBalance} LMY</p>
                    </div>


                    {/* <CopyExample/> */}
                    <div class="col-md-6 my-auto">
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn btn-lg text-white radius my-2 bg-purple w-100 btn1" onClick={handleShow1}>
                                    <img src="paper-plane.png" class="img-fluid btn-icon" /> Send LMY</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-lg text-white radius my-2 bg-cyan w-100 btn1" onClick={handleShow2}><img src="inbox.png" class="img-fluid btn-icon" style={{ marginTop: "-7px" }} /> Receive LMY</button>
                                <input
                                    ref={refAdd}
                                    type="text"
                                    placeholder="Address"
                                    // className="bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 xsm:ml-5 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6"
                                    id="__BVID__217"
                                />
                                {

                                    document.queryCommandSupported('copy') &&
                                    <div>
                                        <button onClick={copyToClipboard} className='btn btn-success mt-2'>Copy</button>
                                        {copySuccess}
                                    </div>
                                }




                            </div>
                        </div>
                    </div>
                </div>



                {/* ---------------------------Model Here ------------------- */}


                <div className='bodybg'>

 
                <Modal  show={show1} onHide={handleClose1} animation={false}>
                    <Modal.Header closeButton className='bodybg'>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body className='bodybg'>

                        <div class="form-group">
                            <label for="exampleInputEmail1" className='formlable'>Reciever's Address</label>
                            <input ref={recieverAdd} type="text" class="form-control" aria-describedby="emailHelp" placeholder=" Address" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" className='formlable'>Token value</label>
                            <input ref={sendAmount} type="text" class="form-control" placeholder="Token value" />
                        </div>
                        <br />

                        <button onClick={() => sendTokens()} class="btn btn-primary form-control">Send </button>

                    </Modal.Body>
                    {/* <Modal.Footer>
                        <button variant="secondary" className='btn btn-secondary' onClick={handleClose1}>
                            Close
                        </button>

                    </Modal.Footer> */}
                </Modal>
                </div>

                <Modal show={show2} onHide={handleClose2} animation={false}>
                    <Modal.Header closeButton className='bodybg'>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body className='bodybg'>


                        <div class="form-group">
                            <label for="exampleInputEmail1" className='formlable'>Your address</label>

                            {

                                document.queryCommandSupported('copy') &&
                                <div>
                                    <button onClick={copyToClipboard} className='btn btn-success mt-2'>Copy</button>
                                    {copySuccess}
                                </div>
                            }

                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" className='btn btn-secondary' onClick={handleClose2}>
                            Close
                        </button>

                    </Modal.Footer>
                </Modal>
                <div class="row">
                    <div class="col-md-5 my-4">
                        <div class="bg-white radius p-3">
                            <p class="h3 fw-bold">Current Status</p>
                            {
                                journey ?
                                    <div class="text-center">


                                        <img src="journey.jpeg" class="img-fluid my-3" />
                                        <p class="text-center h3 fw-bold">Journey</p>
                                    </div> : <></>

                            }
                            {
                                apperentic ?
                                    <div class="text-center">


                                        <img src="aperentic.jpeg" class="img-fluid my-3" />
                                        <p class="text-center h3 fw-bold">Apprentice</p>
                                    </div> : <></>
                            }
                            {
                                master ?
                                    <div class="text-center">


                                        <img src="master.jpeg" class="img-fluid my-3" />
                                        <p class="text-center h3 fw-bold">Master</p>
                                    </div> : <></>
                            }
                            {
                                whale ?
                                    <div class="text-center">


                                        <img src="whale.jpeg" class="img-fluid my-3" />
                                        <p class="text-center h3 fw-bold">Whale</p>
                                    </div> : <></>

                            }
                            {
                                white ?
                                    <div class="text-center">


                                        <img src="white.jpeg" class="img-fluid my-3" />
                                        <p class="text-center h3 fw-bold">White Narwhal</p>
                                    </div> : <></>
                            }
                        </div>
                    </div>
                    <div class="col-md-7 my-4">
                        <div class="bg-white radius p-3">
                            <p class="h3 fw-bold">Feedback List</p>

                            <div id="table">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col text-muted">Date</div>
                                            <div class="col text-muted">Restaurant</div>
                                            <div class="col text-muted">Feedback</div>
                                            <div class="col text-muted">Tokens Earned</div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 py-2 pt-4 border-bottom">
                                        <div class="row">
                                            <div class="col">01.01.2022</div>
                                            <div class="col">
                                                <img src="https://mia-prod-s3-cdn.s3.amazonaws.com/wp-content/uploads/2016/02/KFC-Logo.png" class="img-fluid brand-logo" />
                                                <span class="fw-bold">KFC</span>
                                            </div>
                                            <div class="col">
                                                <div>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                </div>
                                                <span class="text-muted review-size">The perfect pizza place!</span>
                                            </div>
                                            <div class="col">
                                                <img src="LOghere.png" class="img-fluid lmy-logo-table" />
                                                <span class="fw-bold">10 LMY</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 py-2 pt-4 border-bottom">
                                        <div class="row">
                                            <div class="col">01.01.2022</div>
                                            <div class="col">
                                                <img src="https://mia-prod-s3-cdn.s3.amazonaws.com/wp-content/uploads/2016/02/KFC-Logo.png" class="img-fluid brand-logo" />
                                                <span class="fw-bold">KFC</span>
                                            </div>
                                            <div class="col">
                                                <div>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                </div>
                                                <span class="text-muted review-size">The perfect pizza place!</span>
                                            </div>
                                            <div class="col">
                                                <img src="LOghere.png" class="img-fluid lmy-logo-table" />
                                                <span class="fw-bold">10 LMY</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 py-2 pt-4 border-bottom-0">
                                        <div class="row">
                                            <div class="col">01.01.2022</div>
                                            <div class="col">
                                                <img src="https://mia-prod-s3-cdn.s3.amazonaws.com/wp-content/uploads/2016/02/KFC-Logo.png" class="img-fluid brand-logo" />
                                                <span class="fw-bold">KFC</span>
                                            </div>
                                            <div class="col">
                                                <div>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                    <i class="fa fa-star text-warning"></i>
                                                </div>
                                                <span class="text-muted review-size">The perfect pizza place!</span>
                                            </div>
                                            <div class="col">
                                                <img src="LOghere.png" class="img-fluid lmy-logo-table" />
                                                <span class="fw-bold">10 LMY</span>
                                            </div>
                                            <br /><br /><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



        <div class="container-fluid bg-dark py-5 footer">
            <div class="container py-5">
                <div class="row">
                    <div class="col-md-3">
                        <a href="https://etherscan.io/address/0x66fd97a78d8 854fec445cd1c80a07896b0b4851f#code#L1" class="text-white fw-bold text_Deco">Smart Contracts Audits</a> <br />
                        <a href="https://www.dropbox.com/s/6cf393rqldfssle/whitepaper%20v4-3.pptx?dl=0" class="text-white fw-bold text_Deco">Whitepaper</a> <br />
                        <a href="https://www.sec.gov/Archives/edgar/data/0001742054/000174205418000001/xslFormDX01/primary_doc.xml" class="text-white fw-bold text_Deco">SEC Registration</a> <br />
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe9iJFIJz0q0JgDUeqf9pxy22XKfdrwbszhUs_aLguIHI_Oaw/viewform" class="text-white fw-bold text_Deco">Token Listing</a> <br />
                    </div>
                    <div class="col-md-3">
                        <a href="#top" class="text-white fw-bold text_Deco">About Us</a> <br />
                        <a href="#partners" class="text-white fw-bold text_Deco">Partners</a> <br />
                        <a href="" class="text-white fw-bold text_Deco">Github</a> <br />
                        <a href="" class="text-white fw-bold text_Deco">FAQ</a> <br />
                    </div>
                    <div class="col-md-3">
                        <a href="mailto:info@lunchmoney.io" class="text-white fw-bold text_Deco">Business Enquiries</a> <br />
                        <a href="https://www.dropbox.com/s/inbrtdn9fno4k9u/lmyprivacy-policy.pdf?dl=0" class="text-white fw-bold text_Deco">Privacy &amp; Data Policy</a> <br />
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2zJj4yVA_0yd7Wjo0_y5iY20XyEpZyTzbWYkrA_ksZ3Dlg/viewform" class="text-white fw-bold text_Deco">Restaurant Feedback</a> <br />
                        <a href="https://t.me/lunchmoneytoken" class="text-white fw-bold text_Deco">Ambassador Program</a> <br />
                    </div>
                    <div class="col-md-3">
                        <p class="text-white fw-bold text_Deco h4 contact-information-footer-p">Contact Information</p>
                        <a href="mailto:info@lunchmoney.io" class="text-white h5">
                            <i class="far fa-envelope"></i> support@lunchmoney.io
                        </a>
                        <div class="mt-3">
                            <a href="https://m.facebook.com/LunchMoneyToken/" class="d-inline-block h5 mx-2">
                                <i class="fab fa-facebook-f text-white"></i>
                            </a>
                            <a href="https://twitter.com/lunchtoken" class="d-inline-block h5 mx-2">
                                <i class="fab fa-twitter text-white"></i>
                            </a>
                            <a href="https://instagram.com/lunch_token" class="d-inline-block h5 mx-2">
                                <i class="fab fa-instagram text-white"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-black right-footer py-2 pt-4">
            <p class="text-white fw-bold text_Deco text-center">
                © 2021 Copyright Lunch Money. All Rights Reserved.
            </p>
        </div>
    </div>;
}
