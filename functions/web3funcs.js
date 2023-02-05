// var Web3 = require('web3');
// var provider = 'HTTP://100.64.48.231:7545';

// var web3Provider = new Web3.providers.HttpProvider(provider);
// const Accounts = require('web3-eth-accounts')
// const accounts = new Accounts(web3Provider)
// var web3 = new Web3(web3Provider);
// const functions = require("firebase-functions");





// exports.sendData= functions.https.onRequest(async(req, res)=>{
 
//    res.set('Access-Control-Allow-Origin', '*');
 
//    if (req.method === 'OPTIONS') {
//      // Send response to OPTIONS requests
//      res.set('Access-Control-Allow-Methods', 'GET');
//      res.set('Access-Control-Allow-Headers', 'Content-Type');
//      res.set('Access-Control-Max-Age', '3600');
//      res.status(204).send('');
//    } else {


//      const email = req.query.email;
//      const walletName = req.query.walletName
//      const walletType = req.query.walletName
//      const owners = req.query.walletOwners
   
//       //GENERATE KEYS

//       const wallet = accounts.create()
     

//       var priv = wallet.privateKey
//       var pub = wallet.address
//      var usersRef = admin.firestore().collection('accountdata').doc(email)
   
//      usersRef.set({
//        email: email,
//        walletName: walletName,
//        walletType: walletType,
//        walletOwners: owners


//      }, {merge: true});
    
//      res.json({result: {
//       priv,pub
//      }});
    
    
//    }
   
//    });
 

// // web3.eth.getBlockNumber().then((result) => {
// //   console.log("Latest Ethereum Block is ",result);
// // });


// // // Variables definition


// //  exports.createTransaction = functions.httpsonRequest(async(req,res)=>{
// //     const privKey = req.get("private_key")
// //     const addressFrom = req.get("addressFrom")
// //     const addressTo = req.get("addressTo")

// //     // Create transaction
// // const deploy = async () => {
// //     console.log(
// //        `Attempting to make transaction from ${addressFrom} to ${addressTo}`
// //     );
 
// //     const createTransaction = await web3.eth.accounts.signTransaction(
// //        {
// //           from: addressFrom,
// //           to: addressTo,
// //           value: web3.utils.toWei('69', 'ether'),
// //           gas: '21000',
// //        },
// //        privKey
// //     );
 
// //     // Deploy transaction
// //     const createReceipt = await web3.eth.sendSignedTransaction(
// //        createTransaction.rawTransaction
// //     );
// //     console.log(
// //        `Transaction successful with hash: ${createReceipt.transactionHash}`
// //     );
// //  };
 
// //  deploy();


// //  })