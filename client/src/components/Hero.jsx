import { Button, Card, Form, Select, Space } from 'antd';
import '../styles/hero.css';

const Hero = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <section className="hero">
      <div className="hero--overlay">
        <h1 className="hero--title">Find Your Perfect Match..!</h1>
        <Card title="Search your Room." hoverable className="hero--card">
          <Form>
            <div className="hero--filter">
              <Select
                size="large"
                label="Room Type"
                placeholder="Room Type"
                onChange={handleChange}
                options={[
                  {
                    value: 'one-bed',
                    label: '1 Bed',
                  },
                  {
                    value: 'two-bed',
                    label: '2 Bed',
                  },
                  {
                    value: 'three-bed',
                    label: '3 Bed',
                  },
                  {
                    value: 'four-bed',
                    label: '4 Bed',
                    disabled: true,
                  },
                ]}
              />

              <Select
                size="large"
                placeholder="Property Type"
                onChange={handleChange}
                options={[
                  {
                    value: 'hostel',
                    label: 'Hostel',
                  },
                  {
                    value: 'private-space',
                    label: 'Private Room',
                  },
                  {
                    value: 'shared-house',
                    label: 'Sharing House',
                  },
                ]}
              />
              <Select
                size="large"
                placeholder="Location"
                onChange={handleChange}
                options={[
                  {
                    value: 'islamabad',
                    label: 'Islamabad',
                  },
                ]}
              />
              <Button className="filter-search-btn" type="primary" size="large">
                Search
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
