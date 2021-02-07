import React, { Component } from 'react';
import axios from 'axios';

class RequestServer extends Component {
    getServerLocation() {
        return 'http://localhost:8000'
    }

    async addUser(user) {
        try {
            console.log(user)
            var response = await axios.post(this.getServerLocation() + '/registration/', user)
            return response.data //Changed to response.data
        } catch (err) {
            // const error = err.response.data;
            // for (const [key, value] of Object.entries(error)) {
            //     console.log(`${key}: ${value}`);
            // }   
            return null
        }
    }

    async login(username, email, password) {
        var userObj = {
            username: username,
            email: email,
            password: password
        }
        try {
            var response = await axios.post(this.getServerLocation() + '/login/', userObj)
            return response
        } catch (error) {
            return null
        }
    }

    async isRegistered(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/user/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            if (response.data.detail != null){
                return false
            }
            else {
                return true
            }
            
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async getUsername(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/user/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            //console.log("Error: ", error.response.data);
            return null
        }
    }

    async updatePassword(token, newPassword, oldPassword) {    //**** Backend does not verify current password? ****//

        var userObj = {
            new_password1: newPassword,
            new_password2: newPassword,
            old_password: oldPassword
        }

        try {
            var response = await axios.post(this.getServerLocation() + '/password/change/', userObj, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async updateUsername(token, username) {

        var userObj = {
            username: username
        }

        try {
           var response = await axios.patch(this.getServerLocation() + '/user/', userObj, {
               headers: {
                   'Authorization' : `Token ${token}`
               }
           })
           return response
        } catch (error) {
            console.log("Error: ", error.response.data);
           return null
        }
    }

    async getWishlist(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/wishlist/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("GET WISHLIST REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async addWishlistProduct(token, id) {
        try {
            var response = await axios.post(this.getServerLocation() + '/wishlist/'+ id, {}, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("Add Wishlist item REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async removeWishlistProduct(token, id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/wishlist/'+ id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("Remove Wishlist item REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async getAllProducts(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/products/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response.data
        } catch (error) {
            //console.log("Error: ", error.response.data);
            return null
        }
    }

    async getProduct(token, id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/products/'+ id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("GET PRODUCT REQUEST SERVER")
            return response.data
        } catch (error) {
            return response
        }
    }

    async addProduct(token, obj) {
        try {
            let form_data = new FormData();
            form_data.append('product_name', obj.product_name);
            form_data.append('product_description', obj.product_description);
            form_data.append('product_type', obj.product_type);
            // if (obj.product_image !== null){
            //     form_data.append('product_image', obj.product_image);
            // }
            

            var response = await axios.post(this.getServerLocation() + '/products/', form_data, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return error.response.data
        }
    }

    // srcToImg(src, fileName){
    //     return (fetch(src)
    //         .then(function(res){return res.arrayBuffer();})
    //         .then(function(buf){return new File([buf], fileName, {type:"image/png"})})
    //     );
    // }

    async updateProduct(token, id, obj) {
        try {
            let form_data = new FormData();
            form_data.append('product_name', obj.product_name);
            form_data.append('product_description', obj.product_description);
            form_data.append('product_type', obj.product_type);
            // console.log('hello')
            // console.log("obj: ", obj)
            // if (typeof obj.product_image === "string"){
            //     //convert it into File Object
            //     console.log('hi')
            //     console.log(obj.product_image)
            //     this.srcToImg(obj.product_image, obj.product_name)
            //     .then(function(file){
            //         form_data.append('product_image', file);
            //     })
            // }
            // else if (obj.product_image !== null){
            //     //It's already a file object
            //     form_data.append('product_image', obj.product_image);
            // }
            
            var response = await axios.put(this.getServerLocation() + '/products/' + id , form_data, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async deleteProduct(token, id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("RESPONSE:", response , ".")
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }
    //POST REQUEST
    async addProductURL(token, id, url){
        console.log("URL: ", url)
        try {
            var response = await axios.post(this.getServerLocation() + '/products/' + id + '/url', url, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return error.response.data
        }
    }
    //PUT REQUEST
    async updateProductURLObject(token, id, urlId, urlObject){
        console.log("URL Object: ", urlObject)
        try {
            var response = await axios.put(this.getServerLocation() + '/products/' + id + '/url/' + urlId, urlObject, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            console.log("Response... ", response)
            return error.response.data
        }
    }

    //DELETE REQUEST
    async deleteProductURLObject(token, id, urlId){
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id + '/url/' + urlId, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            console.log("Response... ", response)
            return error.response.data
        }
    }

    async getProductURL(token, id){
        try {
            var response = await axios.get(this.getServerLocation() + '/products/' + id + '/url', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async getProductComments(token,id){
        try {
            var response = await axios.get(this.getServerLocation() + '/products/' + id + '/comments', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async addProductComment(token,id, commentObject){
        try {
            var response = await axios.post(this.getServerLocation() + '/products/' + id + '/comments', commentObject, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async deleteProductComment(token,id, commentId){
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id + '/comments/' + commentId, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }
}

export default new RequestServer();
