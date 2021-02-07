import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RequestServer from '../../requests/RequestServer';
import { withRouter } from 'react-router';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import MessageController from '../../responses/MessageController';

class AddURLModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            error: false,
            errorMsg: '',
            newURL: '',
            addSuccess: false,
            waitingMessage: ''
        }
        this.addURLHandler= this.addURLHandler.bind(this);
    }

    constructUrlObject(url) {
        return {
            product_url : url
        }
    }

    addResponseHandler(response) {
    //   console.log((response.status === 204))
    //   if (response.status === 404 || response.status === 400) {
    //     var errorMessage = [];
    //     for (const [key, value] of Object.entries(response)) {
    //         // console.log(`${key}: ${value}`);
    //       errorMessage += value;
    //     }
    //     console.log('response: ' + response)
        
    //     this.setState({
    //         error: true,
    //         errorMsg: errorMessage
    //     }) 
    //   }

    //   else if (response.status === 204){
    //     return true;
    //   }
    }
    
    addHandler = async(event) => {

        // event.preventDefault()
        // console.log("Pressed deleted button...");
        
        // //Show the Modal Dialog
        // this.setState({
        //   show: true
        // })
        // var token = localStorage.getItem('token');
        // var response = await RequestServer.deleteProduct(token, this.props.id)

        // var result = this.addResponseHandler(response);
        // if (result){
        //   this.setState({
        //     show: false
        //   })
        //   alert("Product Deleted Successfully")
        //   window.location.reload()
        // }
        // else {
        //   alert("Failed to delete. Probably the product has already been deleted")
        // }
    }

    addURLHandler = async(event) => {
        event.preventDefault()
        console.log("Adding Product URL: ", this.state.newURL);

        //Check empty field 
        if (this.state.newURL === '') {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            })
            return;
        }
        else {
            var token = localStorage.getItem('token');
            // var product = this.state.product
            // console.log('product', product)
            var newUrlObject = this.constructUrlObject(this.state.newURL)
            console.log('newUrlObject', newUrlObject)
            this.setState({
                error: false,
                errorMsg: "",
            }, function() {
                this.setState({
                    waitingMessage: "Retrieving the price automatically..."
                })
            })
            var response = await RequestServer.addProductURL(token, this.props.id, newUrlObject)
            this.updateResponseHandler(response);
            //console.log("ADD URL HANDLER: ", this.state.product.product_link_price)
        }
        
        
    }

    updateResponseHandler(response) {
        var isMessageValid = MessageController.accept(response);
        
        if (isMessageValid === true || isMessageValid === "") {
            this.setState({
                error: false,
                waitingMessage: "",
                errorMsg: ""
            })
            alert("Product updated successfully")
            this.props.history.push('/product/' + this.props.id);
            window.location.reload()
          }
  
          else {
            var errorMessage = [];
            // for (const [key, value] of Object.entries(response)) {
            //     // console.log(`${key}: ${value}`);
            //   errorMessage += value;
            // }
            this.setState({
                error: true,
                errorMsg:"Please follow URL format and make sure it's a new URL :)",
                waitingMessage: ""
            }) 
          }

        //   if (isMessageValid){
        //     // var errorMessage = [];
        //     // for (const [key, value] of Object.entries(response)) {
        //         // console.log(`${key}: ${value}`);
        //     toast("Product Added: ");
        //     this.clearFields();
        // }
        // else {
        //     var errorArray = [];
        //     for (const [key, value] of Object.entries(response)) {
        //         console.log(value)
        //         errorMessage = value;
        //     }
        //     var errorMessage = ""
        //     errorArray.forEach((error) => {
        //         errorMessage += error
        //     })

        //     this.setState({
        //         error: true,
        //         errorMsg: errorMessage
        //     })
        // }  
    }

    handleShow() {
      this.setState({
        show: true
      })
        
    }

    handleClose() {
      
        this.setState({
          show: false
        })
      

    }

    render() {
        return (
            <div>
              <Button 
              variant="primary"
              className = "float-right"
              onClick={() => this.handleShow()}
              >
                Add URL
              </Button>
        
              <Modal
                show={this.state.show}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Another URL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Enter a newegg.ca or bestbuy.ca URL here..."
                        aria-label="Enter a newegg.ca or bestbuy.ca URL here..."
                        aria-describedby="basic-addon2"
                        onChange={(event) => {
                            this.setState({newURL: event.target.value})
                        }}
                        />
                        <InputGroup.Append>
                        <Button 
                        variant="outline-primary"
                        onClick={(event) => this.addURLHandler(event)}>
                            Add
                        </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {MessageController.displayErrorMessage(this.state.error, this.state.errorMsg)}
                    <div>
                        <p>{this.state.waitingMessage}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                  variant="secondary" 
                  onClick={() => this.handleClose()}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    } 
  }
  export default withRouter(AddURLModal);