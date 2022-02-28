import React,{useState}from 'react'
import './Leaderboard.css'

import { contractAddress, contractAbi } from "../Constants/constant"
import { useEffect } from 'react';
import Web3 from "web3";
// const webSupply="https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const webSupply = new Web3("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

export default function Leaderboard() {
    let[btnTxt,setBtnTxt] =useState("ViewAll");
    let myArray =["0x9eac7b5aa11ff9417ab586b233aac4d353aa530e",

        "0x501ee333ef3246bb977e7056d1e8f78155481782",
        "0xe2e280cbc2bbde6e3d98bd35c6fc01f7ac2caa50",
        "0x957cd4ff9b3894fc78b5134a8dc72b032ffbc464",
        "0x58d9dde30709deba3a1121fb7183b8f252afaad3",
        "0xd77459d138f27a20ff23e1132c48d6bdbd9d8dea",
        "0x072a843775352f82570f42ac666ced9f22a607fe",
        "0xebbfb272eacaea8c3f68c28995d16db58fb38d2f",
        "0xa82e30f01a4e2f526a2b7a268e73078a74448af8",
        "0x6b0b5260bd86e1f9ceb91c428496a2bf352ee087",
        "0xbfa1fa0acefa317cfed07e375a6677677bfecb5c",
        "0x96fc196640704f6ef86421d662065a45e59f59b5",
        "0x4a340ffdcc24d9dd6162130b20cabcb8ffafdccf",
        "0xfef148f389db4b2573ffa3d1702530f6a2abadad",
        "0x2f0c424c5ae020396682eddbbbc75ce3b41158cc",
        "0x95551cf63f5794287ab2ab4ffdb3b07b3df31702",
        "0x62614e815b3b811c534386c435a9b4af491a0ed8",
        "0xd1660a90dfa45e36efe4e3743fb3ac8cd9f6ac88",
        "0xa68390e7556d0d47406379de0ebadee71ba332de",
        "0x33a8f48ee2214dd1df8b22a8117ff270e3065661",
        "0xbc0fe2faf1385e24531bc9340b81ff934403f0a6",
        "0xab9d1d684f6273a0c7ef8f8a5e17b0a175d9db08",
        "0x8563f70bdee5a7a9e2cc66a7c249cb4454ffb2cb",
        "0x337dfb988cf2f1b1a48401420ce92f45d9b10d96",
        "0xf180c218c9330f37d033cc90a49474db50221f77",
        "0x6124cff2ee711072b44f1d11a77ab70e817eb7b6",
        "0xe74d0dfbd7f31cf9221b9b0017435a66cd3ee663",
        "0xfdd75c1c8d92c8a3cffba93c8fe520873399fec5",
        "0x34603a40968890f40edede3e236d02f5902dd14f",
        "0x413ced62d1a1c6ed4d63d150bd3518a202d52bc0",
        "0xdf8739934bfca95f9b07e35ca260833d656fdc82",
        "0x87236fdc6efd045997fbba98f864b4166ff1460f",
        "0x51aeb51d27224c28e1846f1cd4536ca91066ddf0",
        "0x109f58a3b1ea74bd43c1b20e09ef73e635dffa93",
        "0x348c460fe770de566c433d3184423a5880d0e4ed",
        "0xafefbd6fe602bb88ff7e67df7296b89cdadfd0de",
        "0xf5af8b3ddda502dc50f609a8de0de5282fea8462",
        "0xb5408cbec8a6d7054cf506c1aa4f5c6e2300244e",
        "0x7c9eb80040993b5393709262cefb8976b3b6589d",
        "0x22970849e760c54d0a8adfd597a007967991aff1",
        "0xc048e0f581ede3a287225eebbcece4567945daaa",
        "0x802b37b559797797cbf1694d9320f2e59035f1c9",
        "0x2fef3f14796b1c1e008ccd322cc2210e39cbd5d4",
        "0x45eba5b2667a9efc63523acf07d333d71d56e63b",
        "0xda7a7f6839c7984dcbbb995bdb2aea1f0f618883",
        "0xcac88c05aca7456faca8a4f0a472ed00a2136d9e",
        "0x82b59894ad422ce99c49c6aa68a31f229bd5e8d9",
        "0x4138e34e5f688915f7b7a31b64da0fbbac8d1413",
        "0xcb6b4d5bb7193463571bcd059602b469c4b6d671",
        "0xc4181472a6d4b681dab1b59bd058b83e676f249a",
        "0x22dbeef1fb633780de50aec0d036a31dbfa514bd",
        "0x1ace7abbe68210a9fbe1c6c30019781f3e2eaf86",
        "0x68cdfc050a3aa8f00b9a16b754f8a87e346753ba",
        "0x4600d9bf96a57cc1bee89ad2061672f8a7261797",
        "0xd95d973bb6e9dd179a1f05e4b7b6dec4080a270c",
        "0x1307b8d863e0cfc147ad0953613f98bbdf95be41",
        "0x2f4e8e2342dea590485e9a6a450a150600e0bf44",
        "0xc14a5fbc845bf2ff821a74a251d3317e36e2db04",
        "0xc750df076b9e7a766d0f34f1b0b41c061d4abc9d",
        "0xc31c5bb90166a8c709197641abd032e5dff0731f",
        "0x28f3af0539106a580740dcfeb34b1f785308445f",
        "0x06a7acf9caf0b3dfc96bb00703c1a923f5ed4c01",
        "0xb8f9b20b15fd45400d6f679347bd83184d67a363",
        "0x1597d1c3aeb4e98dbd4e0eab5f0373108d7ff35e",
        "0xf82dafee37547ac7424be3bea3da7a61e5b2c4ae",
        "0xff48be3e1637b996b8eb75273b53940f2737d1ad",
        "0x84910556ef3b698e9120b6121d64f964bd779586",
        "0xf4baba092bb9aaf76e0c03b856398b9ebed0819f",
        "0xf15ac4a0d0c036d6f7d79641135328714e208e0a",
        "0x4372f1c068a22111d4de7e0e61ab328b54f8813e",
        "0x156c9257a7e71967c79b621c805fe213b05e0d6f",
        "0x9b3a12ce4b914f3f1aabd639a6ace57199143593",
        "0xb1c792d7ae1b7bedb47c4b5430b84016b0036827",
        "0x66a56363d3b9abbfc84188e14b8769c839189626",
        "0x09161bdd671defc6f110dd68e8a98b3e140eb1d7",
        "0x7e0c63b97b919f330f6cbbb37615fbc6a522c1df",
        "0x549cd11ea17710002dd94b4e63b13461a546047a",
        "0x82fe4686bc8b2d2eabe8f969a68e7fe5372e771d",
        "0xc44ec4cac5921ea47cd4e85a2b3b18907f1b615b",
        "0x1c354da1044fa00f08e5588d18c256d88c49de60",
        "0x7cdab637674138213416b5424d5411a97c69a87b",
        "0xbc3b20e50892fd557e162cf042119e8c39c69049",
        "0x8ca10e074dea220860cf9d8581a3881e1881a27c",
        "0xa930251ac9a83f939739d399eca988d74f86336b",
        "0xfc5a77ce1eec9da6aefe484c7467c5c7d361b114",
        "0x7b2a7ed1b1c603261a9c894f823b9b5cfd04c2bb",
        "0xb6994ee6bab9773e7b701984c76009706f1f932d",
        "0x7b00bcf548a069906f654627c3e04795357d8299",
        "0x593244bc9029a50e7f8ad7ac40c459c322106698",
        "0x61c9f4cca679b4e1bf27f2f24291431ba55f5992",
        "0x5040ecf05feaf209dd3b1b21da7505fa9827f7e8",
        "0xae32adc07bacba04b356d8063fd0ee0dd2caf94b",
        "0x6f1af2eeab8ba073d674dbd1d6d2f82996504133",
        "0x6137a783f915ea6f3d623ae9d031e65b9d7baadf",
        "0x382ffce2287252f930e1c8dc9328dac5bf282ba1",
        "0x1cf1269ecc7cd649c423090cc3e8bf9b924e22f7",
        "0x17c218e18ebf63f5abd06ce7ea0bcc3d1ab0f127",
        "0xf0bc763e0a6af4784a36fa102220ff60ec651f9e",
        "0xa10b83be185aa7a1b21fa1a77d3422e7d977c0fc",
        '0xd2565aae35259a8bd71365c03b3b753a6788d37d',
        
        ]
        let [balanceArray,setBalanceArray]=useState([]);
        let [imgArray, setImgArray ]=useState([]);
        let [limit,setLimit] =useState(10);
        const viewAll =()=>{
            if(btnTxt=="ViewAll")
            {
                setLimit(100);
                setBtnTxt("ViewLess")
            }else if(btnTxt=="ViewLess"){
                setBtnTxt("ViewAll")
                setLimit(10)
            }
        }
        let subStringArray =['0x9e...530e', '0x50...1782', '0xe2...aa50', '0x95...c464', '0x58...aad3', '0xd7...8dea', '0x07...07fe', '0xeb...8d2f', '0xa8...8af8', '0x6b...e087', '0xbf...cb5c', '0x96...59b5', '0x4a...dccf', '0xfe...adad', '0x2f...58cc', '0x95...1702', '0x62...0ed8', '0xd1...ac88', '0xa6...32de', '0x33...5661', '0xbc...f0a6', '0xab...db08', '0x85...b2cb', '0x33...0d96', '0xf1...1f77', '0x61...b7b6', '0xe7...e663', '0xfd...fec5', '0x34...d14f', '0x41...2bc0', '0xdf...dc82', '0x87...460f', '0x51...ddf0', '0x10...fa93', '0x34...e4ed', '0xaf...d0de', '0xf5...8462', '0xb5...244e', '0x7c...589d', '0x22...aff1', '0xc0...daaa', '0x80...f1c9', '0x2f...d5d4', '0x45...e63b', '0xda...8883', '0xca...6d9e', '0x82...e8d9', '0x41...1413', '0xcb...d671', '0xc4...249a', '0x22...14bd', '0x1a...af86', '0x68...53ba', '0x46...1797', '0xd9...270c', '0x13...be41', '0x2f...bf44', '0xc1...db04', '0xc7...bc9d', '0xc3...731f', '0x28...445f', '0x06...4c01', '0xb8...a363', '0x15...f35e', '0xf8...c4ae', '0xff...d1ad', '0x84...9586', '0xf4...819f', '0xf1...8e0a', '0x43...813e', '0x15...0d6f', '0x9b...3593', '0xb1...6827', '0x66...9626', '0x09...b1d7', '0x7e...c1df', '0x54...047a', '0x82...771d', '0xc4...615b', '0x1c...de60', '0x7c...a87b', '0xbc...9049', '0x8c...a27c', '0xa9...336b', '0xfc...b114', '0x7b...c2bb', '0xb6...932d', '0x7b...8299', '0x59...6698', '0x61...5992', '0x50...f7e8', '0xae...f94b', '0x6f...4133', '0x61...aadf', '0x38...2ba1', '0x1c...22f7', '0x17...f127', '0xf0...1f9e', '0xa1...c0fc', '0xd2...d37d'];
        const getUserData=async()=>{
            
            try{
                let contractOf = new webSupply.eth.Contract(contractAbi, contractAddress);
                let length =myArray.length;
                let sampleArray=[]
                let myImageArray=[]
                console.log("Length",contractOf);
                for (let i=0; i<length; i++){
                    let balance = await contractOf.methods.balanceOf(myArray[i]).call();
                    balance = webSupply.utils.fromWei(balance)
                    balance =parseInt(balance)
                    console.log("Balance",balance)
                    sampleArray.push(balance);


                    if (balance > 0 && balance <= 200000) {
                    myImageArray.push("apprentice-level.png")
    
                    }
                    else if (balance > 200000 && balance <= 500000) {
                       myImageArray.push("journey-man.png")
                    } else if (balance > 500000 && balance <= 2000000) {
                       myImageArray.push("master-level.png")

                    } else if (balance > 2000000 && balance <= 5000000) {
                        
                        myImageArray.push("whale-level-removebg-preview.png")

                    } else if (balance > 5000000) {
                       myImageArray.push("white-removebg-preview.png")

                    }
                }
                setBalanceArray(sampleArray)
                setImgArray(myImageArray);

            }catch(e){
                console.log("error while getting array data",e)
            }
        }
        const creatingSubstrings =()=>{
            let length =myArray.length;
            for(let i=0; i<length; i++){
                let sub =myArray[i];
                let myAsubString = sub?.substring(0, 4) + "..." + sub?.substring(sub?.length - 4);
                subStringArray.push(myAsubString);
                
               
            }
        }
        console.log("balance array",balanceArray)

        useEffect(() => {
            // creatingSubstrings()

            setInterval(() => {
                getUserData()
              }, 1000);
        }, []);
    return (
        <div>

            <div class="container px-0 my-4">
                <p class="text-center h1 fw-bold text-dark mb-4">Leaderboard</p>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="bg-gray-super-light radius border p-3">
                            <div class="row justify-content-center">
                                <div class="col-lg-12">
                                    
                                            {
                                                myArray.slice(0,limit).map((items,index)=>{
                                                    return(
                                                        <div class="bg-blue p-2 w-100 rounded-pill px-3 my-3">
                                                        <div class="row flex-nowrap">
                                        <div class="col-md-6 w-50 my-auto">
                                                           <span>
                                                            <i class="fa-solid fa-chevron-up text-success"></i>

                                                        </span>
                                                        <span class="text-white fw-bold me-2">{index})</span>
                                                        <span>
                                                        <img src='activeStatus-removebg-preview.png' className='me-2' style={{borderRadius :"50%"}} width="20px"/>
                                                        </span>
                                                        <span class="text-white fw-bold me-5">{subStringArray[index]}</span>
                                                    </div>
                                                    
                                                    <div class="col-md-6 w-80 my-auto d-flex justify-content-between">
                                                        <span class="text-white">
                                                            <span className="fw-bold">{balanceArray[index]}</span> <small  className="fw-bold ">LMY</small>
                                                        </span>
                                                        <span>
                                                            <img src={imgArray[index]} width="20%" class="img-fluid leaderboard-side-icon" />
                                                        </span>
                                                    </div> 
                                                    </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                    <hr />
                                    <div class="text-center">
                                        <button onClick={()=>viewAll()} class="btn">{btnTxt}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <div class="container wide-container">
                <p class="text-center h1 fw-bold text-dark my-5">Rankings Explained</p>
                <div class="row justify-content-center pb-5">
                    <div class="col-md-2 mb-3">
                        <div class="bg-gray-light radius p-3">
                            <div class="text-center">
                                <img src="apprentice-level.png" class="img-fluid level-badge" />
                            </div>
                            <p class="text-center h3 headingere fw-bold text-dark">Apprentice</p>
                            <div class="text-center">
                                <small class="text-center text-dark">1 LMY to 200,000 LMY</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 mb-3">
                        <div class="bg-gray-light radius p-3">
                            <div class="text-center">
                                <img src="journey-man-level.png" class="img-fluid level-badge" />
                            </div>
                            <p class="text-center h3 headingere fw-bold text-dark">Journeyman</p>
                            <div class="text-center">
                                <small class="text-center text-dark">200,000 LMY to 500,000 LMY</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 mb-3">
                        <div class="bg-gray-light radius p-3">
                            <div class="text-center">
                                <img src="master-level.png" class="img-fluid level-badge" />
                            </div>
                            <p class="text-center h3 headingere fw-bold text-dark">Master</p>
                            <div class="text-center">
                                <small class="text-center text-dark">500,000 LMY to 2,000,000 LMY</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 mb-3">
                        <div class="bg-gray-light radius p-3">
                            <div class="text-center">
                                <img src="whale-level.png" class="img-fluid level-badge" />
                            </div>
                            <p class="text-center h3 headingere fw-bold text-dark">Whale</p>
                            <div class="text-center">
                                <small class="text-center text-dark">2,000,000 LMY to 5,000,000 LMY</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 mb-3">
                        <div class="bg-gray-light radius h-100" style={{ backgroundColor: "#7c7c7c" }}>
                            <img src="Locked.png" class="img-fluid" />
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


        </div>
    )
}
