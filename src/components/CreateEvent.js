import React from "react";
import MobileWrapper from "./common/MobileWrapper";
import FormLabel from "./common/FormLabel";
import FormInput from "./common/FormInput";
import SubmitButton from "./common/SubmitButton";

class CreateEvent extends React.Component {
  state = {
    eventName: "",
    tokenSupply: "",
    tokenPrice: ""
  };

  render() {
    console.log(this.state);
    return (
      <MobileWrapper>
        <FormLabel>Event Name</FormLabel>
        <FormInput
          placeholder=""
          ref={x => {
            this.input = x;
          }}
          onChange={e => this.setState({ eventName: e.target.value })}
          onMouseEnter={() => this.input.focus()}
        />
        <FormLabel>Token Supply</FormLabel>
        <FormInput
          placeholder=""
          ref={x => {
            this.supplyInput = x;
          }}
          onChange={e => this.setState({ tokenSupply: e.target.value })}
          onMouseEnter={() => this.supplyInput.focus()}
        />
        <FormLabel>Token Price</FormLabel>
        <FormInput
          placeholder=""
          ref={x => {
            this.priceInput = x;
          }}
          onChange={e => this.setState({ tokenPrice: e.target.value })}
          onMouseEnter={() => this.priceInput.focus()}
        />
        <SubmitButton onClick={() => console.log("create")}>Create Event</SubmitButton>
      </MobileWrapper>
    );
  }
}

export default CreateEvent;
