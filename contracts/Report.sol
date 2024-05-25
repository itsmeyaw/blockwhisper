// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ERC721 } from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract Report is ERC721 {
    uint256 private _nextTokenId;

    // Storage for report data
    struct ReportData {
        string title;
        string description;
    }

    mapping(uint256 => ReportData) private _reportData;

    constructor() ERC721("Report", "RPT") {}

    function createReport(
        address reporter,
        string memory title,
        string memory description
    ) public returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 20, "Description must be at least 20 characters long");

        uint256 tokenId = _nextTokenId++;
        _safeMint(reporter, tokenId); // Use _safeMint for better safety

        // Store the title and description
        _reportData[tokenId] = ReportData(title, description);

        return tokenId;
    }

    function getTitle(uint256 tokenId) public view virtual returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token"); // Check if token exists
        return _reportData[tokenId].title;
    }

    // Additional helper function to get description
    function getDescription(uint256 tokenId) public view virtual returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        return _reportData[tokenId].description;
    }
}
