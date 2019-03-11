// export const IMPORT_CONTRACT = "IMPORT_CONTRACT";

// export const importContract = contract => {
//     console.log("actions", contract)
//     return {
//         type: IMPORT_CONTRACT,
//         contract
//     }
// }

// export const importContract = async(contract) => {
// // export const importContract = contract => dispatch => {
//     console.log("here")
//     const simpleStore = await new SimpleStoreContractFile().loadContract();
//     return simpleStore;
//     // return sendContract(contract).then((contract) => dispatch(receiveContract(contract)))
// }

// export const receiveContract = contract => {
//     return {
//         type: IMPORT_CONTRACT,
//         contract
//     }
// }

// export const sendContract = () => {
//     return new SimpleStoreContractFile().loadContract();
// }  