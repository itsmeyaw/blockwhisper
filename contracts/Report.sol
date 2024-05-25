// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "./IProveChecker.sol";
import {HCaptchaProveChecker} from "./HCaptchaProveChecker.sol";

contract Report is ERC721 {
    uint256 private _nextTokenId;
    IProveChecker private _proofChecker;

    // Storage for report data
    struct ReportData {
        string title;
        string description;
        string proofOfHumanWork;
    }

    mapping(uint256 => ReportData) private _reportData;
    mapping(uint256 => uint16) private _upVote;
    mapping(uint256 => uint16) private _downVote;

    constructor(address proofChecker) ERC721("Report", "RPT") {
        _proofChecker = new HCaptchaProveChecker(proofChecker);
    }

    function createReport(
        string memory title,
        string memory description,
        string memory proof
    ) public returns (uint256) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(
            bytes(description).length > 20,
            "Description must be at least 20 characters long"
        );
        require(
            _proofChecker.checkProof(msg.sender, proof),
            "Proof does not exists on chain yet"
        );

        uint256 tokenId = _nextTokenId++;

        // Use _safeMint for better safety
        _safeMint(msg.sender, tokenId);

        // Store the title and description
        _reportData[tokenId] = ReportData(title, description, proof);

        // Store default value for upvote and downvote
        _upVote[tokenId] = 0;
        _downVote[tokenId] = 0;

        return tokenId;
    }

    function getTitle(
        uint256 tokenId
    ) public view virtual returns (string memory) {
        require(
            _ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        ); // Check if token exists
        return _reportData[tokenId].title;
    }

    // Additional helper function to get description
    function getDescription(
        uint256 tokenId
    ) public view virtual returns (string memory) {
        require(
            _ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _reportData[tokenId].description;
    }

    function getReports(
        uint8 amount,
        uint8 skip
    ) public view returns (ReportData[] memory, uint256[] memory) {
        uint256 totalSupply = _nextTokenId;

        // Search for start and end index and ensure both are not negative
        uint256 startIndex = totalSupply > skip ? totalSupply - 1 - skip : 0;
        uint256 endIndex = startIndex >= amount ? startIndex - amount : 0;

        ReportData[] memory reports = new ReportData[](
            startIndex - endIndex + 1
        ); // +1 to include startIndex
        uint256[] memory tokenIds = new uint256[](startIndex - endIndex + 1);
        uint256 counter = 0;

        for (uint256 i = startIndex; i >= endIndex; i--) {
            if (_ownerOf(i) != address(0)) {
                // Ensure the token exists before adding to the result
                reports[counter] = _reportData[i];
                tokenIds[counter] = i;
                counter++;
            }
        }

        return (reports, tokenIds);
    }
}
