import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: ''
        }
    }
    onUserNameChange = (event) => {
        this.setState({userName: event.target.value})
    }
    onUserEmailChange = (event) => {
        this.setState({userEmail: event.target.value})
    }
    onUserPasswordChange = (event) => {
        this.setState({userPassword: event.target.value})
    }
    onSubmitRegister = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword 
            })
        })
        .then(response => response.json())
        .then( data => {
            console.log(data);
            if(data) {
                this.props.loadUser(data)
                this.props.onRouteChange('home');
            }
        })
    }
    render () {
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">User Name</label>
                        <input onChange={this.onUserNameChange} 
                               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                               type="text" name="userName"  id="userName"
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email</label>
                        <input onChange={this.onUserEmailChange}
                               className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6">Password</label>
                        <input  onChange={this.onUserPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input  onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Register" />
                    </div>
                </div>
            </main>
            </article>
        );
    }
    
}

export default Register;