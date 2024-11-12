import { central, db1, db2, db3, vault } from "./databases.js";

export async function getUserInfo(id) {
  try {
    const dbName = await central(id); 

    let userData;
    switch (dbName) {
      case 'db1':
        userData = await db1(id);
        break;
      case 'db2':
        userData = await db2(id);
        break;
      case 'db3':
        userData = await db3(id);
        break;
      default:
        throw new Error(`Unknown database returned from central for user ${id}`);
    }

    const personalData = await vault(id);

    const userInfo = {
      id: id,
      name: personalData.name,
      username: userData.username,
      email: personalData.email,
      address: personalData.address,
      phone: personalData.phone,
      website: userData.website,
      company: userData.company
    };

    return userInfo;
  } catch (error) {
    throw new Error(`Failed to retrieve user information for user ${id}: ${error.message}`);
  }
}

// Example usage (replace 1 with the actual user ID)
getUserInfo(1)
  .then(userInfo => {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = `
      <h2>User Information</h2>
      <p><strong>Name:</strong> ${userInfo.name}</p>
      <p><strong>Username:</strong> ${userInfo.username}</p>
      <p><strong>Email:</strong> ${userInfo.email}</p>
      <p><strong>Address:</strong> ${userInfo.address}</p>
      <p><strong>Phone:</strong> ${userInfo.phone}</p>
      <p><strong>Website:</strong> ${userInfo.website}</p>
      <p><strong>Company:</strong> ${userInfo.company}</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });