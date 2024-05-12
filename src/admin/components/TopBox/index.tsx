import './TopBox.css';
import { topDealUsers } from '../../../data';

const TopBox = () => {
  return (
    <div className="topBox">
      <h1 className="topBox__title">GIAO DỊCH HÀNG ĐẦU</h1>
      <div className="topBox__list">
        {topDealUsers.map((user) => (
          <div className="topBox__listItem" key={user.id}>
            <div className="topBox__user">
              <img className="topBox__userImg" src={user.img} alt="" />
              <div className="topBox__userTexts">
                <span className="topBox__username">{user.username}</span>
                <span className="topBox__email">{user.email}</span>
              </div>
            </div>
            <span className="topBox__amount">${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
