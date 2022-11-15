//example api request: replace with your API request here in folder API
import axios from 'axios'

export const getApiWithToken = async (url, data, token) => {
  try {
    let response = await axios.get(url + data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    // console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    return Promise.reject(Error(e.response.data.message))
  }
}
export const PostApi = async (url, data, bearertoken) => {
  console.log('opoppop',url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": `Bearer ${bearertoken}`
      }
    })
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
    return Promise.reject(Error(e.response.data.message))
  }
}
export const PostApiWithOutToken = async (url, data) => {
  console.log(url, data)
  try {
    let response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    })
console.log(response,"response");

    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    } else {
      return Promise.reject(response.data.message)
    }
  } catch (e) {
    console.log("error",e.response.data);
    return Promise.reject(Error(e.response.data.message))
  }
}

export const DeleteApi = async (url, data, bearertoken) => {
  try {
    console.log(url,data,bearertoken)
    let response = await axios.delete(url, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": `Bearer ${bearertoken}`
      }
    })
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
    return Promise.reject(Error(e.response.data.message))
  }
}
export const PutApi = async (url, data, bearertoken) => {
  console.log(url, data)
  try {
    let response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": `Bearer ${bearertoken}`
      }
    })
    console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    }
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
    return Promise.reject(Error(e.response.data.message))
  }
}




export const getApiWithOutToken = async (url, data) => {
  // console.log(url, data)
  try {
    let response = await axios.get(url + data)
    // console.log(response, "response")
    if (response.status == 200) {
      return Promise.resolve({
        status: 'success',
        data: response.data
      })
    } else {
      return Promise.reject(response)
    }
  } catch (e) {
    return Promise.reject(Error(e.response.data.message))
  }
}

// module.exports = {
//   getApiWithOutToken,
//   PostApiWithOutToken,
//   getApiWithToken,
//   PostApi
// }
