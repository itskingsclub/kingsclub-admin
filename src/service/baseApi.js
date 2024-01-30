import axios from 'axios'
// import baseAddress from './baseAddress'
const APIKit = axios.create({
  // baseURL: "https://api-kings.vercel.app",
  baseURL: `http://3.108.54.80:3000`,
})

export default APIKit
