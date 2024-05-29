import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}users/create`, credentials);
};

export const loginCall = async (credentials) => {
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  console.log(res)
  return res
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}users/profile`, config)
  return res.data
}

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.put(`${API_URL}users/profile/update`, data, config)
  console.log(res, "yo soy updateProfile")
  return res
}

export const getAllUsers = async (token) => {
  console.log('token', token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}users/`, config)
  const users = res.data
  return users
}

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}/doctors` /*headers*/);
  const [doctors,count] = res.data
  return doctors;
};

export const bringAllAppointmentsForClient = async (token) => {
  console.log('token', token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(`${API_URL}appointments/client/appointments`, config);
  console.log('res', res)
  const appointments = res.data
  return appointments;
};

export const bringAllAppointmentsForDoctor = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(`${API_URL}appointments/doctor/appointment`, config);
  // console.log('res', res)
  const appointments = res.data
  return appointments;
};

export const bringAllAppointmentsForAdmin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(`${API_URL}appointments`, config);
  const appointments = res.data
  return appointments;
};



export const bringCharacterById = async (id) => {
  const res = await axios.get(`${API_URL}doctors/${id}`);

  return res.data;
};

export const bringAllUsersCall = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  }

  return axios.get(`${API_URL}users`, config)

}

export const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${API_URL}users/${id}`, config)
}


export const deleteUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`${API_URL}users/delete/${id}`, config)
}


export const createAppointments = async (token, body) => {
  console.log('token en api calls', token)
  console.log('body en api calls', body)
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    }, 

  }
  return axios.post(`${API_URL}appointments/create`, body, config)
}

// .get("url", {headers})
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})