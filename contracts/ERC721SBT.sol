// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SoulBoundNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);
    address public creator;

    constructor() ERC721("Alumni", " NFT") {}

    // safeMint  function will be used for minting and then awarding NFT to the targeted address of the alumni
    function safeMint(address to, string memory uri) public onlyOwner {
        creator = msg.sender;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // we can mint NFTS in batch to different addresses and can also be revoked whenever the nethermind/ creator of the NFT wants
    function batchMint(address[] memory to, string[] memory uri)
        public
        onlyOwner
    {
        require(
            to.length == uri.length,
            "alumnis and uri of NFT's must be of same size"
        );
        for (uint256 i = 0; i < to.length; i++) {
            safeMint(to[i], uri[i]);
        }
    }

    //burn Function is in working condition it depends on the use case weather we are giving permission for burning the NFT to the alumnus

    // function burn(uint256 tokenId) external {
    //     require(
    //         ownerOf(tokenId) == msg.sender,
    //         "Only owner of the token can burn it"
    //     );
    //     _burn(tokenId);
    // }

    // revoke function
    function revoke(
        address from,
        address to,
        uint256 tokenId
    ) external onlyOwner {
        safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        //require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _safeTransfer(from, to, tokenId, data);
    }

    function _beforeTokenTransfer(
        address,
        address,
        uint256
    ) internal view override {
        // require(address(0) != from );
        require(msg.sender == creator, "Not allowed to transfer token");
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    // this  function is working and can be added as a feature it will renounce the owner of NFT

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
