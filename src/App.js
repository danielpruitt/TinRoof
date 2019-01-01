import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Col from "./components/Grid/Col";
import Container from "./components/Grid/Container";
import Row from "./components/Grid/Row";
import {Modal, Button} from "react-materialize";


export default class App extends React.Component {
  state = {
    persons: [],
    album: [],
    photos: []
  };

  //mounts the jsonplaceholder api using axios and sets the state to hold the data
  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        // console.log(this.state.persons)
      })
  }

  //on click function that take in the id number set to a value and will open the album 
  getAlbum = (event) => {
    event.preventDefault();
    //grabs the value based off the persons.id and uses the id to query the url below
    let value = event.target.value;
    console.log(value)
    Axios.get('https://jsonplaceholder.typicode.com/albums?userId=' + value)
      .then(res => {
        const album = res.data;
        console.log(album);
        this.setState({ album })
      })
  }

  getPhotos = (event) => {
    event.preventDefault();

    // grabs the id from the album to pull up corresponding photos to the album.
    let value = event.target.value;
    console.log(value)
    Axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + value)
      .then(res => {
        const photos = res.data;
        console.log(photos);
        this.setState({ photos })

      })
  }


  // in the render the .map function will go through the state and each user will be added to the page
  render() {
    return (

      <div>
        <Container>
          <Row>
            <Col size="s4">
              <h4>Users</h4>
              <ul>
                {this.state.persons.map(person =>
                  <li
                    value={person.id}
                    onClick={this.getAlbum}
                  >
                    {person.id}. {person.name}
                  </li>

                )}
              </ul>

            </Col>

            <Col size="s4">
              <div>


                <h4>Albums</h4>
                {/* album mapping */}
                <ul>
                  {this.state.album.map(album =>
                    <li
                      value={album.id}
                      onClick={this.getPhotos}
                    >
                      {album.title}

                    </li>

                  )}
                </ul>
              </div>
            </Col>


            <Col size="s4">
              <div>
                <h4>Photos</h4>
                {/* photo mapping */}
                <ul>
                  {this.state.photos.map(photos =>
                    <div>

                      <li>
                        <p>{photos.title}</p>
                        <br />
                        <img className="img-thumbnail" src={photos.thumbnailUrl} alt="thumbnail" />
                      </li>
                      <br />

                      {/* This is the modal trigger that will show the full size image and title and can be dismissed */}
                      <Modal
                        header={photos.title}
                        trigger={<Button>Enlarge</Button>}>
                        <img src={photos.url} alt="full size image" />
                      </Modal>
                    </div>
                    
                )}
                </ul>

              </div>
            </Col>
          </Row>

        </Container>



      </div>

    )
  }
}

