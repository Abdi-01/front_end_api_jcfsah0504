import React from 'react';
import Axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUsers: [],
            selectedIdx: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        console.log("cek")
        Axios.get('http://localhost:2013/users/get-users')
            .then((res) => {
                console.log(res.data)
                this.setState({ dbUsers: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtAdd = () => {
        alert(`${this.nama.value}, ${this.email.value}`)
        let username = this.nama.value
        Axios.post('http://localhost:2013/users/add', {
            username,
            email: this.email.value,
            role: "users",
            status: "active"
        }).then((res) => {
            console.log(res.data)
            this.setState({ dbUsers: res.data })
        }).catch(err => {
            console.log(err)
        })
    }

    onBtSave = (id) => {
        Axios.patch(`http://localhost:2013/users/update/${id}`, {
            username: this.newUsername.value,
            email: this.newEmail.value,
            role: this.newRole.value,
            status: this.newStatus.value
        }).then((res) => {

            this.setState({ dbUsers: res.data, selectedIdx: null })
        }).catch((err) => {
            console.log(err)
        })
    }

    printData = () => {
        return this.state.dbUsers.map((value, index) => {
            if (this.state.selectedIdx == index) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><Input type="text" innerRef={(username) => this.newUsername = username} defaultValue={value.username} /></td>
                        <td><Input type="text" innerRef={(email) => this.newEmail = email} defaultValue={value.email} /></td>
                        <td><Input type="text" innerRef={(role) => this.newRole = role} defaultValue={value.role} /></td>
                        <td><Input type="text" innerRef={(status) => this.newStatus = status} defaultValue={value.status} /></td>
                        <td>
                            <Button color="warning" type="button" onClick={() => this.setState({ selectedIdx: null })}>Cancel</Button>
                            <Button color="success" type="button" onClick={() => this.onBtSave(value.id)}>Save</Button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{value.username}</td>
                        <td>{value.email}</td>
                        <td>{value.role}</td>
                        <td>{value.status}</td>
                        <td>
                            <Button color="danger">Delete</Button>
                            <Button color="warning" type="button" onClick={() => this.setState({ selectedIdx: index })}>Edit</Button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        //    console.log( this.posisi)
        return (
            <div className="row m-auto">
                <Form width='90vw' className="col-md-2">
                    <FormGroup>
                        <Label for="nama">Username</Label>
                        <Input type="text" name="text" id="nama" innerRef={(nama) => this.nama = nama} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" innerRef={(email) => this.email = email} />
                    </FormGroup>

                    <Button type='button' onClick={this.onBtAdd}>Submit</Button>
                </Form>
                <div className="col-md-10">
                    <Table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printData()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default FormPage;