
class App extends React.Component {
  constructor() {
    super();
    this.state = getInitialState();

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.submitStatus = this.submitStatus.bind(this);
  }

  inputChange(e) {
    var key = e.target.id.split('-')[1];
    console.log(key);
    var value = e.target.value;
    var newState = {};
    newState[key] = value
    this.setState(newState)
  }

  formSubmit(e) {
    e.preventDefault();
    var form = Number(e.target.id.split('-')[1]);
    if (form !== 4) {
      form++;
      this.setState({ currentForm: form });
    } else {
      fetch('checkout', {
        method: 'POST',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then(res => {
        console.log(res.status);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  formSelect() {
    switch(this.state.currentForm) {
      case 0:
        return <F0 formSubmit={this.formSubmit} />;
      case 1:
        return <F1 inputChange={this.inputChange} formSubmit={this.formSubmit} status={this.submitStatus} />;
      case 2:
        return <F2 inputChange={this.inputChange} formSubmit={this.formSubmit} status={this.submitStatus} />;
      case 3:
        return <F3 inputChange={this.inputChange} formSubmit={this.formSubmit} status={this.submitStatus} />;
      case 4:
        return <F4 formSubmit={this.formSubmit} info={{...this.state}}/>;
    }
  }

  submitStatus(form) {
    console.log('STATUS');
    if (form === 1 && this.state.name !== '' && this.state.email !== '' && this.state.password !== '') {
      return false;
    }
    if (form === 2 && this.state.address1 !== '' && this.state.city !== '' && this.state.state !== '' && this.state.phone !== '') {
      return false;
    }
    if (form === 3 && this.state.cc_num !== '' && this.state.cc_exp !== '' && this.state.cc_cvv !== '' && this.state.cc_zip !== '') {
      return false;
    }
    return true;
  }

  render() {
    return this.formSelect();
  }
}

var F0 = (props) => {
  return <button id="form-0" onClick={props.formSubmit}>Checkout</button>
}

var F1 = (props) => {
  return (
    <form id="form-1" onSubmit={props.formSubmit}>
      <label htmlFor="input-name">Name</label>
      <input type="text" id="input-name" placeholder="Enter Name" onChange={props.inputChange} />
      <label htmlFor="input-email">Email</label>
      <input type="text" id="input-email" placeholder="Enter Email" onChange={props.inputChange} />
      <label htmlFor="input-password">Password</label>
      <input type="password" id="input-password" placeholder="Enter Password" onChange={props.inputChange} />
      <input type="submit" disabled={props.status(1)} value="Next" />
    </form>
  );
}

var F2 = (props) => {
  return (
    <form id="form-2" onSubmit={props.formSubmit}>
      <label htmlFor="input-address1">Address Line 1</label>
      <input type="text" id="input-address1" placeholder="Enter Address Line 1" onChange={props.inputChange} />
      <label htmlFor="input-address2">Address Line 2</label>
      <input type="text" id="input-address2" placeholder="Enter Address Line 2" onChange={props.inputChange} />
      <label htmlFor="input-city">City</label>
      <input type="text" id="input-city" placeholder="Enter City" onChange={props.inputChange} />
      <label htmlFor="input-state">State</label>
      <input type="text" id="input-state" placeholder="Enter State" onChange={props.inputChange} />
      <label htmlFor="input-zip">Zip Code</label>
      <input type="text" id="input-zip" placeholder="Enter Zip Code" onChange={props.inputChange} />
      <label htmlFor="input-phone">Phone</label>
      <input type="text" id="input-phone" placeholder="Enter Phone" onChange={props.inputChange} />
      <input type="submit" disabled={props.status(2)} value="Next"/>
    </form>
  );
}

var F3 = (props) => {
  return (
    <form id="form-3" onSubmit={props.formSubmit}>
    <label htmlFor="input-cc_num">Credit Card Number</label>
    <input type="text" id="input-cc_num" placeholder="Enter Credit Card Number" onChange={props.inputChange} />
    <label htmlFor="input-cc_exp">Expiration Date</label>
    <input type="text" id="input-cc_exp" placeholder="Enter Expiration Date" onChange={props.inputChange} />
    <label htmlFor="input-cc_cvv">CVV</label>
    <input type="text" id="input-cc_cvv" placeholder="Enter CVV" onChange={props.inputChange} />
    <label htmlFor="input-cc_zip">Billing Zip Code</label>
    <input type="text" id="input-cc_zip" placeholder="Enter Billing Zip Code" onChange={props.inputChange} />
    <input type="submit" disabled={props.status(3)} value="Next"/>
  </form>
  );
}

var F4 = (props) => {
  return (
    <form id="form-4" onSubmit={props.formSubmit}>
      <span>{props.info.name}</span><br />
      <span>{props.info.email}</span><br />
      <span>{props.info.address1}</span><br />
      <span>{props.info.address2}</span><br />
      <span>{props.info.city}, {props.info.state} {props.info.zip}</span><br />
      <input type="submit" value="Purchase"/>
    </form>
  )
}

var root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(<App />);

var getInitialState = () => {
  return {
    name: '',
    email: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cc_num: '',
    cc_exp: '',
    cc_cvv: '',
    cc_zip: '',
    currentForm: 0,
  }
}

