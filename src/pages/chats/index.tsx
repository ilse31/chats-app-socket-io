import * as React from "react";
import { ProfileService } from "../../services/bussiness/profile";
import Button from "../../components/buttons";
import { getLocalStorage } from "../../helpers/localstorage";

const Chats: React.FC = () => {
  const profileService = new ProfileService();

  const handleClick = async () => {
    const user = getLocalStorage("user");
    await profileService
      .getMe({
        userId: user.id,
      })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quos
      placeat corrupti molestias! Molestias exercitationem aspernatur quos,
      natus vitae voluptatum dicta! Error iste adipisci optio eaque reiciendis
      amet reprehenderit inventore.
      <Button onClick={handleClick}>Get Profile</Button>
    </div>
  );
};

export default Chats;
