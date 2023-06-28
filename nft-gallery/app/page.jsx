"use client";
import { get } from "https";
import { useState } from "react";
import {NFTCard} from './components/nftCard';

export default function Home() {
  
  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [collectionCheck, setCollectionCheck] = useState(false);
  const [Nfts, setNfts] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageKey, setPagekey] = useState('');
  const [pgBtn, setPgBtn] = useState(false);
  let nfts;

  const fetchNfts = async() =>{
    console.log("fetching NFTs");
      const apiKey = "g6Ud5unb96FP4GcouEv6mJQ72o191yyG";
      //https://eth-mainnet.g.alchemy.com/nft/v3/g6Ud5unb96FP4GcouEv6mJQ72o191yyG/getNFTsForOwner?owner=vitalik.eth&withMetadata=true&pageKey=MHgwMDcwM2Y5YjExZjJhYzAyZDM5MWExMWU3Yjk3YzZlZTgwY2Q4NTYzOjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNTpmYWxzZQ==&pageSize=100
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner`;
      const options = {method: 'GET', headers: {accept: 'application/json' }};

    if (!collection.length){
      const fetchURL = `${baseURL}?owner=${wallet}&withMetadata=true&pageKey=${pageKey}&pageSize=${limit}`;
      nfts = await fetch(fetchURL,options)
      .then(response => response.json())
      .catch(err => console.error(err));

    }else{
      console.log("fetching nfts for collection owned by address");
      //https://eth-mainnet.g.alchemy.com/nft/v3/g6Ud5unb96FP4GcouEv6mJQ72o191yyG/getNFTsForOwner?owner=vitalik.eth&contractAddresses[]=0xe785E82358879F061BC3dcAC6f0444462D4b5330&withMetadata=true&pageKey=0o0&pageSize=50
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses[]=${collection}&withMetadata=true&pageSize=${limit}`;
      nfts = await fetch(fetchURL,options)
      .then(response => response.json())
      .catch(err => console.error(err));

    }

    if(nfts){
      console.log(`nfts owned : ${nfts.ownedNfts}`);
      setNfts(nfts.ownedNfts);
      if(nfts.pageKey != null){
        setPagekey(nfts.pageKey);
        setPgBtn(true);
      };
    }

  }

  const getNftsForCollection = async( ) =>{
    console.log("fetching Collection Nfts");
    const apiKey = "g6Ud5unb96FP4GcouEv6mJQ72o191yyG"
    // https://eth-mainnet.g.alchemy.com/nft/v3/g6Ud5unb96FP4GcouEv6mJQ72o191yyG/getNFTsForContract?contractAddress=0xe785E82358879F061BC3dcAC6f0444462D4b5330&withMetadata=true&startToken=0x0000000000000000000000000000000000000000000000000000000000000032&limit=50
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForContract`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    if(collectionCheck){
      console.log("Fetching nfts in a collection");
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true&startToken=${pageKey}&limit=${limit}`;
      nfts = await fetch(fetchURL,options)
      .then(response => response.json())
      .catch(err => console.error(err));
    }

    if(nfts){
      console.log(`nfts owned : ${nfts.nfts}`);
      setNfts(nfts.nfts);
      if(nfts.pageKey != null){
        setPagekey(nfts.pageKey);
        setPgBtn(true);
      };
    };
           
  }


  return (
    <div className="flex flex-col justify-between p-12">
      <div className="flex flex-col justify-center py-8 gap-y-3">
        <div className='flex flex-col w-full justify-center  items-center gap-y-2'>
          <input className="w-2/5 bg-slate-200 p-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50 " type={"text"} onChange={(e)=>{setWallet(e.target.value)}} value={wallet}  placeholder='Add your wallet address' disabled={collectionCheck} ></input>
          <input className="w-2/5 bg-slate-200 p-2 rounded-lg text-gray-800 focus:outline-blue-300 " type={"text"} onChange={(e)=>{setCollection(e.target.value)}} value={collection}  placeholder='Add the collection address'></input>
          <label><input type={"checkbox"} onChange={(e)=>{setCollectionCheck(e.target.checked)}} name="collectionCheck"></input>  Collection</label>
          <button className="bg-blue-400 text-white px-4 py-2 mt-3 rounded-sm w-1/5"
          onClick={
            () => {
            if(collectionCheck){
              getNftsForCollection();
            }else fetchNfts();
            }
          } >Let's Go</button>
          <div className="flex flex-wrap gap-y-12 mt-4 gap-x-3 justify-center w-5/6">
            {
            Nfts.length && Nfts.map(nft =>{
              return(
                  <NFTCard nft={nft} ></NFTCard>
              )
            })
            }
            {
            pgBtn && <button className="bg-gray-600 text-white px-4 py-2 mt-3 rounded-sm w-2/5" onClick={
              () => {
                if(collectionCheck){
                  getNftsForCollection();
                }else fetchNfts();
                }
            } >Next Page &gt; &gt;  </button>
            }
          </div> 
        </div>
        
      </div>
    </div>
  )

}
