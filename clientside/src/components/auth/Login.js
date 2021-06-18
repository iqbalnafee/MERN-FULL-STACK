import React,{Fragment,useState} from 'react'



const Login = () => {


    const [formData,setFormData] = useState({

        email:'',
        password:'',

    }); // formData is an object with all of the field values. setFormData is a function to update our state we are gonna pull out from useState() 
    
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    //setFormData used for changed the useState state. Hence we used {} inside setFormData
    //Inside {}, first we copy the formdata by using ...formData. Then we change each value in our form name attribute by using [e.target.name]:e.target.value

    // {} after = means variable

    const onSubmit = async (e) => {
        e.preventDefault();
        
        console.log("SUCCESS");
            
        
    }


    const {email,password} = formData;

    return (
        <Fragment>
            <h1 className="large text-primary" style={{ marginTop:"5%",marginLeft:"5%"}}>Sign In</h1>
            <p style={{ marginLeft:"5%" }} className="lead"><i className="fas fa-user"></i> Login into Your Account</p>
            <form className="form" onSubmit = {(e) => onSubmit(e)}  style={{ marginLeft:"5%",marginRight:"5%"  }}>
                
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" 
                value = {email}
                onChange = {(e) => {onChange(e)}}/>
                
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
                
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1" style={{ marginLeft:"5%"}}>
                Don't have an account? <a href="register.html">Sign Up</a>
            </p>
        </Fragment>
    )
}

export default Login;
