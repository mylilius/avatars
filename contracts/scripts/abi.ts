function getAbi(contractInterface: any) {
    const abi = JSON.parse(contractInterface.format("json"));

    abi.forEach((obj: any) => {
        if (obj.type === "function") {
            const func = obj;
            func.inputs.concat(func.outputs).forEach((output: any) => {
                Object.assign(output, Object.assign({name: ""}, output));
            })
        }
    });

    return abi;
}

export default getAbi;