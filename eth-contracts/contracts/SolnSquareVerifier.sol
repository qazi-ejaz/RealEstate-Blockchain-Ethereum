pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SoInSquareVerifier is myToken {
    SquareVerifier public verifierContract;

    constructor(
        address verifierAddress,
        string memory name,
        string memory symbol
    ) public myToken(name, symbol) {
        verifierContract = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct solutions {
        uint256 tokenIndex;
        address tokenAddress;
        //bool isItExist;
        //bool minted;
    }

    // TODO define an array of the above struct
    solutions[] solutionsArray;
    //uint256 public numberOfSolutions = 0;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => solutions) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 tokenIndex, address indexed tokenAddress);

    // TODO Create a function to add the solutions to the array and emit the event

    function AddSolution(
        address _to,
        uint256 _tokenId,
        bytes32 key
    ) public {
        solutions memory _soln = solutions({tokenIndex: _tokenId, tokenAddress: _to});
        solutionsArray.push(_soln);
        uniqueSolutions[key] = _soln;
        emit SolutionAdded(_tokenId, _to);
    }

    function CanMintToken(
        address tokenAddress,
        uint256 _tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        // check if solution is valid
        require(
            verifierContract.verifyTx(a, b, c, input),
            "solution not valid"
        );
        bytes32 key = keccak256(
            abi.encodePacked(a, b, c, input)
        );
        require(
            uniqueSolutions[key].tokenAddress == address(0),
            "Solution already used."
        );

        AddSolution(tokenAddress, _tokenId, key);
    }

    //  Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(
        address tokenAddress,
        uint256 _tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(
            abi.encodePacked(a, b, c, input)
        );
        require(
            uniqueSolutions[key].tokenAddress == address(0),
            "Solution already used."
        );
        require(
            verifierContract.verifyTx(a, b, c, input),
            " solution not valid"
        );

        AddSolution(tokenAddress, _tokenId, key);
        super.mint(tokenAddress, _tokenId);
    }
}
