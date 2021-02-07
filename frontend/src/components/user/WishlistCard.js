import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RemoveFromWishListModal from './RemoveFromWishlistModal';
import { Route , withRouter} from 'react-router-dom';

const styles = {
    'card': {
        marginTop: '5x',
        marginBottom: '5px'
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
    'black': {
        color: 'black'
    },
    'pText': {
        margin: '0px',
        marginLeft: '20px'
    }
};

class WishlistCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            username:'',
            content:''
        }
    }

    buttonHandler = (e) => {
        this.props.history.push({pathname: '/product/' + this.props.id});
        window.location.reload()
    }


    render() {
        return (
            <div>
            <Card style = {styles.card}>
            <Card.Header as="h5">
                <div className="float-left">
                {this.props.product_name}
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
                <p className="float-right" style={styles.pText}>Lowest Price: <span>{this.props.product_lowest_price_curr} CAD</span></p>
                </div>
            </Card.Header>
            <Card.Body>
                {/* <Card.Img
                    variant="top"
                    src= {'http://localhost:8000' + this.props.product_image}
                    style = {styles.image} /> */}
                <Card.Text>
                    {this.props.product_description}
                </Card.Text>
            <RemoveFromWishListModal id = {this.props.id}/>
            </Card.Body>
            </Card>
            <br/>
            </div>
        );
    }
}
export default withRouter(WishlistCard);



