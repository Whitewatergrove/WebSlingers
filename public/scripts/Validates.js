// select all text elements
let username = document.forms['validate']['username'];
let password = document.forms['validate']['password'];
let password_confirm = document.forms['validate']['password_confirm'];

// select all error display elements

let name_error = document.forms['validate']['username_error'];
let password_error = document.forms['validate']['password_error'];

// setting all event listeners
username.addEventListener('click', nameVerify, true);
password.addEventListener('click', passwordVerify, true);

// validate
function Validate()
{
    // validate username
    if (username.value == "")
    {
        username.style.border = "1px solid red";
        document.getElementById('username').style.color = "red";
        name_error.textContent = "Username is required";
        username.focus();
        return false;

    }
    // validate username
    if (username.value.length < 4 || username.value.length > 16) 
    {
    username.style.border = "1px solid red";
    document.getElementById('username').style.color = "red";
    name_error.textContent = "Username must be at least 4 characters and less then 16";
    username.focus();
    return false;
    }
     // validate password
  if (password.value == "") 
  {
    password.style.border = "1px solid red";
    document.getElementById('password_div').style.color = "red";
    password_confirm.style.border = "1px solid red";
    password_error.textContent = "Password is required";
    password.focus();
    return false;
  }
  // check if the two passwords match
  if (password.value != password_confirm.value) 
  {
    password.style.border = "1px solid red";
    document.getElementById('pass_confirm_div').style.color = "red";
    password_confirm.style.border = "1px solid red";
    password_error.innerHTML = "The two passwords do not match";
    return false;
  }

  // event handler functions
function nameVerify() 
{
    if (username.value != "") 
    {
     username.style.border = "1px solid #5e6e66";
     document.getElementById('username').style.color = "#5e6e66";
     name_error.innerHTML = "";
     return true;
    }
  }
  function passwordVerify() 
  {
    if (password.value != "")
     {
        password.style.border = "1px solid #5e6e66";
        document.getElementById('pass_confirm').style.color = "#5e6e66";
        document.getElementById('password').style.color = "#5e6e66";
        password_error.innerHTML = "";
        return true;
    }
    if (password.value === password_confirm.value)
     {
        password.style.border = "1px solid #5e6e66";
        document.getElementById('pass_confirm').style.color = "#5e6e66";
        password_error.innerHTML = "";
        return true;
    }
}
}
