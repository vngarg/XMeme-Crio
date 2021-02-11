// This file contains the all the working part
import React, { Component } from "react";
import Loader from "react-loader";
import axios from "axios";
import config from "../config/config";
import "./styles.css";

const baseUrl = config.baseUrl;

class GetAllMemes extends Component {
  state = {
    id: null,
    name: "",
    caption: "",
    url: "",
    meme: [],
    loading: false,
    addLoading: false,
    updateLoading: false,
    alertData: null,
    alertAddData: null,
    error: null,
  };

  // This function calls the backend POST API /memes & returns all the memes that are preset in the database.
  GetAllMemes = () => {
    this.setState({
      error: "",
      name: "",
      caption: "",
      url: "",
    });

    axios({
      method: "GET",
      url: `${baseUrl}/memes`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        const response = data.data.message;

        this.setState({
          meme: response.map((meme) => {
            return [meme.id, meme.name, meme.caption, meme.url];
          }),
          loading: true,
        });
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  componentDidMount() {
    return this.GetAllMemes();
  }

  // This function is used to check whether the name, caption & url fields are empty or not. It returns a boolean value, if they are empty then it stores the value in state variable error & displays the error to the user. 
  validation = () => {
    this.setState({
      error: "",
    });

    if (this.state.name === "") {
      this.setState({
        error: "Name is required",
      });
      return false;
    }
    if (this.state.caption === "") {
      this.setState({
        error: "Caption is required",
      });
      return false;
    }
    if (this.state.url === "") {
      this.setState({
        error: "Url is required",
      });
      return false;
    }

    return true;
  };

  // This function receives the id of the meme & call DELETE API /delete-meme/:id to deleet a meme. If meme is deleted, it returns 200 status otherwise 400.
  DeleteMeme = (id) => {
    
    axios({
      method: "DELETE",
      url: `${baseUrl}/delete-meme/${id}`,
    })
      .then((response) => {
        console.log("Meme deleted: ", response);
        alert("Meme deleted successfully");
        this.GetAllMemes();
      })
      .catch((error) => {
        alert("Can't delete the meme. Please try again.");
        console.log("Error in deleting meme: ", error);
      });
  };

  // This function receives name, caption & url before updating the meme & sets them to respective state variables.
  updateMeme = (id, name, caption, url) => {
    this.setState({
      id,
      name,
      caption,
      url,
    });
  };

  // This function takes state variables & calls the PATCH API /update-meme/:id to update the changes. 
  submitMemeUpdate = () => {
    const data = {
      name: this.state.name,
      caption: this.state.caption,
      url: this.state.url,
    };

    if (this.validation()) {
      axios({
        method: "PATCH",
        url: `${baseUrl}/update-meme/${this.state.id}`,
        data,
      })
        .then((response) => {
          console.log("Meme update: ", response);
          this.setState({
            updateLoading: true,
            alertData: "Meme Updated Successfully 🙂",
            name: null,
            caption: null,
            url: null,
          });
          this.GetAllMemes();
        })
        .catch((error) => {
          alert("Can't update the meme. Please try again later.");
          console.log("Error: ", error);
        });
    }
  };

  // This function is used to add a new meme to the database. It checks whether the fields are empty or not & then calls the POST API /memes
  addMeme = () => {
    const data = {
      name: this.state.name,
      caption: this.state.caption,
      url: this.state.url,
    };

    if (this.validation()) {
      axios({
        method: "POST",
        data,
        url: `${baseUrl}/memes`,
      })
        .then((response) => {
          this.setState({
            addLoading: true,
            name: null,
            caption: null,
            url: null,
          });
          this.setState(
            {
              alertAddData: "Meme Added Successfully 🙂",
            },
            () => this.GetAllMemes()
          );

          if (response.data.message == "This meme is already present") {
            this.setState({
              alertAddData: "This meme is already present",
            });
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          alert("Can't add the meme. Please try again.");
        });
    }
  };

  // This function is used when the input field values are changes. 
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        {/* Modal to add a meme */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModal1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal1Label">
                  Add a Meme
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">
                      Name
                    </label>
                    <input
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter your name"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">
                      Caption
                    </label>
                    <input
                      value={this.state.caption}
                      name="caption"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter the caption"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ImageUrl" className="form-label">
                      Image Url
                    </label>
                    <input
                      value={this.state.url}
                      name="url"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter the Image Url"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                </form>
                {this.state.addLoading ? (
                  <div className="alert alert-success" role="alert">
                    {this.state.alertAddData}
                  </div>
                ) : null}

                {this.state.error ? (
                  <div className="alert alert-danger" role="alert">
                    {this.state.error}
                  </div>
                ) : null}

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={this.addMeme}
                  type="button"
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal to update the Meme */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="5"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update the Meme
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">
                      Name
                    </label>
                    <input
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter your name"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">
                      Caption
                    </label>
                    <input
                      value={this.state.caption}
                      name="caption"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter the caption"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ImageUrl" className="form-label">
                      Image Url
                    </label>
                    <input
                      value={this.state.url}
                      name="url"
                      onChange={(e) => this.change(e)}
                      placeholder="Enter the Image Url"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                </form>
              </div>
              {this.state.updateLoading ? (
                <div className="alert alert-success" role="alert">
                  {this.state.alertData}
                </div>
              ) : null}

              {this.state.error ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              ) : null}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={this.submitMemeUpdate}
                  type="button"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

                {/* Add a meme button */}
        <div className="text-center mt-5">
          <input
            type="button"
            value="Add a Meme"
            className="btn btn-primary rounded-pill button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          />
        </div>

        {/* Main Container that displays all the memes */}
        <div className="container mt-4 mainContainer">
          <div className="row">
            <Loader loaded={this.state.loading}>
              {this.state.meme.length > 0 ? (
                this.state.meme.map((name) => {
                  return (
                    <div className="col-lg-6 m-3" key={name[0]}>
                      <div className="row">
                        <div className="col-6">
                          <b>{name[1]}</b>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() =>
                              this.updateMeme(
                                name[0],
                                name[1],
                                name[2],
                                name[3]
                              )
                            }
                          >
                            <i
                              className="fas fa-edit edit-icon"
                            />
                          </a>
                          <i
                            className="far fa-trash-alt delete-icon"
                            onClick={() => this.DeleteMeme(name[0])}
                          ></i>
                        </div>
                      </div>
                      <div className="caption">{name[2]}</div>
                      <img src={`${name[3]}`} alt={name[1]} className="image" />
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <b>No Meme Added..</b>
                </div>
              )}
            </Loader>
          </div>
        </div>
      </>
    );
  }
}

export default GetAllMemes;
