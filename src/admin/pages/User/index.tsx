import { singleUser } from '../../../data';
import Single from '../../components/Single';

const User = () => {
  //Fetch data and send to Single Component

  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
