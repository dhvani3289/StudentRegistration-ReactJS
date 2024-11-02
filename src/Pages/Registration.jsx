import { useState, useEffect } from 'react';
import './Registration.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

function Registration() {

    let [data, setData] = useState({});
    let [list, setList] = useState([]);
    let [hobby, setHobby] = useState([]);
    let [pos, setPos] = useState(-1);
    let [find, setFind] = useState([]);
    let [error, setError] = useState({});

    useEffect(() => {
        const getData = JSON.parse(localStorage.getItem('userDetails'));
        let store = getData ? getData : [];
        setList(store);
    }, [setList]);

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let activities = [...hobby];
        if (name == "hobbies") {
            if (e.target.checked) {
                activities.push(value);
            }
            else {
                let index = activities.findIndex((v, i) => v == value);
                activities.splice(index, 1);
            }
            value = activities;
            setHobby(value);
            console.log(value);
        }
        setData({ ...data, [name]: value });
    }

    let updateData = (index) => {
        setPos(index);
        let record = list.filter((v, i) => {
            if (i == index) {
                return v;
            }
        })
        console.log(record[0]);
        setData(record[0]);
        setHobby(record[0].hobbies)
    }

    let deleteData = (index) => {
        list.splice(index, 1);
        localStorage.setItem("userDetails", JSON.stringify([...list]));
        setList([...list]);
    }

    let validation = () => {
        let validationMessages = {};
        if (!data.firstname) {
            validationMessages.firstname = 'Name is required';
        }
        if (!data.email) {
            validationMessages.email = 'Email is required';
        }
        else if (!data.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            validationMessages.email = 'You have entered an invalid email address!'
        }
        if (!data.phonenumber) {
            validationMessages.phonenumber = 'Phone Number is required';
        }
        else if (!data.phonenumber.match(/^\d{10}$/)) {
            validationMessages.phonenumber = 'Please enter a phone number of 10 digits '
        }
        if (!data.password) {
            validationMessages.password = 'Password is required';
        }
        else if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            validationMessages.password = 'Please enter a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. '
        }
        return validationMessages;
    }

    let submitData = (e) => {
        e.preventDefault();
        let formErrors = validation();
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
        }
        else {
            setError({});
            if (pos != -1) {
                list.map((v, i) => {
                    if (pos == i) {
                        list[pos] = data;
                    }
                })
                setList(list);
                setPos(-1);
            }
            else {
                const newList = [...list, data];
                setList(newList);
                localStorage.setItem("userDetails", JSON.stringify(newList));
            }
            setData({}); // Clear input fields after submission
            setHobby([]);
        }
    }

    let searchData = (e) => {
        e.preventDefault();
        // console.log(e.target.search.value);
        setFind(e.target.search.value);
    }

    let sorting = (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        let sortData = [...list];

        if (value === 'ascending') {
            sortData.sort((a, b) => a.firstname.localeCompare(b.firstname));
        }
        else if (value === 'descending') {
            sortData.sort((a, b) => b.firstname.localeCompare(a.firstname));
        }
        setList(sortData)
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {/* =======1======= */}
                    <div className="col-6 demo">
                        <form method='post' onSubmit={submitData} className='form'>
                            <h2>Student Registration</h2>
                            {/* first and last name */}
                            <div>
                                <input type="text" placeholder="First Name*" name='firstname' onChange={handleChange} value={data.firstname ? data.firstname : ""} />
                                <input type="text" placeholder="Last Name" name='lastname' onChange={handleChange} value={data.lastname ? data.lastname : ""} />
                            </div>
                            <div className='error'> {error.firstname && <p>{error.firstname}</p>}</div>

                            {/* value={data.firstname ? data.firstname : ""}: This part dynamically sets the initial value of the input field based on the data.firstname property.
                             If data.firstname exists and has a value, the input will be initially filled with that value.
                            If data.firstname is undefined or null, the input will be empty. */}

                            {/* email and phone number */}
                            <div >
                                <input type="email" placeholder="someone@example.com*" name='email' onChange={handleChange} value={data.email ? data.email : ""} />
                                <input type="number" placeholder="1234567890*" name='phonenumber' onChange={handleChange} value={data.phonenumber ? data.phonenumber : ""} />
                            </div>
                            <div className='error'> {error.email && <p>{error.email}</p>}</div>
                            <div className='error'> {error.phonenumber && <p>{error.phonenumber}</p>}</div>

                            {/* city */}
                            <div>
                                <input type="text" placeholder="Enter your city" name='city' onChange={handleChange} value={data.city ? data.city : ""} />
                            </div>

                            <hr />
                            {/* gender */}
                            <div className='gender' >
                                <label for="gender">Gender:</label>
                                <input type="radio" id="male" name="gender" value="male" onChange={handleChange} checked={data.gender == 'male' ? "checked" : ""} />
                                <label for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" onChange={handleChange} checked={data.gender == 'female' ? "checked" : ""} />
                                <label for="female">Female</label>
                            </div>

                            <hr />
                            {/* hobbies */}
                            <div className='hobbies'>
                                <label for="hobbies">Hobbies:</label>
                                <input type="checkbox" id="cricket" name="hobbies" value="cricket" onChange={handleChange} checked={hobby.includes('cricket') ? "checked" : ""} />
                                <label for="cricket">Cricket</label>
                                <input type="checkbox" id="football" name="hobbies" value="football" onChange={handleChange} checked={hobby.includes('football') ? "checked" : ""} />
                                <label for="football">Football</label>
                                <input type="checkbox" id="chess" name="hobbies" value="chess" onChange={handleChange} checked={hobby.includes('chess') ? "checked" : ""} />
                                <label for="chess">Chess</label>
                            </div>

                            <hr />
                            {/* password */}
                            <div>
                                <input type="password" name="password" placeholder="Enter your password*" onChange={handleChange} value={data.password ? data.password : ""} />
                            </div>
                            <div className='error'> {error.password && <p>{error.password}</p>}</div>

                            <input type="submit" value={pos == -1 ? "Register" : "Edit"} />
                        </form>
                    </div>

                    {/* =======2======= */}
                    <div className="col-6">
                        <div style={{ position: "relative", marginTop: "80px", marginBottom: "15px" }} className='search'>
                            <form method="post" onSubmit={searchData} >
                                <input type="text" name='search' placeholder='Search...' />
                                <button style={{ display: "contents" }}>
                                    <IoSearch type='submit' style={{ position: 'absolute', top: "19px", left: "28%", cursor: "pointer" }} />
                                </button>

                                <select onClick={sorting} name='sorting'>
                                    <option value="sort_by" hidden>Sort by name</option>
                                    <option value="ascending">&#8593; A - Z</option>
                                    <option value="descending">&#8595; Z - A</option>
                                </select>
                            </form>
                        </div>
                        <table border={1} cellPadding={10} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>City</th>
                                    <th>Gender</th>
                                    <th>Hobbies</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {
                                list.filter((v, i) => {
                                    if (find == '') {
                                        return v;
                                    }
                                    else if (v.firstname.toLocaleLowerCase().match(find.toLocaleLowerCase())) {
                                        return v;
                                    }
                                }).map((v, i) => {
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{v.firstname}</td>
                                                    <td>{v.lastname}</td>
                                                    <td>{v.email}</td>
                                                    <td>{v.phonenumber}</td>
                                                    <td>{v.city}</td>
                                                    <td>{v.gender}</td>
                                                    <td>{v.hobbies && v.hobbies.length > 0 ? v.hobbies.join(',') : '-'}</td>
                                                    <td>{v.password}</td>
                                                    <td className='actions'>
                                                        <FaEdit onClick={() => updateData(i)} className='actionIcon' />
                                                        <MdDelete onClick={() => deleteData(i)} className='actionIcon' />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Registration;


