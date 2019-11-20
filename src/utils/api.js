/*
** Created by scent0330 on 6/21/2019.
** Last updated by scent0330 on 7/12/2019.
*/
import axios from 'axios'

const apiCall = ({url, method, header, ...args}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      axios(
        {
          url: url, 
          headers: header, 
          method: method,
        }
      )
      .then(resp => {
        resolve(resp);
      })
      .catch(err => {
        reject(err)
      })

    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default apiCall
