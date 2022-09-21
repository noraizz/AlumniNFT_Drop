const pinataSDK = require('@pinata/sdk');
require('dotenv').config()
const fs = require('fs');

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);



pinata.testAuthentication().then((result)=>{
    console.log(result);
}).catch((err)=>{
    console.log(err);
});


const readableStreamForFile = fs.createReadStream('./images/NFT_DROP_SPECIMEN.png');
const options = { 
    pinataMetadata: {
        name: " Alumni NFT Collection",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};


const pinJSONToIPFS=(body)=>{
    return  pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
    
}




const pinFileToIPFS=()=>{
    
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    return `ipfs/${result.IpfsHash}`
 }).catch((err) => {
     //handle error here
     console.log(err);
 });}

 const getMetadata=async()=>{
     const imageurl=await pinFileToIPFS()
    

     const body = {
        
    description: "Alumni NFT ", 
    external_url: "", 
    image: imageurl, 
    name: "My NFT",
    attributes: [  ]
    };
    // message: 'My NFT', 
    //     description: "Alimni NFT Drop",
    //     image:imageurl

    const metadata=await pinJSONToIPFS(body)
   
    console.log(metadata)

 }

 getMetadata()

 //NFT 1= "https://gateway.pinata.cloud/ipfs/QmaUvyFFhHRxibesw1Yah9s5AS9yeswgLtaSJAQmV7DRXa"
 //NFT2 new="https://gateway.pinata.cloud/ipfs/QmWW1yFH3gv3Moj6nFrLGWN3AVEytULAg2sLksrY64UrnR"