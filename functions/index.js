
const admin = require('firebase-admin');
admin.initializeApp();

const functions = require("firebase-functions");
var Web3 = require('web3');
var provider = 'HTTP://169.233.141.58:7545';
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

      exports.payment= functions.https.onRequest(async(req, res)=>{
 
        res.set('Access-Control-Allow-Origin', '*');
      
        if (req.method === 'OPTIONS') {
          // Send response to OPTIONS requests
          res.set('Access-Control-Allow-Methods', 'GET');
          res.set('Access-Control-Allow-Headers', 'Content-Type');
          res.set('Access-Control-Max-Age', '3600');
          res.status(204).send('');
        } else {
      
      
          const email = req.query.email;
          const price = req.query.price;
          var usersRef = admin.firestore().collection('accountdata').doc(email)
                 
          usersRef.get().then((doc) => {
            if (doc.exists) {
              key = doc.data().publicKey



             var response =  `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
              </head>
              <body>
                <div
                class="metamask-button"
                address="0x2b7dF997E54CD20a9fFa5AC460D0A9FBD5fB0c09"
                amount="0.005"
                success-callback="onSuccess"
                error-callback="onError"
              ></div>
              
              <script>
                window.onSuccess = (transactionHash) => {
                  console.log('Success', transactionHash)
                }
                window.onError = (e) => {
                  console.error('Error', e)
                }
              </script>
                <script src="https://cdn.rawgit.com/pierregoutheraud/metamask-transaction-button/6ebebf41/build/static/js/mtb.js"></script>
              </body</html>`
            

              res.send(response)


            } else {
                
                console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
         
          res.json({result: "Message sent successfully"});
         
         
        }
        
        });
        