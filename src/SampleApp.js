import React from 'react'
// import Contract from './contractConnectors.js/SimpleStoreContract'
import { connect } from "react-redux";
// import { importContract } from "./redux/contracts/actions";

class SampleApp extends React.Component {
    constructor(props) {
        super(props)
    
        this.textInput = React.createRef();
    
        this.contract = new Contract()
        this.value = 0
    
        this.state = {
          value: 0,
          isValid: false,
          isSending: false,
          tx: null,
          tries: 0
        }
      }
    
      async componentWillMount() {
        // this.contract = await this.props.SimpleStore.loadContract();
        // await this.contract.loadContract()

        // this.contract.addEventListener((v) => {
        //   this.setState({ value: v._value })
        // })
      }

      async componentDidMount(){
        this.contract = this.props.SimpleStore;
        this.contract.addEventListener(v => {
          this.setState({ value: v._value });
        });
        // await this.contract.loadContract()
        console.log("this.props.SimpleStore", this.props.SimpleStore)
      }
      
      onChangeHandler(event) {
        this.value = event.target.value
        const isValid = this.value > 0
        this.setState({ isValid })
      }
    
      async confirmValue() {
        this.setState({isSending: true})
        try {
          const tx = await this.contract.setValue(this.value)
          const tries = this.state.tries + 1
          this.textInput.current.value = ''
          this.setState({ tx, tries, isValid: false })
        } catch (err) {
          console.error('Ops, some error happen:', err)
        }
        this.setState({isSending: false})
      }
    
      render() {
        console.log(this)
        const loomyAlert = (
          <div className="alert alert-warning">
            I dare you to type 47 and press Confirm !
          </div>
        )
    
        return (
          <div className="container" style={{ marginTop: 10 }}>
            <form onSubmit={e => { e.preventDefault(); }}>
              <div className="form-group">
                <label>Value</label>
                <input type="number" className="form-control" onChange={(event) => this.onChangeHandler(event)} ref={this.textInput}/>
                <small className="form-text text-muted">Set a number</small>
              </div>
              <button type="button" disabled={!this.state.isValid || this.state.isSending} className="btn btn-primary" onClick={() => this.confirmValue()}>Confirm</button>
            </form>
            <div className="alert alert-success">
              Value set is {this.state.value} (this value only updates if values is 10 or ...)
            </div>
            { this.state.tries === 3 && loomyAlert }
            <hr />
            <pre>
              {this.state.tx && JSON.stringify(this.state.tx, null, 2)}
            </pre>
          </div>
        )
      }
}

const mapStateToProps = state => {
  return {
    SimpleStore: state.contracts.SimpleStore
  }
}

export default connect(mapStateToProps, null)(SampleApp);

// export default SampleApp;