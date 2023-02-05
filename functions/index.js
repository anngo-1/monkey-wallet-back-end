
const admin = require('firebase-admin');
admin.initializeApp();

const functions = require("firebase-functions");
var Web3 = require('web3');
var provider = 'HTTP://100.64.52.166:7545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider)
const Accounts = require('web3-eth-accounts')
const accounts = new Accounts(web3Provider)

const cors = require('cors')({origin: true});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.addMessage = functions.https.onRequest(async(req, res)=>{
    const text = req.query.text;
    const result = await admin.firestore().collection('messages').add({"the person who sent this is a baka: ":text});
    res.json({result: "Message sent successfully"});
});


// exports.createWallet= functions.https.onRequest(async(req, res)=>{
//     const text = req.query.text;
//     const result = await admin.firestore().collection('messages').add({"the person who sent this is a baka: ":text});
//     res.json({result: "Message sent successfully"});
// });


exports.createAccount= functions.https.onRequest(async(req, res)=>{
 
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {

    
    const email = req.query.email;

    var usersRef = admin.firestore().collection('accountdata').doc(email)
  
    usersRef.set({
      email: email
    }, {merge: true});
   
    res.json({result: "Message sent successfully"});
   
   
  }
  
  });
  
  
  

  
  exports.sendData= functions.https.onRequest(async(req, res)=>{
   
     res.set('Access-Control-Allow-Origin', '*');
   
     if (req.method === 'OPTIONS') {
       // Send response to OPTIONS requests
       res.set('Access-Control-Allow-Methods', 'GET');
       res.set('Access-Control-Allow-Headers', 'Content-Type');
       res.set('Access-Control-Max-Age', '3600');
       res.status(204).send('');
     } else {
  
  
       const email = req.query.email;
       const walletName = req.query.walletName
       const walletType = req.query.walletType
       const owners = req.query.walletOwners
       
      const wallet = accounts.create()
            
        
      var priv = wallet.privateKey
      var pub = wallet.address

      
        //GENERATE KEYS

       
  
       var usersRef = admin.firestore().collection('accountdata').doc(email)
     
       usersRef.set({
         email: email,
         walletName: walletName,
         walletType: walletType,
         walletOwners: owners,
         publicKey : pub
  
  
       }, {merge: true});
      
       res.json({
        publickey:pub, 
        privatekey:priv}
       );
      
  
     }
     
     });
   

     exports.getData= functions.https.onRequest(async(req, res)=>{
 
      res.set('Access-Control-Allow-Origin', '*');
    
      if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      } else {
        const email = req.query.email;
    
        var usersRef = admin.firestore().collection('accountdata').doc(email)
                
        usersRef.get().then((doc) => {
          if (doc.exists) {
            res.json(doc.data());
          } else {
              
              console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });

       
      }
      
      });

      
exports.walletData= functions.https.onRequest(async(req, res)=>{
 
    // const email = req.query.email;

    //   const publicKey = data.publicKey
        
      // const promise1 = Promise.resolve(web3.eth.getBalance("0x3CEC6907064e716944a833e4e66B464480829e61"))
      
      // promise1.then((value) => {
      //   console.log(value)
      //   res.send(value)
      // })

   
    //   function getBalance (address) {
    //     return new Promise (function (resolve, reject) {
    //       web3.eth.getBalance(address, function (error, result) {
    //         if (error) {
    //           reject(error);
    //         } else {
    //           res.send(resolve(result));
    //           }
    //       })
    //     })
    //   }
  
    //  getBalance("0x3CEC6907064e716944a833e4e66B464480829e61").then((result) => {
    //        console.log('getBalance',result);
    //        res.send(result)
    //   });
   
    const promise1 = Promise.resolve(123);

promise1.then((value) => {
  res.send(value);
  // Expected output: 123
});


      // var balance1 = await web3.eth.getBalance(String(publicKey));
      // const etherValue = await Web3.utils.fromWei(String(balance1), 'ether')
      // res.send({trueValue:etherValue, rounded: Math.round(etherValue) })



  
  });