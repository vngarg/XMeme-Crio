import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import config from "../config/config";

const baseUrl = config.baseUrl;

const AddMeme = () => {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setImageUrl] = useState("");
  const [loading, SetLoading] = useState(false);
  const [alertData, SetAlertData] = useState("");

  function submit() {
    const data = {
      name,
      caption,
      url,
    };

    axios({
      method: "POST",
      data,
      url: `${baseUrl}/memes`,
    })
      .then((response) => {
        SetLoading(true);
        setName("");
        setCaption("");
        setImageUrl("");

        SetAlertData("Meme Added Successfully 🙂");

        if (response.data.message == "This meme is already present") {
          SetAlertData("This meme is already present");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("Can't add the meme. Please try again.");
      });
  }

  return (
    <>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setCaption(e.target.value)}
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
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter the Image Url"
                    type="text"
                    className="form-control"
                    id="ImageUrl"
                    required
                  />
                </div>
              </form>
              {loading ? (
                <div className="alert alert-success" role="alert">
                  {alertData}
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
                onClick={submit}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <input
          type="button"
          value="Add a Meme"
          className="btn btn-primary rounded-pill button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        />
      </div>
    </>
  );
};

export default AddMeme;
