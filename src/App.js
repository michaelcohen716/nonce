import React from 'react'
import { connect } from "react-redux";
import AccountRegistryContract from './contractConnectors/AccountRegistry';
import { loadUser } from './redux/nonce/actions';

class App extends React.Component {
    constructor(props) {
        super(props)
    
        this.contract = new AccountRegistryContract()
    
        this.state = {
          tx: null
        }
      }
    
      async componentWillMount() {
        await this.contract.loadContract()
        this.contract.addEventListener((v) => {
          this.setState({ value: v._value })
        })
      }


      async createIdentity(){
        try {
          const tx = await this.contract.createIdentity();
          this.setState({ tx })
        }catch(err){
          console.error('say hello err', err)
        }
      }
    
      render() {
        return (
          <div className="container" style={{ marginTop: 10 }}>
             <form onSubmit={e => { e.preventDefault(); }}>
              <button type="button" className="btn btn-primary" onClick={() => this.createIdentity()}>createIdentity</button>
            </form>
            { this.state.tries === 3 && loomyAlert }
            <hr />
            <pre>
              {this.state.tx && JSON.stringify(this.state.tx, null, 2)}
            </pre>
            <button onClick={() => this.props.loadUser('hello@gmail.com')}>load user</button>
          </div>
        )
      }
}

const mapStateToProps = state => {
  return {
    nonce: state.nonce
  }
}

export default connect(mapStateToProps, {
  loadUser
})(App);
