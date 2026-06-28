import User from "../Models/user.model.js";

let memoryStoreEnabled = false;
const memoryUsersById = new Map();
const memoryUsersByEmail = new Map();

const normalizeEmail = (email) => email?.toLowerCase();

const buildMemoryUser = (data) => ({
  _id: data._id || `memory-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  ...data,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const setMemoryStoreEnabled = (enabled) => {
  memoryStoreEnabled = enabled;
};

export const isMemoryStoreEnabled = () => memoryStoreEnabled;

export const findUserByEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  if (memoryStoreEnabled) {
    return memoryUsersByEmail.get(normalizedEmail) || null;
  }

  return await User.findOne({ email: normalizedEmail });
};

export const getUserById = async (id) => {
  if (memoryStoreEnabled) {
    return memoryUsersById.get(id) || null;
  }

  return await User.findById(id);
};

export const createUser = async (data) => {
  const normalizedEmail = normalizeEmail(data.email);
  const payload = { ...data, email: normalizedEmail };

  if (memoryStoreEnabled) {
    const user = buildMemoryUser(payload);
    memoryUsersById.set(user._id, user);
    memoryUsersByEmail.set(normalizedEmail, user);
    return user;
  }

  return await User.create(payload);
};

export const updateUserById = async (id, data) => {
  if (memoryStoreEnabled) {
    const currentUser = memoryUsersById.get(id);
    if (!currentUser) return null;

    const updatedUser = {
      ...currentUser,
      ...data,
      updatedAt: new Date(),
    };

    memoryUsersById.set(id, updatedUser);
    if (updatedUser.email) {
      memoryUsersByEmail.set(normalizeEmail(updatedUser.email), updatedUser);
    }

    return updatedUser;
  }

  return await User.findByIdAndUpdate(id, data, { new: true });
};
