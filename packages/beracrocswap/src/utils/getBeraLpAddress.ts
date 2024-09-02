// import { crocDexAddress } from "@bera/config";
import {
  beraTokenAddress,
  crocDexAddress,
  nativeTokenAddress,
} from "@bera/config";
import { ethers } from "ethers";
import { keccak256 } from "ethers/lib/utils";

export const CREATION_CODE =
  "0x6101006040523480156200001257600080fd5b50604080518082019091526006815265098a05a84caf60d31b602082015260126001620000408382620001a6565b5060ff81166080524660a0526200005662000065565b60c05250503360e052620002f0565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f600060405162000099919062000272565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200012c57607f821691505b6020821081036200014d57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001a157600081815260208120601f850160051c810160208610156200017c5750805b601f850160051c820191505b818110156200019d5782815560010162000188565b5050505b505050565b81516001600160401b03811115620001c257620001c262000101565b620001da81620001d3845462000117565b8462000153565b602080601f831160018114620002125760008415620001f95750858301515b600019600386901b1c1916600185901b1785556200019d565b600085815260208120601f198616915b82811015620002435788860151825594840194600190910190840162000222565b5085821015620002625787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000808354620002828162000117565b600182811680156200029d5760018114620002b357620002e4565b60ff1984168752821515830287019450620002e4565b8760005260208060002060005b85811015620002db5781548a820152908401908201620002c0565b50505082870194505b50929695505050505050565b60805160a05160c05160e0516113ae6200033f600039600081816102b5015281816104890152818161086b0152610913015260006107fe015260006107c9015260006101e101526113ae6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80637ecebe00116100ad578063b1dd61b611610071578063b1dd61b6146102a7578063c45a0155146102b0578063c55dae63146102d7578063d505accf146102ea578063dd62ed3e146102fd57600080fd5b80637ecebe001461025057806393835c1e1461027057806395d89b41146102835780639b503daf1461028b578063a9059cbb1461029457600080fd5b806323b872dd116100f457806323b872dd146101c9578063313ce567146101dc5780633644e51514610215578063668e2cdb1461021d57806370a082311461023057600080fd5b806306fdde0314610131578063095ea7b31461014f5780631794bb3c1461017257806318160ddd14610187578063217a4b701461019e575b600080fd5b610139610328565b6040516101469190610e18565b60405180910390f35b61016261015d366004610e67565b6103b6565b6040519015158152602001610146565b610185610180366004610e91565b610423565b005b61019060025481565b604051908152602001610146565b6008546101b1906001600160a01b031681565b6040516001600160a01b039091168152602001610146565b6101626101d7366004610e91565b6106e5565b6102037f000000000000000000000000000000000000000000000000000000000000000081565b60405160ff9091168152602001610146565b6101906107c5565b61016261022b366004610edf565b610820565b61019061023e366004610f6c565b60036020526000908152604090205481565b61019061025e366004610f6c565b60056020526000908152604090205481565b61016261027e366004610edf565b6108c8565b610139610963565b61019060065481565b6101626102a2366004610e67565b610970565b61019060095481565b6101b17f000000000000000000000000000000000000000000000000000000000000000081565b6007546101b1906001600160a01b031681565b6101856102f8366004610f8e565b6109d6565b61019061030b366004611001565b600460209081526000928352604080842090915290825290205481565b6000805461033590611034565b80601f016020809104026020016040519081016040528092919081815260200182805461036190611034565b80156103ae5780601f10610383576101008083540402835291602001916103ae565b820191906000526020600020905b81548152906001019060200180831161039157829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906104119086815260200190565b60405180910390a35060015b92915050565b826001600160a01b0316826001600160a01b03161161047e5760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b2102a37b5b2b7102830b4b960711b60448201526064015b60405180910390fd5b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104c65760405162461bcd60e51b81526004016104759061106e565b60008080546104d490611034565b80601f016020809104026020016040519081016040528092919081815260200182805461050090611034565b801561054d5780601f106105225761010080835404028352916020019161054d565b820191906000526020600020905b81548152906001019060200180831161053057829003601f168201915b50505050509050836001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa9250505080156105b357506040513d6000823e601f3d908101601f191682016040526105b0919081019061109f565b60015b1561064457836001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa92505050801561061757506040513d6000823e601f3d908101601f19168201604052610614919081019061109f565b60015b1561064257818160405160200161062f92919061114c565b6040516020818303038152906040529250505b505b6040516bffffffffffffffffffffffff19606086811b82166020840152602d60f81b603484015285901b1660358201526202d4c560ec1b604982015261069c90604c0160405160208183030381529060405282610c1a565b600780546001600160a01b038087166001600160a01b031992831617909255600880549286169290911691909117905560098290556106dc848484610c38565b60065550505050565b6001600160a01b038316600090815260046020908152604080832033845290915281205460001981146107415761071c83826111ae565b6001600160a01b03861660009081526004602090815260408083203384529091529020555b6001600160a01b038516600090815260036020526040812080548592906107699084906111ae565b90915550506001600160a01b0380851660008181526003602052604090819020805487019055519091871690600080516020611359833981519152906107b29087815260200190565b60405180910390a3506001949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000046146107fb576107f6610c9e565b905090565b507f000000000000000000000000000000000000000000000000000000000000000090565b600060065486146108605760405162461bcd60e51b815260206004820152600a60248201526915dc9bdb99c81c1bdbdb60b21b6044820152606401610475565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108a85760405162461bcd60e51b81526004016104759061106e565b6108bb87846001600160801b0316610d38565b5060019695505050505050565b600060065486146109085760405162461bcd60e51b815260206004820152600a60248201526915dc9bdb99c81c1bdbdb60b21b6044820152606401610475565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109505760405162461bcd60e51b81526004016104759061106e565b6108bb87846001600160801b0316610d92565b6001805461033590611034565b336000908152600360205260408120805483919083906109919084906111ae565b90915550506001600160a01b03831660008181526003602052604090819020805485019055513390600080516020611359833981519152906104119086815260200190565b42841015610a265760405162461bcd60e51b815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606401610475565b60006001610a326107c5565b6001600160a01b038a811660008181526005602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938d166060840152608083018c905260a083019390935260c08083018b90528151808403909101815260e08301909152805192019190912061190160f01b6101008301526101028201929092526101228101919091526101420160408051601f198184030181528282528051602091820120600084529083018083525260ff871690820152606081018590526080810184905260a0016020604051602081039080840390855afa158015610b3e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615801590610b745750876001600160a01b0316816001600160a01b0316145b610bb15760405162461bcd60e51b815260206004820152600e60248201526d24a72b20a624a22fa9a4a3a722a960911b6044820152606401610475565b6001600160a01b0390811660009081526004602090815260408083208a8516808552908352928190208990555188815291928a16917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a350505050505050565b6000610c26838261120f565b506001610c33828261120f565b505050565b6000826001600160a01b0316846001600160a01b031610610c5857600080fd5b604080516001600160a01b038087166020830152851691810191909152606081018390526080016040516020818303038152906040528051906020012090509392505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051610cd091906112cf565b6040805191829003822060208301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b8060026000828254610d4a9190611345565b90915550506001600160a01b03821660008181526003602090815260408083208054860190555184815260008051602061135983398151915291015b60405180910390a35050565b6001600160a01b03821660009081526003602052604081208054839290610dba9084906111ae565b90915550506002805482900390556040518181526000906001600160a01b0384169060008051602061135983398151915290602001610d86565b60005b83811015610e0f578181015183820152602001610df7565b50506000910152565b6020815260008251806020840152610e37816040850160208701610df4565b601f01601f19169190910160400192915050565b80356001600160a01b0381168114610e6257600080fd5b919050565b60008060408385031215610e7a57600080fd5b610e8383610e4b565b946020939093013593505050565b600080600060608486031215610ea657600080fd5b610eaf84610e4b565b9250610ebd60208501610e4b565b9150604084013590509250925092565b8035600281900b8114610e6257600080fd5b60008060008060008060c08789031215610ef857600080fd5b610f0187610e4b565b955060208701359450610f1660408801610ecd565b9350610f2460608801610ecd565b925060808701356001600160801b0381168114610f4057600080fd5b915060a087013568ffffffffffffffffff81168114610f5e57600080fd5b809150509295509295509295565b600060208284031215610f7e57600080fd5b610f8782610e4b565b9392505050565b600080600080600080600060e0888a031215610fa957600080fd5b610fb288610e4b565b9650610fc060208901610e4b565b95506040880135945060608801359350608088013560ff81168114610fe457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561101457600080fd5b61101d83610e4b565b915061102b60208401610e4b565b90509250929050565b600181811c9082168061104857607f821691505b60208210810361106857634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600190820152604160f81b604082015260600190565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156110b157600080fd5b815167ffffffffffffffff808211156110c957600080fd5b818401915084601f8301126110dd57600080fd5b8151818111156110ef576110ef611089565b604051601f8201601f19908116603f0116810190838211818310171561111757611117611089565b8160405282815287602084870101111561113057600080fd5b611141836020830160208801610df4565b979650505050505050565b6000835161115e818460208801610df4565b602d60f81b908301908152835161117c816001840160208801610df4565b6202d4c560ec1b60019290910191820152600401949350505050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561041d5761041d611198565b601f821115610c3357600081815260208120601f850160051c810160208610156111e85750805b601f850160051c820191505b81811015611207578281556001016111f4565b505050505050565b815167ffffffffffffffff81111561122957611229611089565b61123d816112378454611034565b846111c1565b602080601f831160018114611272576000841561125a5750858301515b600019600386901b1c1916600185901b178555611207565b600085815260208120601f198616915b828110156112a157888601518255948401946001909101908401611282565b50858210156112bf5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60008083546112dd81611034565b600182811680156112f5576001811461130a57611339565b60ff1984168752821515830287019450611339565b8760005260208060002060005b858110156113305781548a820152908401908201611317565b50505082870194505b50929695505050505050565b8082018082111561041d5761041d61119856feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220fbad9177033c80bc7403e53e81b849b942f9127b7746f90e823b60b5205507b664736f6c63430008130033";

export const getBeraLpAddress = (base: string, quote: string, stableSwap: boolean) => {
  let b = "";
  let q = "";
  if (base === nativeTokenAddress) {
    b = beraTokenAddress;
  } else {
    b = base;
  }
  if (quote === nativeTokenAddress) {
    q = beraTokenAddress;
  } else {
    q = quote;
  }
  if (!b || !q) {
    return "";
  }
  const salt = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "address", "bool"], [b, q, stableSwap]),
  );
  const creationCode = CREATION_CODE;
  const initCodeHash = keccak256(creationCode);
  const create2Address = ethers.utils.getCreate2Address(
    crocDexAddress,
    salt,
    initCodeHash,
  );
  // console.log("create2Address", create2Address);
  return create2Address;
};
