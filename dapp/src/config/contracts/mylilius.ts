export const MyLiliusFactoryAddress: string = "0x082081c8E607ca6C1c53aC093cAb3847ED59C0b0";
export const MyLiliusFactoryABI: any = [
  {
      "type": "event",
      "anonymous": false,
      "name": "CreateAvatar",
      "inputs": [
          {
              "type": "address",
              "name": "owner",
              "indexed": true
          }
      ]
  },
  {
      "type": "event",
      "anonymous": false,
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "type": "address",
              "name": "previousOwner",
              "indexed": true
          },
          {
              "type": "address",
              "name": "newOwner",
              "indexed": true
          }
      ]
  },
  {
      "type": "function",
      "name": "createAvatar",
      "constant": false,
      "payable": false,
      "inputs": [],
      "outputs": []
  },
  {
      "type": "function",
      "name": "getAvatarAddress",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
          {
              "type": "address",
              "name": "_userAddress"
          }
      ],
      "outputs": [
          {
              "type": "address",
              "name": ""
          }
      ]
  },
  {
      "type": "function",
      "name": "hasAvatar",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [
          {
              "type": "address",
              "name": "_address"
          }
      ],
      "outputs": [
          {
              "type": "bool",
              "name": ""
          }
      ]
  },
  {
      "type": "function",
      "name": "owner",
      "constant": true,
      "stateMutability": "view",
      "payable": false,
      "inputs": [],
      "outputs": [
          {
              "type": "address",
              "name": ""
          }
      ]
  },
  {
      "type": "function",
      "name": "renounceOwnership",
      "constant": false,
      "payable": false,
      "inputs": [],
      "outputs": []
  },
  {
      "type": "function",
      "name": "setDNSAddress",
      "constant": false,
      "payable": false,
      "inputs": [
          {
              "type": "address",
              "name": "_newAddress"
          }
      ],
      "outputs": []
  },
  {
      "type": "function",
      "name": "transferOwnership",
      "constant": false,
      "payable": false,
      "inputs": [
          {
              "type": "address",
              "name": "newOwner"
          }
      ],
      "outputs": []
  }
];
export const MyLiliusAvatarABI: any = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_chainId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "_tokenType",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "addBuildingBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_background",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_text",
        "type": "uint256"
      }
    ],
    "name": "addColorPalette",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deleteAvatar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_tokenType",
        "type": "uint16"
      }
    ],
    "name": "deleteBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAvatar",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "chainId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint16",
            "name": "tokenType",
            "type": "uint16"
          },
          {
            "internalType": "address",
            "name": "contractAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "tokenURI",
            "type": "string"
          }
        ],
        "internalType": "struct IAvatar.BuildingBlock[]",
        "name": "",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "background",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "text",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct IAvatar.ColorPalette",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggle3DAvatar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleAssetLock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleBackground",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleBlockBased",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleColorPalette",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleLock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_toggle",
        "type": "bool"
      }
    ],
    "name": "toggleShowBalance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
  
export const DotNameServiceAddress: string = "0x3D65d8525659640d0Ad36B283EdbEF6975af7520";
export const DotNameServiceABI: any = [
  {
    "type": "event",
    "anonymous": false,
    "name": "Initialized",
    "inputs": [{ "type": "uint8", "name": "version", "indexed": false }]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "OwnershipTransferred",
    "inputs": [
      { "type": "address", "name": "previousOwner", "indexed": true },
      { "type": "address", "name": "newOwner", "indexed": true }
    ]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "UpdateEtneralAddress",
    "inputs": [
      { "type": "address", "name": "oldAddress", "indexed": true },
      { "type": "address", "name": "newAddress", "indexed": true },
      { "type": "address", "name": "owner", "indexed": true },
      { "type": "uint256", "name": "timestamp", "indexed": false }
    ]
  },
  {
    "type": "function",
    "name": "dotEternal",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "address", "name": "" }]
  },
  {
    "type": "function",
    "name": "dotIsClaimed",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "address", "name": "_address" }],
    "outputs": [{ "type": "bool", "name": "" }]
  },
  {
    "type": "function",
    "name": "dotNameIsAvailable",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "string", "name": "_name" }],
    "outputs": [{ "type": "bool", "name": "" }]
  },
  {
    "type": "function",
    "name": "getDOTByAddress",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "address", "name": "_address" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "type": "address", "name": "owner" },
          { "type": "uint256", "name": "number" },
          { "type": "uint256", "name": "birthday" },
          { "type": "uint256", "name": "level" },
          { "type": "uint256", "name": "experience" },
          { "type": "bytes32", "name": "id" },
          { "type": "string", "name": "name_display" },
          { "type": "string", "name": "name_lowercase" }
        ],
        "name": ""
      }
    ]
  },
  {
    "type": "function",
    "name": "getDOTByName",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "string", "name": "_name" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "type": "address", "name": "owner" },
          { "type": "uint256", "name": "number" },
          { "type": "uint256", "name": "birthday" },
          { "type": "uint256", "name": "level" },
          { "type": "uint256", "name": "experience" },
          { "type": "bytes32", "name": "id" },
          { "type": "string", "name": "name_display" },
          { "type": "string", "name": "name_lowercase" }
        ],
        "name": ""
      }
    ]
  },
  {
    "type": "function",
    "name": "getNumberDOTs",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "uint256", "name": "" }]
  },
  {
    "type": "function",
    "name": "initialize",
    "constant": false,
    "payable": false,
    "inputs": [{ "type": "address", "name": "_address" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "owner",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "address", "name": "" }]
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "constant": false,
    "payable": false,
    "inputs": [],
    "outputs": []
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "constant": false,
    "payable": false,
    "inputs": [{ "type": "address", "name": "newOwner" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "updateEternalAddress",
    "constant": false,
    "payable": false,
    "inputs": [{ "type": "address", "name": "_address" }],
    "outputs": []
  }
];

export const DotCreate: string = "0xcc4Bd3834ebd322401e12996D40E8d886B1A0100";
export const DotCreateABI: any = [
  {
    "type": "event",
    "anonymous": false,
    "name": "CreateDOT",
    "inputs": [
      { "type": "address", "name": "owner", "indexed": true },
      { "type": "string", "name": "dotName", "indexed": true },
      { "type": "uint256", "name": "timestamp", "indexed": false }
    ]
  },
  {
    "type": "event",
    "anonymous": false,
    "name": "Initialized",
    "inputs": [{ "type": "uint8", "name": "version", "indexed": false }]
  },
  {
    "type": "function",
    "name": "createDOT",
    "constant": false,
    "payable": false,
    "inputs": [{ "type": "string", "name": "_dotName" }],
    "outputs": []
  },
  {
    "type": "function",
    "name": "dotEternal",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "address", "name": "" }]
  },
  {
    "type": "function",
    "name": "initialize",
    "constant": false,
    "payable": false,
    "inputs": [{ "type": "address", "name": "_address" }],
    "outputs": []
  }
];