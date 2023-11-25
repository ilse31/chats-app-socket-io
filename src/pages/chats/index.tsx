import * as React from "react";
import { ProfileService } from "../../services/bussiness/profile";
import Button from "../../components/buttons";
import { getLocalStorage } from "../../helpers/localstorage";
import socket from "../../services/socket";

const Chats: React.FC = () => {
  const profileService = new ProfileService();
  const [connectionUser, setConnectionUser] = React.useState<any>([]);
  const [userData, setUserData] = React.useState();

  const [selectedUser, setSelectedUser] = React.useState("");

  const handleClick = async () => {
    const user = getLocalStorage("user");
    await profileService
      .getMe({
        userId: user.id,
      })
      .then((resp) => setUserData(resp.data.data))
      .catch((err) => console.log(err));
  };

  socket.on("users", (users) => {
    console.log("users", users);
    users.forEach((user: { self: boolean; key: string }) => {
      console.log("user", user, socket.id);
      user.self = user.key === socket.id;
    });
    users = users.sort(
      (
        a: { self: any; username: number },
        b: { self: any; username: number }
      ) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }
    );
    setConnectionUser(users);
  });

  socket.on("user connected", (user) => {
    console.log("user connected", user);
    setConnectionUser([...connectionUser, user]);
  });
  return (
    <div className='flex flex-col'>
      <Button onClick={handleClick}>Get Profile</Button>
      {connectionUser.map((user: any) => {
        return (
          <div key={user.key} className='p-5 text-black '>
            <span
              className='bg-blue-600 rounded-sm max-w-sm cursor-pointer p-5'
              onClick={() => !user.self && setSelectedUser(user.email)}
            >
              {user.email}
            </span>
          </div>
        );
      })}
      {selectedUser && <div>{selectedUser}</div>}
    </div>
  );
};

export default Chats;
