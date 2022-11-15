

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const FORM = "FORM"

export const ADDTOCART = "ADDTOCART"


export const incNumber = (data) => {
    console.log("value of data", data)
    return {
        type: INCREMENT,
        payload: data
    };
};

export const decNumber = (decdata) => {
    console.log("decreament no value is ===>", decdata)
    return {
        type: DECREMENT,
        payload: decdata

    };
};

export const formaction = (formdata) => {
    console.log("formdata  value is ===>", formdata)
    return {
        type: FORM,
        payload: formdata

    };
};

export const AddtoCartaction = (a) => {
    console.log("formdata addtocart value is ===>", a)
    return {
        type: ADDTOCART,
        payload: a

    };
};