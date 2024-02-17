import baseaddress from './baseAddress'
import APIKit from './baseApi'

export async function registerApi(payload) {
  try {
    const response = await APIKit.post(`/user/register`, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export async function loginApi(payload) {
  try {
    const response = await APIKit.post(`/user/login`, payload)
    return response?.data
  } catch (error) {
    return error?.response?.data
  }
}

export async function verifyotpApi(payload) {
  try {
    const response = await APIKit.post(`/user/verify-pin`, payload)
    return response.data
  } catch (error) {
    console.log(error?.response?.data)
    return error?.response?.data
  }
}

export async function getuser(id) {
  try {
    const response = await APIKit.get(`/user/${id}`)
    return response.data
  } catch (error) {
    return error?.response?.data
  }
}

export async function getAllUsers(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    const response = await APIKit.get(`/user/?${queryString}`)
    return response.data
  } catch (error) {
    return console.log(error)
  }
}

export async function updateUser(payload) {
  try {
    const response = await APIKit.put(`/user/update`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export async function createChallange(payload) {
  try {
    const response = await APIKit.post(`/challenge/create`, payload)
    return response.data
  } catch (error) {
    return console.log(error)
  }
}

export async function myChallange(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString();
    const response = await APIKit.post(`/challenge/my-challenges/?${queryString}`);
    return response.data
  } catch (error) {
    return console.log(error)
  }
}
export async function challange(id) {
  try {
    const response = await APIKit.get(`/challenge/${id}`)
    return response.data
  } catch (error) {
    return console.log(error)
  }
}

export async function getChallange(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    const response = await APIKit.get(`/challenge/?${queryString}`)
    return response.data
  } catch (error) {
    return error
  }
}

export async function updateChallange(payload) {
  try {
    const response = await APIKit.put(`/challenge/update`, payload)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export async function updateResult(payload) {
  console.log('payload', payload)
  try {
    const response = await APIKit.put(`/challenge/update-result`, payload, {
      headers: {
        'Content-Type': false,
      },
    })
    return response
  } catch (error) {
    console.error('Error in updateResult:', error)
  }
}
export async function clearChallenge(payload) {
  console.log('payload', payload)
  try {
    const response = await APIKit.put(`/challenge/clear-challenge`, payload)
    return response
  } catch (error) {
    console.error('Error in updateResult:', error)
  }
}



export async function getWithdraw(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    const response = await APIKit.get(`/payment/all-withdraw/?${queryString}`)
    return response.data
  } catch (error) {
    return error
  }
}

export async function getDeposit(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    const response = await APIKit.get(`/payment/all-deposit/?${queryString}`)
    return response.data
  } catch (error) {
    return error
  }
}

export async function getPayments(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    const response = await APIKit.get(`/payment/?${queryString}`)
    return response.data
  } catch (error) {
    return error
  }
}

export async function myPayment(payload) {
  try {
    const queryString = new URLSearchParams(payload).toString()
    console.log("payload", queryString)
    const response = await APIKit.post(`/payment/my-payments/?${queryString}`)
    return response.data
  } catch (error) {
    return console.log(error, payload)
  }
}

export async function deposit(payload) {
  try {
    const response = await APIKit.post(`/payment/deposit`, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export async function withdrawal(payload) {
  try {
    const response = await APIKit.post(`/payment/withdrawal`, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export async function getPaymentById(id) {
  try {
    const response = await APIKit.get(`/payment/${id}`)
    return response.data
  } catch (error) {
    return console.log(error)
  }
}
