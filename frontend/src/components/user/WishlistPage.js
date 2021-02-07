import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import WishlistCard from './WishlistCard';


export default class WishlistPage extends Component {

    constructor(props){
        super(props);
        this.state={
            msg:'Add an item to your wishlist',
            product: [],
        }
    }


    async getProductDetails() {
        var token = localStorage.getItem('token');
        if (token !== null){
            var response = await RequestServer.getWishlist(token)
            if (response !== null){

                for (var i in response.product_id_list) {

                    var product_response = await RequestServer.getProduct(token, response.product_id_list[i])
                    this.setState(state => {
                        const product = state.product.concat(product_response);

                            return {
                            msg:'',
                            product,
                        };
                    });
                }

            }
            else {
                this.setState({msg: 'Failed to retrieve wishlist'})
            }
        }
        else {
            this.setState({msg: 'Failed to retrieve wishlist'})
        }
    }

    componentDidMount() {
        this.getProductDetails();
    }


    render(){

        return (
            <div>
                <br/>
                <h2 className='title'>My Wishlist</h2>
                <br/>
                <h4 style={{textAlign: 'center'}}>{this.state.msg}</h4>
                {this.state.product.map((p) => <WishlistCard
                    key={p.id} id={p.id} product_name = {p.product_name} product_image = {p.product_image} product_description = {p.product_description}
                    product_lowest_price_prev = {p.product_lowest_price_prev} product_lowest_price_curr = {p.product_lowest_price_curr}/>)}
                <br/>
            </div>
        )
    }


}
