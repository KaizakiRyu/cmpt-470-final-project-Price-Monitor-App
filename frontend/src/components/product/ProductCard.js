import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal';
import AddToWishListModal from './AddToWishListModal';
import CommentProductModal from './CommentProductModal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import RequestServer from '../../requests/RequestServer'
//horizontal card used for displaying individual product

var styles = {
    'card': {
        marginBottom: '10px'
    },
    'button': {
        paddingLeft : '20px',
        paddingBottom: '0px',
        paddingTop: '0px',
        visibility: true
    },
    'image': {
        width: '300px',
        height: 'auto',
        objectFit: 'contain',
    },
    'input': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: 'white'
    },
    'black': {
        color: 'black'
    },
    'pText': {
        margin: '0px',
        marginLeft: '20px'
    }
};

class ProductCard extends Component {
    buttonHandler = (e) => {
        const { history } = this.props;
        //console.log("history", history)
        history.push({
            pathname: '/product/' + this.props.product.id,
            state: {
                product: this.props.product
            }
        });
        window.location.reload()
    }

    updateHandler = (e) => {
        const { history } = this.props;
        //console.log("history", history)
        history.push({
            pathname: '/product/' + this.props.product.id + '/update',
            state: {
                product: this.props.product
            }
        });
        window.location.reload()
    }
    
    render() {
        const serverLocation = RequestServer.getServerLocation();
        console.log(serverLocation)
        return (
            <Card style = {styles.card}>
            <Card.Header as="h5">
                <div className="float-left">
                {this.props.product.product_name}
                </div>
                <div className="float-right">
                <Button
                    id = "check-stock-button"
                    variant="link"
                    onClick={(event) => this.buttonHandler(event)}
                    style={styles.button}
                    className="float-right"
                    >Check Stock
                </Button>
                <p className="float-right" style={styles.pText}>Lowest Price: <span>{this.props.lowest_price} CAD</span></p>
                </div>


            </Card.Header>
            <Card.Body>
                {/* <Card.Img 
                    variant="top" 
                    src= {serverLocation + this.props.product.product_image}
                    alt = {this.props.product.product_name}
                    style = {styles.image} /> */}
                <Card.Text>
                    {this.props.product.product_description}
                </Card.Text>
                

                <DropdownButton 
                    align = "right"
                    variant="light"
                    title="Action"
                    id="dropdown-basic-button">  
                    
                    <CommentProductModal id = {this.props.product.id}/>

                    <Button
                            variant = "link"
                            onClick={(event) => this.updateHandler(event)}
                        >
                            Update Info
                    </Button>
                    <DeleteProductModal id = {this.props.product.id}/>
                    <AddToWishListModal id = {this.props.product.id}/>
                </DropdownButton>
            </Card.Body>
            </Card>
        );
    }
    
}
export default withRouter(ProductCard);