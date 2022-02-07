import axios from 'axios'

type ApiRoutes = {
  [index: string]: string
}

// let isLoggedOut = false

const routes: ApiRoutes = {
  articles: '/api/articles'
}

// const logOut = async () => {
//   localStorage.removeItem('admin-auth')
//   localStorage.removeItem('client-auth')

//   try {
//     await api.post(routes.logout)
//     document.location.href = '/login'
//   } catch (error) {
//     document.location.href = '/login'
//   }
// }

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  // withCredentials: true,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const statusCode = error.response?.status
      const responseData = error.response?.data
      console.log(statusCode, responseData)

      // switch(statusCode) {
      //   case 401:
      //     if (!isLoggedOut) {
      //       // logOut()
      //     }
      //     break
      //   case 419:
      //     if (!isLoggedOut) {
      //       // logOut()
      //     }
      //     break
      //   case 422:
      //     // snackBarOpen(responseData?.message, 'danger')
      //     // store.commit('setAuthErrors', responseData?.errors)
      //     throw error
      // }
    }
  }
)

export { routes, api }
