const Dashboard = () => {
  // fake user data (later connect backend)
  const user = {
    username: "Raj",
    email: "raj@gmail.com",
  };
  console.log(user);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-black">Dashboard</h2>

      <div style={styles.card}>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    width: "300px",
  },
};

export default Dashboard;
