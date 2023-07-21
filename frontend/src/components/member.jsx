import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import REACT_APP_API_BACKEND_BASEURL from "./baseurl";
import { Drawer, Placeholder } from "rsuite";
import React, { useEffect, useState } from "react";
function Member({ handleClick, isOpen }) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchMembers = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.get(
        `${REACT_APP_API_BACKEND_BASEURL}/api/users`
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
    <Drawer
      onOpen={fetchMembers}
      open={isOpen}
      onClose={() => handleClick(false)}
      size="sm"
    >
      <Drawer.Header>Members</Drawer.Header>
      <Drawer.Body>
        <ListGroup variant="flush">
          {!isLoading ? (
            members.map((member) => (
              <ListGroup.Item>{`# ${member.name}`} </ListGroup.Item>
            ))
          ) : (
            <Placeholder></Placeholder>
          )}
        </ListGroup>
      </Drawer.Body>
    </Drawer>
  );
}
export default Member;
