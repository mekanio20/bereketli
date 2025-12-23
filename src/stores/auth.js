// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     access_token: localStorage.getItem("access_token"),
//     refresh_token: localStorage.getItem("refresh_token"),
//     subdomain: localStorage.getItem("subdomain"),
//     error: null,
//     loading: false,
//   }),
//   getters: {
//     isAuthenticated: (state) => !!state.access_token,
//     getSubdomain: (state) => state.subdomain,
//   },
//   actions: {
//     // SET
//     setError(message) { this.error = message },
//     clearError() { this.error = '' },
//     // API
//     async login(data) {
//       this.loading = true;
//       try {
//         const response = await authApi.post("auth/v1/login/", {
//           email: data.email,
//           password: data.password,
//         });
//         this.access_token = response.data.access_token;
//         this.refresh_token = response.data.refresh_token;
//         localStorage.setItem("access_token", response.data.access_token);
//         localStorage.setItem("refresh_token", response.data.refresh_token);
//         // Fetch user info to get domain/subdomain and persist it
//         try {
//           const infoRes = await axios.get("https://api-dev.id.yoori.ru/user/v1/info", {
//             headers: {
//               Authorization: `Bearer ${this.access_token}`,
//             },
//           });
//           const domain = infoRes?.data?.domain || null;
//           if (domain) {
//             this.subdomain = domain;
//             localStorage.setItem("subdomain", domain);
//           }
//         } catch (_) {
//           // Ignore user info fetch errors to not block login flow
//         }
//         return response.status;
//       } catch (error) {
//         this.error = Error(error);
//       } finally {
//         this.loading = false;
//         setTimeout(() => {
//           this.error = null;
//         }, 3000);
//       }
//     },
//     async verify(data) {
//       this.loading = true;
//       try {
//         const registerData = {
//           domain: data.subdomain,
//           phone: data.phone,
//           patronymic: data.patronymic,
//           first_name: data.first_name,
//           last_name: data.last_name,
//           tenant_name: data.tenant_name,
//           password: data.password,
//         };
//         if (registerData.password.length < 8) {
//           this.error = "Password must be at least 8 characters long";
//           return;
//         }
//         if (registerData.phone.length !== 11) {
//           this.error = "Phone number must be at 11 numbers";
//           return;
//         }
//         localStorage.setItem("register", JSON.stringify(registerData));
//         localStorage.setItem("subdomain", data.subdomain);
//         this.subdomain = data.subdomain;
//         return 200;
//       } catch (error) {
//         this.error = Error(error);
//       } finally {
//         this.loading = false;
//         setTimeout(() => {
//           this.error = null;
//         }, 3000);
//       }
//     },
//     async isExist(data) {
//        this.loading = true;
//       try {
//          const response = await authApi.post("auth/v1/email/verify/", {
//           email: data.email,
//         });
//         return response;
//       } catch (error) {
//         return error
//       } finally {
//         this.loading = false;
//       }
//     },
//     async register(code) {
//       this.loading = true;
//       try {
//         const formData = JSON.parse(localStorage.getItem("register"));
//         const response = await authApi.post(`auth/v1/${code}/register/`, formData);
//         console.log('REGISTER DATA -> ', response);
//         this.access_token = response.data.access_token;
//         this.refresh_token = response.data.refresh_token;
//         localStorage.setItem("access_token", response.data.access_token);
//         localStorage.setItem("refresh_token", response.data.refresh_token);
//         localStorage.removeItem("register");
//         return response.status;
//       } catch (error) {
//         this.error = Error(error);
//       } finally {
//         localStorage.removeItem("register")
//         this.loading = false;
//         setTimeout(() => {
//           this.error = null;
//         }, 5000);
//       }
//     },
//     async reset(email, new_password) {
//       this.loading = true;
//       try {
//         localStorage.setItem("new_password", new_password)
//         const body = email ? { email } : {};
//         const response = await authApi.post("auth/v1/password/reset/", body);
//         return response.status;
//       } catch (error) {
//         this.error = Error(error);
//       } finally {
//         this.loading = false;
//         setTimeout(() => {
//           this.error = null;
//         }, 3000);
//       }
//     },
//     async newPassword(code, employee_password) {
//       this.loading = true;
//       try {
//         let password = localStorage.getItem("new_password")
//         if (employee_password) password = employee_password
//         const response = await authApi.post(`auth/v1/${code}/password/new/`, { password });
//         this.access_token = response.data.access_token;
//         this.refresh_token = response.data.refresh_token;
//         localStorage.setItem("access_token", response.data.access_token);
//         localStorage.setItem("refresh_token", response.data.refresh_token);
//         return response.status;
//       } catch (error) {
//         this.error = Error(error);
//       } finally {
//         localStorage.removeItem("new_password")
//         this.loading = false;
//         setTimeout(() => {
//           this.error = null;
//         }, 3000);
//       }
//     },
//     setSubdomain(subdomain) {
//       this.subdomain = subdomain;
//       localStorage.setItem("subdomain", subdomain);
//     },
//     logout() {
//       this.access_token = null;
//       this.refresh_token = null;
//       this.subdomain = null;
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       localStorage.removeItem("subdomain");
//     },
//   },
// });