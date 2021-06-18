import React,{Fragment} from 'react'

const Register = () => {
    return (
        <Fragment>
            <h1 className="large text-primary" style={{ marginTop:"5%",marginLeft:"5%"}}>Sign Up</h1>
            <p style={{ marginLeft:"5%" }} className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" action="create-profile.html"  style={{ marginLeft:"5%",marginRight:"5%"  }}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" />
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
                    minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
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
