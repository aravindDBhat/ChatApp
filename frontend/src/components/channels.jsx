import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const animatedComponents = makeAnimated();
function Channels({ chats, type, currentUser, onNewConversationCreate }) {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [conversationName, setConversationName] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [selectedUserForNewConversation, setSelectedUserForNewConversation] =
    useState([currentUser.userId]);

  const handleShowModal = async () => {
    fetchMembers().then(() => {
      setShowModal(true);
    });
  };
  const handleSelectUser = (value) => {
    // example value for single select {value: '646a31f30cd899db532db5ab', label: 'name'}
    // example value for multi select [{value: '646a31f30cd899db532db5ab', label: 'name'}]

    if (type === "group") {
      const users = value.map((user) => user && user.value);
      users.push(currentUser.userId);
      setSelectedUserForNewConversation(users);
    } else {
      console.log("value is : ", value.value);
      console.log("currentUser is : ", currentUser.userId);
      setSelectedUserForNewConversation([currentUser.userId, value.value]);
      console.log(
        "selectedUserForNewConversation : ",
        selectedUserForNewConversation
      );
    }
  };
  const handleCreateNewConversation = async () => {
    try {
      setIsloading(true);
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_API_BACKEND_BASEURL}/api/conversations`,
        {
          users: selectedUserForNewConversation,
          conversationId: uuidv4(),
          conversationName,
          conversationType: type,
        }
      );
      onNewConversationCreate(response.data);
      setShowModal(false);
      navigate(`/text?chatId=${response.data.conversationId}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsloading(false);
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getOptions = (users) => {
    const filteredUser = users.filter(
      (user) => user._id !== currentUser.userId
    );
    const options = filteredUser.map((u) => ({
      value: u._id,
      label: u.name,
    }));
    return options;
  };
  const getDirectChatName = (chat) => {
    const name =
      chat.users &&
      chat.users.length > 0 &&
      chat.users.map((user) =>
        user._id !== currentUser.userId ? user.name : null
      );
    return name;
  };
  const fetchMembers = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_BASEURL}/api/users`
      );
      const usersData = data.data.users;
      setMembers(usersData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div
      style={{
        margin: "0 -5%",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Card
        style={{
          position: "absolute",

          width: "100%",
        }}
      >
        <Card.Header variant="top">
          {" "}
          <h6>{capitalizeFirstLetter(type)} chats</h6>
        </Card.Header>
        <Card.Body
          style={{
            height: "13rem",
            overflowY: "scroll",
          }}
        >
          {chats &&
            chats.length > 0 &&
            chats.map((chat) => (
              <div className="" key={chat._id}>
                <a href={`/text?chatId=${chat.conversationId}`}>
                  {type === "group"
                    ? chat.conversationName
                    : getDirectChatName(chat)}
                </a>
              </div>
            ))}
          <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create New {capitalizeFirstLetter(type)} Chat
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {type && type === "group" && (
                <div className="mb-4">
                  <Form.Label htmlFor="roomName">
                    Enter New Group Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={conversationName}
                    onChange={(e) => setConversationName(e.target.value)}
                    id="roomName"
                    aria-describedby="roomNameHelp"
                  />
                </div>
              )}
              <div>
                <Form.Label htmlFor="roomName">
                  Select Users For New {capitalizeFirstLetter(type)} Chat
                </Form.Label>
                <Select
                  isLoading={isLoading}
                  loadingMessage={"Loading Users..."}
                  label={`Select users to create new ${capitalizeFirstLetter(
                    type
                  )} Chat`}
                  closeMenuOnSelect={type === "direct"}
                  onChange={handleSelectUser}
                  components={animatedComponents}
                  isMulti={type === "group"}
                  options={
                    members && members.length > 0 ? getOptions(members) : []
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                isLoading={isLoading}
                disabled={
                  type === "group" &&
                  !conversationName &&
                  (selectedUserForNewConversation.length === 0 || isLoading)
                }
                onClick={handleCreateNewConversation}
              >
                Create New {capitalizeFirstLetter(type)} Chat
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>

        <Card.Footer>
          <Button
            className="btn btn-primary btn-sm btn-block"
            onClick={handleShowModal}
          >
            {capitalizeFirstLetter(type) === "Group"
              ? "Create new Group"
              : "Create new chat "}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
export default Channels;
