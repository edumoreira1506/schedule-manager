import UserDTO from '../dtos/UserDTO.js';
import Mapper from './Mapper.js';

export default class UserMapper {
  static toDTO(user) {
    return new UserDTO(user);
  }

  static toEntity(userDTO) {
    return Mapper.toEntity(userDTO);
  }
}

