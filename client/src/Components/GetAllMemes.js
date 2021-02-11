import React, { Component } from "react";
import Loader from "react-loader";
import axios from "axios";
import config from "../config/config";
import "./styles.css";

const baseUrl = config.baseUrl;

class GetAllMemes extends Component {
  state = {
    name: null, 
    caption: null, 
    url: null,
    meme: [],
    loading: false,
  };

  componentDidMount() {
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
  }

  DeleteMeme = (id) => {
    console.log("ID: ", id);
    axios({
      method: "DELETE",
      url: `${baseUrl}/delete-meme/${id}`,
    })
      .then((response) => {})
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  updateMeme = (id, name, caption, url) => {
    console.log(name, caption, url)
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                    value={name}
                    // onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                    className="form-control"
                    id="InputEmail1"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputPassword1" className="form-label">
                    Caption
                  </label>
                  <input
                    value={caption}
                    // onChange={(e) => setCaption(e.target.value)}
                    placeholder="Enter the caption"
                    type="text"
                    className="form-control"
                    id="InputPassword1"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ImageUrl" className="form-label">
                    Image Url
                  </label>
                  <input
                    value={url}
                    // onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter the Image Url"
                    type="text"
                    className="form-control"
                    id="ImageUrl"
                    required
                  />
                </div>
              </form>
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
                // onClick={submit}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    // const data = {
    //   name, caption, url
    // }

    // axios({
    // method: "PATCH",
    // url: `${baseUrl}/update-meme/${id}`,
    // body: data
    // }).then(response => {
    //   console.log(response.data.message)
    // })
  };

  render() {
    return (
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
                        <i
                          className="fas fa-edit edit-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() =>
                            this.updateMeme(name[0], name[1], name[2], name[3])
                          }
                        ></i>
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
    );
  }
}

export default GetAllMemes;
