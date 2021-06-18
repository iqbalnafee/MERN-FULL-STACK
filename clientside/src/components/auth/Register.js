import React,{Fragment,useState} from 'react'

const Register = () => {


    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    }); // formData is an object with all of the field values. setFormData is a function to update our state we are gonna pull out from useState() 
    
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    //setFormData used for changed the useState state. Hence we used {} inside setFormData
    //Inside {}, first we copy the formdata by using ...formData. Then we change each value in our form name attribute by using [e.target.name]:e.target.value

    // {} after = means variable

    const onSubmit = (e) => {
        e.preventDefault();
        if(password!==password2){ //password same as formaData.password
            console.log('Password mismatch');
        }
        else{
            console.log(formData);
        }
    }


    const {name,email,password,password2} = formData;

    return (
        <Fragment>
            <h1 className="large text-primary" style={{ marginTop:"5%",marginLeft:"5%"}}>Sign Up</h1>
            <p style={{ marginLeft:"5%" }} className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit = {(e) => onSubmit(e)}  style={{ marginLeft:"5%",marginRight:"5%"  }}>
                <div className="form-group">
                <input type="text"
                 placeholder="Name" 
                 name="name"
                 value = {name}
                 onChange = {(e) => {onChange(e)}}
                  required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" 
                value = {email}
                onChange = {(e) => {onChange(e)}}/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = {password}
                    onChange = {(e) => {onChange(e)}}
                    minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value = {password2}
                    onChange = {(e) => {onChange(e)}}
                    minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1" style={{ marginLeft:"5%"}}>
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Register;
