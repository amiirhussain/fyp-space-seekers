import { List, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SiZerodha } from 'react-icons/si';
import { FaLocationDot, FaBath, FaBed } from 'react-icons/fa6';
const ApartList = ({ apartments, handleEdit, handleDelete }) => {
  console.log(apartments);
  return (
    <List
      className="list--container"
      itemLayout="vertical"
      dataSource={apartments}
      renderItem={(apartment) => (
        <List.Item key={apartment._id}>
          <div className="apartment--list">
            <div className="apartment-action">
              <Button onClick={() => handleEdit(apartment)}>
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(apartment._id)}>
                <DeleteOutlined className="delte-btn" />
              </Button>
            </div>
            <div className="list--image">
              <img src={apartment.imageUrls[0]} alt={apartment.title} />
            </div>
            <div className="list-detail">
              <div className="list--header">
                <h2 className="list-title">{apartment.title}</h2>

                {/* <div
                  className={`list-status ${
                    apartment.isAvailble
                      ? 'list-status-true'
                      : 'list-status-false'
                  }`}
                >
                  {apartment.isAvailble ? 'Available' : 'Not Available'}
                </div> */}
              </div>

              <div className="list-type">{apartment.type}</div>
              <span className="apartment-address">
                <FaLocationDot className="icon" /> {apartment.address}
              </span>
              <div className="apartment-detail">
                <span>
                  <SiZerodha className="icon" />
                  {`${apartment.size} sq ft.`}
                </span>
                <span>
                  <FaBed className="icon" />
                  {`${apartment.bedrooms} Bed`}
                </span>
                <span>
                  <FaBath className="icon" />
                  {`${apartment.bathrooms} Bath`}
                </span>
              </div>

              <div className="divider"></div>

              <div className="apartment-about">
                <div className="apartment-rent">
                  <span className="rent--slogan">Start from</span>
                  <span className="rent-mount">
                    Rs15,499 <span>/mo*</span>
                  </span>
                </div>

                <Space className="list--action">
                  <Button type="primary">Chat</Button>
                  <Button>Schedule a visit</Button>
                </Space>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ApartList;
