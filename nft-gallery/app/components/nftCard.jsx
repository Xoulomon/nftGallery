export const NFTCard = ({nft}) => {
    return(
        <div className="w-1/5 flex flex-col"> 
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-sm" src={nft.image.pngUrl}></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-300 h-110 bg-transparent ">
                <div>
                    <h2 className="text-xl text-gray-900">{nft.contract.name}</h2>
                    <p className="text-gray-600">{nft.tokenId.substr(nft.tokenId.length - 4)}</p>
                    <p className="text-gray-600">{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                </div>
                <div className="flex-grow mt-2">
                    <p className="text-gray-600">
                        {`${nft.description?.substr(0,150)}...`}</p>
                </div>
                <div className="flex justify-center mb-2">
                    <a href={`https://etherscan.io/token/${nft.contract.address}`} className="rounded-m cursor-pointer" target="_blank" rel="noopener noreferrer"><img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" className="h-12 w-12" alt="View On Etherscan"></img></a>
                </div>
            </div>
        </div>
    )
}
