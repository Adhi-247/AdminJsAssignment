import React from 'react';
import { ApiClient, Box, H1, H4, H5, Text } from 'adminjs';

const api = new ApiClient();

const cardStyle = {
  p: 'xl',
  bg: 'white',
  border: '1px solid #d9dfe8',
  borderRadius: '10px',
};

const Dashboard = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    api.getPage({ pageName: 'Dashboard' }).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) {
    return (
      <Box variant="grey" p="xxl">
        <Text>Loading dashboard...</Text>
      </Box>
    );
  }

  const isAdmin = data.role === 'admin';

  return (
    <Box variant="grey" p="xxl">
      <H1>Dashboard</H1>

      {isAdmin ? (
        <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="lg" mt="xl">
          <Box style={cardStyle}>
            <H5>Total Users</H5>
            <H4>{data.totalUsers || 0}</H4>
          </Box>
          <Box style={cardStyle}>
            <H5>Total Products</H5>
            <H4>{data.totalProducts || 0}</H4>
          </Box>
          <Box style={cardStyle}>
            <H5>Total Orders</H5>
            <H4>{data.totalOrders || 0}</H4>
          </Box>
          <Box style={cardStyle}>
            <H5>Total Revenue</H5>
            <H4>${Number(data.totalRevenue || 0).toFixed(2)}</H4>
          </Box>
        </Box>
      ) : (
        <Box style={cardStyle} mt="xl">
          <H5>Welcome</H5>
          <Text>
            {data.profile ? `${data.profile.name} (${data.profile.email})` : 'User'}
          </Text>
          <Text mt="default">Your Total Orders: {data.myOrders || 0}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
